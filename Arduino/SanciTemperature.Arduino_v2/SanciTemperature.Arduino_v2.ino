#include <ESP8266WiFi.h>
#include <OneWire.h>
#include <DallasTemperature.h>
#include <ESP8266HTTPClient.h>

// Configurazione DS18B20
#define ONE_WIRE_BUS D2 // Pin digitale al quale è collegato il sensore
OneWire oneWire(ONE_WIRE_BUS);
DallasTemperature sensors(&oneWire);

// Configurazione WiFi
const char *ssid = "EOLO - FRITZ!Box 4020 AE";
const char *password = "47333590285490568680";
const char *endpointUrl = "http://temperaturemonitorsp.azurewebsites.net/api/v1/temperature/save"; // Sostituisci con il tuo endpoint

// Parametri
const int numReadings = 15;              // Numero di letture per fare la media
const int wifiMaxAttempts = 50;          // Numero massimo di tentativi di connessione WiFi
const int sleepDuration = 30 * 60 * 1e6; // Sleep per 30 minuti (in microsecondi)
const int wifiCycleAttempts = 5;

void setup()
{
  pinMode(LED_BUILTIN, OUTPUT);
  Serial.begin(115200);
  delay(500);

  // Inizializza il sensore DS18B20
  sensors.begin();

  // Connetti al WiFi
  WiFi.begin(ssid, password);
  int attempt = 0;
  for (int i = 0; i < wifiCycleAttempts; i++)
  {
    attempt = 0;
    if (WiFi.status() == WL_CONNECTED)
      break;

    while (WiFi.status() != WL_CONNECTED && attempt < wifiMaxAttempts)
    {
      delay(500);
      Serial.print(".");
      attempt++;
    }
    delay(1000);
  }

  if (WiFi.status() != WL_CONNECTED)
  {
    Serial.println("Connessione WiFi fallita. Entro in deep sleep.");
    ESP.deepSleep(sleepDuration);
    return;
  }
  Serial.println("WiFi connesso.");
  digitalWrite(LED_BUILTIN, HIGH);
  delay(500);
  digitalWrite(LED_BUILTIN, LOW);
  delay(500);
  digitalWrite(LED_BUILTIN, HIGH);
  delay(500);
  digitalWrite(LED_BUILTIN, LOW);
}

void loop()
{
  float temperature = readTemperatureAverage();
  Serial.print("Temperatura rilevata: ");
  Serial.println(temperature);
  if (sendTemperatureData(temperature))
  {
    Serial.println("Dati inviati con successo.");
  }
  else
  {
    Serial.println("Invio dei dati fallito.");
  }

  // Modalità deep sleep
  Serial.println("Entro in deep sleep per 30 minuti.");
  ESP.deepSleep(sleepDuration);
}

float readTemperatureAverage()
{
  float totalTemperature = 0.0;

  for (int i = 0; i < numReadings; i++)
  {
    sensors.requestTemperatures(); // Richiede la temperatura
    float tempC = sensors.getTempCByIndex(0);
    if (tempC != DEVICE_DISCONNECTED_C)
    {
      totalTemperature += tempC;
    }
    delay(1000); // Aspetta un secondo tra le letture
  }

  return totalTemperature / numReadings;
}

bool sendTemperatureData(float temperature)
{
  Serial.println("Invio dei dati!");
  if (WiFi.status() == WL_CONNECTED)
  {
    WiFiClient client;
    HTTPClient http;
    String apiPath = String(endpointUrl) + "?temperature=" + temperature;
    http.begin(client, apiPath.c_str());
    int httpResponseCode = http.GET();
    if (httpResponseCode > 0)
    {
      return true;
    }
  }
  return false;
}

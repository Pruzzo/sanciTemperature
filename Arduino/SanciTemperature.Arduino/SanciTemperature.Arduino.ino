#include <DallasTemperature.h>
#include <ESP8266WiFi.h>
#include <ESP8266HTTPClient.h>
#include <ESP8266WebServer.h>
#include <WiFiClient.h>
#include <EEPROM.h>

#include <OneWire.h>

#define WIFI_FAIL 0
#define WIFI_CONNECTED 1

OneWire oneWire(4);
DallasTemperature dt(&oneWire);
String ssid = "Default_SSID";
String passphrase = "Default_Password";
String st;
String content;
ESP8266WebServer server(80);

float tc;
int statusCode;
String serverPath = "http://temperaturasanci.azurewebsites.net/api/v1/temperature/save";

void initSerial(void)
{
  Serial.begin(115200); // Initialising if(DEBUG)Serial Monitor
  Serial.println();
}

void setup()
{
  Serial.println("INIT");
  initSerial();
  disconnectWifi();
  EEPROM.begin(512); // Initialasing EEPROM
  // clearEEPROMData();
  readEEPROMData(&ssid, &passphrase);
  dt.begin();
  delay(10);
  Serial.println("Startup");
  if (connectWifi(&ssid, &passphrase, &st, &content))
  {
    Serial.println("Succesfully Connected!!!");
    return;
  }
  else
  {
    Serial.println("Turning the HotSpot On");
    launchWeb(&st, &content);
    setupAP(&st, &content); // Setup HotSpot
  }
  while ((WiFi.status() != WL_CONNECTED))
  {
    Serial.print(".");
    delay(100);
    server.handleClient();
  }
}

void readTC()
{
  dt.requestTemperatures();
  tc = dt.getTempCByIndex(0);
  Serial.print(tc);
  Serial.println(" °C");
}
void loop()
{

  if (WiFi.status() == WL_CONNECTED)
  {
    WiFiClient client;
    HTTPClient http;
    readTC();
    String apiPath = serverPath + "?temperature=" + tc;
    http.begin(client, apiPath.c_str());
    int httpResponseCode = http.GET();
    if (httpResponseCode > 0)
    {
      Serial.print("HTTP Response code: ");
      Serial.println(httpResponseCode);
      String payload = http.getString();
      Serial.println(payload);
    }
    else
    {
      Serial.print("Error code: ");
      Serial.println(httpResponseCode);
    }
    // Free resources
    http.end();
  }
  else
  {
    Serial.println("WiFi Disconnected");
  }

  delay(1000);
  ESP.deepSleep(30e6);
}

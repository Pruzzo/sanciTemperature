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
uint64 sleepTime = 1200e6;
int tryConnect = 0;
bool wifiConnected = false;
float tc;
int statusCode;
float totalTC = 0;
String serverPath = "http://temperaturemonitorsp.azurewebsites.net/api/v1/temperature/save";

void initSerial(void)
{
  Serial.begin(115200); // Initialising Serial Monitor
  Serial.println();
}

void setup()
{
  Serial.println("INIT");
  initSerial();
  disconnectWifi();
  EEPROM.begin(512); // Initialising EEPROM
  readEEPROMData(&ssid, &passphrase);
  dt.begin();
  delay(10);
  Serial.println("Startup");
  while (!wifiConnected)
  {
    if (connectWifi(&ssid, &passphrase, &st, &content))
    {
      Serial.println("Successfully Connected!!!");
      return;
      tryConnect = 0;
    }
    else
    {
      if (tryConnect >= 5)
        ESP.deepSleep(sleepTime);
      tryConnect = tryConnect + 1;
    }
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
  for (int i = 0; i < 10; i++)
  {
    dt.requestTemperatures();
    tc = dt.getTempCByIndex(0);
    Serial.print(tc);
    Serial.println(" °C");
    totalTC = totalTC + tc;
  }
  tc = totalTC / 10;
}

long parseSleepTime(String payload)
{
  int startIdx = payload.indexOf("\"sleepTime\":") + 12;
  int endIdx = payload.indexOf("}", startIdx);
  if (startIdx >= 0 && endIdx > startIdx)
  {
    return payload.substring(startIdx, endIdx).toInt();
  }
  return 18000; // Default value in case of parsing error
}

void loop()
{
  if (WiFi.status() == WL_CONNECTED)
  {
    WiFiClient client;
    HTTPClient http;
    readTC();
    Serial.print("Medium temperature: ");
    Serial.println(tc);
    
    String apiPath = serverPath + "?temperature=" + tc;
    http.begin(client, apiPath.c_str());
    int httpResponseCode = http.GET();
    if (httpResponseCode > 0)
    {
      Serial.print("HTTP Response code: ");
      Serial.println(httpResponseCode);
      String payload = http.getString();

      sleepTime = parseSleepTime(payload);
      Serial.print("Parsed sleepTime: ");
      Serial.println(sleepTime);
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
  ESP.deepSleep(sleepTime);
}

#include <ESP8266WiFi.h>
#include <ESP8266HTTPClient.h>
#include <ESP8266WebServer.h>
#include <EEPROM.h>


void disconnectWifi(void)
{
    Serial.println("Disconnecting current wifi connection");
    WiFi.disconnect();
}

bool connectWifi(String *ssid, String *passphrase, String *st, String *content)
{
    WiFi.begin(ssid->c_str(), passphrase->c_str());
    int i = 0;
    Serial.print("Connecting to ");
    Serial.print(*ssid);
    Serial.println(" ...");
    while (i < 40)
    {
        if (WiFi.status() == WL_CONNECTED)
            return true;
        else
        {
            delay(1000);
            Serial.print(++i);
            Serial.print(' ');
        }
    }
    Serial.println("");
    Serial.println("Unable to connect");
    return false;
}

void launchWeb(String *st, String *content)
{
    Serial.println("");
    if (WiFi.status() == WL_CONNECTED)
        Serial.println("WiFi connected");
    Serial.print("Local IP: ");
    Serial.println(WiFi.localIP());
    Serial.print("SoftAP IP: ");
    Serial.println(WiFi.softAPIP());
    createWebServer(st, content);
    // Start the server
    server.begin();
    Serial.println("Server started");
}

void setupAP(String *st, String *content)
{
    WiFi.mode(WIFI_STA);
    WiFi.disconnect();
    delay(100);
    int n = WiFi.scanNetworks();
    Serial.println("scan done");
    if (n == 0)
        Serial.println("no networks found");
    Serial.println("");
    *st = "<ol>";
    for (int i = 0; i < n; ++i)
    {
        // Print SSID and RSSI for each network found
        *st += "<li>";
        *st += WiFi.SSID(i);
        *st += " (";
        *st += WiFi.RSSI(i);

        *st += ")";
        *st += (WiFi.encryptionType(i) == ENC_TYPE_NONE) ? " " : "*";
        *st += "</li>";
    }
    *st += "</ol>";
    delay(100);
    WiFi.softAP("Secure-Notifier", "");
    Serial.println("Initialized AP");
    launchWeb(st, content);
}

void createWebServer(String *st, String *content)
{
    {
        server.on("/", [st, content]()
                  {

      IPAddress ip = WiFi.softAPIP();
      String ipStr = String(ip[0]) + '.' + String(ip[1]) + '.' + String(ip[2]) + '.' + String(ip[3]);
      
      getHtmlPage(st, content,&ipStr);
      server.send(200, "text/html", *content); });
        server.on("/scan", [content]()
                  {
      //setupAP();
      IPAddress ip = WiFi.softAPIP();
      String ipStr = String(ip[0]) + '.' + String(ip[1]) + '.' + String(ip[2]) + '.' + String(ip[3]);

      *content = "<!DOCTYPE HTML>\r\n<html>go back";
      server.send(200, "text/html", *content); });

        server.on("/setting", [content]()
                  {
                String qsid = server.arg("ssid");
                String qpass = server.arg("pass");
                if (qsid.length() > 0 && qpass.length() > 0)
                {
                  Serial.println("clearing eeprom");
                  for (int i = 0; i < 96; ++i)
                  {
                    EEPROM.write(i, 0);
                  }
                  Serial.println(qsid);
                  Serial.println("");
                  Serial.println(qpass);
                  Serial.println("");

                  writeEEPROMData(&qsid, &qpass);

                  *content = "{\"Success\":\"saved to eeprom... reset to boot into new wifi\"}";
                  statusCode = 200;
                  ESP.reset();
                }
                else
                {
                  *content = "{\"Error\":\"404 not found\"}";
                  statusCode = 404;
                  Serial.println("Sending 404");
                }
                server.sendHeader("Access-Control-Allow-Origin", "*");
                server.send(statusCode, "application/json", *content); });
    }
}

void getHtmlPage(String *st, String *content, String *ipStr)
{
    *content = "<!DOCTYPE HTML>\r\n<html>Welcome to Wifi Credentials Update page";
    *content += "<form action=\"/scan\" method=\"POST\"><input type=\"submit\" value=\"scan\"></form>";
    *content += *ipStr;
    *content += "<p>";
    *content += *st;
    *content += "</p><form method='get' action='setting'><label>SSID: </label><input name='ssid' length=32><input name='pass' length=64><input type='submit'></form>";
    *content += "</html>";
}

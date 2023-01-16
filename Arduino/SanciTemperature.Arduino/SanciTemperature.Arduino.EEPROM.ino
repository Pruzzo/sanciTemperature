

void clearEEPROMData(void)
{
    Serial.println("Clearing EEPROM Data");
    for (int i = 0; i < 96; ++i)
    {

        EEPROM.write(i, 0);
    }
    EEPROM.commit();
}

void readEEPROMData(String *ssid, String *passphrase)
{
    //---------------------------------------- Read eeprom for ssid and pass
    Serial.println("Reading EEPROM Data");

    String esid = "";
    for (int i = 0; i < 32; ++i)
    {
        esid += char(EEPROM.read(i));
    }
    Serial.println();
    Serial.print("SSID: ");
    Serial.println(esid);

    String epass = "";
    for (int i = 32; i < 96; ++i)
    {
        epass += char(EEPROM.read(i));
    }
    Serial.print("Key: ");
    Serial.println(epass);
    *ssid = esid;
    *passphrase = epass;
}

void writeEEPROMData(String *qsid, String *qpass)
{
    String pass = *qpass;
    String ssid = *qsid;
    Serial.println("writing eeprom ssid:");
    for (int i = 0; i < ssid.length(); ++i)
    {
        EEPROM.write(i, ssid[i]);
        // Serial.print("Wrote: ");
        // Serial.println(ssid[i]);
    }
    Serial.println("writing eeprom pass:");
    for (int i = 0; i < pass.length(); ++i)
    {
        EEPROM.write(32 + i, pass[i]);
        // Serial.print("Wrote: ");
        // Serial.println(pass[i]);
    }
    EEPROM.commit();
}
#include "Arduino.h"
#include "Wire.h"
#include "SPI.h"
#include "Adafruit_Sensor.h"
#include "Adafruit_BME280.h"
#include "PubSubClient.h"
#include "WiFi.h"

Adafruit_BME280 bme;
WiFiClient espClient;
PubSubClient client(espClient);

const char *ssid = "";
const char *password = "";
const char *mqtt_server = "";
const char *mqtt_username = "";
const char *mqtt_password = "";
const int mqtt_port = 1883;

void setup_wifi();
void reconnect();

void setup(){
  Serial.begin(9600);

  // BME
  if (!bme.begin(0x76)){
    Serial.print("No Connection");
    while (1)
      ;
  }
  else{
    Serial.print("Connected");
  }

  // MQTT-Server
  setup_wifi();
  client.setServer(mqtt_server, mqtt_port);
}

long currentTime, LastTime;

void loop(){

  if (!client.connected()){
    reconnect();  
  }

  client.loop();  

  client.publish("contrude/69/420/temperature", "1");
  client.publish("contrude/69/420/pressure", "1");
  client.publish("contrude/69/420/humidity", "1");
/*
client.publish("contrude/69/420/temperature", String(bme.readTemperature()).c_str());
  client.publish("contrude/69/420/pressure", String(bme.readPressure()).c_str());
  client.publish("contrude/69/420/humidity", String(bme.readHumidity()).c_str());
  */
  

  delay(1000);

  /*
    currentTime = millis();

    if(currentTime - LastTime > 1000){

      //Temperature
      Serial.print("Temperatur: ");
      Serial.print(bme.readTemperature());
      Serial.println(" °C");

      //AirPressure
      Serial.print("Luftdruck: ");
      Serial.print(bme.readPressure());
      Serial.println(" PA");

      //Humidity
      Serial.print("Luftfeuchtigkeit: ");
      Serial.print(bme.readHumidity());
      Serial.println(" %");

      LastTime = millis();
  }
  */
}

void setup_wifi(){

  WiFi.begin(ssid, password);

  while (WiFi.status() != WL_CONNECTED){
    delay(500);
  }
}

void reconnect(){
  while (!client.connected()){
    Serial.print("Attempting MQTT connection...");
    if (client.connect("ESP32Client", mqtt_username, mqtt_password)){
      Serial.println("connected");
    } else{
      Serial.print("failed, rc=");
      Serial.print(client.state());
      Serial.println(" trying again in 5 seconds");
      delay(2000);
    }
  }
}

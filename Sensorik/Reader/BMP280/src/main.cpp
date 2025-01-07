#include "Arduino.h"
#include "Wire.h"
#include "SPI.h"
#include "Adafruit_Sensor.h"
#include "Adafruit_BME280.h"
#include "PubSubClient.h"
#include "WiFi.h"
#include <Adafruit_MPU6050.h>
#include <TinyGPS++.h>


 // Define the RX and TX pins for Serial 2
#define RXD2 16
#define TXD2 17

#define GPS_BAUD 9600

// --- Constants & Credentials ---
const char *ssid = "";
const char *password = "";
const char *mqtt_server = "mqtt.contrude.eu";
const char *mqtt_username = "contrude";
const char *mqtt_password = "HaG1$Vk&62!cWv";
const int mqtt_port = 1883;

// --- Objects ---
Adafruit_BME280 bme;
Adafruit_MPU6050 mpu;
HardwareSerial gpsSerial(2);
WiFiClient espClient;
PubSubClient client(espClient);
TinyGPSPlus gps;

// --- Timing ---
unsigned long currentTime, lastTime = 0;
const unsigned long interval = 1000;

// --- Function Declarations ---
void setup_wifi();
void reconnect();
void publishSensorData();
void printBMEData();
void printMPUData();
void printGPSData();

void setup() {
  Serial.begin(9600);
// Initialize BME280 with Address 0x76

if (!bme.begin(0x76) && !bme.begin(0x77)) {
  Serial.println("Failed to initialize BME280 sensor. Check connections!");
} else {
  Serial.println("BME280 sensor initialized successfully!");
}


// Initialize MPU6050 with Address 0x68
if (!mpu.begin(0x68) && !mpu.begin(0x69)) {
  Serial.println("Failed to initialize MPU6050 sensor. Check connections!");
} else {
  Serial.println("MPU6050 sensor initialized successfully!");
   mpu.setAccelerometerRange(MPU6050_RANGE_8_G);
   mpu.setGyroRange(MPU6050_RANGE_500_DEG);
}

gpsSerial.begin(GPS_BAUD, SERIAL_8N1, RXD2, TXD2);
Serial.println("Serial 2 started at 9600 baud rate");

  // Setup WiFi and MQTT
  //setup_wifi();
  //client.setServer(mqtt_server, mqtt_port);
}

void loop() {
  /*
  if (!client.connected()) {
    reconnect();
  }
  client.loop();
  */
  
  

  currentTime = millis();
  if (currentTime - lastTime >= interval) {
    //publishSensorData();
    //printBMEData();
    //printMPUData();
    printGPSData();;
    lastTime = currentTime;
  }
}

// --- WiFi Setup ---
void setup_wifi() {
  Serial.print("Connecting to ");
  Serial.println(ssid);
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(50);
    Serial.print(".");
  }
  Serial.println("\nWiFi connected!");
}

// --- MQTT Reconnection ---
void reconnect() {
  while (!client.connected()) {
    Serial.print("Attempting MQTT connection...");
    if (client.connect("ESP32Client", mqtt_username, mqtt_password)) {
      Serial.println("connected");
    } else {
      Serial.print("failed, rc=");
      Serial.print(client.state());
      Serial.println(" retrying in 2 seconds...");
      delay(2000);
    }
  }
}

// --- Publish Sensor Data to MQTT ---
void publishSensorData() {
  client.publish("contrude/69/420/temperature", String(bme.readTemperature()).c_str());
  client.publish("contrude/69/420/pressure", String(bme.readPressure()).c_str());
  client.publish("contrude/69/420/humidity", String(bme.readHumidity()).c_str());
}

// --- Print Sensor Data to Serial Monitor ---
void printBMEData() {
  Serial.print("Temperature: ");
  Serial.print(bme.readTemperature());
  Serial.println(" °C");

  Serial.print("Pressure: ");
  Serial.print(bme.readPressure());
  Serial.println(" Pa");

  Serial.print("Humidity: ");
  Serial.print(bme.readHumidity());
  Serial.println(" %");

  Serial.println("---------------------------");
}

void printMPUData() {
  sensors_event_t a, g, temp;
  mpu.getEvent(&a, &g, &temp);


  Serial.print("Acceleration X: ");
  Serial.print(a.acceleration.x);
  Serial.print(", Y: ");
  Serial.print(a.acceleration.y);
  Serial.print(", Z: ");
  Serial.print(a.acceleration.z);
  Serial.println(" m/s^2");

  Serial.print("Rotation X: ");
  Serial.print(g.gyro.x);
  Serial.print(", Y: ");
  Serial.print(g.gyro.y);
  Serial.print(", Z: ");
  Serial.print(g.gyro.z);
  Serial.println(" rad/s");
}

void printGPSData() {
 while (gpsSerial.available() > 0) {
      gps.encode(gpsSerial.read());
    }
    if (gps.location.isUpdated()) {
      Serial.print("LAT: ");
      Serial.println(gps.location.lat(), 6);
      Serial.print("LONG: "); 
      Serial.println(gps.location.lng(), 6);
      Serial.print("SPEED (km/h) = "); 
      Serial.println(gps.speed.kmph()); 
      Serial.print("ALT (min)= "); 
      Serial.println(gps.altitude.meters());
      Serial.print("HDOP = "); 
      Serial.println(gps.hdop.value() / 100.0); 
      Serial.print("Satellites = "); 
      Serial.println(gps.satellites.value()); 
      Serial.print("Time in UTC: ");
      Serial.println(String(gps.date.year()) + "/" + String(gps.date.month()) + "/" + String(gps.date.day()) + "," + String(gps.time.hour()) + ":" + String(gps.time.minute()) + ":" + String(gps.time.second()));
      Serial.println("");
    }
  }
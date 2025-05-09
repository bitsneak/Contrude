#include "Arduino.h"
#include "Wire.h"
#include "SPI.h"
#include "Adafruit_Sensor.h"
#include "Adafruit_BME280.h"
#include "PubSubClient.h"
#include "WiFi.h"
#include "Adafruit_MPU6050.h"
#include "TinyGPS++.h"
#include "painlessMesh.h"
#include <Arduino_JSON.h>

// Define the RX and TX pins for Serial 2
#define RXD2 16
#define TXD2 17
#define GPS_BAUD 9600

// --- Constants & Credentials ---
const char *ssid = "You lost the Game";
const char *password = "Achtzehn";
const char *mqtt_server = "mqtt.contrude.eu";
const char *mqtt_username = "contrude";
const char *mqtt_password = "HaG1$Vk&62!cWv";
const char *mqtt_domain = "contrude/";
const int ship_number = 1;
const int mqtt_port = 1883;
// Number for this node and also number for the container
int nodeNumber = 1;

String mqtt_publish = String(mqtt_domain) + ship_number + "/" + nodeNumber;

// --- MESH Details ---
#define MESH_PREFIX "CONTRUDE_MESH" 
#define MESH_PORT 5555 

// --- Objects ---
Adafruit_BME280 bme;
Adafruit_MPU6050 mpu;
HardwareSerial gpsSerial(2);
WiFiClient espClient;
PubSubClient client(espClient);
TinyGPSPlus gps;

Scheduler userScheduler;
painlessMesh mesh;


// String to send to other nodes with sensor readings
String readings;

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
void initBME();
void initMPU();
void initGPS();
void checkGPS();
String getReadings();
void sendMessage();

// Create tasks: to send messages and get readings
Task taskSendMessage(TASK_SECOND * 5 , TASK_FOREVER, &sendMessage);

String getReadings() {
  JSONVar jsonReadings;
  jsonReadings["node"] = nodeNumber;
  jsonReadings["temp"] = bme.readTemperature();
  jsonReadings["hum"] = bme.readHumidity();
  jsonReadings["pres"] = bme.readPressure()/100.0F;
  readings = JSON.stringify(jsonReadings);
  return readings;
}

void sendMessage() {
  String msg = getReadings();
  mesh.sendBroadcast(msg);
}


void receivedCallback(uint32_t from, String &msg) {
  Serial.printf("Received from %u msg=%s\n", from, msg.c_str());
  JSONVar myObject = JSON.parse(msg.c_str());
  int node = myObject["node"];
  double temp = myObject["temp"];
  double hum = myObject["hum"];
  double pres = myObject["pres"];
  Serial.print("Node: ");
  Serial.println(node);
  Serial.print("Temperature: ");
  Serial.print(temp);
  Serial.println(" C");
  Serial.print("Humidity: ");
  Serial.print(hum);
  Serial.println(" %");
  Serial.print("Pressure: ");
  Serial.print(pres);
  Serial.println(" hpa");
}

void newConnectionCallback(uint32_t nodeId) {
  Serial.printf("New Connection, nodeId = %u\n", nodeId);
}

void changedConnectionCallback() {
  Serial.printf("Changed connections\n");
}

void nodeTimeAdjustedCallback(int32_t offset) {
  Serial.printf("Adjusted time %u. Offset = %d\n", mesh.getNodeTime(), offset);
}

void setup() {
  Serial.begin(115200);

  Serial.println("In Setup");

  // Setup Sensors
  initBME();
  initMPU();
  initGPS();


  // Setup WiFi and MQTT
  setup_wifi();
  client.setServer(mqtt_server, mqtt_port);
  

  //mesh.init(MESH_PREFIX, password, &userScheduler, MESH_PORT);
  //mesh.onReceive(&receivedCallback);
  //mesh.onNewConnection(&newConnectionCallback);
  //mesh.onChangedConnections(&changedConnectionCallback);
  //mesh.onNodeTimeAdjusted(&nodeTimeAdjustedCallback);

  //userScheduler.addTask(taskSendMessage);
  //taskSendMessage.enable();
}

void loop() {
  //mesh.update();

  if (!client.connected()) {
    reconnect();
  }
  client.loop();

  currentTime = millis();
  if (currentTime - lastTime >= interval) {
    publishSensorData();
    printMPUData();
    lastTime = currentTime;
  }
}


// Wifi and Server Segment

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

void publishSensorData() {
  sensors_event_t a, g, temp;
  mpu.getEvent(&a, &g, &temp);

  client.publish((String(mqtt_publish) + "/temperature").c_str(), String(bme.readTemperature()).c_str());
  client.publish((String(mqtt_publish) + "/pressure").c_str(), String(bme.readPressure()).c_str());
  client.publish((String(mqtt_publish) + "/humidity").c_str(), String(bme.readHumidity()).c_str());
  client.publish((String(mqtt_publish) + "/vibration").c_str(), String(a.acceleration.x).c_str());



}


// Initializer Segment

void initBME() {
  bme.begin(0x76);
  Serial.println("Initialized BME");
}

void initMPU() {
  mpu.begin();
  Serial.println("Initialized MPU");
}

void initGPS() {
  gpsSerial.begin(GPS_BAUD, SERIAL_8N1, RXD2, TXD2);
  Serial.println("Initialized GPS on Baudrate: " + GPS_BAUD);
}


// Debug Segment 


//void checkGPS() {
//  if (gpsSerial.available() == 0) {
//    Serial.println("No data from GPS module. Check connections.");
//  }
//}
//
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
  Serial.println(" m/s^2");
}

void printGPSData() {
  while (gpsSerial.available() > 0) {
    gps.encode(gpsSerial.read());
  }
}


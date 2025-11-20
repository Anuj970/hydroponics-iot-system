#include <WiFi.h>
#include <PubSubClient.h>
#include "ph_sensor.h"
#include "temperature_sensor.h"
#include "moisture_sensor.h"
#include "relay_controller.h"

// Wi-Fi credentials
const char* ssid = "your_SSID";
const char* password = "your_PASSWORD";

// MQTT broker details
const char* mqtt_server = "broker.hivemq.com";
const char* mqtt_topic = "hydroponics/sensorData";

WiFiClient espClient;
PubSubClient client(espClient);

// Function prototypes
void setupWiFi();
void callback(char* topic, byte* message, unsigned int length);
void reconnect();
void publishSensorData();

void setup() {
    Serial.begin(115200);
    setupWiFi();
    client.setServer(mqtt_server, 1883);
    client.setCallback(callback);
    
    // Initialize sensors and relay
    initPHSensor();
    initTemperatureSensor();
    initMoistureSensor();
    initRelayController();
}

void loop() {
    if (!client.connected()) {
        reconnect();
    }
    client.loop();
    
    publishSensorData();
    delay(5000); // Publish every 5 seconds
}

void setupWiFi() {
    delay(10);
    Serial.println();
    Serial.print("Connecting to ");
    Serial.println(ssid);
    
    WiFi.begin(ssid, password);
    while (WiFi.status() != WL_CONNECTED) {
        delay(500);
        Serial.print(".");
    }
    
    Serial.println("");
    Serial.println("WiFi connected");
    Serial.println("IP address: ");
    Serial.println(WiFi.localIP());
}

void callback(char* topic, byte* message, unsigned int length) {
    // Handle incoming messages for relay control
    String msg;
    for (int i = 0; i < length; i++) {
        msg += (char)message[i];
    }
    
    if (msg == "ON") {
        turnRelayOn();
    } else if (msg == "OFF") {
        turnRelayOff();
    }
}

void reconnect() {
    while (!client.connected()) {
        Serial.print("Attempting MQTT connection...");
        if (client.connect("HydroponicsClient")) {
            Serial.println("connected");
            client.subscribe("hydroponics/relayControl");
        } else {
            Serial.print("failed, rc=");
            Serial.print(client.state());
            Serial.println(" try again in 5 seconds");
            delay(5000);
        }
    }
}

void publishSensorData() {
    float pH = readPH();
    float temperature = readTemperature();
    float moisture = readMoisture();
    
    String payload = String("{\"pH\":") + pH + ",\"temperature\":" + temperature + ",\"moisture\":" + moisture + "}";
    client.publish(mqtt_topic, payload.c_str());
}
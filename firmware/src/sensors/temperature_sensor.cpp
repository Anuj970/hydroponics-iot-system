#include <Arduino.h>

class TemperatureSensor {
public:
    TemperatureSensor(int pin) : sensorPin(pin) {
        pinMode(sensorPin, INPUT);
    }

    float readTemperature() {
        int rawValue = analogRead(sensorPin);
        float voltage = rawValue * (5.0 / 1023.0);
        float temperature = (voltage - 0.5) * 100; // Convert voltage to temperature
        return temperature;
    }

private:
    int sensorPin;
};
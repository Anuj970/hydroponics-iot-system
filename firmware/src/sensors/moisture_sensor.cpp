#include <Arduino.h>

class MoistureSensor {
public:
    MoistureSensor(int pin) : sensorPin(pin) {
        pinMode(sensorPin, INPUT);
    }

    int readMoisture() {
        return analogRead(sensorPin);
    }

private:
    int sensorPin;
};
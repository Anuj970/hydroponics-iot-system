#include <Arduino.h>

class PHSensor {
public:
    PHSensor(int pin) : sensorPin(pin) {
        pinMode(sensorPin, INPUT);
    }

    float readPH() {
        int sensorValue = analogRead(sensorPin);
        float voltage = sensorValue * (5.0 / 1023.0);
        float phValue = 7 + ((2.5 - voltage) / 0.18);
        return phValue;
    }

private:
    int sensorPin;
};
#include <Arduino.h>

class RelayController {
public:
    RelayController(int relayPin) : relayPin(relayPin) {
        pinMode(relayPin, OUTPUT);
        digitalWrite(relayPin, LOW); // Ensure relay is off initially
    }

    void turnOn() {
        digitalWrite(relayPin, HIGH); // Turn relay on
    }

    void turnOff() {
        digitalWrite(relayPin, LOW); // Turn relay off
    }

private:
    int relayPin;
};
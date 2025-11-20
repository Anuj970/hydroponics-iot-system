# MQTT Topics for Hydroponics IoT System

## Sensor Data Topics
- **pH Readings**: `hydroponics/sensors/ph`
- **Temperature Readings**: `hydroponics/sensors/temperature`
- **Moisture Readings**: `hydroponics/sensors/moisture`

## Control Topics
- **Relay Control**: `hydroponics/relay/control`
  - **Turn On**: `hydroponics/relay/control/on`
  - **Turn Off**: `hydroponics/relay/control/off`

## Status Topics
- **Relay Status**: `hydroponics/relay/status`
- **Sensor Status**: `hydroponics/sensors/status`

## Commands
- **Request Sensor Data**: `hydroponics/sensors/request`
- **Response Sensor Data**: `hydroponics/sensors/response`
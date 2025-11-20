# Hydroponics IoT System Firmware

This firmware is designed for a hydroponics IoT system that monitors and controls environmental conditions for plant growth. The system utilizes various sensors to gather data on pH levels, temperature, and moisture content, and it can control a relay motor to manage devices such as pumps or fans.

## Project Structure

- **src/**: Contains the source code for the firmware.
  - **main.ino**: The main entry point for the firmware, responsible for initializing sensors and handling data transmission.
  - **sensors/**: Contains implementations for reading data from various sensors.
    - **ph_sensor.cpp**: Code for reading pH sensor data.
    - **temperature_sensor.cpp**: Code for reading temperature sensor data.
    - **moisture_sensor.cpp**: Code for reading moisture sensor data.
  - **relay/**: Contains the implementation for controlling the relay motor.
    - **relay_controller.cpp**: Code for managing the relay motor's state.
  - **wifi/**: Contains the configuration for Wi-Fi connectivity.
    - **wifi_config.cpp**: Code for setting up Wi-Fi connections.

## Features

- **Sensor Readings**: Continuously monitors pH, temperature, and moisture levels.
- **Relay Control**: Allows for the activation and deactivation of connected devices based on sensor readings.
- **Wi-Fi Connectivity**: Enables remote monitoring and control through an IoT platform.

## Getting Started

1. **Install the Arduino IDE**: Ensure you have the Arduino IDE installed on your machine.
2. **Open the Project**: Load the `main.ino` file in the Arduino IDE.
3. **Configure Wi-Fi**: Update the Wi-Fi configuration in `wifi_config.cpp` with your network credentials.
4. **Upload the Firmware**: Connect your microcontroller and upload the firmware using the Arduino IDE.

## Usage

Once the firmware is uploaded and running, it will begin to read sensor data and control the relay motor based on predefined conditions. You can monitor the readings and control the relay through the associated IoT platform or application.

## Contributing

Contributions are welcome! Please feel free to submit issues or pull requests to enhance the functionality of the firmware.

## License

This project is licensed under the MIT License. See the LICENSE file for more details.
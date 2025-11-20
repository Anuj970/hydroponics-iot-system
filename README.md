# Hydroponics IoT System

This project is a Hydroponics IoT system designed to monitor and control the growth environment of plants using various sensors. It collects data on pH levels, temperature, and moisture, and allows users to control a relay motor for device operation.

## Project Structure

The project is divided into three main components:

1. **Backend**: 
   - The backend is built using TypeScript and Node.js. It handles API requests, processes sensor data, and communicates with IoT devices.
   - Key files include:
     - `src/index.ts`: Entry point for the backend application.
     - `src/controllers/sensorController.ts`: Manages sensor data retrieval and relay control.
     - `src/services/sensorService.ts`: Fetches and processes sensor data.
     - `src/services/relayService.ts`: Controls the relay motor.
     - `src/models/sensorReading.ts`: Defines the structure of sensor data.

2. **Frontend**: 
   - The frontend is built using React and TypeScript. It provides a user interface for displaying sensor readings and controlling the relay.
   - Key files include:
     - `src/main.tsx`: Entry point for the frontend application.
     - `src/App.tsx`: Main application component.
     - `src/components/SensorCard.tsx`: Displays individual sensor readings.
     - `src/components/RelayToggle.tsx`: Allows users to control the relay motor.
     - `src/pages/Dashboard.tsx`: Aggregates and displays sensor data.

3. **Firmware**: 
   - The firmware is written for microcontroller platforms and manages sensor readings and relay control.
   - Key files include:
     - `src/main.ino`: Main entry point for the firmware.
     - `src/sensors/`: Contains implementations for various sensors.
     - `src/relay/relay_controller.cpp`: Controls the relay motor.
     - `src/wifi/wifi_config.cpp`: Manages Wi-Fi connectivity.

## Installation

To set up the project, clone the repository and install the necessary dependencies for both the backend and frontend:

```bash
# Clone the repository
git clone <repository-url>
cd hydroponics-iot-system

# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

## Usage

To run the backend and frontend applications, use the following commands:

```bash
# Start the backend server
cd backend
npm start

# Start the frontend application
cd ../frontend
npm start
```

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any enhancements or bug fixes.

## License

This project is licensed under the MIT License. See the LICENSE file for more details.
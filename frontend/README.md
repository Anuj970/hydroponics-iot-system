# Hydroponics IoT System Frontend

This project is a Hydroponics IoT system that monitors and controls plant health through various sensors. The frontend application is built using React and TypeScript, providing a user-friendly interface to display sensor readings and control devices.

## Project Structure

- **src/**: Contains the source code for the frontend application.
  - **components/**: Reusable components for the application.
    - **SensorCard.tsx**: Displays individual sensor readings.
    - **RelayToggle.tsx**: Allows users to control the relay motor.
  - **pages/**: Contains the main pages of the application.
    - **Dashboard.tsx**: Aggregates sensor data and displays it.
  - **hooks/**: Custom hooks for managing state and side effects.
    - **useSensorData.ts**: Fetches and manages sensor data from the backend.
  - **services/**: Contains API service functions for backend communication.
    - **api.ts**: Functions for making API calls to the backend.
  - **types/**: TypeScript types and interfaces used throughout the application.
    - **index.ts**: Exports types and interfaces.

## Getting Started

1. **Clone the repository**:
   ```
   git clone <repository-url>
   cd hydroponics-iot-system/frontend
   ```

2. **Install dependencies**:
   ```
   npm install
   ```

3. **Run the application**:
   ```
   npm start
   ```

## Features

- Real-time monitoring of plant pH, temperature, and moisture levels.
- Control relay motors to manage devices based on sensor readings.
- User-friendly dashboard for easy access to sensor data.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.

## License

This project is licensed under the MIT License. See the LICENSE file for details.
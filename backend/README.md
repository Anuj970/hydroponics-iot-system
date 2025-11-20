# Hydroponics IoT System Backend

This backend service is designed to manage and control the hydroponics IoT system. It retrieves sensor data for pH, temperature, and moisture levels, and allows for controlling a relay motor to manage device operations.

## Project Structure

- **src/**: Contains the source code for the backend application.
  - **controllers/**: Contains the logic for handling requests and responses.
  - **routes/**: Defines the API routes for the application.
  - **services/**: Contains business logic for sensor data and relay control.
  - **models/**: Defines data structures used in the application.
  - **mqtt/**: Handles MQTT communication with IoT devices.
  - **types/**: Contains TypeScript types and interfaces.

## Installation

1. Clone the repository:
   ```
   git clone <repository-url>
   ```

2. Navigate to the backend directory:
   ```
   cd hydroponics-iot-system/backend
   ```

3. Install dependencies:
   ```
   npm install
   ```

## Usage

To start the backend server, run:
```
npm start
```

The server will be available at `http://localhost:3000`.

## API Endpoints

- `GET /api/sensors`: Retrieves the current sensor readings.
- `POST /api/relay/toggle`: Toggles the state of the relay motor.

## Contributing

Contributions are welcome! Please submit a pull request or open an issue for any enhancements or bug fixes.

## License

This project is licensed under the MIT License. See the LICENSE file for details.
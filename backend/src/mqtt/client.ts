import mqtt from 'mqtt';

const MQTT_BROKER_URL = 'mqtt://your-broker-url'; // Replace with your MQTT broker URL
const TOPIC_SENSOR_DATA = 'hydroponics/sensorData';
const TOPIC_RELAY_CONTROL = 'hydroponics/relayControl';

let client: mqtt.MqttClient;

export const connectMQTT = () => {
    client = mqtt.connect(MQTT_BROKER_URL);

    client.on('connect', () => {
        console.log('Connected to MQTT broker');
        client.subscribe(TOPIC_SENSOR_DATA, (err) => {
            if (err) {
                console.error('Failed to subscribe to sensor data topic:', err);
            }
        });
    });

    client.on('message', (topic, message) => {
        if (topic === TOPIC_SENSOR_DATA) {
            const sensorData = JSON.parse(message.toString());
            console.log('Received sensor data:', sensorData);
            // Handle sensor data processing here
        }
    });

    client.on('error', (err) => {
        console.error('MQTT Client Error:', err);
    });
};

export const publishRelayCommand = (command: 'ON' | 'OFF') => {
    client.publish(TOPIC_RELAY_CONTROL, command, (err) => {
        if (err) {
            console.error('Failed to publish relay command:', err);
        } else {
            console.log(`Relay command "${command}" published`);
        }
    });
};
import mqtt from 'mqtt';
import { saveSensorDataToFirebase } from '../services/sensorService';

const client = mqtt.connect('mqtt://broker.hivemq.com:1883');

client.on('connect', () => {
  console.log('✓ Connected to MQTT broker');
  client.subscribe('sensors/#', (err) => {
    if (err) console.error('Subscribe error:', err);
    else console.log('✓ Subscribed to sensors/#');
  });
});

client.on('message', async (topic, message) => {
  console.log(`📨 MQTT Message - Topic: ${topic}, Message: ${message.toString()}`);
  
  try {
    const sensorData = JSON.parse(message.toString());
    const sensorId = topic.split('/')[1]; // Extract from: sensors/sensor_001/data
    
    console.log(`💾 Saving to Firebase - Sensor: ${sensorId}, Data:`, sensorData);
    
    // Save to Firebase
    await saveSensorDataToFirebase(sensorId, sensorData);
  } catch (error) {
    console.error('❌ Error processing MQTT message:', error);
  }
});

client.on('error', (error) => {
  console.error('❌ MQTT Error:', error);
});

export default client;
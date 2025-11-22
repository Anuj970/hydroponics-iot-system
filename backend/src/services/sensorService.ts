import { initializeApp, cert } from 'firebase-admin/app';
import { getDatabase } from 'firebase-admin/database';

// Initialize Firebase Admin (download service account key from Firebase Console)
const serviceAccount = require('../../../firebase-key.json'); // You need to download this

const firebaseApp = initializeApp({
  credential: cert(serviceAccount),
  databaseURL: "https://bloomeye-8a733-default-rtdb.firebaseio.com"
});

const database = getDatabase(firebaseApp);

export async function saveSensorDataToFirebase(sensorId: string, sensorData: any) {
  try {
    const dataRef = database.ref(`sensors/${sensorId}/readings`);
    await dataRef.push({
      value: sensorData.value,
      unit: sensorData.unit,
      timestamp: new Date().toISOString()
    });
    console.log(`✓ Data saved to Firebase for ${sensorId}`);
  } catch (error) {
    console.error('Firebase error:', error);
  }
}

export class SensorService {
    async fetchSensorData(): Promise<SensorReading> {
        // Logic to fetch data from sensors
        // This could involve making API calls to the firmware or reading from a database
    }

    processSensorData(rawData: any): SensorReading {
        // Logic to process raw sensor data into a structured format
        // This typically involves parsing and validating the data
    }
}

export interface SensorReading {
    pH: number;
    temperature: number;
    moisture: number;
}
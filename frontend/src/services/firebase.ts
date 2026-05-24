import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase, ref, onValue, set, DataSnapshot } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyDLK2SbaQlGePXZc4qhtMfq9hOeX24kyOA",
  authDomain: "bloomeye-8a733.firebaseapp.com",
  databaseURL: "https://bloomeye-8a733-default-rtdb.firebaseio.com",
  projectId: "bloomeye-8a733",
  storageBucket: "bloomeye-8a733.firebasestorage.app",
  messagingSenderId: "307937534966",
  appId: "1:307937534966:web:b0880d5e49a690d7f3ddd7",
  measurementId: "G-EHQZ55EGZD"
};

console.log('🔥 Initializing Firebase...');
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const database = getDatabase(app);
console.log('✓ Firebase initialized');

// Listen to hydro data in real-time
export function listenToHydroData(callback: (data: any) => void) {
  console.log('📍 Setting up listener for hydro data');
  
  const dataRef = ref(database, `hydro`);
  
  return onValue(
    dataRef,
    (snapshot: DataSnapshot) => {
      console.log('✓ Snapshot received:', snapshot.val());
      callback(snapshot.val());
    },
    (error) => {
      console.error('❌ Firebase error:', error);
    }
  );
}

// Listen to sensors array data in real-time
export function listenToSensorsData(callback: (data: any) => void) {
  console.log('📍 Setting up listener for sensors data');
  
  const dataRef = ref(database, `sensors`);
  
  return onValue(
    dataRef,
    (snapshot: DataSnapshot) => {
      console.log('✓ Sensors snapshot received:', snapshot.val());
      callback(snapshot.val());
    },
    (error) => {
      console.error('❌ Firebase error:', error);
    }
  );
}

// Listen to LED data in real-time
export function listenToLedData(callback: (data: any) => void) {
  const dataRef = ref(database, `led`);
  
  return onValue(
    dataRef,
    (snapshot: DataSnapshot) => {
      console.log('✓ LED data received:', snapshot.val());
      callback(snapshot.val());
    },
    (error) => {
      console.error('❌ Firebase error:', error);
    }
  );
}

// Listen to Second data in real-time
export function listenToSecondData(callback: (data: any) => void) {
  const dataRef = ref(database, `second`);
  
  return onValue(
    dataRef,
    (snapshot: DataSnapshot) => {
      console.log('✓ Second data received:', snapshot.val());
      callback(snapshot.val());
    },
    (error) => {
      console.error('❌ Firebase error:', error);
    }
  );
}

// Update LED state on Firebase
export function updateLedState(state: number) {
  const dataRef = ref(database, 'led');
  return set(dataRef, { state });
}

// Update Second state on Firebase
export function updateSecondState(state: number) {
  const dataRef = ref(database, 'second');
  return set(dataRef, { state });
}

export { app, database };
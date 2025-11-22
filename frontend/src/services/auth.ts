import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';

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

const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);

export async function signup(email: string, password: string) {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const token = await userCredential.user.getIdToken();
    localStorage.setItem('token', token);
    localStorage.setItem('role', 'user');
    return { success: true, user: userCredential.user };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function login(email: string, password: string) {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const token = await userCredential.user.getIdToken();
    localStorage.setItem('token', token);
    localStorage.setItem('role', 'user');
    return { success: true, user: userCredential.user };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function logout() {
  try {
    await signOut(auth);
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export function getToken() {
  return localStorage.getItem('token');
}

export function getRole() {
  return localStorage.getItem('role') || 'user';
}
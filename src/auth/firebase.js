import { initializeApp } from 'firebase/app'
import { getAuth, GoogleAuthProvider } from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyCfbKizsZEae_eDwy0yNqjjwqawvhgx2ac",
  authDomain: "helpdesk-311ea.firebaseapp.com",
  projectId: "helpdesk-311ea",
  storageBucket: "helpdesk-311ea.firebasestorage.app",
  messagingSenderId: "35478801966",
  appId: "1:35478801966:web:e4b3a7d1993d470b5b59bf",
  measurementId: "G-86TY0CYVEV",
}

const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const googleProvider = new GoogleAuthProvider()

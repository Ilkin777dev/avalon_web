import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"
import { getAuth } from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyBXL0hU5V3hPVXc5Ydtw3UAN0oWbMJV5OI",
  authDomain: "blog-app-e18dd.firebaseapp.com",
  projectId: "blog-app-e18dd",
  storageBucket: "blog-app-e18dd.firebasestorage.app",
  messagingSenderId: "67753309515",
  appId: "1:67753309515:web:9441f6f2fe1cc47b3aa4ce"
}

// init app
const app = initializeApp(firebaseConfig)

// services
export const db = getFirestore(app)
export const auth = getAuth(app)
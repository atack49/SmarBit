import { initializeApp, FirebaseApp } from "firebase/app";
import { getMessaging, Messaging } from "firebase/messaging";
import { isSupported } from 'firebase/messaging';

const firebaseConfig = { 
  apiKey: "AIzaSyCPfV9uaIZx4gE680VpyZoAb6Qqa5A4Tdk",
  authDomain: "myfitguide-a4968.firebaseapp.com",
  projectId: "myfitguide-a4968",
  storageBucket: "myfitguide-a4968.firebasestorage.app",
  messagingSenderId: "328415565909",
  appId: "1:328415565909:web:93b89bff42b70e22d29cdc",
};


const app: FirebaseApp = initializeApp(firebaseConfig); 

let messaging: Messaging | null = null; 

if (typeof window !== 'undefined') { 
  try {
    isSupported().then(supported => {
        if (supported) {
            messaging = getMessaging(app); 
        } else {
            console.warn("Firebase Messaging no es compatible con este navegador.");
        }
    });
  } catch (e: any) {
    console.error("Firebase Messaging Error:", e.message); 
  }
}

export { app, messaging };
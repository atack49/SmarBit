importScripts('https://www.gstatic.com/firebasejs/9.1.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.1.0/firebase-messaging-compat.js');

const firebaseConfig = {
  apiKey: "AIzaSyCPfV9uaIZx4gE680VpyZoAb6Qqa5A4Tdk",
  authDomain: "myfitguide-a4968.firebaseapp.com",
  projectId: "myfitguide-a4968",
  storageBucket: "myfitguide-a4968.firebasestorage.app",
  messagingSenderId: "328415565909",
  appId: "1:328415565909:web:93b89bff42b70e22d29cdc",
};

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();


messaging.onBackgroundMessage((payload) => {
  const notificationTitle = payload.notification?.title || 'Notificación';
  const notificationOptions = {
    body: payload.notification?.body || '',
    icon: payload.notification?.image || payload.data?.image,
    //image: payload.data?.image,       
    data: payload.data              
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});

self.addEventListener('notificationclick', (event) => {
  const clickAction = event.notification.data?.click_action || '/';
  event.notification.close();
  event.waitUntil(clients.openWindow(clickAction));
});

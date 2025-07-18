// firebase-messaging-sw.js

// Import Firebase compat SDKs
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js');

// Initialize Firebase
firebase.initializeApp({
  apiKey: "AIzaSyBQY4TRiVSg0fpfSnC9d5kfOc252lQnPHM",
  authDomain: "nkym-site.firebaseapp.com",
  projectId: "nkym-site",
  storageBucket: "nkym-site.appspot.com",
  messagingSenderId: "249204902267",
  appId: "1:249204902267:web:3e6428084f6b6d7d4e95de"
});

// Get messaging instance
const messaging = firebase.messaging();

// ❌ Completely REMOVE this to avoid duplicate notifications
// messaging.onBackgroundMessage(...);

// ✅ SINGLE notification handler using push event
self.addEventListener('push', (event) => {
  console.log('[Service Worker] Push received:', event);

  let payload = {};
  try {
    payload = event.data.json();
  } catch (e) {
    console.error('Invalid push payload JSON:', e);
    return;
  }

  const data = payload?.data || {}; // FCM wraps data under `data` field
  console.log('[Service Worker] Push data:', data);
  

  const title = data.title || 'NKYM - Ganesh Utsav';
  const options = {
    body: data.body || 'Tap to view the latest event update.',
    icon: data.icon || '/icon.png',
    badge: data.badge || '/icon.png',
    tag: data.tag || 'nkym-notification',
    data: {
      url: data.click_action || 'https://nkym.vercel.app/#events',
      ...data
    },
    actions: [
      { action: 'view', title: 'View' },
      { action: 'dismiss', title: 'Dismiss' }
    ]
  };

  event.waitUntil(
    self.registration.showNotification(title, options)
  );
});

// Handle clicks to open appropriate page
self.addEventListener('notificationclick', function(event) {
  console.log('[Service Worker] Notification click received:', event.notification);
  const urlToOpen = event.notification?.data?.url || 'https://nkym.vercel.app/#events';
  event.notification.close();

  if (event.action === 'dismiss') return;

  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then(function(clientList) {
      for (let client of clientList) {
        if (client.url === urlToOpen && 'focus' in client) {
          return client.focus();
        }
      }
      if (clients.openWindow) {
        return clients.openWindow(urlToOpen);
      }
    })
  );
});

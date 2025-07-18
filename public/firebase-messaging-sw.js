// firebase-messaging-sw.js

// Import Firebase compat SDKs
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js');

// Initialize Firebase with your config
firebase.initializeApp({
  apiKey: "AIzaSyBQY4TRiVSg0fpfSnC9d5kfOc252lQnPHM",
  authDomain: "nkym-site.firebaseapp.com",
  projectId: "nkym-site",
  storageBucket: "nkym-site.firebaseapp.com",
  messagingSenderId: "249204902267",
  appId: "1:249204902267:web:3e6428084f6b6d7d4e95de"
});

// Get messaging instance
const messaging = firebase.messaging();

// Handle background messages (show only one notification)
messaging.onBackgroundMessage(function(payload) {
  console.log('[Service Worker] onBackgroundMessage:', payload);

  // Use ONLY data payload
  const title = payload.data?.title || 'NKYM - Ganesh Utsav Update';
  const options = {
    body: payload.data?.body || 'You have a new update',
    icon: payload.data?.icon || '/icon.png',
    badge: payload.data?.badge || '/icon.png',
    tag: 'nkym-event',
    actions: [
      { action: 'view', title: 'View Event' },
      { action: 'dismiss', title: 'Dismiss' }
    ],
    data: {
      url: payload.data?.click_action || 'https://nkym.vercel.app/#events',
      ...payload.data
    }
  };

  self.registration.showNotification(title, options);
});

// (Optional) Handle push event directly for broader compatibility (e.g. site closed)
// This will use only data payload as well to avoid duplicates.
self.addEventListener('push', (event) => {
  console.log('[Service Worker] Push Received:', event);
  let data = {};
  try {
    data = event.data.json();
  } catch (e) {
    console.error('Push payload is not JSON:', e);
  }

  // Use ONLY data payload (not notification)
  const payloadData = data?.data || {};
  const title = payloadData.title || 'NKYM - Ganesh Utsav';
  const options = {
    body: payloadData.body || 'Tap to view the latest updates!',
    icon: payloadData.icon || '/icon.png',
    badge: payloadData.badge || '/icon.png',
    tag: 'nkym-push',
    data: {
      url: payloadData.click_action || 'https://nkym.vercel.app/#events',
      ...payloadData
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

// Handle notification click — open the right page/tab
self.addEventListener('notificationclick', function(event) {
  console.log('[Service Worker] Notification click received:', event.notification);
  const targetUrl = event.notification?.data?.url || 'https://nkym.vercel.app/#events';
  event.notification.close();

  if (event.action === 'dismiss') {
    return; // User dismissed the notification
  }

  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then(function(clientList) {
      for (let client of clientList) {
        if (client.url === targetUrl && 'focus' in client) {
          return client.focus();
        }
      }
      if (clients.openWindow) {
        return clients.openWindow(targetUrl);
      }
    })
  );
});

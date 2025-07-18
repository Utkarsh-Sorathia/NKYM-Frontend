// firebase-messaging-sw.js

// ✅ Import Firebase compat SDKs
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js');

// ✅ Initialize Firebase
firebase.initializeApp({
  apiKey: "AIzaSyBQY4TRiVSg0fpfSnC9d5kfOc252lQnPHM",
  authDomain: "nkym-site.firebaseapp.com",
  projectId: "nkym-site",
  storageBucket: "nkym-site.firebaseapp.com",
  messagingSenderId: "249204902267",
  appId: "1:249204902267:web:3e6428084f6b6d7d4e95de"
});

// ✅ Get messaging instance
const messaging = firebase.messaging();

// ✅ Handle background messages (sometimes works when tab in background)
messaging.onBackgroundMessage((payload) => {
  console.log('[Service Worker] onBackgroundMessage:', payload);

  const notificationTitle = payload.notification?.title || 'NKYM - Ganesh Utsav Update';
  const notificationOptions = {
    body: payload.notification?.body || 'You have a new update',
    icon: payload.notification?.icon || '/favicon.ico',
    badge: '/favicon.ico',
    tag: 'nkym-event',
    actions: [
      {
        action: 'view',
        title: 'View Event',
      },
      {
        action: 'dismiss',
        title: 'Dismiss',
      },
    ],
    data: {
      url: payload?.data?.click_action || 'https://nkym.vercel.app/#events',
      ...payload.data
    }
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});

// ✅ ALSO: Handle push manually (for site fully closed)
self.addEventListener('push', (event) => {
  console.log('[Service Worker] Push Received:', event);

  let data = {};
  try {
    data = event.data.json();
  } catch (e) {
    console.error('Push payload is not JSON:', e);
  }

  const notificationTitle = data.notification?.title || 'NKYM - Ganesh Utsav';
  const notificationOptions = {
    body: data.notification?.body || 'Tap to view the latest updates!',
    icon: data.notification?.icon || '/favicon.ico',
    badge: data.notification?.badge || '/favicon.ico',
    data: {
      url: data?.data?.click_action || 'https://nkym.vercel.app/#events',
      ...data.data,
    },
    actions: [
      {
        action: 'view',
        title: 'View',
      },
      {
        action: 'dismiss',
        title: 'Dismiss',
      },
    ],
  };

  event.waitUntil(
    self.registration.showNotification(notificationTitle, notificationOptions)
  );
});

// ✅ Handle notification click — open appropriate page
self.addEventListener('notificationclick', function (event) {
  console.log('[Service Worker] Notification click received:', event.notification);

  const targetUrl = event.notification?.data?.url || 'https://nkym.vercel.app/';

  event.notification.close();

  if (event.action === 'dismiss') {
    // User dismissed the notification — do nothing
    return;
  }

  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then(function (clientList) {
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

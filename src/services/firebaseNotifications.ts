import { initializeApp } from 'firebase/app';
import type { FirebaseApp } from 'firebase/app';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';
import type { Messaging } from 'firebase/messaging';
import { Toast } from '../Components/Toast';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_APP_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_APP_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_APP_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_FIREBASE_APP_ID
};

class FCMService {
  private static instance: FCMService;
  private app: FirebaseApp;
  private messaging: Messaging | null = null;
  private currentToken: string | null = null;

  private constructor() {
    this.app = initializeApp(firebaseConfig);
    // Initialize messaging lazily only if supported
    if (this.isNotificationSupported()) {
      try {
        this.messaging = getMessaging(this.app);
      } catch (error) {
        console.warn('Firebase Messaging not supported in this environment:', error);
      }
    }
  }

  static getInstance(): FCMService {
    if (!FCMService.instance) {
      FCMService.instance = new FCMService();
    }
    return FCMService.instance;
  }

  async requestPermissionAndGetToken(): Promise<string | null> {
    if (!this.messaging) {
      console.error('Messaging not initialized. Likely insecure context.');
      return null;
    }

    try {
      const permission = await Notification.requestPermission();
      this.storeNotificationPermissionStatus(permission);

      if (permission === 'granted') {
        const token = await getToken(this.messaging, {
          vapidKey: import.meta.env.VITE_APP_FIREBASE_VAPID_KEY
        });

        if (token) {
          this.currentToken = token;
          await this.saveTokenToServer(token);

          Toast.fire({
            icon: 'success',
            title: 'Notifications enabled successfully! 🔔'
          });

          return token;
        }
      } else {
        Toast.fire({
          icon: 'error',
          title: 'Notifications permission denied'
        });
      }

      return null;
    } catch (error) {
      console.error('Error getting FCM token:', error);
      Toast.fire({
        icon: 'error',
        title: 'Failed to enable notifications'
      });
      return null;
    }
  }

  private storeNotificationPermissionStatus(permission: NotificationPermission) {
    localStorage.setItem('notification_permission', permission);
  }

  public getStoredNotificationPermission(): NotificationPermission | null {
    return localStorage.getItem('notification_permission') as NotificationPermission | null;
  }

  private async saveTokenToServer(token: string) {
    try {
      await fetch(`${import.meta.env.VITE_APP_BACKEND_URL}/notifications/save-token`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          token,
          userId: this.getUserId()
        }),
      });
    } catch (error) {
      console.error('Error saving token to server:', error);
    }
  }

  private getUserId(): string {
    let userId = localStorage.getItem('nkym_user_id');
    if (!userId) {
      userId = `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      localStorage.setItem('nkym_user_id', userId);
    }
    return userId;
  }

  setupForegroundMessageListener() {
    if (!this.messaging) return;

    onMessage(this.messaging, (payload) => {
      console.log('💬 Foreground message received:', payload);

      const { data } = payload;
      const title = data?.title || 'NKYM Notification';
      const body = data?.body || 'You have a new update';

      Toast.fire({
        icon: 'info',
        title: title,
        text: body,
        showConfirmButton: true,
        confirmButtonText: 'View Event'
      }).then((result) => {
        if (result.isConfirmed && data?.action === 'view_event') {
          document.getElementById('events')?.scrollIntoView({ behavior: 'smooth' });
        }
      });
    });
  }

  getCurrentToken(): string | null {
    return this.currentToken;
  }

  isNotificationSupported(): boolean {
    return typeof window !== 'undefined' && 
           'serviceWorker' in navigator && 
           'Notification' in window &&
           'requestPermission' in Notification;
  }

  hasUserMadeNotificationChoice(): boolean {
    return this.getStoredNotificationPermission() !== null;
  }
}

export const fcmService = FCMService.getInstance();

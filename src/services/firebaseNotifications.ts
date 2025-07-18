import { initializeApp } from 'firebase/app';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';
import { Toast } from '../Components/Toast';

// Use your existing Firebase config
const firebaseConfig = {
  apiKey: import.meta.env.VITE_APP_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_APP_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_APP_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_FIREBASE_APP_ID
};

const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

class FCMService {
  private static instance: FCMService;
  private currentToken: string | null = null;
  
  private constructor() {}
  
  static getInstance(): FCMService {
    if (!FCMService.instance) {
      FCMService.instance = new FCMService();
    }
    return FCMService.instance;
  }

  async requestPermissionAndGetToken(): Promise<string | null> {
    try {
      const permission = await Notification.requestPermission();
      
      if (permission === 'granted') {
        const token = await getToken(messaging, {
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
    onMessage(messaging, (payload) => {
      console.log('Foreground message received:', payload);
      
      const { notification, data } = payload;
      
      if (notification) {
        Toast.fire({
          icon: 'info',
          title: notification.title || 'NKYM Notification',
          text: notification.body || 'You have a new notification',
          showConfirmButton: true,
          confirmButtonText: 'View Event'
        }).then((result) => {
          if (result.isConfirmed && data?.action === 'view_event') {
            document.getElementById('events')?.scrollIntoView({ behavior: 'smooth' });
          }
        });
      }
    });
  }

  getCurrentToken(): string | null {
    return this.currentToken;
  }

  isNotificationSupported(): boolean {
    return 'serviceWorker' in navigator && 'Notification' in window;
  }
}

export const fcmService = FCMService.getInstance();

import React, { useState, useEffect } from 'react';
import { FaBell, FaCheckCircle } from 'react-icons/fa';
import { fcmService } from '../services/firebaseNotifications';

const NotificationManager: React.FC = () => {
  const [isSupported, setIsSupported] = useState(false);
  const [isEnabled, setIsEnabled] = useState(false);
  const [permission, setPermission] = useState<NotificationPermission>('default');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Check if notifications are supported
    setIsSupported(fcmService.isNotificationSupported());
    setPermission(Notification.permission);
    
    // Check if already enabled
    const hasToken = fcmService.getCurrentToken();
    setIsEnabled(Notification.permission === 'granted' && !!hasToken);
    
    // Setup foreground message listener
    fcmService.setupForegroundMessageListener();
  }, []);

  const handleEnableNotifications = async () => {
    setLoading(true);
    try {
      const token = await fcmService.requestPermissionAndGetToken();
      if (token) {
        setIsEnabled(true);
        setPermission('granted');
      }
    } catch (error) {
      console.error('Error enabling notifications:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!isSupported) {
    return (
      <div className="notification-manager bg-red-50 p-4 rounded-lg border border-red-200">
        <p className="text-red-700 text-sm">
          🚫 Your browser doesn't support push notifications
        </p>
      </div>
    );
  }

  return (
    <div className="notification-manager bg-gradient-to-r from-orange-50 to-red-50 p-6 rounded-lg shadow-md border border-orange-200">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-orange-100 rounded-full">
            {isEnabled ? (
              <FaCheckCircle className="text-green-500 text-xl" />
            ) : (
              <FaBell className="text-orange-500 text-xl" />
            )}
          </div>
          <div>
            <h3 className="font-semibold text-gray-800">
              {isEnabled ? 'Notifications Active' : 'Stay Updated'}
            </h3>
            <p className="text-sm text-gray-600">
              {isEnabled 
                ? 'You\'ll receive notifications about new Ganesh Utsav events'
                : 'Get notified about new events and updates'
              }
            </p>
          </div>
        </div>
        
        {!isEnabled && (
          <button
            onClick={handleEnableNotifications}
            disabled={loading}
            className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
          >
            {loading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                <span>Enabling...</span>
              </>
            ) : (
              <>
                <FaBell />
                <span>Enable Notifications</span>
              </>
            )}
          </button>
        )}
      </div>
      
      {permission === 'denied' && (
        <div className="mt-4 p-3 bg-red-100 border border-red-300 rounded-lg">
          <p className="text-red-700 text-sm">
            ⚠️ Notifications are blocked. Please enable them in your browser settings to receive updates.
          </p>
        </div>
      )}
    </div>
  );
};

export default NotificationManager;

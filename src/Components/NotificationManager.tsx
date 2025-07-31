import React, { useState, useEffect } from 'react';
import { FaBell } from 'react-icons/fa';
import { fcmService } from '../services/firebaseNotifications';

const NotificationManager: React.FC = () => {
  const [isSupported, setIsSupported] = useState(false);
  const [isEnabled, setIsEnabled] = useState(false);
  const [permission, setPermission] = useState<NotificationPermission>('default');
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const init = async () => {
      const supported = fcmService.isNotificationSupported();
      setIsSupported(supported);

      // Get permission from localStorage instead of checking Notification.permission directly
      const storedPermission = fcmService.getStoredNotificationPermission();
      setPermission(storedPermission || Notification.permission);

      const currentToken = await fcmService.getCurrentToken();
      const isGranted = storedPermission === 'granted' && !!currentToken;
      setIsEnabled(isGranted);

      fcmService.setupForegroundMessageListener();

      // Only show modal if notifications aren't enabled and the user hasn't already made a choice
      if (supported && !isGranted && storedPermission !== 'denied') {
        setTimeout(() => {
          setShowModal(true);
        }, 2500);
      }
    };

    init();
  }, []);

  const handleEnableNotifications = async () => {
    setShowModal(false); // Close the modal immediately
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

  // Don't render at all if permission is denied or already granted
  if (!isSupported || isEnabled || permission === 'denied') return null;

  return (
    <>
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm"></div>
          <div className="relative z-10 bg-white max-w-sm w-full mx-4 p-6 rounded-lg shadow-lg border border-orange-200">
            <div className="flex items-center space-x-3 mb-4">
              <div className="p-2 bg-orange-100 rounded-full">
                <FaBell className="text-orange-500 text-xl" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">Stay Updated</h3>
                <p className="text-sm text-gray-600">
                  Get notified about new events and updates.
                </p>
              </div>
            </div>
            <button
              onClick={handleEnableNotifications}
              disabled={loading}
              className="w-full bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center space-x-2"
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
          </div>
        </div>
      )}
    </>
  );
};

export default NotificationManager;

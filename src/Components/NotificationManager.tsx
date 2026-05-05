import React, { useState, useEffect } from 'react';
import { FaBell, FaXmark } from 'react-icons/fa6';
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

      const storedPermission = fcmService.getStoredNotificationPermission();
      setPermission(storedPermission || Notification.permission);

      const currentToken = await fcmService.getCurrentToken();
      const isGranted = storedPermission === 'granted' && !!currentToken;
      setIsEnabled(isGranted);

      fcmService.setupForegroundMessageListener();

      if (supported && !isGranted && storedPermission !== 'denied') {
        setTimeout(() => {
          setShowModal(true);
        }, 2500);
      }
    };

    init();
  }, []);

  const handleEnableNotifications = async () => {
    setLoading(true);
    try {
      const token = await fcmService.requestPermissionAndGetToken();
      if (token) {
        setIsEnabled(true);
        setPermission('granted');
        setShowModal(false);
      }
    } catch (error) {
      console.error('Error enabling notifications:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setShowModal(false);
  };

  if (!isSupported || isEnabled || permission === 'denied') return null;

  return (
    <>
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={handleClose}
          ></div>
          <div className="relative z-10 bg-white max-w-sm w-full p-6 rounded-2xl shadow-2xl border border-orange-100 transition-all duration-300">
            {/* Close Button */}
            <button 
              onClick={handleClose}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
              aria-label="Close"
            >
              <FaXmark size={20} />
            </button>

            <div className="flex items-center space-x-4 mb-6">
              <div className="p-3 bg-orange-100 rounded-xl">
                <FaBell className="text-orange-500 text-2xl" />
              </div>
              <div>
                <h3 className="font-bold text-lg text-gray-800">Stay Updated</h3>
                <p className="text-sm text-gray-600">
                  Get real-time updates about Ganesh Utsav events.
                </p>
              </div>
            </div>

            <button
              onClick={handleEnableNotifications}
              disabled={loading}
              className="w-full bg-orange-500 text-white font-semibold px-4 py-3 rounded-xl hover:bg-orange-600 transition-all shadow-lg shadow-orange-500/30 disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center space-x-2"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
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

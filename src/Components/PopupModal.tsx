import { useEffect, useState } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { FaXmark, FaChevronLeft, FaChevronRight } from "react-icons/fa6";

interface PopupItem {
  id: string;
  mediaUrl: string;
  mediaType: 'image' | 'video';
  createdAt: { _seconds: number };
  isEnabled: boolean;
}

const PopupModal: React.FC = () => {
  const [popupItems, setPopupItems] = useState<PopupItem[]>([]);
  const [visible, setVisible] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_APP_BACKEND_URL}/api/popup-content`)
      .then((res) => {
        const enabledItems = res.data.filter((item: any) => item.isEnabled === true);
        setPopupItems(enabledItems);
      })
      .catch((err) => console.error('Error fetching popup data', err));
  }, []);

  useEffect(() => {
    if (popupItems.length > 0) {
      const timeout = setTimeout(() => {
        setVisible(true);
      }, 5000); // 5 seconds delay
      return () => clearTimeout(timeout);
    }
  }, [popupItems]);

  if (popupItems.length === 0) return null;

  const current = popupItems[currentIndex];

  const handlePrev = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setCurrentIndex((prev) => (prev - 1 + popupItems.length) % popupItems.length);
  };

  const handleNext = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setCurrentIndex((prev) => (prev + 1) % popupItems.length);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-9999 flex items-center justify-center bg-black/90 backdrop-blur-md px-4"
          onClick={() => setVisible(false)}
        >
          {/* Close Button */}
          <button
            className="absolute top-6 right-6 text-white hover:text-amber-500 transition-colors z-10000"
            onClick={() => setVisible(false)}
          >
            <FaXmark size={32} />
          </button>

          {/* Navigation Buttons */}
          {popupItems.length > 1 && (
            <>
              <button
                className="absolute left-4 p-2 text-white/50 hover:text-white transition-colors z-10000 hidden sm:block"
                onClick={handlePrev}
              >
                <FaChevronLeft size={48} />
              </button>

              <button
                className="absolute right-4 p-2 text-white/50 hover:text-white transition-colors z-10000 hidden sm:block"
                onClick={handleNext}
              >
                <FaChevronRight size={48} />
              </button>
            </>
          )}

          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="relative max-w-4xl w-full flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Media Content */}
            <div className="w-full overflow-hidden rounded-lg flex items-center justify-center relative shadow-2xl">
              {current.mediaType === 'image' ? (
                <img
                  src={current.mediaUrl}
                  alt="Special Announcement"
                  className="max-h-[75vh] w-auto object-contain rounded-lg"
                />
              ) : (
                <video
                  controls
                  autoPlay
                  className="max-h-[75vh] w-auto object-contain rounded-lg"
                  src={current.mediaUrl}
                />
              )}
            </div>

            {/* Pagination dots */}
            {popupItems.length > 1 && (
              <div className="flex justify-center gap-3 mt-8">
                {popupItems.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentIndex(i)}
                    className={`h-2.5 w-2.5 rounded-full transition-all duration-300 ${i === currentIndex
                      ? 'bg-amber-500 scale-125'
                      : 'bg-white/30 hover:bg-white/50'
                      }`}
                  />
                ))}
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PopupModal;

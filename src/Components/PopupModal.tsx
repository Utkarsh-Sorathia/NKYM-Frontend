import { useEffect, useState } from 'react';
import axios from 'axios';

interface PopupItem {
    id: string;
    mediaUrl: string;
    mediaType: 'image' | 'video';
}

const PopupModal: React.FC = () => {
    const [popupItems, setPopupItems] = useState<PopupItem[]>([]);
    const [visible, setVisible] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        axios
            .get(`${import.meta.env.VITE_APP_BACKEND_URL}/api/popup-content`)
            .then((res) => {
                setPopupItems(res.data);
            })
            .catch((err) => console.error('Error fetching popup data', err));
    }, []);

    useEffect(() => {
        if (popupItems.length > 0) {
            const timeout = setTimeout(() => {
                setVisible(true);
            }, 7000); // 7 seconds
            return () => clearTimeout(timeout);
        }
    }, [popupItems]);

    if (!visible || popupItems.length === 0) return null;

    const current = popupItems[currentIndex];

    return (
        <div
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[999] flex items-center justify-center p-4"
            onClick={() => setVisible(false)}
        >
            <div className="relative bg-white p-4 rounded-xl shadow-lg w-full max-w-md sm:max-w-xl max-h-[70vh]">
                <button
                    onClick={() => setVisible(false)}
                    className="absolute top-3 right-3 bg-white text-black font-bold text-lg rounded-full w-8 h-8 flex items-center justify-center shadow hover:bg-red-100 z-20"
                    aria-label="Close popup"
                >
                    ✕
                </button>

                <div className="w-full h-[60vh] sm:h-[70vh] overflow-hidden rounded-md flex items-center justify-center">
                    {current.mediaType === 'image' ? (
                        <img
                            src={current.mediaUrl}
                            alt="popup"
                            className="max-h-full max-w-full object-contain"
                        />
                    ) : (
                        <video
                            controls
                            autoPlay
                            muted
                            className="max-h-full max-w-full object-contain"
                            src={current.mediaUrl}
                        />
                    )}
                </div>

                {popupItems.length > 1 && current.mediaType === 'image' && (
                    <div className="flex justify-center gap-2 mt-3">
                        {popupItems.map((_, i) => (
                            <span
                                key={i}
                                onClick={() => setCurrentIndex(i)}
                                className={`h-2 w-2 rounded-full cursor-pointer transition-all ${i === currentIndex ? 'bg-black scale-110' : 'bg-gray-300'
                                    }`}
                            />
                        ))}
                    </div>
                )}
            </div>

        </div>
    );

};

export default PopupModal;

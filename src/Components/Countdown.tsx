import { useEffect, useState } from 'react';

const targetDate = new Date('August 27, 2025 00:00:00').getTime();

const Countdown: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0, hours: 0, minutes: 0, seconds: 0, finished: false
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const now = Date.now();
      const distance = targetDate - now;
      if (distance <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, finished: true });
        clearInterval(interval);
      } else {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000),
          finished: false
        });
      }
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  if (timeLeft.finished) {
    return (
      <div className="p-8 text-center">
        <span className="text-3xl font-extrabold text-amber-700 animate-pulse">
          🪔 Happy Ganesh Chaturthi! 🐘
        </span>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto px-4">
      <h3 className="text-xl font-semibold mb-6 text-amber-800 text-center">
        Countdown to Ganesh Chaturthi 2025
      </h3>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: 'Days', value: timeLeft.days },
          { label: 'Hours', value: timeLeft.hours },
          { label: 'Minutes', value: timeLeft.minutes },
          { label: 'Seconds', value: timeLeft.seconds }
        ].map((item, index) => (
          <div
            key={index}
            className="countdown-box rounded-lg p-4 text-center border border-white border-opacity-20 backdrop-blur-sm shadow-sm"
          >
            <div className="text-3xl font-bold text-white select-none">
              {String(item.value).padStart(2, '0')}
            </div>
            <div className="text-sm text-white mt-1 select-none">{item.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Countdown;

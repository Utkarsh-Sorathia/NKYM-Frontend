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
      <div className="countdown-box p-6 inline-block">
        <span className="text-2xl font-bold text-amber-600">Happy Ganesh Chaturthi!</span>
      </div>
    );
  }

  return (
    <div className="countdown-box p-6 inline-block">
      <h3 className="text-xl mb-4">Countdown to Ganesh Chaturthi 2025</h3>
      <div className="flex justify-center space-x-4">
        <div className="text-center">
          <div className="text-4xl font-bold">{String(timeLeft.days).padStart(2, '0')}</div>
          <div className="text-sm">Days</div>
        </div>
        <div className="text-center">
          <div className="text-4xl font-bold">{String(timeLeft.hours).padStart(2, '0')}</div>
          <div className="text-sm">Hours</div>
        </div>
        <div className="text-center">
          <div className="text-4xl font-bold">{String(timeLeft.minutes).padStart(2, '0')}</div>
          <div className="text-sm">Minutes</div>
        </div>
        <div className="text-center">
          <div className="text-4xl font-bold">{String(timeLeft.seconds).padStart(2, '0')}</div>
          <div className="text-sm">Seconds</div>
        </div>
      </div>
    </div>
  );
};

export default Countdown;

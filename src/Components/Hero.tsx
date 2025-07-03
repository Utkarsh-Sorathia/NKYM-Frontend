import { useEffect, useRef } from 'react';
import Countdown from './Countdown';
import ParticlesBackground from "./ParticlesBackground";

const Hero: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.7;
    }
  }, []);

  return (
    <section
      id="home"
      className="relative w-full min-h-screen flex items-center justify-center text-black overflow-hidden"
    >
      <div className="absolute top-0 left-0 w-full h-full z-0">
        <ParticlesBackground />
      </div>

      <div className="relative z-10 w-full px-4 text-center text-neutral-800">
        <h2
          className="text-4xl md:text-6xl font-bold mb-4 font-tangerine animate-fade-in-down"
          style={{ animationDelay: "0.3s" }}
        >
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-600 drop-shadow-md">
            Natkhat Kanudo Yuvak Mandal
          </span>
        </h2>

        <h1
          className="text-5xl md:text-8xl font-bold mb-6 font-tangerine animate-zoom-in"
          style={{ animationDelay: "0.6s" }}
        >
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 via-orange-500 to-yellow-400 drop-shadow-lg">
            Ganpati Bappa Morya!
          </span>
        </h1>

        <p
          className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto text-gray-700 animate-fade-in-down"
          style={{ animationDelay: "0.9s" }}
        >
          Welcoming Lord Ganesha with devotion and celebrating the festival
          with grandeur and cultural events.
        </p>

        <div className="mb-10 animate-fade-in-down" style={{ animationDelay: "1.2s" }}>
          <Countdown />
        </div>
      </div>
    </section>
  );
};

export default Hero;

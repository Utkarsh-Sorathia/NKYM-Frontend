import { motion } from 'framer-motion';
import Countdown from './Countdown';

const heroBgUrl =
  "https://res.cloudinary.com/dmah604pw/image/upload/v1751955568/Gallery-nkym/txhmwdtkpdbcfnoc39v0.jpg";

const Hero: React.FC = () => {
  return (
    <section
      id="home"
      className="relative w-full min-h-screen flex items-center justify-center text-black overflow-hidden"
      style={{
        backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.1)), url('${heroBgUrl}')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      <div className="relative z-10 w-full px-4 text-center text-white">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-4xl md:text-6xl font-bold mb-4 font-tangerine"
        >
          <span className="text-transparent bg-clip-text bg-linear-to-r from-orange-500 to-red-600 drop-shadow-md">
            Natkhat Kanudo Yuvak Mandal
          </span>
        </motion.h2>

        <motion.h1
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1, delay: 0.6, type: "spring" }}
          className="text-5xl md:text-8xl font-bold mb-6 font-tangerine"
        >
          <span className="text-transparent bg-clip-text bg-linear-to-r from-red-600 via-orange-500 to-yellow-400 drop-shadow-lg">
            Ganpati Bappa Morya!
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto text-gray-200"
        >
          Welcoming Lord Ganesha with devotion and celebrating the festival
          with grandeur and cultural events.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="mb-10"
        >
          <Countdown />
        </motion.div>
      </div>
      <div className="absolute inset-0 bg-black opacity-60 md:opacity-0 pointer-events-none"></div>
    </section>
  );
};

export default Hero;

import { motion } from 'framer-motion';
import Countdown from './Countdown';

const heroBgUrl =
  "https://res.cloudinary.com/dmah604pw/image/upload/v1751955568/Gallery-nkym/txhmwdtkpdbcfnoc39v0.jpg";

const Hero: React.FC = () => {
  return (
    <section
      id="home"
      className="relative w-full min-h-screen flex items-center justify-center text-white overflow-hidden bg-black"
    >
      {/* Background Image with Zoom Animation */}
      <motion.div 
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 10, repeat: Infinity, repeatType: "reverse", ease: "linear" }}
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url('${heroBgUrl}')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
        }}
      />

      {/* Modern Overlay - Darker and with a vignette effect */}
      <div className="absolute inset-0 z-0 bg-linear-to-b from-black/70 via-black/40 to-black/70 pointer-events-none" />
      <div className="absolute inset-0 z-0 bg-radial-gradient from-transparent via-transparent to-black/60 pointer-events-none" />

      <div className="relative z-10 w-full px-4 text-center pt-28 pb-20 md:pt-0 md:pb-12">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-4xl md:text-6xl font-bold mb-4 font-tangerine"
        >
          <span className="text-transparent bg-clip-text bg-linear-to-r from-orange-400 to-amber-500 filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
            Natkhat Kanudo Yuvak Mandal
          </span>
        </motion.h2>

        <motion.h1
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1, delay: 0.6, type: "spring" }}
          className="text-4xl md:text-6xl font-bold mb-6 font-tangerine"
        >
          <span className="text-transparent bg-clip-text bg-linear-to-r from-red-500 via-orange-400 to-yellow-300 filter drop-shadow-[0_4px_8_rgba(0,0,0,0.9)]">
            Ganpati Bappa Morya
          </span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="max-w-5xl mx-auto px-6 mb-10"
        >
          <p className="text-xl md:text-2xl leading-relaxed text-gray-100 font-medium tracking-wide drop-shadow-md">
            Join Natkhat Kanudo Yuvak Mandal in Surat as we celebrate the divine arrival of Lord Ganesha with grand devotion, vibrant cultural traditions, and community joy since 2017.
          </p>
        </motion.div>

        {/* Separator Line */}
        <motion.div
          initial={{ width: 0, opacity: 0 }}
          animate={{ width: "240px", opacity: 1 }}
          transition={{ duration: 1, delay: 1.1 }}
          className="h-1 bg-amber-500 mx-auto mb-10 rounded-full shadow-lg shadow-amber-500/50"
        />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="flex flex-col items-center"
        >
          <p className="text-xl md:text-2xl font-medium text-amber-200 mb-8 tracking-widest uppercase drop-shadow-md">
            Celebrating the arrival of Bappa
          </p>
          <Countdown />
        </motion.div>
      </div>
      <div className="absolute inset-0 bg-black opacity-60 md:opacity-0 pointer-events-none"></div>
    </section>
  );
};

export default Hero;

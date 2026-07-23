import { motion } from 'framer-motion';
import { FaChevronDown } from 'react-icons/fa6';
import Countdown from './Countdown';
import ParticlesBackground from './ParticlesBackground';
import AnniversaryMedallion from './AnniversaryMedallion';
import { optimizeCloudinaryUrl } from '../utils/cloudinary';

const heroBgUrl = optimizeCloudinaryUrl(
  "https://res.cloudinary.com/dmah604pw/image/upload/v1751955568/Gallery-nkym/txhmwdtkpdbcfnoc39v0.jpg",
  1920
);

const scrollToGallery = () => {
  document.getElementById('gallery')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
};

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

      {/* Ambient sparkle layer, between the photo/scrim and the readable content */}
      <ParticlesBackground />

      <div className="relative z-10 w-full px-4 text-center pt-20 pb-8 md:pt-0 md:pb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="max-w-4xl mx-auto rounded-3xl bg-black/30 backdrop-blur-[2px] px-4 py-4 md:px-12 md:py-10"
        >
          <AnniversaryMedallion />

          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-xl md:text-6xl font-bold mb-1 md:mb-4 font-display"
          >
            <span className="text-transparent bg-clip-text bg-linear-to-r from-gold-300 to-gold-500 filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
              Natkhat Kanudo Yuvak Mandal
            </span>
          </motion.h2>

          <motion.h1
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1, delay: 0.5, type: "spring" }}
            className="text-2xl md:text-6xl font-bold mb-2 md:mb-6 font-display text-gold-100 drop-shadow-[0_2px_6px_rgba(0,0,0,0.85)]"
          >
            Ganpati Bappa Morya
          </motion.h1>

          <p className="text-xs md:text-2xl leading-snug md:leading-relaxed text-gray-100 font-medium tracking-wide drop-shadow-md">
            Join Natkhat Kanudo Yuvak Mandal in Surat as we celebrate the divine arrival of Lord Ganesha with grand devotion, vibrant cultural traditions, and community joy since 2017.
          </p>

          {/* Separator Line */}
          <motion.div
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: "180px", opacity: 1 }}
            transition={{ duration: 1, delay: 0.9 }}
            className="h-1 bg-gold-500 mx-auto my-2 md:my-6 rounded-full shadow-lg shadow-gold-900/50"
          />

          <motion.button
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.1 }}
            onClick={scrollToGallery}
            className="inline-flex items-center gap-2 rounded-full bg-gold-500 hover:bg-gold-600 text-maroon-950 font-display font-semibold text-xs md:text-base px-4 py-1.5 md:px-8 md:py-3 shadow-lg shadow-gold-900/30 transition-colors"
          >
            Explore 10 Years of Memories
            <FaChevronDown />
          </motion.button>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.3 }}
            className="flex flex-col items-center mt-3 md:mt-8"
          >
            <p className="text-xs md:text-xl font-medium text-gold-200 mb-2 md:mb-6 tracking-widest uppercase drop-shadow-md">
              Celebrating the arrival of Bappa
            </p>
            <Countdown />
          </motion.div>
        </motion.div>
      </div>
      <div className="absolute inset-0 bg-black opacity-60 md:opacity-0 pointer-events-none"></div>
    </section>
  );
};

export default Hero;

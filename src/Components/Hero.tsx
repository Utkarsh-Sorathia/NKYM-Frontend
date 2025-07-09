import Countdown from './Countdown';
// import ParticlesBackground from "./ParticlesBackground";

const heroBgUrl =
  "https://res.cloudinary.com/dmah604pw/image/upload/v1751955568/Gallery-nkym/txhmwdtkpdbcfnoc39v0.jpg";

const Hero: React.FC = () => {
  return (
    <section
      id="home"
      className="relative w-full min-h-screen flex items-center justify-center text-black overflow-hidden"
      style={{
        backgroundImage: `linear-gradient(rgba(0,0,0,0.1), rgba(0,0,0,0.1)), url('${heroBgUrl}')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      {/* <div className="absolute top-0 left-0 w-full h-full z-0">
        <ParticlesBackground />
      </div> */}

      <div className="relative z-10 w-full px-4 text-center text-white">
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
          className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto text-gray-200 animate-fade-in-down"
          style={{ animationDelay: "0.9s" }}
        >
          Welcoming Lord Ganesha with devotion and celebrating the festival
          with grandeur and cultural events.
        </p>

        <div className="mb-10 animate-fade-in-down" style={{ animationDelay: "1.2s" }}>
          <Countdown />
        </div>
      </div>
      {/* Optional: extra overlay for mobile */}
      <div className="absolute inset-0 bg-black opacity-60 md:opacity-0 pointer-events-none"></div>
    </section>
  );
};

export default Hero;

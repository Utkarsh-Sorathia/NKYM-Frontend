import Countdown from './Countdown';

const Hero: React.FC = () => (
  <section id="home" className="hero-section min-h-screen flex items-center justify-center text-black relative">
    <div className="container mx-auto px-4 text-center">
      <h2 className="text-4xl md:text-6xl font-bold mb-4 font-tangerine">
        Natkhat Kanudo Yuvak Mandal
      </h2>
      <h1 className="text-5xl md:text-8xl font-bold mb-6 font-tangerine">
        Ganpati Bappa Morya!
      </h1>
      <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
        Welcoming Lord Ganesha with devotion and celebrating the festival with grandeur and cultural events.
      </p>
      <Countdown />
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2">
        <a href="#about" className="text-white text-4xl animate-bounce">
          <i className="fas fa-chevron-down"></i>
        </a>
      </div>
    </div>
  </section>
);

export default Hero;

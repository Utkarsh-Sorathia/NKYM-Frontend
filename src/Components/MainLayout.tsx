// src/Components/MainLayout.tsx
import Header from './Header';
import Hero from './Hero';
import About from './About';
import Gallery from './Gallery';
import Events from './Events';
import Footer from './Footer';
import BackToTop from './BackToTop';

const MainLayout = () => (
  <div className="font-poppins bg-amber-50 text-gray-800">
    <Header />
    <Hero />
    <About />
    <Gallery />
    <Events />
    <Footer />
    <BackToTop />
  </div>
);

export default MainLayout;

import { Helmet } from 'react-helmet';
import Header from './Header';
import Hero from './Hero';
import About from './About';
import Gallery from './Gallery';
import Events from './Events';
import Footer from './Footer';
import BackToTop from './BackToTop';

const MainLayout = () => (
  <div className="font-poppins bg-amber-50 text-gray-800">
    <Helmet>
      <title>Natkhat Kanudo Yuvak Mandal | Celebrating Ganesh Chaturthi</title>
      <meta name="description" content="Join Natkhat Kanudo Yuvak Mandal in celebrating Ganesh Chaturthi with devotion, community, and cultural events." />
      <meta name="keywords" content="Natkhat Kanudo Yuvak Mandal, Ganesh Chaturthi, community, devotion, festival, Mumbai" />
      <meta property="og:title" content="Natkhat Kanudo Yuvak Mandal | Celebrating Ganesh Chaturthi" />
      <meta property="og:description" content="Join Natkhat Kanudo Yuvak Mandal in celebrating Ganesh Chaturthi with devotion, community, and cultural events." />
      <meta property="og:type" content="website" />
      <meta property="og:image" content="https://nkym.vercel.app/icon.png" />
      <meta property="og:url" content="https://nkym.vercel.app" />
    </Helmet>
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

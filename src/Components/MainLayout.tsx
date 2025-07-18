import { Helmet } from 'react-helmet';
import { useEffect, useState } from "react";
import Header from './Header';
import Hero from './Hero';
import About from './About';
import Gallery from './Gallery';
import Events from './Events';
import Footer from './Footer';
import BackToTop from './BackToTop';
import NotificationManager from './NotificationManager';

type SectionKey = 'home' | 'about' | 'gallery' | 'events';

const sectionSEO: Record<SectionKey, {
  title: string;
  description: string;
  ogImage: string;
  ogUrl: string;
}> = {
  home: {
    title: "Natkhat Kanudo Yuvak Mandal",
    description: "Welcome to Natkhat Kanudo Yuvak Mandal. Celebrating Ganesh Chaturthi with devotion and joy.",
    ogImage: "https://nkym.vercel.app/icon.png",
    ogUrl: "https://nkym.vercel.app/",
  },
  about: {
    title: "About | Natkhat Kanudo Yuvak Mandal",
    description: "Learn about our journey and community spirit since 2016.",
    ogImage: "https://nkym.vercel.app/icon.png",
    ogUrl: "https://nkym.vercel.app/#about",
  },
  gallery: {
    title: "Gallery | Natkhat Kanudo Yuvak Mandal",
    description: "Memories from our previous celebrations and events.",
    ogImage: "https://nkym.vercel.app/icon.png",
    ogUrl: "https://nkym.vercel.app/#gallery",
  },
  events: {
    title: "Events | Natkhat Kanudo Yuvak Mandal",
    description: "Mark your calendars for these special moments during Ganesh Utsav!",
    ogImage: "https://nkym.vercel.app/icon.png",
    ogUrl: "https://nkym.vercel.app/#events",
  },
};

const sectionKeys: SectionKey[] = ["home", "about", "gallery", "events"];

const MainLayout = () => {
  const [activeSection, setActiveSection] = useState<SectionKey>('home');

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll<HTMLElement>("section[id]");
      let currentSection: SectionKey = "home";
      let minOffset = Infinity;

      sections.forEach((section) => {
        const id = section.id;
        if (sectionKeys.includes(id as SectionKey)) {
          const rect = section.getBoundingClientRect();
          if (rect.top >= -100 && rect.top < minOffset) {
            minOffset = rect.top;
            currentSection = id as SectionKey;
          }
        }
      });

      setActiveSection(currentSection);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const seo = sectionSEO[activeSection];

  return (
    <>
      <Helmet>
        <title>{seo.title}</title>
        <meta name="description" content={seo.description} />
        <meta property="og:title" content={seo.title} />
        <meta property="og:description" content={seo.description} />
        <meta property="og:image" content={seo.ogImage} />
        <meta property="og:url" content={seo.ogUrl} />
        <meta property="og:type" content="website" />
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={seo.title} />
        <meta name="twitter:description" content={seo.description} />
        <meta name="twitter:image" content={seo.ogImage} />
      </Helmet>
      <Header />
      <Hero />
      <About />
      <Gallery />
      <Events />
      <Footer />
      <NotificationManager />
      <BackToTop />
    </>
  );
};

export default MainLayout;

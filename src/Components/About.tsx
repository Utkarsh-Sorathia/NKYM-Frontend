import axios from "axios";
import { useEffect, useState } from "react";
import { FaHandsPraying, FaPeopleGroup } from "react-icons/fa6";
import type { GalleryItem } from "./Admin/Gallery/types";
import BackgroundPattern from "./BackgroundPattern";
import HeadingAccent from "./HeadingAccent";
import { optimizeCloudinaryUrl } from "../utils/cloudinary";

const About: React.FC = () => {
  const [recentPhoto, setRecentPhoto] = useState<GalleryItem | null>(null);

  useEffect(() => {
    const fetchMostRecentPhoto = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_APP_BACKEND_URL}/gallery/all`
        );
        const items = response.data.gallery as GalleryItem[];
        const mostRecent = [...items].sort((a, b) => {
          const yearA = parseInt(a.name.match(/\d{4}/)?.[0] || "0");
          const yearB = parseInt(b.name.match(/\d{4}/)?.[0] || "0");
          return yearB - yearA;
        })[0];
        if (mostRecent) setRecentPhoto(mostRecent);
      } catch (error) {
        console.error("Error fetching recent photo for About:", error);
      }
    };
    fetchMostRecentPhoto();
  }, []);

  return (
    <section id="about" className="relative overflow-hidden py-12 bg-cream-50 scroll-mt-24">
      <BackgroundPattern />
      <div className="relative z-10 container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gold-600 mb-4">About Our Mandal</h2>
          <HeadingAccent />
        </div>
        <div className="flex flex-col lg:flex-row items-center">
          <div className="lg:w-1/2 mb-10 lg:mb-0 lg:pr-10 flex justify-center">
            {recentPhoto ? (
              <div className="max-w-xs sm:max-w-sm md:max-w-md w-full">
                <img
                  src={optimizeCloudinaryUrl(recentPhoto.src, 600)}
                  alt={recentPhoto.name}
                  className="rounded-lg shadow-xl w-full object-cover"
                  style={{ maxHeight: '400px' }}
                />
                <p className="text-sm text-gray-500 mt-2 text-center">Our most recent celebration</p>
              </div>
            ) : (
              <img
                src="/icon.png"
                alt="Ganesha Idol"
                className="rounded-lg shadow-xl bg-cream-100 border border-gold-100 max-w-xs sm:max-w-sm md:max-w-md w-full object-contain"
                style={{ maxHeight: '400px' }}
              />
            )}
          </div>
          <div className="lg:w-1/2 px-4 text-justify">
            <h3 className="text-2xl font-bold text-gray-800 mb-6">Our Journey Since 2012</h3>
            <p className="text-gray-600 mb-4">
              Our journey began in 2012 with a small but passionate group of devotees coming together to celebrate Janmashtami by installing an idol of Lord Krishna. For the first five years, from 2012 to 2016, these celebrations brought our community closer and laid the foundation for something greater.
            </p>
            <p className="text-gray-600 mb-4">
              In 2016, the Natkhat Kanudo Yuvak Mandal was officially established with a vision to celebrate Ganesh Chaturthi with devotion, cultural richness, and active community participation. What started as a modest initiative has now grown into one of the most prominent mandals in our city.
            </p>
            <p className="text-gray-600 mb-6">
              Since 2017, we have been celebrating Ganesh Chaturthi with great enthusiasm by installing a beautifully crafted idol of Lord Ganesha and organizing various cultural programs, competitions, and community service activities throughout the 10-day festival.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-cream-100 p-6 rounded-lg shadow-sm">
                <div className="w-14 h-14 rounded-full bg-linear-to-br from-gold-400 to-maroon-600 flex items-center justify-center text-white text-2xl shadow-md mb-3">
                  <FaHandsPraying />
                </div>
                <h4 className="font-bold text-lg mb-2">Devotion</h4>
                <p className="text-gray-600">We prioritize spiritual connection and devotion to Lord Ganesha in all our activities.</p>
              </div>
              <div className="bg-cream-100 p-6 rounded-lg shadow-sm">
                <div className="w-14 h-14 rounded-full bg-linear-to-br from-gold-400 to-maroon-600 flex items-center justify-center text-white text-2xl shadow-md mb-3">
                  <FaPeopleGroup />
                </div>
                <h4 className="font-bold text-lg mb-2">Community</h4>
                <p className="text-gray-600">Bringing people together to celebrate our rich cultural heritage and traditions.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;

import { Helmet } from 'react-helmet';
import { FaHandsPraying, FaPeopleGroup } from "react-icons/fa6";

const About: React.FC = () => (
  <>
  <Helmet>
      <title>About Natkhat Kanudo Yuvak Mandal | Devotion & Community</title>
      <meta name="description" content="Discover the journey of Natkhat Kanudo Yuvak Mandal since 2016, dedicated to celebrating Ganesh Chaturthi with devotion and community spirit." />
      <meta name="keywords" content="Natkhat Kanudo Yuvak Mandal, Ganesh Chaturthi, community, devotion, festival, Mumbai" />
      <meta property="og:title" content="About Natkhat Kanudo Yuvak Mandal" />
      <meta property="og:description" content="Discover the journey of Natkhat Kanudo Yuvak Mandal since 2016, dedicated to celebrating Ganesh Chaturthi with devotion and community spirit." />
      <meta property="og:type" content="website" />
      <meta property="og:image" content="https://nkym.vercel.app/icon.png" />
      <meta property="og:url" content="https://nkym.vercel.app/about" />
    </Helmet>
  <section id="about" className="py-20 bg-white scroll-mt-64 sm:scroll-mt-0">
    <div className="container mx-auto px-4">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold text-amber-600 mb-4">About Our Mandal</h2>
        <div className="w-20 h-1 bg-amber-500 mx-auto"></div>
      </div>
      <div className="flex flex-col lg:flex-row items-center">
        <div className="lg:w-1/2 mb-10 lg:mb-0 lg:pr-10">
          <img src="/icon.png" alt="Ganesha Idol" className="w-full rounded-lg shadow-xl ganpati-idol" />
        </div>
        <div className="lg:w-1/2">
          <h3 className="text-2xl font-bold text-gray-800 mb-6">Our Journey Since 2016</h3>
          <p className="text-gray-600 mb-4">
            The Natkhat Kanudo Yuvak Mandal was established in 2016 with a vision to celebrate the festival of Ganesh Chaturthi with devotion, cultural richness, and community participation. What started as a small gathering of devotees has now grown into one of the most prominent mandals in our city.
          </p>
          <p className="text-gray-600 mb-6">
            Every year, we install a beautifully crafted idol of Lord Ganesha and organize various cultural programs, competitions, and community services during the 10-day festival.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-amber-50 p-6 rounded-lg shadow-sm">
              <div className="text-amber-600 text-3xl mb-3">
                <FaHandsPraying />
              </div>
              <h4 className="font-bold text-lg mb-2">Devotion</h4>
              <p className="text-gray-600">We prioritize spiritual connection and devotion to Lord Ganesha in all our activities.</p>
            </div>
            <div className="bg-amber-50 p-6 rounded-lg shadow-sm">
              <div className="text-amber-600 text-3xl mb-3">
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
  </>
);

export default About;

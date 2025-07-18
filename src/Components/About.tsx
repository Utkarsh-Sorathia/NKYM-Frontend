import { FaHandsPraying, FaPeopleGroup } from "react-icons/fa6";

const About: React.FC = () => (
  <>
    <section id="about" className="py-12 bg-white scroll-mt-16 sm:scroll-mt-0">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-amber-600 mb-4">About Our Mandal</h2>
          <div className="w-20 h-1 bg-amber-500 mx-auto"></div>
        </div>
        <div className="flex flex-col lg:flex-row items-center">
          <div className="lg:w-1/2 mb-10 lg:mb-0 lg:pr-10 flex justify-center">
            <img
              src="/icon.png"
              alt="Ganesha Idol"
              className="rounded-lg shadow-xl shadow-amber-200 border border-amber-100 ganpati-idol max-w-xs sm:max-w-sm md:max-w-md w-full object-contain"
              style={{ maxHeight: '400px' }}
            />
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

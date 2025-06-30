import { FaFacebookF, FaInstagram } from "react-icons/fa";

const Footer: React.FC = () => (
  <footer className="bg-amber-50 text-black py-12 border-t border-amber-200">
    <div className="container mx-auto px-8">
      {/* Grid layout: 1 column on mobile, 2 columns on md and up */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Column 1: Logo & Social */}
        <div>
          <div className="flex items-center space-x-2 mb-4">
            <img src="/icon.png" alt="Ganesha" className="w-16 h-16" />
            <span className="logo-font text-2xl font-bold text-amber-300">
              NatKhat Kanudo Yuvak Mandal
            </span>
          </div>
          <p className="mb-4">
            Celebrating the divine blessings of Lord Ganesha with devotion and
            joy since 2016.
          </p>
          <div className="flex space-x-4">
            <a
              href="#"
              className="text-amber-400 hover:text-amber-300 transition-colors"
              aria-label="Facebook"
            >
              <FaFacebookF size={20} />
            </a>
            <a
              href="#"
              className="text-amber-400 hover:text-amber-300 transition-colors"
              aria-label="Instagram"
            >
              <FaInstagram size={20} />
            </a>
          </div>
        </div>

        {/* Column 2: Quick Links & Important Dates */}
        <div className="flex space-x-8 sm:space-x-16 md:space-x-32 lg:space-x-48">
          <div className="flex flex-col">
            <h3 className="text-lg font-bold text-amber-300 mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:text-amber-300 transition duration-300">
                  Home
                </a>
              </li>
              <li>
                <a href="#about" className="hover:text-amber-300 transition duration-300">
                  About Us
                </a>
              </li>
              <li>
                <a href="#events" className="hover:text-amber-300 transition duration-300">
                  Events
                </a>
              </li>
              <li>
                <a href="#gallery" className="hover:text-amber-300 transition duration-300">
                  Gallery
                </a>
              </li>
            </ul>
          </div>

          <div className="flex flex-col">
            <h3 className="text-lg font-bold text-amber-300 mb-4">Important Dates</h3>
            <ul className="space-y-2">
              <li className="flex items-center">
                <span className="bg-amber-800 text-white rounded-full w-6 h-6 flex items-center justify-center mr-2 text-xs">
                  27
                </span>
                <span>Ganesh Sthapana</span>
              </li>
              <li className="flex items-center">
                <span className="bg-amber-800 text-white rounded-full w-6 h-6 flex items-center justify-center mr-2 text-xs">
                  06
                </span>
                <span>Ganesh Visarjan</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-amber-800 mt-12 pt-8 text-center text-sm">
        <p>&copy; 2025 NatKhat Kanudo Yuvak Mandal. All Rights Reserved.</p>
      </div>
    </div>
  </footer>
);

export default Footer;

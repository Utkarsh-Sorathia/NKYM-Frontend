import { FaFacebookF, FaInstagram } from "react-icons/fa";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

type EventItem = {
  id: string;
  title: string;
  date: string;
  time?: string;
  description: string;
  location?: string;
};

const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
  e.preventDefault();
  const section = document.getElementById(sectionId);
  if (section) {
    section.scrollIntoView({ behavior: "smooth", block: "start" });
  }
};

const Footer: React.FC = () => {
  const [events, setEvents] = useState<EventItem[]>([]);

  const fetchEvents = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_APP_BACKEND_URL}/events/all`
      );
      const sortedEvents = response.data.events.sort(
        (a: EventItem, b: EventItem) =>
          new Date(a.date).getTime() - new Date(b.date).getTime()
      );
      setEvents(sortedEvents);
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);
  return (
    <footer className="bg-amber-50 text-black py-12 border-t border-amber-200">
      <div className="container mx-auto px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
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
              <Link
                to="https://www.facebook.com/share/1BHJjVyQeK/"
                className="text-amber-400 hover:text-amber-300 transition-colors"
                aria-label="Facebook"
              >
                <FaFacebookF size={20} />
              </Link>
              <Link
                to="https://www.instagram.com/nkym__cha__maharaja?igsh=MXU3ODBscWttb3Rrdg=="
                className="text-amber-400 hover:text-amber-300 transition-colors"
                aria-label="Instagram"
              >
                <FaInstagram size={20} />
              </Link>
            </div>
          </div>

          <div className="flex space-x-8 sm:space-x-16 md:space-x-32 lg:space-x-48">
            <div className="flex flex-col">
              <h3 className="text-lg font-bold text-amber-300 mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#home"
                    onClick={e => scrollToSection(e, "home")}
                    className="hover:text-amber-300 transition duration-300"
                  >
                    Home
                  </a>
                </li>
                <li>
                  <a
                    href="#about"
                    onClick={e => scrollToSection(e, "about")}
                    className="hover:text-amber-300 transition duration-300"
                  >
                    About Us
                  </a>
                </li>
                <li>
                  <a
                    href="#events"
                    onClick={e => scrollToSection(e, "events")}
                    className="hover:text-amber-300 transition duration-300"
                  >
                    Events
                  </a>
                </li>
                <li>
                  <a
                    href="#gallery"
                    onClick={e => scrollToSection(e, "gallery")}
                    className="hover:text-amber-300 transition duration-300"
                  >
                    Gallery
                  </a>
                </li>
              </ul>
            </div>

            <div className="flex flex-col">
              <h3 className="text-lg font-bold text-amber-300 mb-4">Important Dates</h3>
              <ul className="space-y-2">
                {events.map((event) => {
                  const dateObj = new Date(event.date);
                  const day = String(dateObj.getDate()).padStart(2, "0");
                  const month = String(dateObj.getMonth() + 1).padStart(2, "0");
                  const formattedDate = `${day}/${month}`;

                  return (
                    <li className="flex items-center" key={event.id}>
                      <span className="bg-amber-800 text-white rounded-full w-12 h-6 flex items-center justify-center mr-2 text-xs">
                        {formattedDate}
                      </span>
                      <span>{event.title}</span>
                    </li>
                  );
                })}
                {events.length === 0 && (
                  <li className="text-sm text-gray-500">No upcoming events</li>
                )}
              </ul>
            </div>
          </div>
        </div>

        <div className="border-t border-amber-800 mt-12 pt-8 text-center text-sm">
          <p>&copy; 2025 NatKhat Kanudo Yuvak Mandal. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  )
};

export default Footer;

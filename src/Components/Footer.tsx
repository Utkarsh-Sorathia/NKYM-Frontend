import axios from "axios";
import { useEffect, useState } from "react";
import { FaInstagram, FaFacebookF } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";

const mandalAddress =
  "NatKhat Kanudo Yuvak Mandal, Oppo. Sidhdharth Apartment, Majuragate, Sagarampura, Surat, Gujarat - 395002, India";
const directionsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(mandalAddress)}`;

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
    <footer className="bg-maroon-950 text-cream-100 py-12 border-t border-gold-900">
      <div className="container mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Logo, description, socials */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <img src="/icon.png" alt="Ganesha" className="w-16 h-16" />
              <span className="text-2xl font-display font-bold text-gold-300">
                NatKhat Kanudo Yuvak Mandal
              </span>
            </div>
            <p className="px-4 text-cream-100/80">
              Celebrating the divine blessings of Lord Ganesha with devotion and joy.
            </p>
            <p className="px-4 mt-2 font-display text-sm font-semibold tracking-widest uppercase text-gold-400">
              10 Years of Ganpati Bappa Morya · 2017–2026
            </p>
            <div className="flex items-center gap-3 px-4 mt-5">
              <a
                href="https://www.instagram.com/nkym__cha__maharaja?igsh=MXU3ODBscWttb3Rrdg=="
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-9 h-9 rounded-full flex items-center justify-center bg-pink-500 hover:bg-pink-600 text-white transition-colors"
              >
                <FaInstagram className="w-4 h-4" />
              </a>
              <a
                href="https://www.facebook.com/share/1BHJjVyQeK/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="w-9 h-9 rounded-full flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white transition-colors"
              >
                <FaFacebookF className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Links, Events, Address */}
          <div className="flex space-x-8 sm:space-x-16 md:space-x-32 lg:space-x-48 px-4">
            {/* Quick Links */}
            <div className="flex flex-col mb-8 sm:mb-0">
              <h3 className="text-lg font-bold text-gold-300 mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#home"
                    onClick={e => scrollToSection(e, "home")}
                    className="hover:text-gold-400 transition duration-300"
                  >
                    Home
                  </a>
                </li>
                <li>
                  <a
                    href="#about"
                    onClick={e => scrollToSection(e, "about")}
                    className="hover:text-gold-400 transition duration-300"
                  >
                    About Us
                  </a>
                </li>
                <li>
                  <a
                    href="#events"
                    onClick={e => scrollToSection(e, "events")}
                    className="hover:text-gold-400 transition duration-300"
                  >
                    Events
                  </a>
                </li>
                <li>
                  <a
                    href="#gallery"
                    onClick={e => scrollToSection(e, "gallery")}
                    className="hover:text-gold-400 transition duration-300"
                  >
                    Gallery
                  </a>
                </li>
              </ul>
            </div>

            {/* Important Dates */}
            <div className="flex flex-col mb-8 sm:mb-0">
              <h3 className="text-lg font-bold text-gold-300 mb-4">Important Dates</h3>
              <ul className="space-y-2">
                {events.map((event) => {
                  const dateObj = new Date(event.date);
                  const day = String(dateObj.getDate()).padStart(2, "0");
                  const month = String(dateObj.getMonth() + 1).padStart(2, "0");
                  const formattedDate = `${day}/${month}`;

                  return (
                    <li className="flex items-center" key={event.id}>
                      <span className="bg-gold-500 text-maroon-950 font-semibold rounded-full w-12 h-6 flex items-center justify-center mr-2 text-xs">
                        {formattedDate}
                      </span>
                      <span>{event.title}</span>
                    </li>
                  );
                })}
                {events.length === 0 && (
                  <li className="text-sm text-cream-100/60">No upcoming events</li>
                )}
              </ul>
            </div>
          </div>
        </div>

        <div className="border-t border-gold-900 mt-12 pt-8 text-center text-sm">
          <div className="flex flex-col">
              <address className="not-italic text-sm leading-relaxed text-cream-100/70">
                NatKhat Kanudo Yuvak Mandal,
                Oppo. Sidhdharth Apartment,
                Majuragate,
                Sagarampura,<br />
                Surat, Gujarat - 395002
                India
              </address>
              <a
                href={directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 mx-auto mt-2 rounded-full bg-gold-500 hover:bg-gold-600 text-maroon-950 font-display font-semibold text-xs px-4 py-2 shadow-md transition-colors"
              >
                <FaLocationDot />
                Get Directions
              </a>
            </div>
          <p className="mt-2">&copy; 2026 NatKhat Kanudo Yuvak Mandal. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

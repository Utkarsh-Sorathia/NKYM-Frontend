import axios from "axios";
import { useEffect, useState } from "react";
import { FaCalendarDay, FaLocationDot } from "react-icons/fa6";
import { motion } from "framer-motion";
import BackgroundPattern from "./BackgroundPattern";
import HeadingAccent from "./HeadingAccent";

type EventItem = {
  id: string;
  title: string;
  date: string;
  time?: string;
  description: string;
  location?: string;
};

const Events: React.FC = () => {
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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <section id="events" className="relative overflow-hidden py-12 bg-white scroll-mt-24">
      <BackgroundPattern />
      <div className="relative z-10 container mx-auto px-4">
        {/* Section header */}
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-extrabold text-gold-600 mb-4 tracking-wide"
          >
            Upcoming Events
          </motion.h2>
          <HeadingAccent />
          <p className="text-gray-600 mt-4 max-w-2xl mx-auto text-base md:text-lg">
            Mark your calendars for these special moments during Ganesh Utsav!
          </p>
        </div>

        {/* Events grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {events.map((event) => (
            <motion.div
              key={event.id}
              variants={itemVariants}
              whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
              className="bg-cream-100 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 p-6 flex flex-col"
            >
              {/* Title and date */}
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold text-gray-800">{event.title}</h3>
                <div className="flex items-center text-gold-600 font-semibold space-x-2 whitespace-nowrap">
                  <FaCalendarDay size={18} />
                  <span>{new Date(event.date).toLocaleDateString(undefined, {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}</span>
                </div>
              </div>

              {/* Location */}
              {event.location && (
                <div className="flex items-center text-gray-600 mb-4 space-x-2">
                  <FaLocationDot size={18} className="text-red-600" />
                  <span className="font-medium">{event.location}</span>
                </div>
              )}

              {/* Description */}
              <p className="text-gray-700 grow">{event.description}</p>

              {/* Optional time if available */}
              {event.time && (
                <div className="mt-4 text-sm text-gray-500 font-medium">
                  <strong>Time:</strong> {event.time}
                </div>
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Events;

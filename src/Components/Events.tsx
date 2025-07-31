import axios from "axios";
import { useEffect, useState } from "react";
import { FaCalendarDay, FaLocationDot } from "react-icons/fa6";

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

  return (
    <section id="events" className="py-12 bg-gray-50 scroll-mt-16 sm:scroll-mt-0">
      <div className="container mx-auto px-4">
        {/* Section header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-extrabold text-amber-600 mb-4 tracking-wide">
            Upcoming Events
          </h2>
          <div className="w-24 h-1 bg-amber-500 mx-auto rounded-full"></div>
          <p className="text-gray-600 mt-5 max-w-3xl mx-auto text-lg font-medium">
            Mark your calendars for these special moments during Ganesh Utsav!
          </p>
        </div>

        {/* Events grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.map((event) => (
            <div
              key={event.id}
              className="bg-amber-50 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 p-6 flex flex-col"
            >
              {/* Title and date */}
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold text-gray-800">{event.title}</h3>
                <div className="flex items-center text-amber-600 font-semibold space-x-2 whitespace-nowrap">
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
              <p className="text-gray-700 flex-grow">{event.description}</p>

              {/* Optional time if available */}
              {event.time && (
                <div className="mt-4 text-sm text-gray-500 font-medium">
                  <strong>Time:</strong> {event.time}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Events;

import axios from "axios";
import { useEffect, useState } from "react";

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
    <section id="events" className="py-12 bg-white scroll-mt-16 sm:scroll-mt-0">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-amber-600 mb-4">
            Upcoming Events
          </h2>
          <div className="w-20 h-1 bg-amber-500 mx-auto"></div>
          <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
            Mark your calendars for these special moments during Ganesh Utsav!
          </p>
        </div>
        <div className="space-y-8">
          {events.map((event) => (
            <div
              key={event.id}
              className="bg-amber-50 rounded-lg shadow p-6 flex flex-col md:flex-col items-start"
            >
              <div className="flex flex-row items-center w-full mb-1">
                <h3 className="text-xl font-bold text-gray-800 whitespace-nowrap mr-4">
                  {event.title}
                </h3>
                <span className="text-md text-amber-700 font-semibold whitespace-nowrap">
                  {new Date(event.date).toLocaleDateString()}
                </span>
              </div>
              <div className="text-sm text-gray-500 whitespace-nowrap mb-2">
                {event.location}
              </div>
              <p className="text-gray-700">{event.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Events;

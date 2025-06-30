// components/Events.tsx
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
      setEvents(response.data.events);
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  // Fetch events when the component mounts
  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <section id="events" className="py-20 bg-white scroll-mt-64 sm:scroll-mt-0">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-amber-600 mb-4">Upcoming Events</h2>
          <div className="w-20 h-1 bg-amber-500 mx-auto"></div>
          <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
            Mark your calendars for these special moments during Ganesh Utsav!
          </p>
        </div>
        <div className="space-y-8">
          {events.map(event => (
            <div key={event.id} className="bg-amber-50 rounded-lg shadow p-6 flex flex-col md:flex-row items-start md:items-center">
              <div className="flex-shrink-0 w-32 mb-4 md:mb-0 md:mr-8 text-center">
                <div className="text-2xl font-bold text-amber-700">{new Date(event.date).toLocaleDateString()}</div>
                <div className="text-sm text-gray-500">{event.location}</div>
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">{event.title}</h3>
                <p className="text-gray-700">{event.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Events;

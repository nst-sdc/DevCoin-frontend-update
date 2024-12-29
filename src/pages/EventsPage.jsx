import React from 'react';
import { Calendar, Clock } from 'lucide-react'; // Import icons

export default function EventsPage() {
    const events = [
      {
        title: "Tech Talk",
        description: "Tech Talk is a platform for students to share their knowledge and experiences with technology. It is a platform for students to share their knowledge and experiences with technology.",
        date: "Jan 10, 2025",
        
        status: "upcoming",
      },
      {
        title: "Capture the Flag only CLI",
        description: "Participate in Capture the Flag only CLI event to test your skills in cli",
        date: "Jan 17, 2025",
        time: "2:00 PM - 9:00 PM",
        status: "upcoming",
      },
       {
        title: "Game Development Hackathon",
        description: "Showcase your game development skills in a fun and competitive hackathon.",
        date: "Jan 25, 2025",
        time: "10:00 AM - 4:00 PM",
        status: "upcoming",
      },
    ];


    const completedEvents = [
      {
        title: "Nirmaan Frontend Development Hackathon",
        description: "Join us for an exciting 24-hour hackathon focusing on frontend development, testing your skills with real-world challenges!",
        date: "Oct 28, 2024",
        time: "9:00 AM - 9:00 PM",
        status: "completed",
      },
    ];


    function EventCard({ event }) {
        const { title, description, date, time, status } = event;
        return (
            <div className="bg-white rounded-lg shadow-md p-6 flex flex-col justify-between">
                <div>
                    <h2 className="text-xl font-semibold text-gray-900 mb-3">
                        {title}
                    </h2>
                    <p className="text-gray-700 leading-relaxed mb-4">
                        {description}
                    </p>
                </div>
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-1 text-gray-500">
                         <Calendar className="h-4 w-4" />
                         <span className="text-sm">Date: {date}</span>
                    </div>
                    <div className="flex items-center space-x-1 text-gray-500">
                        <Clock className="h-4 w-4" />
                        <span className="text-sm">Time: {time}</span>
                    </div>
                </div>
                {status === "upcoming" && (
                   <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded mt-4 transition-colors focus:outline-none">
                      Learn More
                    </button>
                )}
                 {status === "completed" && (
                     <div className="text-gray-500 mt-4 text-sm"> Completed</div>
                 )}
            </div>
        );
    }



  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Upcoming Events</h1>
      <p className="text-gray-700 mb-8">
        Check out the events we have planned! Join us for workshops, hackathons, and more!
      </p>

        {/* Completed Events Section */}
        <section className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Completed Events</h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {completedEvents.map((event, index) => (
                      <EventCard key={index} event={event} />
                      ))}
                </div>
        </section>


       {/* Upcoming Events Section */}
        <section className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Upcoming Events</h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {events.map((event, index) => (
                    <EventCard key={index} event={event} />
                  ))}
              </div>
        </section>
    </div>
  );
}
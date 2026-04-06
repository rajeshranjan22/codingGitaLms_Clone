import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

const Events = () => {
  const data = localStorage.getItem("user");
  const user = data ? JSON.parse(data) : null;

  if (!user) return <div>No user</div>;

  const events = user.events || [];

  // Convert dd/mm/yyyy → Date
  const parseDate = (dateStr) => {
    const [day, month, year] = dateStr.split("/");
    return new Date(`${year}-${month}-${day}`);
  };

  const today = new Date();

  const ongoing = events.filter(
    (e) => parseDate(e.startDate) <= today && parseDate(e.endDate) >= today,
  );

  const upcoming = events.filter((e) => parseDate(e.startDate) > today);

  const past = events.filter((e) => parseDate(e.endDate) < today);

  // Section Renderer (exact UI match)
  const renderSection = (title, list, emptyText) => (
    <div className="rounded-xl border border-neutral-800 bg-neutral-900 mb-6">
      <div className="p-4 border-b border-neutral-800">
        <div className="text-white font-semibold">{title}</div>
      </div>

      <div className="p-4">
        {list.length === 0 ? (
          <div className="text-neutral-400 text-sm">{emptyText}</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {list.map((event, index) => (
              <div
                key={index}
                className="bg-neutral-800 border border-neutral-700 rounded-lg p-4"
              >
                <div className="text-lg font-medium text-neutral-100">
                  {event.title}
                </div>

                <div className="mt-1 text-xs text-neutral-400">
                  {event.startDate} — {event.endDate}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen pt-20 bg-neutral-950 text-white">
      <Navbar />

      <div className="mx-auto pb-10 max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* HEADER */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold">Events</h1>

          <Link
            to="/student"
            className="text-sm text-neutral-300 hover:underline"
          >
            Back to dashboard
          </Link>
        </div>

        {/* SECTIONS */}
        {renderSection("Ongoing", ongoing, "No ongoing events.")}
        {renderSection("Upcoming", upcoming, "No upcoming events.")}
        {renderSection("Past", past, "No past events.")}
      </div>
    </div>
  );
};

export default Events;

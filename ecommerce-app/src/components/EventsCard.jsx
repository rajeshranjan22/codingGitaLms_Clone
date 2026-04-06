import React from "react";
import { useNavigate } from "react-router-dom";

export default function EventsCard({ events }) {
  const navigate = useNavigate();

  const handleViewAll = () => {
    navigate("/student/events");
  };

  // Convert dd/mm/yyyy → Date
  const parseDate = (dateStr) => {
    const [day, month, year] = dateStr.split("/");
    return new Date(`${year}-${month}-${day}`);
  };

  const today = new Date();

  // Only upcoming events
  const upcoming = events.filter((e) => parseDate(e.startDate) > today);

  return (
    <div className="rounded-xl border border-neutral-800 bg-neutral-900 mb-6">
      {/* HEADER */}
      <div className="p-4 border-b border-neutral-800">
        <div className="flex items-center justify-between">
          <div className="text-white font-semibold">Upcoming Events</div>

          <div className="flex items-center gap-3 text-sm text-neutral-400">
            <span>{upcoming.length} shown</span>

            <button
              onClick={handleViewAll}
              className="text-xs underline hover:text-white"
            >
              View all
            </button>
          </div>
        </div>
      </div>

      {/* BODY */}
      <div className="p-4">
        {upcoming.length === 0 ? (
          <div className="text-neutral-400 text-sm">No upcoming events.</div>
        ) : (
          <div className="space-y-3">
            {upcoming.slice(0, 3).map((e, i) => (
              <div
                key={i}
                className="bg-neutral-800 border border-neutral-700 rounded-md p-3"
              >
                <div className="text-sm font-medium text-white">{e.title}</div>
                <div className="text-xs text-neutral-400">
                  {e.startDate} — {e.endDate}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

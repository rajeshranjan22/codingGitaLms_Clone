import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Navbar from "../components/Navbar";

export default function CalendarPage() {
  const data = localStorage.getItem("user");
  const user = data ? JSON.parse(data) : null;

  const [date, setDate] = useState(new Date());
  const [selectedDay, setSelectedDay] = useState(new Date().getDate());

  const changeMonth = (dir) => {
    const newDate = new Date(date);
    newDate.setMonth(date.getMonth() + dir);
    setDate(newDate);
    setSelectedDay(1);
  };

  const goToday = () => {
    const today = new Date();
    setDate(today);
    setSelectedDay(today.getDate());
  };

  const monthName = date.toLocaleString("default", {
    month: "long",
    year: "numeric",
  });

  const year = date.getFullYear();
  const month = date.getMonth();

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const days = [];

  for (let i = 0; i < firstDay; i++) days.push(null);
  for (let i = 1; i <= daysInMonth; i++) days.push(i);
  while (days.length % 7 !== 0) days.push(null);

  const formatDate = (day) => {
    return `${String(day).padStart(2, "0")}/${String(month + 1).padStart(
      2,
      "0",
    )}/${year}`;
  };

  const legendItems = [
    { label: "Assignment", color: "bg-blue-500" },
    { label: "holiday", color: "bg-rose-500" },
    { label: "exam", color: "bg-red-500" },
    { label: "class test", color: "bg-orange-500" },
    { label: "result announcement", color: "bg-violet-500" },
    { label: "orientation", color: "bg-cyan-500" },
    { label: "convocation", color: "bg-pink-500" },
    { label: "Personal reasons", color: "bg-amber-500" },
    { label: "Festival celebration", color: "bg-orange-500" },
    { label: "Hackathon participation", color: "bg-cyan-500" },
    {
      label: "College events (seminars, workshops, competitions, etc.)",
      color: "bg-blue-500",
    },
    { label: "Sick leave / medical reasons", color: "bg-red-500" },
    { label: "Placement drives", color: "bg-green-500" },
    {
      label: "Company work (official tasks or visits)",
      color: "bg-indigo-500",
    },
    { label: "Interviews", color: "bg-teal-500" },
    { label: "Family functions", color: "bg-pink-500" },
    { label: "Emergency situations", color: "bg-rose-500" },
    { label: "Travel-related reasons", color: "bg-sky-500" },
    { label: "Duty leave", color: "bg-purple-500" },
    { label: "Others", color: "bg-neutral-500" },
  ];

  return (
    <div className="min-h-screen bg-neutral-950 text-white pt-20">
      <Navbar />

      <div className="mx-auto pb-10 max-w-7xl px-4 sm:px-6 lg:px-8 space-y-6">
        <h1 className="text-2xl font-semibold mb-4">Calendar</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* LEFT */}

          <div className="rounded-xl border border-neutral-800 bg-neutral-900 lg:col-span-2">
            {/* HEADER */}
            <div className="p-4 border-b border-neutral-800">
              <div className="flex items-center justify-between">
                <div className="flex gap-2">
                  <button
                    onClick={() => changeMonth(-1)}
                    className="px-2 py-1 rounded bg-neutral-800 border border-neutral-700"
                  >
                    <ChevronLeft size={16} />
                  </button>

                  <button
                    onClick={goToday}
                    className="px-2 py-1 rounded bg-neutral-800 border border-neutral-700 text-xs"
                  >
                    Today
                  </button>
                </div>

                <div className="font-semibold">{monthName}</div>

                <button
                  onClick={() => changeMonth(1)}
                  className="px-2 py-1 rounded bg-neutral-800 border border-neutral-700"
                >
                  <ChevronRight size={16} />
                </button>
              </div>

              {/* LEGEND */}

              <div className="mt-3 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 text-xs text-neutral-300">
                {legendItems.map((item, i) => (
                  <div key={i} className="flex gap-2">
                    <span className={`w-2 h-2 rounded-full ${item.color}`} />
                    <span>{item.label}</span>
                  </div>
                ))}
              </div>
            </div>
            {/* WEEK HEADER */}
            <div className="p-4">
              <div className="grid grid-cols-7 gap-2 text-xs text-neutral-400 mb-2">
                {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
                  <div key={d} className="text-center">
                    {d}
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-7 gap-2">
                {days.map((d, i) => {
                  if (!d) return <div key={i} className="h-20" />;

                  const active = selectedDay === d;

                  return (
                    <button
                      key={i}
                      onClick={() => setSelectedDay(d)}
                      className={`h-20 border p-2 text-left rounded-md
                      ${
                        active
                          ? "ring-2 ring-blue-500 border-blue-500"
                          : "border-neutral-800 bg-neutral-900"
                      }
                      `}
                    >
                      <div
                        className={`text-sm ${
                          active
                            ? "text-blue-400 font-semibold"
                            : "text-neutral-200"
                        }`}
                      >
                        {d}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* RIGHT */}

          <div className="rounded-xl border border-neutral-800 bg-neutral-900">
            <div className="p-4 border-b border-neutral-800">
              {formatDate(selectedDay)}
            </div>

            <div className="p-4 space-y-4">
              <Section title="Events">No events.</Section>

              <Section title="Leaves">No leaves.</Section>

              <Section title="Attendance">
                {user?.subjects?.[0]?.name} — present
              </Section>

              <Section title="Assignments">None due.</Section>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Section({ title, children }) {
  return (
    <div>
      <div className="text-neutral-300 font-medium mb-2">{title}</div>
      <div className="text-neutral-400 text-sm">{children}</div>
    </div>
  );
}

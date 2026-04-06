import React from "react";
import Navbar from "../components/Navbar";

export default function StudentAttendance() {
  const data = localStorage.getItem("user");
  const user = data ? JSON.parse(data) : null;

  const today = new Date().toISOString().split("T")[0];

  if (!user) {
    return <div className="text-white p-6">No user found</div>;
  }

  const subjects = user.subjects || [];
  const mentor = user.mentors?.[0]?.name || "N/A";

  return (
    <div className="min-h-screen pt-20 bg-neutral-950 text-white">
      <Navbar />

      <div className="mx-auto pb-10 max-w-7xl px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="rounded-xl border border-neutral-800 bg-neutral-900 ">
          <div className="p-4 border-b border-neutral-800 ">
            <div className="text-white font-semibold">Overview</div>
          </div>

          <div className="p-4 ">
            <div className="rounded-xl border border-neutral-800 bg-neutral-900">
              {/* HEADER */}
              <div className="p-4 border-b border-neutral-800 flex items-center justify-between">
                <div>
                  <div className="text-white font-semibold">
                    Today's Attendance
                  </div>
                  <div className="text-neutral-400 text-xs">Date: {today}</div>
                </div>

                <span className="inline-flex items-center rounded-md border px-2 py-0.5 text-xs border-neutral-800 bg-neutral-950 text-neutral-300">
                  Day: Leave
                </span>
              </div>

              {/* LIST */}
              <div className="p-4">
                <div className="space-y-2">
                  {subjects.slice(8, 12).map((sub, index) => (
                    <div
                      key={sub.code || index}
                      className="flex items-center justify-between rounded-lg border border-neutral-800 bg-neutral-950 p-3"
                    >
                      <div className="text-neutral-200 text-sm">
                        <div>
                          {sub.code} - {sub.name}
                        </div>

                        <div className="text-xs text-neutral-400">
                          Marked by: {mentor}
                        </div>
                      </div>

                      <span className="inline-flex items-center rounded-md border px-2 py-0.5 text-xs border-emerald-800 bg-emerald-950 text-emerald-300">
                        present
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

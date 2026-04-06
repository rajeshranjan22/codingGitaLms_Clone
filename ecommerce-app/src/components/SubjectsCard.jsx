import React from "react";
import { useNavigate } from "react-router-dom";

export default function SubjectsCard({ subjects }) {
  const navigate = useNavigate();

  return (
    <div className="rounded-xl border border-neutral-800 bg-neutral-900 lg:col-span-2">
      {/* HEADER */}
      <div className="p-4 border-b border-neutral-800 flex justify-between">
        <div className="text-white font-semibold">Subjects</div>

        <div
          onClick={() => navigate("/student/attendance")}
          className="text-xs text-neutral-400 hover:text-white cursor-pointer"
        >
          View attendance
        </div>
      </div>

      {/* BODY */}
      <div className="p-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {subjects.map((sub, i) => (
            <div
              key={i}
              className="rounded-lg border border-neutral-800 bg-neutral-950 p-4"
            >
              <div className="text-sm text-neutral-300 truncate">
                {sub.code} - {sub.name}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

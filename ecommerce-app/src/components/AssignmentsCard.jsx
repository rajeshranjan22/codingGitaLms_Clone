import React from "react";
import { useNavigate } from "react-router-dom";

export default function AssignmentsCard({ assignments, pending }) {
  const navigate = useNavigate();

  const handleViewAll = () => {
    navigate("/student/assignments");
  };

  return (
    <div className="rounded-xl border border-neutral-800 bg-neutral-900 mb-6">
      {/* HEADER */}
      <div className="p-4 border-b border-neutral-800">
        <div className="flex items-center justify-between">
          <div className="text-white font-semibold">
            Assignments
            <span className="text-neutral-400 text-sm ml-2">
              ({assignments}/{assignments} - 0%)
            </span>
          </div>

          <div className="flex items-center gap-3 text-sm text-neutral-400">
            <span>Pending: {pending}</span>

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
        {pending === 0 ? (
          <div className="text-neutral-400 text-sm">
            No pending assignments. Great job!
          </div>
        ) : (
          <div className="text-neutral-200 text-sm">
            You have pending assignments.
          </div>
        )}
      </div>
    </div>
  );
}

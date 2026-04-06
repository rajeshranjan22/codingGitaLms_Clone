import React from "react";

export default function AttendanceCard({ attendance }) {
  if (!attendance) return null;

  const {
    semester,
    present = 0,
    total = 0,
    bonus = 0,
    startDate,
    endDate,
  } = attendance;

  const percentWithBonus =
    total > 0 ? Math.ceil(((present + bonus) / total) * 100) : 0;

  return (
    <div className="rounded-xl border border-neutral-800 bg-neutral-900 mb-6">
      {/* HEADER */}
      <div className="p-4 border-b border-neutral-800">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="text-white font-semibold flex items-center flex-wrap gap-2">
            {semester} Attendance
            {/* BONUS */}
            {bonus > 0 && (
              <span className="inline-flex items-center rounded-md border px-2 py-0.5 text-xs bg-blue-600/20 border-blue-600/50 text-blue-400">
                +{bonus} Bonus
              </span>
            )}
            {/* FINAL % */}
            <span className="inline-flex items-center rounded-md border px-2 py-0.5 text-xs bg-purple-600/20 border-purple-600/50 text-purple-400">
              {percentWithBonus}%
            </span>
          </div>

          {/* Right side % */}
          <div className="text-sm text-neutral-400">{percentWithBonus}%</div>
        </div>
      </div>

      {/* BODY */}
      <div className="p-4">
        <div className="space-y-3">
          {/* Progress Bar */}
          <div className="w-full h-3 bg-neutral-800 rounded-full overflow-hidden">
            <div
              className={`h-3 transition-all duration-500 ${
                percentWithBonus >= 75 ? "bg-green-500" : "bg-yellow-500"
              }`}
              style={{ width: `${percentWithBonus}%` }}
            />
          </div>

          {/* Info */}
          <div className="flex justify-between text-xs text-neutral-400 flex-wrap gap-2">
            <span>
              Present {present} / {total} marked sessions
            </span>

            <span>
              {startDate} - {endDate}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

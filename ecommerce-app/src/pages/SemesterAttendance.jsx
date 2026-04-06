import React, { useState } from "react";
import Navbar from "../components/Navbar";
import { CheckCircle, AlertTriangle } from "lucide-react";
import { students } from "../data/students";

const SemesterAttendance = () => {
  const user = JSON.parse(localStorage.getItem("user")) || students[0];

  const [selectedSemester, setSelectedSemester] = useState(
    user.attendance[0].semester,
  );

  const current = user.attendance.find(
    (sem) => sem.semester === selectedSemester,
  );

  const present = current.present;
  const total = current.total;
  const bonus = current.bonus || 0;

  const percent = Math.round((present / total) * 100);
  const percentWithBonus = Math.round(((present + bonus) / total) * 100);

  const absent = total - present;

  return (
    <div className="min-h-screen pt-20 bg-neutral-950 text-white">
      <Navbar />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4 ">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-white">Semester Attendance</h1>
          <p className="text-neutral-400 text-sm mt-1">
            View your attendance statistics by semester
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="rounded-xl border border-neutral-800 bg-neutral-900">
              <div className="p-4 border-b border-neutral-800 text-white font-semibold">
                Semesters
              </div>

              <div className="p-4 space-y-2">
                {user.attendance.map((sem) => {
                  const active = selectedSemester === sem.semester;

                  return (
                    <button
                      key={sem.semester}
                      onClick={() => setSelectedSemester(sem.semester)}
                      className={`w-full text-left px-3 py-2 rounded-lg border transition-all ${
                        active
                          ? "border-blue-600 bg-blue-950 text-blue-200"
                          : "border-neutral-800 bg-neutral-950 text-neutral-300 hover:bg-neutral-800"
                      }`}
                    >
                      <div className="font-medium">{sem.semester}</div>
                      <div className="text-xs text-neutral-400 mt-1">
                        {sem.startDate} - {sem.endDate}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Main */}
          <div className="lg:col-span-3 space-y-6">
            {/* Card */}
            <div className="rounded-xl border border-neutral-800 bg-neutral-900">
              <div className="p-4 border-b border-neutral-800 flex justify-between">
                <div>
                  <div className="text-white font-semibold">
                    {current.semester}
                  </div>
                  <div className="text-neutral-400 text-xs mt-1">
                    {current.startDate} - {current.endDate}
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-3xl font-bold text-white">
                    {percentWithBonus}%
                  </div>
                  <div className="text-xs text-neutral-400">Attendance</div>
                </div>
              </div>

              <div className="p-4 space-y-4">
                {/* Progress */}
                <div>
                  <div className="flex justify-between mb-2 text-sm">
                    <span className="text-neutral-300">Overall Attendance</span>
                    <span className="text-neutral-200">
                      {percentWithBonus}%
                    </span>
                  </div>

                  <div className="w-full h-3 bg-neutral-800 rounded-full overflow-hidden">
                    <div
                      className={`h-3 ${
                        percentWithBonus >= 75
                          ? "bg-green-500"
                          : "bg-yellow-500"
                      }`}
                      style={{ width: `${percentWithBonus}%` }}
                    />
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <Stat title="Total Marked" value={total} />
                  <Stat
                    title="Present Count"
                    value={present}
                    color="text-green-400"
                  />
                  <Stat
                    title="Absent Count"
                    value={absent}
                    color="text-red-400"
                  />
                  <Stat
                    title={bonus > 0 ? "Bonus Attendance" : "Attendance %"}
                    value={bonus > 0 ? `+${bonus}` : `${percent}%`}
                    color={bonus > 0 ? "text-green-400" : "text-blue-400"}
                  />
                </div>

                {/* BONUS SECTION */}
                {bonus > 0 && (
                  <div className="rounded-lg border border-green-900 bg-green-950 p-4">
                    <div className="text-green-400 text-sm font-medium">
                      Attendance with Bonus
                    </div>
                    <div className="text-xs text-green-300 mt-1">
                      Formula: (Present + Bonus) × 100 / Total
                    </div>

                    <div className="mt-2 flex justify-between text-sm text-green-200">
                      <span></span>
                      <span>{percentWithBonus}%</span>
                    </div>

                    <div className="w-full h-2 bg-green-900 rounded mt-2">
                      <div
                        className="h-2 bg-green-400"
                        style={{
                          width: `${percentWithBonus}%`,
                        }}
                      />
                    </div>
                  </div>
                )}

                {/* Breakdown */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-neutral-800 pt-4">
                  <div>
                    <div className="text-sm text-neutral-400 mb-2">
                      Status Breakdown
                    </div>

                    <div className="space-y-2">
                      <Breakdown
                        label="Present Count"
                        value={present}
                        color="green"
                      />
                      <Breakdown
                        label="Absent Count"
                        value={absent}
                        color="red"
                      />
                      <Breakdown label="Leave Days" value={0} color="yellow" />
                      <Breakdown
                        label="Intern Leave Days"
                        value={0}
                        color="purple"
                      />
                      {bonus > 0 && (
                        <Breakdown
                          label="Bonus Attendance"
                          value={bonus}
                          color="green"
                        />
                      )}
                    </div>
                  </div>

                  <div>
                    <div className="text-sm text-neutral-400 mb-2">
                      Period Information
                    </div>

                    <Info label="Start Date" value={current.startDate} />
                    <Info label="End Date" value={current.endDate} />
                    <Info
                      label="Duration"
                      value={`${getDuration(
                        current.startDate,
                        current.endDate,
                      )} days`}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* STATUS */}
            <div className="rounded-xl border border-neutral-800 bg-neutral-900">
              {/* Header */}
              <div className="p-4 border-b border-neutral-800">
                <div className="text-white font-semibold">
                  Attendance Status
                </div>
              </div>

              {/* Body */}
              <div className="p-4">
                <div className="text-sm text-neutral-300">
                  {percentWithBonus >= 75 ? (
                    <div className="text-green-400 flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 mt-0.5" />
                      <span>
                        Your attendance is good. Keep up the consistent
                        attendance!
                      </span>
                    </div>
                  ) : (
                    <div className="text-yellow-400 flex items-start gap-2">
                      <AlertTriangle className="w-5 h-5 mt-0.5" />
                      <span>
                        Your attendance is below the desired level. Try to
                        improve your attendance.
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Components
const Stat = ({ title, value, color = "text-white" }) => (
  <div className="rounded-lg border border-neutral-800 bg-neutral-950 p-4">
    <div className="text-neutral-400 text-xs">{title}</div>
    <div className={`text-2xl font-bold mt-1 ${color}`}>{value}</div>
  </div>
);

const colorMap = {
  green: "border-green-800 bg-green-950 text-green-300",
  red: "border-red-800 bg-red-950 text-red-300",
  yellow: "border-yellow-800 bg-yellow-950 text-yellow-300",
  purple: "border-purple-800 bg-purple-950 text-purple-300",
};

const Breakdown = ({ label, value, color }) => (
  <div className="flex items-center justify-between text-sm">
    <span className="text-neutral-300">{label}</span>

    <span
      className={`inline-flex items-center rounded-md border px-2 py-0.5 text-xs ${colorMap[color]}`}
    >
      {value}
    </span>
  </div>
);
const Info = ({ label, value }) => (
  <div className="flex justify-between text-sm mb-2">
    <span className="text-neutral-300">{label}</span>
    <span className="text-neutral-200">{value}</span>
  </div>
);

const getDuration = (start, end) => {
  const s = new Date(start.split("/").reverse().join("-"));
  const e = new Date(end.split("/").reverse().join("-"));
  return Math.ceil((e - s) / (1000 * 60 * 60 * 24));
};

export default SemesterAttendance;

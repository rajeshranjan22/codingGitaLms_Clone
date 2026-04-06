import React, { useState } from "react";
import { Menu, X, ChevronDown, Settings } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { getInitials } from "../utils/helpers";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const data = localStorage.getItem("user");
  const user = data ? JSON.parse(data) : null;

  const initials = getInitials(user?.name);

  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path) =>
    location.pathname === path
      ? "px-3 py-2 rounded-md text-sm font-medium bg-neutral-800 text-white"
      : "px-3 py-2 text-sm text-neutral-300 hover:bg-neutral-800 rounded cursor-pointer";

  return (
    <header className="fixed top-0 inset-x-0 z-50 border-b border-neutral-800 bg-neutral-900/80 backdrop-blur">
      {/* TOP BAR */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">
        {/* LEFT */}
        <div className="flex items-center gap-3">
          {/* LOGO */}
          <div className="w-8 h-8 rounded-full bg-linear-to-br from-blue-500 to-purple-500 flex items-center justify-center text-[10px] font-bold text-white">
            {initials}
          </div>

          <span className="text-white font-semibold">Student</span>

          {/* DESKTOP MENU */}
          <nav className="hidden md:flex items-center gap-1 ml-2">
            <div
              onClick={() => navigate("/student")}
              className={isActive("/student")}
            >
              Dashboard
            </div>

            <div
              onClick={() => navigate("/student/attendance")}
              className={isActive("/student/attendance")}
            >
              Attendance
            </div>

            <div
              onClick={() => navigate("/student/calendar")}
              className={isActive("/student/calendar")}
            >
              Calendar
            </div>

            <div
              onClick={() => navigate("/student/chat")}
              className={isActive("/student/chat")}
            >
              Chat
            </div>

            {/* MORE */}
            <div className="relative group">
              <button className="px-3 py-2 text-sm text-neutral-300 hover:bg-neutral-800 rounded flex items-center gap-1">
                More <ChevronDown size={16} />
              </button>

              <div className="invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-all duration-150 absolute left-0 mt-2 w-50 rounded-lg border border-neutral-800 bg-neutral-900 shadow-xl">
                <div className="p-2 space-y-1">
                  <div
                    onClick={() => navigate("/student/semester-attendance")}
                    className="px-3 py-2 hover:bg-neutral-800 rounded"
                  >
                    Semester Attendance
                  </div>

                  <div
                    onClick={() => navigate("/student/feedback")}
                    className="px-3 py-2 hover:bg-neutral-800 rounded"
                  >
                    Feedback
                  </div>

                  <div
                    onClick={() => navigate("/student/weekly-subject-feedback")}
                    className="px-3 py-2 hover:bg-neutral-800 rounded"
                  >
                    Weekly Subject Feedback
                  </div>

                  <div
                    onClick={() => navigate("/student/apply-leave")}
                    className="px-3 py-2 hover:bg-neutral-800 rounded"
                  >
                    Apply Leave
                  </div>
                </div>
              </div>
            </div>
          </nav>
        </div>

        {/* RIGHT */}
        <div className="flex items-center gap-3">
          {/* SETTINGS */}
          <div className="relative group hidden md:block">
            <button className="p-2 rounded-md text-neutral-300 hover:text-white hover:bg-neutral-800">
              <Settings size={18} />
            </button>

            <div className="invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-all duration-150 absolute right-0 mt-2 w-64 rounded-lg border border-neutral-800 bg-neutral-900 shadow-xl">
              {/* USER */}
              <div className="p-4 border-b border-neutral-800 flex items-center gap-3">
                {user?.image ? (
                  <img
                    src={user.image}
                    alt={user.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-neutral-700 flex items-center justify-center text-xs font-bold">
                    {initials}
                  </div>
                )}

                <div className="text-white text-sm font-medium truncate">
                  {user?.name}
                </div>
              </div>

              {/* MENU */}
              <div className="p-2">
                <div
                  onClick={() => navigate("/student/profile")}
                  className="px-3 py-2 hover:bg-neutral-800 rounded cursor-pointer"
                >
                  View Profile
                </div>

                <div
                  onClick={() => navigate("/login")}
                  className="px-3 py-2 hover:bg-neutral-800 rounded cursor-pointer"
                >
                  Logout
                </div>
              </div>
            </div>
          </div>

          {/* MOBILE BUTTON */}
          <button
            className="md:hidden p-2 rounded-md text-neutral-300 hover:bg-neutral-800"
            onClick={() => setOpen(!open)}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* MOBILE MENU */}
      {open && (
        <div className="md:hidden border-b border-neutral-800 bg-neutral-900 px-4 py-3">
          <div className="flex flex-col gap-1">
            <div
              onClick={() => navigate("/student")}
              className={isActive("/student")}
            >
              Dashboard
            </div>

            <div
              onClick={() => navigate("/student/attendance")}
              className={isActive("/student/attendance")}
            >
              Attendance
            </div>

            <div
              onClick={() => navigate("/student/calendar")}
              className={isActive("/student/calendar")}
            >
              Calendar
            </div>

            <div
              onClick={() => navigate("/student/calendar")}
              className={isActive("/student/chat")}
            >
              Chat
            </div>

            <div className="border-t border-neutral-800 my-2" />

            <div className="px-3 py-2 hover:bg-neutral-800 rounded">
              View Profile
            </div>

            <div className="px-3 py-2 hover:bg-neutral-800 rounded">Logout</div>
          </div>
        </div>
      )}
    </header>
  );
}

import React from "react";
import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";

import Landing from "./pages/Landing";
import Login from "./pages/Login";

import StudentDashboard from "./pages/StudentDashboard";
import StudentAttendance from "./pages/StudentAttendance";
import StudentCalendar from "./pages/StudentCalendar";
import StudentChat from "./pages/StudentChat";
import SemesterAttendance from "./pages/SemesterAttendance";
import StudentFeedback from "./pages/StudentFeedback";
import WeeklySubjectFeedback from "./pages/WeeklySubjectFeedback";
import ApplyLeave from "./pages/ApplyLeave";
import StudentProfile from "./pages/StudentProfile";
import Events from "./pages/Events";
import Assignments from "./pages/Assignments";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />

      {/* Protected Routes */}
      <Route element={<ProtectedRoute />}>
        <Route path="/student" element={<StudentDashboard />} />
        <Route path="/student/attendance" element={<StudentAttendance />} />
        <Route path="/student/calendar" element={<StudentCalendar />} />
        <Route path="/student/chat" element={<StudentChat />} />
        <Route path="/student/events" element={<Events />} />
        <Route path="/student/assignments" element={<Assignments />} />
        <Route path="/student/profile" element={<StudentProfile />} />
        <Route path="/student/apply-leave" element={<ApplyLeave />} />
        <Route
          path="/student/semester-attendance"
          element={<SemesterAttendance />}
        />
        <Route path="/student/feedback" element={<StudentFeedback />} />
        <Route
          path="/student/weekly-subject-feedback"
          element={<WeeklySubjectFeedback />}
        />
      </Route>
    </Routes>
  );
}

export default App;

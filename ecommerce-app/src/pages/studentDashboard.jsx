import React from "react";

import Navbar from "../components/Navbar";
import TopCard from "../components/TopCard";
import AttendanceCard from "../components/AttendanceCard";
import ProfileCard from "../components/ProfileCard";
import SubjectsCard from "../components/SubjectsCard";
import MentorsCard from "../components/MentorsCard";
import AssignmentsCard from "../components/AssignmentsCard";
import EventsCard from "../components/EventsCard";
import SmallCard from "../components/SmallCard";
import { useNavigate } from "react-router-dom";

export default function StudentDashboard() {
  const navigate = useNavigate();

  const data = localStorage.getItem("user");
  const user = data ? JSON.parse(data) : null;

  if (!user) return <div>No user</div>;

  return (
    <div className="min-h-screen pt-20 bg-neutral-950 text-white">
      <Navbar />

      <div className="mx-auto pb-10 max-w-7xl px-4 sm:px-6 lg:px-8 space-y-6">
        {/* TOP CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <TopCard title="University" value={user.university} />
          <TopCard title="UID" value={user.uid} />
          <TopCard title="Subjects" value={user.subjects.length} />
        </div>

        {/* ATTENDANCE */}
        <AttendanceCard attendance={user.attendance[1]} />

        {/* PROFILE + SUBJECTS */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <ProfileCard user={user} />
          <SubjectsCard subjects={user.subjects} />
        </div>

        {/* MENTORS */}
        <MentorsCard mentors={user.mentors} />

        {/* ASSIGNMENTS */}
        <AssignmentsCard
          assignments={user.assignments}
          pending={user.pendingAssignments}
        />

        {/* EVENTS */}
        <EventsCard events={user.events} />

        {/* BOTTOM CARDS */}
        <div className="grid grid-cols-1  sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <SmallCard title="Need help?" text="Contact your mentor" />

          <SmallCard title="Timetable" text="Check classes (coming soon)" />

          <SmallCard
            onClick={() => navigate("/student/chat")}
            title="Chat"
            text="View Chat Groups"
            link
          />
        </div>
      </div>
    </div>
  );
}

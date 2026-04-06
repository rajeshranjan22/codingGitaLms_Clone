import React from "react";
import Navbar from "../components/Navbar";
import { BookOpen } from "lucide-react";

const WeeklySubjectFeedback = () => {
  return (
    <div className="min-h-screen pt-20 bg-neutral-950 text-white">
      <Navbar />

      <div className="max-w-6xl mx-auto p-6 pt-5">
        {/* HEADER */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">
            Weekly Subject Feedback
          </h1>
          <p className="text-neutral-400">
            Share your thoughts on this week's subjects
          </p>
        </div>

        {/* EMPTY STATE CARD */}
        <div className="bg-neutral-800/50 border border-neutral-800 rounded-xl p-12 text-center">
          <BookOpen className="h-16 w-16 text-neutral-500 mx-auto mb-4" />

          <h3 className="text-xl font-semibold text-neutral-300 mb-2">
            All Caught Up!
          </h3>

          <p className="text-neutral-400">
            No subjects available for feedback at this time.
          </p>
        </div>
      </div>
    </div>
  );
};

export default WeeklySubjectFeedback;

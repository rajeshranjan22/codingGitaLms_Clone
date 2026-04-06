import React from "react";
import Navbar from "../components/Navbar";

const StudentChat = () => {
  return (
    <div className="min-h-screen pt-20 bg-neutral-950 text-white">
      <Navbar />

      <div className="mx-auto pb-10 max-w-7xl px-4 sm:px-6 lg:px-8 space-y-6">
        {/* HEADER */}

        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-1">Chat Groups</h1>

          <p className="text-neutral-400 text-sm">
            Groups assigned to you and universal groups.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="text-neutral-400">No groups assigned to you yet.</div>
        </div>
      </div>
    </div>
  );
};

export default StudentChat;

import React from "react";
import FeatureCard from "../components/FeatureCard";
import { useNavigate } from "react-router-dom";

const Landing = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen min-w-screen bg-black flex flex-col items-center justify-center text-center px-6">
      <h1 className="text-6xl font-bold text-white">Coding</h1>

      <h1 className="text-6xl font-bold text-gray-400">Gita</h1>
      <p className="text-gray-400 mt-4 text-lg">
        Smart, simple, and reliable attendance for modern classrooms.
      </p>

      <button
        onClick={() => navigate("/login")}
        className="inline-flex items-center rounded-lg mt-10 px-5 py-3 text-sm font-semibold transition-colors bg-white text-black hover:bg-neutral-200"
      >
        Login
      </button>

      <div className="mt-14 grid gap-6 sm:grid-cols-2">
        <FeatureCard
          title="Role-based dashboards"
          description="Admin, Mentor, and Student experiences tailored to their needs."
        />

        <FeatureCard
          title="Fast and secure access"
          description="Encrypted sessions and streamlined navigation."
        />
      </div>
    </div>
  );
};

export default Landing;

import React, { useState } from "react";
import Navbar from "../components/Navbar";
import {
  Plus,
  User,
  Calendar,
  Clock,
  Check,
  Send,
  FileText,
} from "lucide-react";

const ApplyLeave = () => {
  // Load from localStorage
  const [leaves, setLeaves] = useState(() => {
    return JSON.parse(localStorage.getItem("leaves")) || [];
  });

  const [form, setForm] = useState({
    category: "",
    fromDate: "",
    toDate: "",
    leaveTime: "",
    returnTime: "",
    remark: "",
  });

  const getDays = (from, to) => {
    if (!from || !to) return 0;
    const start = new Date(from);
    const end = new Date(to);
    const diff = end - start;
    return Math.ceil(diff / (1000 * 60 * 60 * 24)) + 1;
  };

  // Handle input
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Submit form
  const handleSubmit = (e) => {
    e.preventDefault();

    const newLeave = {
      ...form,
      id: Date.now(),
      appliedOn: new Date().toLocaleDateString(),
      status: "approved", // you can change to pending
    };

    const updatedLeaves = [newLeave, ...leaves];

    // Save to localStorage
    localStorage.setItem("leaves", JSON.stringify(updatedLeaves));

    // Update UI
    setLeaves(updatedLeaves);

    // Reset form
    setForm({
      category: "",
      fromDate: "",
      toDate: "",
      leaveTime: "",
      returnTime: "",
      remark: "",
    });
  };

  // Stats
  const total = leaves.length;
  const approved = leaves.filter((l) => l.status === "approved").length;
  const pending = leaves.filter((l) => l.status === "pending").length;
  const rejected = leaves.filter((l) => l.status === "rejected").length;

  return (
    <div className="min-h-screen pt-20 bg-neutral-950 text-white">
      <Navbar />

      <div className="px-6 pb-8 max-w-7xl mx-auto">
        {/* HEADER */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-1">Apply for Leave</h1>
          <p className="text-neutral-400">
            Submit your leave application and track your requests
          </p>
        </div>

        {/* STATS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Stat title="Total Applications" value={total} />
          <Stat title="Pending Review" value={pending} color="text-amber-300" />
          <Stat title="Approved" value={approved} color="text-emerald-300" />
          <Stat title="Rejected" value={rejected} color="text-red-300" />
        </div>

        {/* MAIN GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* FORM */}
          <div className="bg-neutral-900 border border-neutral-800 rounded-lg p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-neutral-800 flex items-center justify-center">
                <Plus className="w-4 h-4 text-neutral-400" />
              </div>

              <div>
                <h2 className="text-xl font-semibold">New Leave Application</h2>
                <p className="text-sm text-neutral-400">
                  Fill out the form to submit your leave request
                </p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* CATEGORY */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Leave Category
                </label>
                <select
                  name="category"
                  value={form.category}
                  onChange={handleChange}
                  className="w-full px-3 py-2 rounded bg-neutral-800 border border-neutral-700"
                >
                  <option value="">Select category</option>
                  <option>Hackathon participation</option>
                  <option>Sick leave</option>
                  <option>Travel-related reasons</option>
                  <option>Family functions</option>
                </select>
              </div>

              {/* DATES */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  label="From Date"
                  type="date"
                  name="fromDate"
                  value={form.fromDate}
                  onChange={handleChange}
                />
                <Input
                  label="To Date"
                  type="date"
                  name="toDate"
                  value={form.toDate}
                  onChange={handleChange}
                />
              </div>

              {/* TIME */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  label="Leave Time"
                  type="time"
                  name="leaveTime"
                  value={form.leaveTime}
                  onChange={handleChange}
                />
                <Input
                  label="Return Time"
                  type="time"
                  name="returnTime"
                  value={form.returnTime}
                  onChange={handleChange}
                />
              </div>

              {/* REMARK */}
              <div>
                <label className="block text-sm mb-2">Additional Remarks</label>
                <textarea
                  name="remark"
                  placeholder="Any additiona information for your mentor or admin"
                  value={form.remark}
                  onChange={handleChange}
                  className="w-full px-3 py-2 rounded bg-neutral-800 border border-neutral-700 min-h-22.5"
                />
              </div>

              <button
                type="submit"
                disabled={!form.category}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded bg-blue-600 hover:bg-blue-500 disabled:opacity-50"
              >
                <Send className="w-4 h-4" />
                Submit Leave Application
              </button>
            </form>
          </div>

          {/* REQUEST LIST */}
          <div className="bg-neutral-900 border border-neutral-800 rounded-lg p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-neutral-800 flex items-center justify-center">
                <User className="w-4 h-4 text-neutral-400" />
              </div>

              <div>
                <h2 className="text-xl font-semibold">My Leave Requests</h2>
                <p className="text-sm text-neutral-400">
                  Track the status of your applications
                </p>
              </div>
            </div>

            <div className="space-y-4">
              {leaves.length === 0 && (
                <div className="text-center text-neutral-400">
                  No leave requests yet
                </div>
              )}

              {leaves.map((leave) => (
                <div
                  key={leave.id}
                  className="bg-neutral-900 border border-neutral-800 rounded-lg p-4"
                >
                  {/* TOP */}
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-neutral-800 flex items-center justify-center">
                        <FileText className="w-4 h-4 text-neutral-400" />
                      </div>

                      <div>
                        <h3 className="font-medium text-neutral-100">
                          {leave.category}
                        </h3>
                        <p className="text-sm text-neutral-400">
                          Applied on {leave.appliedOn}
                        </p>
                      </div>
                    </div>

                    {/* STATUS */}
                    <span className="inline-flex items-center gap-1 px-2 py-1 text-xs rounded border bg-emerald-600/20 text-emerald-300 border-emerald-700/50">
                      <Check className="w-3 h-3" />
                      {leave.status}
                    </span>
                  </div>

                  {/* DETAILS GRID */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm mb-3">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-3 h-3 text-neutral-500" />
                      <span className="text-neutral-300">
                        {leave.fromDate} - {leave.toDate}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <Clock className="w-3 h-3 text-neutral-500" />
                      <span className="text-neutral-300">
                        {leave.leaveTime} - {leave.returnTime}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <Clock className="w-3 h-3 text-neutral-500" />
                      <span className="text-neutral-300">
                        {getDays(leave.fromDate, leave.toDate)} days
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <Check className="w-3 h-3 text-neutral-500" />
                      <span className="text-neutral-300">0 credits</span>
                    </div>
                  </div>

                  {/* REMARK */}
                  {leave.remark && (
                    <div className="p-3 bg-neutral-800 rounded border border-neutral-700 space-y-2">
                      <div>
                        <span className="text-xs font-medium text-neutral-400">
                          Remark:
                        </span>
                        <p className="text-sm text-neutral-300 mt-1">
                          {leave.remark}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// COMPONENTS
const Stat = ({ title, value, color = "text-neutral-100" }) => (
  <div className="bg-neutral-900 border border-neutral-800 rounded-lg p-4">
    <div className={`text-2xl font-bold ${color}`}>{value}</div>
    <div className="text-sm text-neutral-400">{title}</div>
  </div>
);

const Input = ({ label, ...props }) => (
  <div>
    <label className="block text-sm mb-2">{label}</label>
    <input
      {...props}
      className="w-full px-3 py-2 rounded bg-neutral-800 border border-neutral-700"
    />
  </div>
);

export default ApplyLeave;

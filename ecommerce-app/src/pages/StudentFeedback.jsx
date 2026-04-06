import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import { Plus, MessageSquare, X } from "lucide-react";
import { getInitials } from "../utils/helpers";

const StudentFeedback = () => {
  const [open, setOpen] = useState(false);

  const data = localStorage.getItem("user");
  const user = data ? JSON.parse(data) : null;

  const initials = getInitials(user?.name);

  const [feedbacks, setFeedbacks] = useState(() => {
    const stored = localStorage.getItem("feedbacks");
    return stored ? JSON.parse(stored) : [];
  });

  const [form, setForm] = useState({
    title: "",
    message: "",
    category: "",
  });

  useEffect(() => {
    localStorage.setItem("feedbacks", JSON.stringify(feedbacks));
  }, [feedbacks]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.title || !form.message || !form.category) return;

    const newFeedback = {
      id: Date.now(),
      ...form,
    };

    setFeedbacks([newFeedback, ...feedbacks]);

    setForm({
      title: "",
      message: "",
      category: "",
    });

    setOpen(false);
  };

  return (
    <div className="min-h-screen pt-20 bg-neutral-950 text-white">
      <Navbar />

      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        {/* HEADER */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">Feedback</h1>

          <button
            onClick={() => setOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors font-medium"
          >
            <Plus className="w-4 h-4" />
            Create Feedback
          </button>
        </div>

        {/* CONTENT */}
        <div className="space-y-6">
          {feedbacks.length === 0 ? (
            <div className="text-center py-12">
              <MessageSquare className="w-16 h-16 text-neutral-600 mx-auto mb-4" />

              <h3 className="text-xl font-semibold text-neutral-400 mb-2">
                No feedback yet
              </h3>

              <p className="text-neutral-500 mb-6">
                Share your thoughts and help us improve!
              </p>

              <button
                onClick={() => setOpen(true)}
                className="px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors font-medium"
              >
                Submit Your First Feedback
              </button>
            </div>
          ) : (
            feedbacks.map((fb) => (
              <div
                key={fb.id}
                className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 shadow-sm hover:shadow-md transition"
              >
                {/* TITLE */}
                <h3 className="text-lg font-semibold text-white mb-4">
                  {fb.title}
                </h3>

                {/* TOP ROW */}
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 rounded-full bg-linear-to-br from-blue-500 to-purple-500 flex items-center justify-center text-[10px] font-bold text-white">
                    {initials}
                  </div>

                  {/* CATEGORY */}
                  <span className="px-3 py-1 text-xs rounded-full bg-blue-500/10 text-blue-400">
                    {fb.category}
                  </span>

                  {/* STATUS */}
                  <span className="px-3 py-1 text-xs rounded-full bg-yellow-500/10 text-yellow-400">
                    Pending
                  </span>
                </div>

                {/* DATE */}
                <p className="text-sm text-neutral-500 mb-4">
                  {new Date(fb.id).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </p>

                {/* DESCRIPTION */}
                <p className="text-neutral-300 leading-relaxed text-sm">
                  {fb.message}
                </p>
              </div>
            ))
          )}
        </div>
      </div>

      {/* MODAL */}
      {open && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-neutral-900 rounded-lg p-6 w-full max-w-md border border-neutral-800">
            {/* HEADER */}
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold">Create Feedback</h2>

              <button
                onClick={() => setOpen(false)}
                className="p-1 hover:bg-neutral-800 rounded"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* FORM */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* HEADING */}
              <div>
                <label className="block text-sm font-medium text-neutral-300 mb-2">
                  Heading
                </label>
                <input
                  type="text"
                  placeholder="Enter feedback heading..."
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  className="w-full px-3 py-2 bg-neutral-800 border border-neutral-700 rounded-lg outline-none"
                />
              </div>

              {/* CATEGORY */}
              <div>
                <label className="block text-sm font-medium text-neutral-300 mb-2">
                  Category
                </label>
                <select
                  value={form.category}
                  onChange={(e) =>
                    setForm({ ...form, category: e.target.value })
                  }
                  className="w-full px-3 py-2 bg-neutral-800 border border-neutral-700 rounded-lg outline-none"
                >
                  <option value="">Select a category</option>
                  <option value="academics">Academics</option>
                  <option value="faculty">Faculty</option>
                  <option value="technical">Technical</option>
                  <option value="infrastructure">Infrastructure</option>
                  <option value="other">Other</option>
                </select>
              </div>

              {/* DESCRIPTION */}
              <div>
                <label className="block text-sm font-medium text-neutral-300 mb-2">
                  Description
                </label>
                <textarea
                  rows="4"
                  placeholder="Describe your feedback..."
                  value={form.message}
                  onChange={(e) =>
                    setForm({ ...form, message: e.target.value })
                  }
                  className="w-full px-3 py-2 bg-neutral-800 border border-neutral-700 rounded-lg outline-none resize-none"
                />
              </div>

              {/* BUTTONS */}
              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="flex-1 px-4 py-2 bg-neutral-700 hover:bg-neutral-600 rounded-lg"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg font-medium"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentFeedback;

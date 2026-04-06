import React, { useState } from "react";
import Navbar from "../components/Navbar";

const StudentProfile = () => {
  const userData = JSON.parse(localStorage.getItem("user")) || {};

  const [user, setUser] = useState(userData);
  const [isEditOpen, setIsEditOpen] = useState(false);

  const [formData, setFormData] = useState({
    imageUrl: user?.image || "",
    address: user?.profile?.address || "Kalol, Gandhinagar",
    currentEmail: user?.email || "",
    parentMobile: user?.profile?.parentMobile || "",

    portfolioLink: user?.profile?.portfolioLink || "",
    resumeLink: user?.profile?.resumeLink || "",
    githubLink: user?.profile?.githubLink || "https://github.com",
    linkedinLink: user?.profile?.linkedinLink || "https://linkedin.com",
    twitterLink: user?.profile?.twitterLink || "https://x.com",
    youtubeLink: user?.profile?.youtubeLink || "https://youtube.com",

    dob: user?.dob || "",
    admissionYear: user?.admissionYear || "",
    currentYear: user?.currentYear || "",
    section: user?.section || "",
  });

  if (!user?.name) {
    return <div className="text-white p-6">No user found</div>;
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleResetPassword = () => {
    alert("Reset password feature coming soon");
  };

  const handleSave = () => {
    const updatedUser = {
      ...user,
      image: formData.imageUrl,
      email: formData.currentEmail,

      dob: formData.dob,
      admissionYear: formData.admissionYear,
      currentYear: formData.currentYear,
      section: formData.section,

      profile: {
        address: formData.address,
        parentMobile: formData.parentMobile,
        portfolioLink: formData.portfolioLink,
        resumeLink: formData.resumeLink,
        githubLink: formData.githubLink,
        linkedinLink: formData.linkedinLink,
        twitterLink: formData.twitterLink,
        youtubeLink: formData.youtubeLink,
      },
    };

    localStorage.setItem("user", JSON.stringify(updatedUser));
    setUser(updatedUser);
    setIsEditOpen(false);
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-white">
      <Navbar />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-8 space-y-6">
        {/* HEADER */}
        <div className="flex items-center justify-between gap-2">
          <div>
            <h1 className="text-2xl font-semibold text-zinc-100">Profile</h1>
            <p className="text-sm text-zinc-400">
              View and update your personal information
            </p>
          </div>

          {/* HEADER BUTTONS */}
          <div className="flex items-center gap-2">
            <button
              onClick={handleResetPassword}
              className="px-3 py-1.5 text-sm rounded-md bg-blue-600 hover:bg-blue-500"
            >
              Reset Password
            </button>

            <button
              onClick={() => setIsEditOpen(true)}
              className="px-3 py-1.5 text-sm rounded-md bg-zinc-800 hover:bg-zinc-700"
            >
              Edit
            </button>
          </div>
        </div>

        {/* MAIN GRID */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* LEFT CARD */}
          <div className="md:col-span-1 p-4 rounded-lg bg-zinc-900/50 border border-zinc-800 flex flex-col items-center gap-3">
            <img
              src={user.image}
              alt="Student avatar"
              className="w-28 h-28 rounded-full object-cover border border-zinc-800"
            />

            <div className="text-center space-y-1">
              <h2 className="text-lg font-medium text-zinc-100">{user.name}</h2>
              <p className="text-sm text-zinc-400">Student</p>
              <p className="text-xs text-zinc-500">
                {user.university} • {user.uid}
              </p>
            </div>

            {/* CARD BUTTONS */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsEditOpen(true)}
                className="px-3 py-1.5 text-sm rounded-md bg-zinc-800 hover:bg-zinc-700 text-white"
              >
                Edit Profile
              </button>

              <button
                onClick={handleResetPassword}
                className="px-3 py-1.5 text-sm rounded-md bg-blue-600 hover:bg-blue-500 text-white"
              >
                Reset Password
              </button>
            </div>
          </div>

          {/* RIGHT GRID */}
          <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Field label="Enrollment Number" value="—" />
            <Field label="Course" value="—" />
            <Field label="Branch" value="—" />
            <Field label="Semester" value="—" />
            <Field label="Gender" value="—" />
            <FieldLink label="Alternate Email" value={user.email} />
            <Field label="Alternate Phone" value="—" />
            <Field label="Guardian" value="—" />
          </div>
        </div>

        {/* CONTACT */}
        <Section title="Contact & Links">
          <Field label="Mobile" value={user.mobile} highlight />
          <Field label="Parent Mobile" value={user.profile?.parentMobile} />
          <FieldLink label="University Email" value={user.email} />
          <FieldLink label="Current Email" value={user.email} />
          <Field label="Address" value={user.profile?.address} highlight />
          <FieldLink label="Portfolio" value={user.profile?.portfolioLink} />
          <FieldLink label="Resume" value={user.profile?.resumeLink} />
          <FieldLink label="Github" value={user.profile?.githubLink} />
          <FieldLink label="LinkedIn" value={user.profile?.linkedinLink} />
          <FieldLink label="Twitter" value={user.profile?.twitterLink} />
          <FieldLink label="YouTube" value={user.profile?.youtubeLink} />
        </Section>

        {/* ACADEMICS */}
        <Section title="Academics">
          <Field label="University" value={user.university} highlight />
          <Field label="University UID" value={user.uid} highlight />
          <Field label="Date of Birth" value={user.dob} />
          <Field label="Admission Year" value={user.admissionYear} />
          <Field label="Current Year" value={user.currentYear} />
          <Field label="Section" value={user.section} />

          <div className="flex flex-col gap-1 p-3 rounded-md bg-zinc-900/40 border border-zinc-800">
            <span className="text-xs uppercase tracking-wide text-zinc-400">
              Subjects
            </span>
            <span
              className="block text-sm text-zinc-100 truncate"
              title={user.subjects?.map((s) => s.code).join(", ")}
            >
              {user.subjects?.map((s) => s.code).join(", ") || "—"}
            </span>
          </div>

          <Field
            label="Mentors"
            value={user.mentors?.map((m) => m.name).join(", ")}
            highlight
          />
        </Section>
      </div>

      {/* MODAL */}
      {isEditOpen && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="w-full max-w-2xl bg-zinc-950 border border-zinc-800 rounded-xl shadow-xl">
            <div className="flex items-center justify-between px-4 py-3 border-b border-zinc-800">
              <h3 className="text-zinc-100 font-medium">Edit Profile</h3>
              <button onClick={() => setIsEditOpen(false)}>✕</button>
            </div>

            <div className="max-h-[70vh] overflow-y-auto p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Avatar URL"
                name="imageUrl"
                placeholder="https://..."
                value={formData.imageUrl}
                onChange={handleChange}
              />
              <Input
                label="Address"
                name="address"
                placeholder="Your address"
                value={formData.address}
                onChange={handleChange}
              />
              <Input
                label="Current Email"
                name="currentEmail"
                placeholder="you@example.com"
                value={formData.currentEmail}
                onChange={handleChange}
              />
              <Input
                label="Parent Mobile (Optional)"
                name="parentMobile"
                placeholder="10-digit parent mobile"
                value={formData.parentMobile}
                onChange={handleChange}
              />

              <Input
                label="Portfolio Link"
                name="portfolioLink"
                placeholder="https://..."
                value={formData.portfolioLink}
                onChange={handleChange}
              />
              <Input
                label="Resume Link"
                name="resumeLink"
                placeholder="https://..."
                value={formData.resumeLink}
                onChange={handleChange}
              />
              <Input
                label="Github Link"
                name="githubLink"
                placeholder="https://github.com/..."
                value={formData.githubLink}
                onChange={handleChange}
              />
              <Input
                label="LinkedIn Link"
                name="linkedinLink"
                placeholder="https://linkedin.com/in/..."
                value={formData.linkedinLink}
                onChange={handleChange}
              />

              <Input
                label="Twitter Link"
                name="twitterLink"
                value={formData.twitterLink}
                onChange={handleChange}
              />

              <Input
                label="YouTube Link"
                name="youtubeLink"
                value={formData.youtubeLink}
                onChange={handleChange}
              />
            </div>

            <div className="flex items-center justify-end gap-2 px-4 py-3 border-t border-zinc-800">
              <button
                onClick={() => setIsEditOpen(false)}
                className="px-3 py-1.5 bg-zinc-800 rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-3 py-1.5 bg-blue-600 rounded"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentProfile;

// Reusable Components

const Section = ({ title, children }) => (
  <div className="p-4 rounded-lg bg-zinc-900/50 border border-zinc-800 space-y-4">
    <h2 className="text-lg font-medium text-zinc-100">{title}</h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">{children}</div>
  </div>
);

const Field = ({ label, value, highlight }) => (
  <div className="flex flex-col gap-1 p-3 rounded-md bg-zinc-900/40 border border-zinc-800">
    <span className="text-xs text-zinc-400">{label}</span>
    <span className={`text-sm ${highlight ? "text-white" : "text-zinc-500"}`}>
      {value || "—"}
    </span>
  </div>
);

const FieldLink = ({ label, value }) => (
  <div className="flex flex-col gap-1 p-3 rounded-md bg-zinc-900/40 border border-zinc-800">
    <span className="text-xs text-zinc-400">{label}</span>
    {value ? (
      <a
        href={value}
        target="_blank"
        rel="noreferrer"
        className="text-blue-400 text-sm"
      >
        {value}
      </a>
    ) : (
      <span className="text-zinc-500 text-sm">—</span>
    )}
  </div>
);

const Input = ({ label, name, value, onChange, placeholder }) => (
  <div>
    <label className="block text-xs text-zinc-400 mb-1">{label}</label>
    <input
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="w-full bg-zinc-900 border border-zinc-800 rounded-md px-3 py-2 text-sm text-white"
    />
  </div>
);

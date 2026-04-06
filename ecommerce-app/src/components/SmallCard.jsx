import React from "react";

export default function SmallCard({ title, text, link = false, onClick }) {
  return (
    <div
      onClick={onClick}
      className={`rounded-xl border border-neutral-800 bg-neutral-900
      ${link ? "cursor-pointer hover:bg-neutral-800" : ""}
      `}
    >
      <div className="p-4">
        <div className="text-neutral-400 text-sm">{title}</div>

        <div
          className={`text-white text-base mt-1
          ${link ? "hover:underline" : ""}
          `}
        >
          {text}
        </div>
      </div>
    </div>
  );
}

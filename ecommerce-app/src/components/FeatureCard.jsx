import React from "react";

const FeatureCard = ({ title, description }) => {
  return (
    <div className="rounded-xl border border-white/10 bg-white/5 p-5 text-left">
      <h3 className="text-white text-lg font-semibold">{title}</h3>

      <p className="mt-2 text-sm text-neutral-300">{description}</p>
    </div>
  );
};

export default FeatureCard;

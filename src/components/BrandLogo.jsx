import React from "react";

const BrandLogo = ({ className = "" }) => {
  return (
    <span
      className={`font-mono font-bold tracking-tighter text-primary ${className}`}
    >
      OBSCODE<span className="text-accent-purple">.</span>
    </span>
  );
};

export default BrandLogo;

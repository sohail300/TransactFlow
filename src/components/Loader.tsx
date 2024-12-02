import React from "react";

const Loader = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center">
      <div className="relative w-24 h-24">
        <svg
          className="w-full h-full animate-[spin_2s_linear_infinite]"
          viewBox="25 25 50 50"
        >
          <circle
            className="animate-[dash_1.5s_ease-in-out_infinite,color_6s_ease-in-out_infinite]"
            cx="50"
            cy="50"
            r="20"
            fill="none"
            strokeWidth="2"
            strokeMiterlimit="10"
            strokeDasharray="1, 200"
            strokeDashoffset="0"
            strokeLinecap="round"
          />
        </svg>
      </div>
    </div>
  );
};

export default Loader;

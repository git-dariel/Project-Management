import React from "react";

const WeightBar = ({ weight, getWeightBackgroundColor }) => {
  return (
    <div className="flex items-center">
      <div className="mx-1 flex flex-col items-center">
        <span className="text-l text-blue-600 font-semibold mb-1">Weight</span>
        <div className="relative">
          <div className="w-44 h-10 overflow-hidden rounded-full bg-gray-200 shadow-lg">
            <div
              className={`h-full bg-blue-300 ${getWeightBackgroundColor()}`}
              style={{
                width: `${weight}%`,
                transition: "width 0.5s ease",
              }}
            >
              <span className="absolute inset-0 flex items-center justify-center text-xs text-blue-600 font-semibold">
                {weight}%
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeightBar;

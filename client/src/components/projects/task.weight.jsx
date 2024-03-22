import React from "react";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const WeightBar = ({ weight, getWeightBackgroundColor }) => {
  return (
    <div className="flex items-center">
      <div className="mx-1 flex flex-col items-center">
        <span className="text-l text-blue-600 font-semibold mb-1">Weight</span>
        <div className="w-32 h-32">
          <CircularProgressbar
            value={weight}
            text={`${weight}%`}
            styles={{
              root: { width: "100%" },
              path: { stroke: "#3498db" },
              trail: { stroke: "#d6d6d6" },
              text: { fill: "#2d3748", fontSize: "16px" },
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default WeightBar;

import React from "react";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { ResponsiveContainer } from "recharts";

const Progress = () => {
  const progressData = 75; //just to visualize progress
  return (
    <div>
      <section>
        <ResponsiveContainer
          width="100%"
          height={300}
          className={
            "bg-transparent p-4 rounded-lg shadow-md mb-4 flex flex-col items-center relative"
          }
        >
          <div className="flex m-5 sm:w-56 md:min-w-56 lg:w-56">
            <CircularProgressbar
              value={progressData}
              text={`${progressData}%`}
              styles={{
                root: {
                  width: "100%",
                  filter: "drop-shadow(0px 0px 10px rgba(50, 50, 50, 0.7))",
                },
                path: {
                  stroke: "#2d3748",
                  strokeLinecap: "round",
                  transition: "stroke-dashoffset 0.5s ease 0s",
                },
                trail: { stroke: "none" },
                text: {
                  fill: "#2d3748",
                  fontSize: 20,
                  dominantBaseline: "middle",
                  textAnchor: "middle",
                },
              }}
            />
          </div>
        </ResponsiveContainer>
      </section>
    </div>
  );
};

export default Progress;

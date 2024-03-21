import React from "react";

const TaskProgressBar = ({ progress }) => {
  return (
    <div className="flex items-center">
      <div className="mx-1 flex flex-col items-center">
        <span className="text-l text-blue-600 font-semibold mb-1">
          {progress === 100 ? "Done" : "Progress"}
        </span>
        <div className="relative">
          <div className="w-44 h-10 overflow-hidden rounded-full bg-gray-200 shadow-lg">
            <div
              className={`h-full ${
                progress === 100 ? "bg-green-500" : "bg-blue-300"
              }`}
              style={{
                width: `${progress}%`,
                transition: "width 0.5s ease",
              }}
            >
              {progress === 100 ? (
                <span className="absolute inset-0 flex items-center justify-center text-xs text-blue-600">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </span>
              ) : (
                <span className="absolute inset-0 flex items-center justify-center text-xs text-blue-600">
                  {progress}%
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskProgressBar;

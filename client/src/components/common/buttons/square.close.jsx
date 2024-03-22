import React from "react";

const SquareClose = ({ onClick }) => {
  return (
    <div className="flex justify-center pt-4">
      {/* component */}
      <button
        type="button"
        className="bg-gray-300 rounded-md p-1 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset transition-all duration-150"
        onClick={onClick}
      >
        <span className="sr-only">Close menu</span>

        <svg
          className="h-6 w-6"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
    </div>
  );
};

export default SquareClose;

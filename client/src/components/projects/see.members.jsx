import React from "react";
import ThreeDot from "../common/buttons/threedots";
import { members } from "@/test-data/task.members.data";

function MembersCard() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center relative">
      <div className="p-4  lg:w-[500px] bg-white rounded-lg border shadow-md sm:p-8 dark:bg-gray-800 dark:border-gray-700">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold leading-none text-gray-900 dark:text-white">
            Task members
          </h3>
        </div>
        <div className="flow-root">
          <ul
            role="list"
            className="divide-y divide-gray-200 dark:divide-gray-700"
          >
            {members.map((member) => (
              <li key={member.id} className="py-3 sm:py-4">
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0">
                    <img
                      className="w-8 h-8 rounded-full"
                      src={member.image}
                      alt={member.name}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                      {member.name}
                    </p>
                    <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                      {member.role}
                    </p>
                  </div>
                  {/* Action button with dropdown menu */}
                  <ThreeDot />
                </div>
              </li>
            ))}
          </ul>
        </div>
        {/* Add member button */}
        <div className="mt-4">
          <button
            className="block w-full px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            onClick={() => console.log("Add member clicked")}
          >
            Add member
          </button>
        </div>
      </div>
    </div>
  );
}

export default MembersCard;

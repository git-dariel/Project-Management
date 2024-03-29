import React from "react";

const GroupMembersSnip = ({ members }) => {
  // Extracting the first few members for display
  const truncatedMembers = members.slice(0, 3);

  // Determining the remaining count of members
  const remainingCount = members.length - 3;

  return (
    <div className="flex space-x-[-6px]">
      {/* Displaying a snippet of pfps */}
      {truncatedMembers.map((member, index) => (
        <div
          key={member.id}
          className={`relative w-6 h-6 rounded-full overflow-hidden ${
            index > 0 ? "-ml-4" : ""
          }`}
        >
          <img
            className="w-full h-full object-cover"
            src={member.image}
            alt={member.name}
          />
        </div>
      ))}
      {/* Displaying the remaining count if any */}
      {remainingCount > 0 && (
        <div className="relative w-6 h-6 rounded-full overflow-hidden -ml-4 bg-gray-200 flex items-center justify-center text-gray-500 font-semibold">
          +{remainingCount}
        </div>
      )}
    </div>
  );
};

export default GroupMembersSnip;

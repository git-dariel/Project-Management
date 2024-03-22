import React from "react";

const MembersSnip = ({ members }) => {
  // Extracting the first few members for display
  const truncatedMembers = members.slice(0, 3);

  // Determining the remaining count of members
  const remainingCount = members.length - 3;

  // Concatenating truncated member names
  const truncatedNames = truncatedMembers
    .map((member) => member.name)
    .join(", ");

  // Generating the snippet information
  const snippetInfo =
    remainingCount > 0
      ? `${members.length} task members (${truncatedNames}, and ${remainingCount} more)`
      : `${members.length} task members (${truncatedNames})`;

  return (
    <div className="flex items-center space-x-[-8px]">
      {/* Displaying up to 3 profile pictures */}
      {truncatedMembers.map((member, index) => (
        <div
          key={member.id}
          className={`relative w-8 h-8 rounded-full overflow-hidden ${
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
        <div className="relative w-8 h-8 rounded-full overflow-hidden -ml-4 bg-gray-200 flex items-center justify-center text-gray-500 font-semibold">
          +{remainingCount}
        </div>
      )}
      {/* Displaying the snippet information */}
      <p className="text-sm font-medium text-gray-900 truncate">
        {snippetInfo}
      </p>
    </div>
  );
};

export default MembersSnip;

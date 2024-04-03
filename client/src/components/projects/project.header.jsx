import React from "react";

const ProjectHeader = ({ project }) => {
  return (
    <div className="bg-white p-2 w-full shadow-lg z-10">
      <div className="grid grid-cols-4">
        <div className="mx-2">
          {/* <h1 className="text-xl text-gray-800 font-bold"> {project.name} </h1>
          <p className="text-l text-gray-500 font-semibold"> {project.code} </p> */}
          <button className="p-4 rounded-md bg-blue-500 text-white">
            Add task
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProjectHeader;

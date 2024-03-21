import React from "react";

const ProjectHeader = ({ project }) => {
  return (
    <div className="bg-white p-2 w-full shadow-lg z-10">
      <div className="grid grid-cols-4">
        <div className="mx-2">
          <h1 className="text-xl text-gray-800 font-bold"> {project.name} </h1>
          <p className="text-l text-gray-500 font-semibold"> {project.code} </p>
          <p className="text-l text-gray-800 font-semibold">
            {" "}
            Bryan Ron Hernandez
          </p>
        </div>
        <div>col2</div>
      </div>
    </div>
  );
};

export default ProjectHeader;

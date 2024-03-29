import { PlusCircle } from "lucide-react";
import React, { useEffect, useState } from "react";
import CreateNew from "../components/forms/new.project";
import { Link } from "react-router-dom";
import Sidebar from "../components/layout/side-bar";
import projectService from "@/services/project.service";
import ConfirmSignOut from "@/components/common/dialogs/signout.confirm";

function Projects() {
  const [projects, setProjects] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);

  const openAlertDialog = () => {
    setDialogOpen(true);
  };

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const fetchedProjects = await projectService.getAllProjects();
        setProjects(fetchedProjects);
      } catch (error) {
        console.error("Failed to fetch projects:", error.message);
      }
    }
    fetchData();
  }, []);

  return (
    <Sidebar confirmSignout={openAlertDialog}>
      <div className="flex flex-col h-screen relative bg-gradient-to-tl from-slate-50 to-slate-400 overflow-y-auto">
        <ConfirmSignOut
          isOpen={dialogOpen}
          onClose={() => setDialogOpen(false)}
        />
        <div
          className="flex flex-col h-full m-5 p-4 rounded-2xl overflow-y-auto scroll-m-0"
          style={{
            background: " rgba(255, 255, 255, 0.54)",
            scrollbarWidth: "none",
          }}
        >
          <div className="header mb-4">
            <div className="text-2xl font-bold text-gray-700 mb-2">
              All Projects
            </div>
            <button
              onClick={toggleModal}
              className="bg-transparent text-blue-500 text-sm font-semibold border-none ml-auto hover:text-blue-700 transition duration-300 ease-in-out"
            >
              Create New <PlusCircle className="inline-block ml-1 h-5 w-5" />
            </button>
          </div>

          <CreateNew isOpen={isOpen} toggleModal={toggleModal} />
          <div>
            <div>
              <div
                className="font-semibold my-2 py-4"
                style={{ boxShadow: "0px 5px 5px -5px rgba(0, 0, 0, 0.2)" }}
              >
                Recent
              </div>
              {/* Recent projects content */}
              <div
                className="m-4 overflow-y-auto max-h-20"
                style={{ scrollbarWidth: "none" }}
              >
                {projects.map((project) => (
                  <Link
                    to={`/projects/${project.id}`}
                    key={project.id}
                    className="text-gray-800"
                  >
                    <div className="grid grid-cols-4 items-center border-b p-3 cursor-pointer hover:bg-gray-200 transition-all duration-300 ease-in-out">
                      <div className="font-semibold text-gray-700">
                        {project.name}
                      </div>
                      <div className="text-gray-500">{project.code}</div>
                      <div className="text-gray-500 text-end col-span-2">
                        {project.date}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            <div>
              <div
                className="font-semibold my-2 py-4"
                style={{ boxShadow: "0px 5px 5px -5px rgba(0, 0, 0, 0.2)" }}
              >
                All Projects
              </div>
              {/* All projects content */}
              <div className="m-4 overflow-y-auto max-h-80">
                {projects.map((project) => (
                  <Link
                    to={`/projects/${project.id}`}
                    key={project.id}
                    className="text-gray-800"
                  >
                    <div className="grid grid-cols-4 items-center border-b p-3 cursor-pointer hover:bg-gray-200 transition-all duration-400 ease-in-out">
                      <div className="font-semibold text-gray-700">
                        {project.name}
                      </div>
                      <div className="text-gray-500">{project.code}</div>
                      <div className="text-gray-500 text-end col-span-2">
                        {project.date}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Sidebar>
  );
}

export default Projects;

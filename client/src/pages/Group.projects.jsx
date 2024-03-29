import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import projectService from "@/services/project.service";
import Sidebar from "../components/layout/side-bar";
import { dummyGroups } from "@/test-data/groups.data";
import GroupMembersSnip from "@/components/groups/members.pfp";
import ConfirmSignOut from "@/components/common/dialogs/signout.confirm";

const GroupProjects = () => {
  const { groupId } = useParams();
  const [projects, setProjects] = useState([]);
  const [group, setGroup] = useState(null); // Added state for selected group
  const [dialogOpen, setDialogOpen] = useState(false);

  const openAlertDialog = () => {
    setDialogOpen(true);
  };

  useEffect(() => {
    async function fetchProjects() {
      try {
        const fetchedProjects = await projectService.getProjectsByGroup(
          groupId
        );
        setProjects(fetchedProjects);
      } catch (error) {
        console.error("Failed to fetch projects:", error.message);
      }
    }

    // Find the selected group and set it in state
    const selectedGroup = dummyGroups.find(
      (group) => group.id === parseInt(groupId)
    );
    setGroup(selectedGroup);

    fetchProjects();
  }, [groupId]);

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
            background: "rgba(255, 255, 255, 0.54)",
            scrollbarWidth: "none",
          }}
        >
          <div className="flex flex-col mb-4">
            <div className="text-2xl font-bold text-gray-800 mb-2">
              Your Projects
            </div>
            {/* Display member avatars if group is selected */}
            {group && <GroupMembersSnip members={group.members} />}
          </div>
          <div className="m-4 overflow-y-auto max-h-80">
            {projects.map((project) => (
              <Link
                to={`/groups/${groupId}/projects/${project.id}`}
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
    </Sidebar>
  );
};

export default GroupProjects;

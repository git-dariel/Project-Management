import React, { useEffect, useRef, useState } from "react";
import "@bitnoi.se/react-scheduler/dist/style.css";
import { Scheduler } from "@bitnoi.se/react-scheduler";
import { mockedSchedulerData } from "../test-data/data.js";
import { useParams } from "react-router-dom";
import { dummyProjects } from "../test-data/data.js";
import Sidebar from "../components/layout/side-bar.jsx";
import ProjectHeader from "../components/projects/project.header.jsx";
import TaskDrawer from "../components/projects/task.drawer.jsx";
import ConfirmSignOut from "@/components/common/dialogs/signout.confirm.jsx";

const ProjectView = () => {
  const { projectId } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [filterButtonState, setFilterButtonState] = useState(0);
  const [progress, setProgress] = useState(0);
  const [weight, setWeight] = useState(0);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);

  const openAlertDialog = () => {
    setDialogOpen(true);
  };

  const project = dummyProjects.find(
    (project) => project.id === parseInt(projectId)
  );

  if (!project) {
    return <div>Project not found</div>;
  }

  // Color indicator for weight
  const getWeightBackgroundColor = () => {
    if (weight <= 25) {
      return "bg-green-300"; // Good weight (green)
    } else if (weight <= 50) {
      return "bg-yellow-300"; // Moderate weight (yellow)
    } else if (weight <= 75) {
      return "bg-orange-300"; // High weight (orange)
    } else {
      return "bg-red-300"; // Worst weight (red)
    }
  };

  const openDrawer = (clickedResource) => {
    setProgress(clickedResource.progress);
    setWeight(clickedResource.weight);
    setIsDrawerOpen(true);
  };
  const drawerRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (drawerRef.current && !drawerRef.current.contains(event.target)) {
        setIsDrawerOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <Sidebar confirmSignout={openAlertDialog}>
      <div className="flex flex-col h-screen bg-gray-200 relative">
        <ConfirmSignOut
          isOpen={dialogOpen}
          onClose={() => setDialogOpen(false)}
        />
        {/* Top navigation/Header */}
        <ProjectHeader project={project} />

        <div ref={drawerRef}>
          <TaskDrawer
            isOpen={isDrawerOpen}
            onClose={() => setIsDrawerOpen(false)}
            progress={progress}
            weight={weight}
            getWeightBackgroundColor={getWeightBackgroundColor}
          />
        </div>

        {/* Main content/React-scheduler component */}
        <div className="relative h-full mt-1">
          <Scheduler
            data={mockedSchedulerData}
            isLoading={isLoading}
            onRangeChange={(newRange) => console.log(newRange)}
            onTileClick={openDrawer}
            onItemClick={(item) => {
              setProgress(item.progress);
              setWeight(item.weight);
            }}
            onFilterData={() => {
              // Some filtering logic...
              setFilterButtonState(1);
            }}
            onClearFilterData={() => {
              // Some clearing filters logic...
              setFilterButtonState(0);
            }}
            config={{
              zoom: 0,
              filterButtonState,
            }}
          />
        </div>
      </div>
    </Sidebar>
  );
};

export default ProjectView;

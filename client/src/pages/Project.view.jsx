import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useParams } from "react-router-dom";
import Sidebar from "../components/layout/side-bar.jsx";
import TaskDrawer from "../components/projects/task.drawer.jsx";
import ConfirmSignOut from "@/components/common/dialogs/signout.confirm.jsx";
import { Scheduler } from "@bitnoi.se/react-scheduler";
import { ResponsiveContainer } from "recharts";

const ProjectView = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [filterButtonState, setFilterButtonState] = useState(0);
  const [progress, setProgress] = useState(0);
  const [weight, setWeight] = useState(0);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [schedulerData, setSchedulerData] = useState([]);

  const { projectId } = useParams();

  const openAlertDialog = useCallback(() => {
    setDialogOpen(true);
  }, []);

  // Color indicator for weight
  const getWeightBackgroundColor = useCallback(() => {
    if (weight <= 25) {
      return "bg-green-300"; // Good weight (green)
    } else if (weight <= 50) {
      return "bg-yellow-300"; // Moderate weight (yellow)
    } else if (weight <= 75) {
      return "bg-orange-300"; // High weight (orange)
    } else {
      return "bg-red-300"; // Worst weight (red)
    }
  }, [weight]);

  const openDrawer = useCallback((clickedResource) => {
    setProgress(clickedResource.progress);
    setWeight(clickedResource.weight);
    setIsDrawerOpen(true);
  }, []);

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
        <ResponsiveContainer>
          <div className="absolute left-80 top-2 z-20">
            <button className="px-2 py-1 bg-blue-500 rounded-md text-sm text-white">
              Create new
            </button>
          </div>
          <Scheduler
            data={schedulerData}
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
        </ResponsiveContainer>
      </div>
    </Sidebar>
  );
};

export default ProjectView;

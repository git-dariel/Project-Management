import React, { useEffect, useState } from "react";
import ComingSoon from "../components/test/comingsoon";
import { cardData, projectAgingAnalysisData } from "../test-data/data";
import Cards from "../components/dashboard/cards";
import UserDropdown from "../components/users/profile";
import ProjectAgingChart from "../components/dashboard/aging";
import Sidebar from "../components/layout/side-bar";
import Progress from "../components/dashboard/progress";
import StatusCard from "@/components/dashboard/updates";
import ConfirmSignOut from "@/components/common/dialogs/signout.confirm";

function Dashboard() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const openAlertDialog = () => {
    setDialogOpen(true);
  };

  return (
    <Sidebar confirmSignout={openAlertDialog}>
      <div className="flex flex-col h-screen relative bg-gradient-to-tl from-slate-50 to-slate-400 overflow-y-auto">
        {/* <ComingSoon/> */}
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
          {/* Header */}
          <section>
            <div className="flex justify-between gap-2 mb-1">
              <h1 className="text-2xl font-bold text-gray-800 mb-1">
                Dashboard
              </h1>
              <UserDropdown confirmSignout={openAlertDialog} />
            </div>
          </section>

          {/* Cards */}
          <section>
            <Cards data={cardData} />
          </section>
          {/* Chart */}
          <section>
            <div className="grid grid-cols-1 gap-4 transition-all lg:grid-cols-2">
              {/* Project Aging Chart */}
              <div className="mb-4">
                <h2 className="text-xl font-semibold text-gray-800 mb-2">
                  Project Aging Analysis
                </h2>
                <ProjectAgingChart data={projectAgingAnalysisData} />
              </div>

              {/* Progress */}
              <div>
                <h2 className="text-xl font-semibold text-gray-800 mb-2">
                  Overall Progress
                </h2>
                <Progress />
              </div>
            </div>
          </section>

          <section>
            <div className="transition-all">
              <StatusCard />
            </div>
          </section>
        </div>
      </div>
    </Sidebar>
  );
}

export default Dashboard;

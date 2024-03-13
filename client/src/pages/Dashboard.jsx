import React from 'react';
import ComingSoon from '../ui/comingsoon';
import { cardData, projectAgingAnalysisData } from '../dummy/data';
import Cards from '../components/dashboard/cards';
import UserDropdown from '../ui/users/profile';
import ProjectAgingChart from '../components/dashboard/aging';
import Sidebar from '../components/layout/side-bar';

function Dashboard() {

  return (
    <Sidebar>
      <div className="flex flex-col h-screen relative bg-gradient-to-tl from-slate-50 to-slate-400 overflow-auto">
      {/* <ComingSoon/> */}
      <div className="h-full m-5 p-4 rounded-2xl" style={{background:" rgba(255, 255, 255, 0.54)"}}>
        
        {/* Header */}
        <div className="flex justify-between gap-2 mb-1">
        <h1 className="text-2xl font-bold text-gray-800 mb-1">Dashboard</h1>
        <UserDropdown/>
        </div>
        <Cards data={cardData} />
        
        {/* Chart */}
        <div>
          <h1 className="text-xl font-semibold text-gray-600 mb-1">Overview</h1>
          <ProjectAgingChart data={projectAgingAnalysisData}/>
        </div>
      </div>
    </div>
    </Sidebar>
  );
}

export default Dashboard;

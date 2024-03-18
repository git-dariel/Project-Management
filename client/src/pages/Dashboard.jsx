import React from 'react';
import ComingSoon from '../components/test/comingsoon';
import { cardData, progressData, projectAgingAnalysisData } from '../test-data/data';
import Cards from '../components/dashboard/cards';
import UserDropdown from '../components/users/profile';
import ProjectAgingChart from '../components/dashboard/aging';
import Sidebar from '../components/layout/side-bar';
import Progress from '../components/dashboard/progress';

function Dashboard() {

  return (
    <Sidebar>
      <div className="flex flex-col h-screen relative bg-gradient-to-tl from-slate-50 to-slate-400 overflow-y-auto">
      {/* <ComingSoon/> */}
      <div className="flex flex-col h-full m-5 p-4 rounded-2xl overflow-y-auto" style={{background:" rgba(255, 255, 255, 0.54)"}}>
        
        {/* Header */}
        <section>
        <div className="flex justify-between gap-2 mb-1">
        <h1 className="text-2xl font-bold text-gray-800 mb-1">Dashboard</h1>
        <UserDropdown/>
        </div>
        </section>

        {/* Cards */}
       <section>
        <Cards data={cardData} />
       </section>
        {/* Chart */}
        <section>
          <div className='grid grid-cols-1 gap-4 transition-all lg:grid-cols-2'>
          <ProjectAgingChart data={projectAgingAnalysisData}/>
          <Progress/>
          </div>
        </section>   
      </div>
    </div>
    </Sidebar>
  );
}

export default Dashboard;

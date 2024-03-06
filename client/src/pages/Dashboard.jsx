import React, { useState } from 'react';
import ProgressCard from '../components/dashboard/progress';
import StatusCard from '../components/dashboard/status';
import ComingSoon from '../ui/comingsoon';

function Dashboard() {
  const [selectedGroup, setSelectedGroup] = useState(null);

  const handleGroupChange = (groupName) => {
    setSelectedGroup(groupName);
  };

  return (
    <div className="flex flex-col h-full relative bg-gradient-to-tl from-slate-50 to-slate-400">
      <ComingSoon/>
      <div className="h-full m-5 p-4 rounded-2xl" style={{background:" rgba(255, 255, 255, 0.54)"}}>
        <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
        <div className="grid grid-cols-2 grid-rows-2">
          {/* left column */}
          <div className='w-64 h-64'>
          <ProgressCard groupName={"Group A"}/>
          </div>

          <div className="col-start-1 row-start-2">
          <StatusCard/>
          </div>

          {/* right column */}
          <div className='row-span-2 col-start-2 row-start-1'>right col</div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;

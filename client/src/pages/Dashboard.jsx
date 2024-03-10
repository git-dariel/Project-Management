import React, { useState } from 'react';
import ComingSoon from '../ui/comingsoon';
import { cardData } from '../dummy/data';
import Cards from '../components/dashboard/cards';
import { UserCircle } from 'lucide-react';

function Dashboard() {

  return (
    <div className="flex flex-col h-full relative bg-gradient-to-tl from-slate-50 to-slate-400">
      {/* <ComingSoon/> */}
      <div className="h-full m-5 p-4 rounded-2xl" style={{background:" rgba(255, 255, 255, 0.54)"}}>
        <div className="flex justify-between gap-2">
        <h1 className="text-2xl font-bold text-gray-800 mb-1">Dashboard</h1>
        <UserCircle/>
        </div>
        <Cards data={cardData} />
      </div>
    </div>
  );
}

export default Dashboard;

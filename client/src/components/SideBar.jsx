import React, { useState } from "react";
import { Home, Briefcase, Bell, User, LogOut, ChevronLeft, ChevronRight, GroupIcon, Users, LayoutDashboardIcon } from "lucide-react";

const Sidebar = ({ children }) => {
  const [isMinimized, setIsMinimized] = useState(true);

  const toggleSidebar = () => {
    setIsMinimized(!isMinimized);
  };

  return (
    <div className="flex">
      {/* Sidebar Content */}
      <div className={`w-${isMinimized ? '16' : '60'} bg-gray-800 h-screen text-white relative transition-all duration-300 ease-in-out`}>
        {/* Toggle Button */}
        <div className="py-4 px-6 flex justify-between items-center">
          <button onClick={toggleSidebar} className="focus:outline-none">
            {isMinimized ? <ChevronRight className="h-6 w-6" /> : <ChevronLeft className="h-6 w-6" />}
          </button>
        </div>

        {/* Sidebar Items */}
        <ul>
          <li className="py-4 px-6">
            <a href="/dashboard" className={`flex items-center hover:text-gray-400 ${isMinimized ? 'justify-center' : ''}`}>
              <LayoutDashboardIcon className={`h-6 w-6 ${isMinimized ? 'mr-0' : 'mr-2'}`} />
              {!isMinimized && <span>Dashboard</span>}
            </a>
          </li>
          <li className="py-4 px-6">
            <a href="/projects" className={`flex items-center hover:text-gray-400 ${isMinimized ? 'justify-center' : ''}`}>
              <Briefcase className={`h-6 w-6 ${isMinimized ? 'mr-0' : 'mr-2'}`} />
              {!isMinimized && <span>Projects</span>}
            </a>
          </li>
          <li className="py-4 px-6">
            <a href="/groups" className={`flex items-center hover:text-gray-400 ${isMinimized ? 'justify-center' : ''}`}>
              <Users className={`h-6 w-6 ${isMinimized ? 'mr-0' : 'mr-2'}`} />
              {!isMinimized && <span>Groups</span>}
            </a>
          </li>
        </ul>

        {/* Bottom Part of Sidebar */}
        <div className="absolute bottom-0 left-0 right-0 bg-gray-800">
          <ul>
            <li className="py-4 px-6">
              <a href="/notifications" className={`flex items-center hover:text-gray-400 ${isMinimized ? 'justify-center' : ''}`}>
                <Bell className={`h-6 w-6 ${isMinimized ? 'mr-0' : 'mr-2'}`} />
                {!isMinimized && <span>Notifications</span>}
              </a>
            </li>
            <li className="py-4 px-6">
              <a href="/profile" className={`flex items-center hover:text-gray-400 ${isMinimized ? 'justify-center' : ''}`}>
                <User className={`h-6 w-6 ${isMinimized ? 'mr-0' : 'mr-2'}`} />
                {!isMinimized && <span>Profile</span>}
              </a>
            </li>
            <li className="py-4 px-6">
              <a href="/" className={`flex items-center hover:text-gray-400 ${isMinimized ? 'justify-center' : ''}`}>
                <LogOut className={`h-6 w-6 ${isMinimized ? 'mr-0' : 'mr-2'}`} />
                {!isMinimized && <span>Log Out</span>}
              </a>
            </li>
          </ul>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="flex-1">{children}</div>
    </div>
  );
};

export default Sidebar;

import { PinIcon, PinOff } from 'lucide-react';
import React, { useState } from 'react';

function Dashboard() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const closeDropdown = () => {
    setIsDropdownOpen(false);
  };

  return (
    <div className="flex flex-col h-screen bg-gray-200 relative">
      {/* Top Navigation/Header */}
      <div className='bg-white p-4 w-full shadow-lg z-10'>
        <div className="grid grid-cols-3 items-center">
          <div>
            <h1 className='font-bold text-2xl text-gray-600 col-span-2'>Welcome to Dashboard</h1>
          </div>
          <div>Other controls</div>
          <div className="relative">
            <form className="max-w-lg mx-auto">
              <div className="flex">
                <label htmlFor="search-dropdown" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Your Email</label>
                <button id="dropdown-button" onClick={toggleDropdown} className="flex-shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-gray-900 bg-gray-100 border border-gray-300 rounded-s-lg hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700 dark:text-white dark:border-gray-600" type="button">
                  Select Stage
                  <svg className="w-2.5 h-2.5 ms-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4"/>
                </svg></button>
                <div id="dropdown" className={`absolute top-full left-0 z-20 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 ${isDropdownOpen ? '' : 'hidden'}`}>
                  <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdown-button">
                    <li>
                      <button type="button" className="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"> Stage 1</button>
                    </li>
                    <li>
                      <button type="button" className="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"> Stage 2</button>
                    </li>
                    <li>
                      <button type="button" className="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"> Stage 3</button>
                    </li>
                    <li>
                      <button type="button" className="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"> Stage 4</button>
                    </li>
                  </ul>
                </div>
                <div className="relative w-full">
                  <input type="search" id="search-dropdown"
                  className="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-e-lg border-s-gray-50 border-s-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-s-gray-700  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500"
                  placeholder="Search Groups, Projects etc..." required />
                  <button type="submit" className="absolute top-0 end-0 p-2.5 text-sm font-medium h-full text-white bg-blue-700 rounded-e-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                    <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                    </svg>
                    <span className="sr-only">Search</span>
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="overflow-y-auto">
        <div className='grid grid-cols-3 m-4 p-4 bg-white shadow-md h-96 overflow-auto rounded-md auto-rows-auto'>
          <div>
            <h1 className="text-2xl font-bold">Latest Project</h1>
            <p>This section will show the most updated project in the system</p>
          </div>
          <div></div>
          <div className='border-2 border-dashed rounded-md p-2 bg-gray-50'>
            <div className='flex justify-end'>
            <p className='text-gray-400 font-semibold'>Pinned</p> <PinIcon className='text-gray-400 h-4 w-4'/>
            </div>

            <div className='text-gray-400 font-normal'>Pinned content will appear here</div>
          </div>
        </div>

        <div className='grid md:grid-cols-2 gap-4 m-4'>
          <div className="m-0 p-4 border rounded-md shadow-md bg-white h-96 overflow-auto">
            <h1 className="text-2xl font-bold">Progress</h1>
            <p>This section is a view of the overall progress of projects per group </p>
          </div>

          <div className="m-0 p-4 border rounded-md shadow-md bg-white h-96 overflow-auto">
            <h1 className="text-2xl font-bold">Project Status</h1>
            <p>This section is a heirarchical view of a status of a project.</p>
          </div>
          
        </div>
      </div>
    </div>
  );
}

export default Dashboard;

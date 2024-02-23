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
    <div className="flex flex-col h-screen bg-gray-200">
      {/* Top Navigation/Header */}
      <header className='bg-white p-4 w-full shadow-lg'>
        <div className="flex items-center">
          <h1 className='font-bold text-2xl text-gray-600'>Welcome to Dashboard</h1>
          {/* Searchbar */}
          <div className='w-1/2'>
          <form className="max-w-md flex mx-auto">
            <div className="relative flex">
              <button
                id="dropdown-button"
                onClick={toggleDropdown}
                className="flex-shrink-0 inline-flex items-center py-2.5 px-4 text-sm font-medium text-gray-900 bg-gray-100 border border-gray-300 rounded-lg hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100"
                type="button"
              >
                All categories
                <svg
                  className={`w-2.5 h-2.5 ms-2.5 ${
                    isDropdownOpen ? 'transform rotate-180' : ''
                  }`}
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 10 6"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 4 4 4-4"
                  />
                </svg>
              </button>
              {isDropdownOpen && (
                <div
                  id="dropdown"
                  className="absolute z-20 w-full top-full left-0 mt-1 bg-white divide-y divide-gray-100 rounded-lg shadow-lg"
                >
                  <ul className="py-2 text-sm text-gray-700">
                    <li>
                      <button
                        type="button"
                        className="block w-full px-4 py-2 text-left hover:bg-gray-100"
                      >
                        Stage 1
                      </button>
                    </li>
                    <li>
                      <button
                        type="button"
                        className="block w-full px-4 py-2 text-left hover:bg-gray-100"
                      >
                        Stage 2
                      </button>
                    </li>
                    <li>
                      <button
                        type="button"
                        className="block w-full px-4 py-2 text-left hover:bg-gray-100"
                      >
                        Stage 3
                      </button>
                    </li>
                    <li>
                      <button
                        type="button"
                        className="block w-full px-4 py-2 text-left hover:bg-gray-100"
                      >
                        Stage 4
                      </button>
                    </li>
                  </ul>
                </div>
              )}
            </div>
            <div className="relative max-w-full">
              <input
                type="search"
                id="search-dropdown"
                className="flex p-2.5 w-72 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Search Project, Status, Year etc..."
                required
              />
              <button
                type="submit"
                className="absolute top-0 right-0 mt-0 mr-0 p-3 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300"
              >
                <svg
                  className="w-4 h-4"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
                <span className="sr-only">Search</span>
              </button>
            </div>
          </form>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto">
        <div className=' m-4 p-4 bg-white shadow-md h-96 overflow-auto rounded-md'>
        <h1 className="text-2xl font-bold">Latest Project</h1>
          <p>This is a test content.</p>
        </div>
        <div className='grid grid-cols-2 gap-4 m-4'>
        <div className="m-0 p-4 border rounded-md shadow-md bg-white h-96 overflow-auto">
          <h1 className="text-2xl font-bold">Progress</h1>
          <p>This is a test content.</p>
        </div>
        <div className="m-0 p-4 border rounded-md shadow-md bg-white h-96 overflow-auto">
          <h1 className="text-2xl font-bold">Status Report</h1>
          <p>This is a test content.</p>
        </div>
        </div>
      </main>
    </div>
  );
}

export default Dashboard;

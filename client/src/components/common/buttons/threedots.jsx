import React, { useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";

function ThreeDot() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  // Dummy data for dropdown menu items
  const menuItems = [
    { id: 1, label: "View profile", link: "#" },
    { id: 2, label: "Set Team Leader", link: "#" },
  ];

  return (
    <div className="relative">
      <button
        id="dropdownMenuIconButton"
        onClick={toggleDropdown}
        className="inline-flex items-center p-2 text-sm font-medium text-center text-gray-900 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none dark:text-white focus:ring-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
        type="button"
      >
        <BsThreeDotsVertical />
      </button>
      {/* Dropdown menu */}
      {isDropdownOpen && (
        <div
          className="absolute right-0 mt-2 w-44 bg-white divide-y divide-gray-100 rounded-lg shadow-lg dark:bg-gray-700 dark:divide-gray-600 z-10"
          aria-labelledby="dropdownMenuIconButton"
        >
          <ul className="py-2 text-xs text-gray-700 dark:text-gray-200">
            {menuItems.map((item) => (
              <li key={item.id}>
                <a
                  href={item.link}
                  className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
          {/* Dummy separated link */}
          <div>
            <a
              href="#"
              className="block px-4 py-2 text-xs text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
            >
              Remove
            </a>
          </div>
        </div>
      )}
    </div>
  );
}

export default ThreeDot;

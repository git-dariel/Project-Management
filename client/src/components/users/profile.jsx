import { dummyProfile } from "../../test-data/data";
import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/services/auth.context";

const UserDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null); // Ref for the dropdown menu
  const { name, email, avatarSrc, menuItems } = dummyProfile;
  const { logout } = useAuth();
  const navigate = useNavigate();

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  // Close dropdown when user clicks outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  // Handle logout click
  const handleLogout = () => {
    logout(); // Call the logout function from auth.context
    navigate("/"); // Redirect user to the login page
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Toggle Profile */}
      <button id="avatarButton" type="button" onClick={toggleDropdown}>
        <img
          src={avatarSrc}
          alt="User dropdown"
          className="rounded-full h-10 border-gray-300 border-4 hover:border-blue-200 transition-all ease-in-out duration-150 active:border-blue-300"
        />
      </button>

      {/* Dropdown menu */}
      <div
        id="userDropdown"
        className={`z-10 absolute top-full right-0 mt-2 ${
          isOpen ? "" : "hidden"
        } bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600`}
      >
        <div className="px-4 py-3 text-sm text-gray-900 dark:text-white">
          <div>{name}</div>
          <div className="text-sm truncate">{email}</div>
        </div>
        <ul
          className="py-2 text-sm text-gray-700 dark:text-gray-200"
          aria-labelledby="avatarButton"
        >
          {menuItems.map((item, index) => (
            <li key={index}>
              <Link
                to={item.link}
                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
        <div className="py-1">
          <button
            onClick={handleLogout}
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white w-full text-left"
          >
            Sign out
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserDropdown;

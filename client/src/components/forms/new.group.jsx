import React, { useState } from "react";

const CreateNewGroup = ({ isOpen, toggleModal }) => {
  const [groupName, setGroupName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your logic to handle form submission here
  };

  return (
    <>
      {isOpen && (
        <div
          id="create-modal"
          tabIndex="-1"
          aria-hidden="true"
          className="fixed top-0 right-0 left-0 z-50 flex items-center justify-center w-full h-full bg-gray-900 bg-opacity-50"
        >
          <div className="relative w-full max-w-md p-4 bg-white rounded-lg shadow">
            <div className="border-b p-4 md:p-5 rounded-t flex items-center justify-between bg-gray-100 dark:bg-gray-700">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Create a New Group
              </h3>
              <button
                type="button"
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                onClick={toggleModal}
              >
                <svg
                  className="w-3 h-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
            </div>
            <form className="p-4 md:p-5">
              <div className="mb-4">
                <label
                  htmlFor="group-name"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Group Name
                </label>
                <input
                  type="text"
                  id="group-name"
                  value={groupName}
                  onChange={(e) => setGroupName(e.target.value)}
                  className="w-full p-2.5 text-sm text-gray-900 bg-gray-50 border border-gray-300 rounded-lg focus:ring-primary-600 focus:border-primary-600 dark:bg-gray-600 dark:border-gray-500 dark:text-white dark:placeholder-gray-400 dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  required
                />
              </div>
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={toggleModal}
                  className="inline-flex items-center justify-center px-5 py-2.5 text-sm font-medium text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  onClick={handleSubmit}
                  className="inline-flex items-center justify-center px-5 py-2.5 text-sm font-medium text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Create Group
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default CreateNewGroup;

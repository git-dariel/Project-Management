import React, { useEffect, useState } from "react";
import projectService from "@/services/project.service";
import { toast } from "sonner";
import userService from "@/services/user.service";
import { useNavigate } from "react-router-dom";

function CreateNewProject({ isOpen, toggleModal, onProjectCreated }) {
  const [formData, setFormData] = useState({
    project_name: "",
    description: "",
    start_date: "",
    end_date: "",
    members: [],
  });
  const [users, setUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchUsers() {
      try {
        const fetchedUsers = await userService.getUsers();
        setUsers(fetchedUsers);
      } catch (error) {
        console.error("Failed to fetch users:", error.message);
        toast.error("Failed to fetch users. Please try again.");
      }
    }
    fetchUsers();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleUserSelect = (userId) => {
    const user = users.find((user) => user._id === userId);
    if (user && !selectedUsers.some((u) => u._id === user._id)) {
      setSelectedUsers((prevUsers) => [...prevUsers, user]);
    }
    setSearchQuery("");
    setFilteredUsers([]);
  };

  const handleSearchChange = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    const filtered = users.filter(
      (user) =>
        user.firstname.toLowerCase().includes(query) ||
        user.lastname.toLowerCase().includes(query)
    );
    setFilteredUsers(filtered);
  };

  const handleRemoveUser = (userId) => {
    setSelectedUsers((prevUsers) =>
      prevUsers.filter((user) => user._id !== userId)
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const createdProject = await projectService.createProject({
        ...formData,
        members: selectedUsers.map((user) => user._id),
      });
      toast.success("Project created successfully");
      onProjectCreated();
      toggleModal();
      navigate(`/projects/${createdProject._id}`); // Accessing _id of the created project
    } catch (error) {
      console.error("Failed to create project:", error.message);
      toast.error("Failed to create project. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {isOpen && (
        <div className="fixed top-0 right-0 left-0 z-50 flex items-center justify-center w-full h-full bg-gray-900 bg-opacity-50">
          <div className="relative w-full max-w-[50%] p-4 bg-white rounded-lg shadow">
            <div className="border-b p-4 md:p-5 rounded-t flex items-center justify-between bg-gray-100 dark:bg-gray-700">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Create a new project
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
            <form className="p-4 md:p-5" onSubmit={handleSubmit}>
              <div className="grid grid-cols-2 gap-4">
                <div className="inputside">
                  <div className="grid gap-4 mb-4">
                    <label
                      htmlFor="project_name"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Project Name
                    </label>
                    <input
                      type="text"
                      id="project_name"
                      name="project_name"
                      placeholder="Enter project name"
                      className="w-full p-2.5 text-sm text-gray-900 bg-gray-50 border border-gray-300 rounded-lg focus:ring-primary-600 focus:border-primary-600 dark:bg-gray-600 dark:border-gray-500 dark:text-white dark:placeholder-gray-400 dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      required
                      value={formData.project_name}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="grid gap-4 mb-4">
                    <label
                      htmlFor="description"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Description
                    </label>
                    <textarea
                      id="description"
                      name="description"
                      placeholder="Enter project description"
                      className="w-full p-2.5 text-sm text-gray-900 bg-gray-50 border border-gray-300 rounded-lg focus:ring-primary-600 focus:border-primary-600 dark:bg-gray-600 dark:border-gray-500 dark:text-white dark:placeholder-gray-400 dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      required
                      value={formData.description}
                      onChange={handleInputChange}
                    ></textarea>
                  </div>
                  <div className="grid gap-4 mb-4 md:grid-cols-2">
                    <div className="">
                      <label
                        htmlFor="start_date"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Start Date
                      </label>
                      <input
                        type="date"
                        id="start_date"
                        name="start_date"
                        className="w-full p-2.5 text-sm text-gray-900 bg-gray-50 border border-gray-300 rounded-lg focus:ring-primary-600 focus:border-primary-600 dark:bg-gray-600 dark:border-gray-500 dark:text-white dark:placeholder-gray-400 dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        required
                        value={formData.start_date}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="">
                      <label
                        htmlFor="end_date"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        End Date
                      </label>
                      <input
                        type="date"
                        id="end_date"
                        name="end_date"
                        className="w-full p-2.5 text-sm text-gray-900 bg-gray-50 border border-gray-300 rounded-lg focus:ring-primary-600 focus:border-primary-600 dark:bg-gray-600 dark:border-gray-500 dark:text-white dark:placeholder-gray-400 dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        required
                        value={formData.end_date}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                </div>
                <div className="membersside">
                  <div className="grid gap-4 mb-4">
                    <label
                      htmlFor="members"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Members
                    </label>
                    <input
                      type="text"
                      placeholder="Search members"
                      className="w-full p-2.5 text-sm text-gray-900 bg-gray-50 border border-gray-300 rounded-lg focus:ring-primary-600 focus:border-primary-600 dark:bg-gray-600 dark:border-gray-500 dark:text-white dark:placeholder-gray-400 dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      value={searchQuery}
                      onChange={handleSearchChange}
                    />
                    {searchQuery && (
                      <ul className="mt-2 border border-gray-300 rounded-lg overflow-y-auto max-h-40">
                        {filteredUsers.map((user) => (
                          <li
                            key={user._id}
                            className="px-4 py-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800"
                            onClick={() => handleUserSelect(user._id)}
                          >
                            {user.firstname} {user.lastname}
                          </li>
                        ))}
                      </ul>
                    )}
                    {selectedUsers.map((user) => (
                      <li key={user._id} className="text-sm text-gray-600">
                        {user.firstname} {user.lastname}{" "}
                        <button
                          onClick={() => handleRemoveUser(user._id)}
                          className="text-red-500 ml-1"
                        >
                          Remove
                        </button>
                      </li>
                    ))}
                  </div>
                </div>
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
                  className="inline-flex items-center justify-center px-5 py-2.5 text-sm font-medium text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Create
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default CreateNewProject;

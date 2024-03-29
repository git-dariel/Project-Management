import React, { useState } from "react";
import SearchBar from "@/components/searchbar/search.voice";
import ComingSoon from "@/components/test/comingsoon";
import Sidebar from "@/components/layout/side-bar";
import { PlusCircle, Users } from "lucide-react";
import { dummyGroups } from "@/test-data/groups.data";
import ConfirmSignOut from "@/components/common/dialogs/signout.confirm";
import { Link } from "react-router-dom";
import CreateNewGroup from "@/components/forms/new.group";

function Groups() {
  const [searchTerm, setSearchTerm] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const openAlertDialog = () => {
    setDialogOpen(true);
  };

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  // Filter groups based on search term
  const filteredGroups = dummyGroups.filter((group) =>
    group.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Determine the number of columns dynamically based on the number of groups
  const numColumns = Math.ceil(filteredGroups.length / 3);

  const handleSearch = (searchTerm) => {
    setSearchTerm(searchTerm);
  };

  return (
    <Sidebar confirmSignout={openAlertDialog}>
      <div
        className="flex flex-col h-screen relative bg-gradient-to-tl from-slate-50 to-slate-400 overflow-y-auto"
        style={{
          scrollbarWidth: "none",
        }}
      >
        {/* <ComingSoon /> */}
        <ConfirmSignOut
          isOpen={dialogOpen}
          onClose={() => setDialogOpen(false)}
        />
        <div
          className="flex flex-col h-full m-5 p-4 rounded-2xl"
          style={{
            background: " rgba(255, 255, 255, 0.54)",
            scrollbarWidth: "none",
          }}
        >
          <div className="sm:flex sm:justify-between sm:items-center sm:mb-4">
            <div className="text-2xl font-bold text-gray-800 mb-2">Groups</div>
            <div className="hidden sm:flex sm:items-center">
              {/* Search bar */}
              <SearchBar onSearch={handleSearch} />

              <div className="m-2">
                <button
                  onClick={toggleModal}
                  className="flex bg-none p-4 text-blue-500 font-semibold"
                >
                  <Users /> <PlusCircle className="w-3 h-3 mr-1" />
                  Create a group
                </button>
                <CreateNewGroup isOpen={isOpen} toggleModal={toggleModal} />
              </div>
            </div>
          </div>
          <div
            className={`grid sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-${numColumns} gap-4 overflow-y-auto scroll-m-0`}
            style={{
              scrollbarWidth: "none",
            }}
          >
            {filteredGroups.map((group) => (
              <Link key={group.id} to={`/groups/${group.id}/projects`}>
                <div className="bg-gray-100 p-4 rounded-md">{group.name}</div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </Sidebar>
  );
}

export default Groups;

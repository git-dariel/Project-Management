import { PlusCircle } from 'lucide-react';
import React, { useState } from 'react';
import CreateNew from '../modals/CreateNew';

function Projects() {
  // Dummy data for projects
  const dummyProjects = [
    { id: 1, name: 'Project 1', date: '2024-02-18' },
    { id: 2, name: 'Project 2', date: '2024-02-17' },
    { id: 3, name: 'Project 3', date: '2024-02-16' },
    { id: 4, name: 'Project 4', date: '2024-02-15' },
    { id: 5, name: 'Project 5', date: '2024-02-14' },
  ];

  const[isOpen, setIsOpen] = useState(false);

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className='flex h-full w-full bg-gray-200 justify-center p-5'>
      <div className='bg-white rounded-lg h-full w-full shadow-lg p-5 relative'>
        <div className='header mb-4'>
          <div className='text-2xl font-bold text-gray-700 mb-2'>
            All Projects
          </div>
          <button onClick={toggleModal} className='bg-transparent text-blue-500 text-sm font-semibold border-none ml-auto hover:text-blue-700 transition duration-300 ease-in-out'>
            Create New <PlusCircle className='inline-block ml-1 h-5 w-5' />
          </button>
        </div>

        <CreateNew isOpen={isOpen} toggleModal={toggleModal} />
        <div>
          <div>
            <div className='font-semibold mb-1'>Recent</div>
            {/* Recent projects content */}
            <div className=' m-2 overflow-y-auto max-h-20 scrollbar-thin'>
            {dummyProjects.map((project) => (
              <div key={project.id} className='border-b py-2'>
                <div className='font-bold'>{project.name}</div>
                <div className='text-gray-500'>{project.date}</div>
              </div>
            ))}
            </div>
          </div>
          
          
          <div>
            <div className='font-semibold mb-1'>All Projects</div>
              {/* All projects content */}
              <div className='m-2 overflow-y-auto max-h-80 scrollbar-thin'>
              {dummyProjects.map((project) => (
                <div key={project.id} className='border-b py-2'>
                  <div className='font-bold'>{project.name}</div>
                  <div className='text-gray-500'>{project.date}</div>
                </div>
              ))}
              </div>
            </div>
          </div>
      </div>
    </div>
  );
}

export default Projects;

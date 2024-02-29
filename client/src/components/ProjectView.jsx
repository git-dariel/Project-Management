import React, { useState } from 'react';
import "@bitnoi.se/react-scheduler/dist/style.css";
import { Scheduler } from '@bitnoi.se/react-scheduler';
import { mockedSchedulerData } from '../components/data.js';
import { useParams } from 'react-router-dom';
import { dummyProjects } from './projectdata.js';

const ProjectView = () => {
    const {projectId} = useParams();
    const [isLoading, setIsLoading] = useState(false);
    const [filterButtonState, setFilterButtonState] = useState(0);

    const project = dummyProjects.find(project => project.id === parseInt(projectId));

    if (!project) {
        return <div>Project not found</div>;
    }
    
  return (
    <div className="flex flex-col h-screen bg-gray-200 relative">
        {/* Top navigation/Header */}
        <div className='bg-white p-2 w-full shadow-lg z-10'>
            <div className='grid grid-cols-4 items-center'>

                <div>
                    <h1 className='font-semibold'> {project.name} </h1>
                    <p className='text-gray-400'> {project.code} </p>
                </div>

                <div>
                col2
                </div>

                <div>
                    col3
                </div>

                <div>
                col4
                </div>
            </div>
        </div>
        
        

        {/* Main content/React-scheduler component */}
      <div className='relative h-full mt-1'>
        <Scheduler
          data={mockedSchedulerData}
          isLoading={isLoading}
          onRangeChange={(newRange) => console.log(newRange)}
          onTileClick={(clickedResource) => console.log(clickedResource)}
          onItemClick={(item) => console.log(item)}
          onFilterData={() => {
            // Some filtering logic...
            setFilterButtonState(1);
          }}
          onClearFilterData={() => {
            // Some clearing filters logic...
            setFilterButtonState(0)
          }}
          config={{
            zoom: 0,
            filterButtonState,
          }}
        />
      </div>

    </div>
  )
}

export default ProjectView;
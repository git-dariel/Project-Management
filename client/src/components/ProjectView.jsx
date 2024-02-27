import React, { useState } from 'react'
import "@bitnoi.se/react-scheduler/dist/style.css";
import { Scheduler } from '@bitnoi.se/react-scheduler';

const ProjectView = () => {

    const [isLoading, setIsLoading] = useState(false);
    const [filterButtonState, setFilterButtonState] = useState(0);
    
    // Mocked or dummy data
    const mockedSchedulerData = [
        {
        id: "070ac5b5-8369-4cd2-8ba2-0a209130cc60",
        label: {
            icon: "https://picsum.photos/24",
            title: "Joshua Flores",
            subtitle: "Frontend Developer"
        },
        data: [
            {
            id: "8b71a8a5-33dd-4fc8-9caa-b4a584ba3762",
            startDate: new Date("2023-04-13T15:31:24.272Z"),
            endDate: new Date("2023-08-28T10:28:22.649Z"),
            occupancy: 3600,
            title: "Project A",
            subtitle: "Subtitle A",
            description: "array indexing Salad West Account",
            bgColor: "rgb(254,165,177)"
            },
            // Add more mocked data as needed

            {
                id: "ad1b62cf-87c7-4f62-8f14-ae30f4c90d5a",
                startDate: new Date("2023-06-15T09:00:00.000Z"),
                endDate: new Date("2023-07-15T17:00:00.000Z"),
                occupancy: 5000,
                title: "Project E",
                subtitle: "Subtitle E",
                description: "Database migration",
                bgColor: "rgb(254,165,177)"
              },
              {
                id: "6f29e37b-5a90-49b8-b9fb-13a215b132fe",
                startDate: new Date("2023-08-01T08:00:00.000Z"),
                endDate: new Date("2023-09-30T17:00:00.000Z"),
                occupancy: 7200,
                title: "Project F",
                subtitle: "Subtitle F",
                description: "UI redesign",
                bgColor: "rgb(254,165,177)"
              },
        ]
        }
    ];
  return (
    <div className="flex flex-col h-screen bg-gray-200 relative">
        {/* Top navigation/Header */}
        <div className='bg-white p-2 w-full shadow-lg z-10'>
            <div className='grid grid-cols-4 items-center'>

                {/* This button is for an optional feature/Advanced development */}
                <div>
                    col1
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

export default ProjectView
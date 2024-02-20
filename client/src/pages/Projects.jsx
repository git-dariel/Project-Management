import { PlusCircle } from 'lucide-react';
import React, { useState } from 'react'

function Projects() {
  const [recentOpen, isRecentOpen] = useState();

  return (
    <div className='flex h-full w-full bg-gray-200 justify-center p-5'>
      <div className='bg-white rounded-lg h-full w-full shadow-lg p-5'>
        <div className='inline-flex border text-xl text-gray-700'>
          All projects
        </div>
        <button className='bg-transparent text-blue-500 cursor-pointer'>
          Create new <PlusCircle/>
        </button>
        <div>
          <div>Recent</div>

          <div>All projects</div>
        </div>
      </div>
    </div>
  )
}

export default Projects
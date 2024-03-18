// import { progressData } from '@/test-data/data';
import React from 'react';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { ResponsiveContainer } from 'recharts';


const Progress = () => {
  const progressData = 75;
  return (
    <div>
      <section>
        <ResponsiveContainer width="100%" height={300}
        className={"bg-transparent py-4 rounded-lg shadow-md mb-4 flex items-center relative"}>
          <div className='flex relative m-5 w-56'>
            <CircularProgressbar
            value={progressData}
            text={`${progressData}%`}
            styles={{
              root: { width: '100%' , filter: 'drop-shadow(0px 0px 10px rgba(50, 50, 50, 0.7))'},
              path: { stroke: '#2d3748', strokeLinecap: 'round', transition: 'stroke-dashoffset 0.5s ease 0s' },
              trail: { stroke: 'none' }, 
              text: { fill: '#2d3748', fontSize: 20, dominantBaseline: 'middle', textAnchor: 'middle' }, 
            }}/>
          </div>
        </ResponsiveContainer>
      </section>
    </div>
  );
};

export default Progress;

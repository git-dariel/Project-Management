import React from 'react';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { ResponsiveContainer } from 'recharts';
//import { progressData } from '../../dummy/data';

const Progress = ({ groupName }) => {

  return (
    <div>
      <section>
        <ResponsiveContainer width="100%" height={300} className={"bg-transparent py-4 rounded-lg shadow-md mb-4 flex items-center relative"}>

        </ResponsiveContainer>
      </section>
    </div>
  );
};

export default Progress;

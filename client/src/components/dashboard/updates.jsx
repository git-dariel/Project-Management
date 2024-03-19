import React from 'react';
import { ResponsiveContainer } from 'recharts';

const StatusCard = () => {
  // Sample data for latest projects and news
  const latestProjects = [
    { id: 1, title: "Project A", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit." },
    { id: 2, title: "Project B", description: "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." },
    // Add more projects as needed
  ];

  const otherNews = [
    { id: 1, title: "Pending Projects", description: "Projects waiting for approval or further action." },
    { id: 2, title: "Projects in Progress", description: "Projects currently being worked on by the team." },
    { id: 3, title: "Ongoing Projects", description: "Projects that are actively being managed and developed." },
    // Add more news items as needed
  ];
  
  return (
    <ResponsiveContainer width="100%" height={300} className="bg-transparent rounded-lg shadow-md mb-4 flex flex-col items-center relative">
      <div className="flex flex-col w-full p-4">
        <div className="flex flex-row mb-4">
          <div className="w-1/2 pr-4">
            <h2 className="text-lg font-semibold text-gray-800">Latest Projects</h2>
            <ul>
              {latestProjects.map(project => (
                <li key={project.id} className="mb-2">
                  <h3 className="text-blue-500 font-medium">{project.title}</h3>
                  <p className="text-gray-600">{project.description}</p>
                </li>
              ))}
            </ul>
          </div>
          <div className="w-1/2 pl-4">
            <h2 className="text-lg font-semibold text-gray-800">Other News</h2>
            <ul>
              {otherNews.map(news => (
                <li key={news.id} className="mb-2">
                  <h3 className="text-blue-500 font-medium">{news.title}</h3>
                  <p className="text-gray-600">{news.description}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </ResponsiveContainer>
  );
};

export default StatusCard;

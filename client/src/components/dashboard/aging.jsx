import React from "react";
import {
  Bar,
  BarChart,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

function ProjectAgingChart({ data }) {
  return (
    <div>
      <section>
        <ResponsiveContainer
          width="100%"
          height={300}
          className={
            "bg-transparent py-4 rounded-lg shadow-md mb-4 flex items-center relative"
          }
        >
          <BarChart data={data}>
            <XAxis
              dataKey={"name"}
              tickLine={false}
              axisLine={false}
              stroke="#888888"
              fontSize={12}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              stroke="#888888"
              fontSize={12}
            />
            <Tooltip />
            <Legend />
            <Bar
              dataKey="averageDays"
              radius={[4, 4, 0, 0]}
              fill="#1f2937"
              name="Average Days Since Start"
            />
            <Bar
              dataKey="averageOverdueDays"
              radius={[4, 4, 0, 0]}
              fill="#FF725E"
              name="Average Overdue Days"
            />
          </BarChart>
        </ResponsiveContainer>
      </section>
    </div>
  );
}

export default ProjectAgingChart;

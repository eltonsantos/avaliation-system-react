import { useState } from "react";
import { Cell, Legend, Pie, PieChart, Tooltip } from "recharts";

import { Menu } from "../../components/Menu";

import "./styles.css";

const data = [
  { name: "Product A", field1: 40, field2: 30 },
  { name: "Product B", field1: 20, field2: 10 },
  { name: "Product C", field1: 10, field2: 20 },
  { name: "Product D", field1: 30, field2: 40 },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

export function Dashboard() {
  const [filterValue1, setFilterValue1] = useState(0);
  const [filterValue2, setFilterValue2] = useState(0);

  const filteredData = data.filter(
    (item) => item.field1 > filterValue1 && item.field2 > filterValue2
  );

  return (
    <div className="containerDashboard">
      <h1>Dashboard</h1>
      <Menu />

      <div>
        Filter 1:
        <input
          type="number"
          value={filterValue1}
          onChange={(e) => setFilterValue1(e.target.value)}
        />
      </div>
      <div>
        Filter 2:
        <input
          type="number"
          value={filterValue2}
          onChange={(e) => setFilterValue2(e.target.value)}
        />
      </div>
      <PieChart width={400} height={400}>
        <Pie
          data={filteredData}
          cx={200}
          cy={200}
          innerRadius={60}
          outerRadius={80}
          dataKey="field1"
        >
          {filteredData.map((entry, index) => (
            <Cell key={index} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </div>
  );
}

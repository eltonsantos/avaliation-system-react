import { useState } from "react";
import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

import { Menu } from "../../components/Menu";

import "./styles.css";

const data = [
  {
    id: 1,
    name: "A comunicação entre você e o funcionário foi rápida?",
    value: 4,
    date: "03/10/2022",
  },
  { id: 2, name: "Foi de fácil entendimento?", value: 2, date: "02/04/2022" },
  {
    id: 3,
    name: "Gostou do serviço prestado?",
    value: 3,
    date: "23/02/2022",
  },
  {
    id: 4,
    name: "Recomendaria o serviço para alguém?",
    value: 5,
    date: "18/06/2022",
  },
];

const COLORS = ["#00C49F", "#FFBB28", "#FF8042", "#E84C3D"];
const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  index,
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip">
        <p className="label">{`${payload?.[0]?.payload?.name} = ${payload[0].value} estrelas`}</p>
      </div>
    );
  }

  return null;
};

export function Dashboard() {
  const [selectedQuestion, setSelectedQuestion] = useState("");
  const [selectedDate, setSelectedDate] = useState("");

  const handleQuestionFilter = (event) => {
    setSelectedQuestion(event.target.value);
  };

  const handleDateFilter = (event) => {
    setSelectedDate(event.target.value);
  };

  const filteredData = data
    .filter((d) => (selectedQuestion ? d.name === selectedQuestion : true))
    .filter((d) => (selectedDate ? d.date === selectedDate : true));

  return (
    <div className="containerDashboard">
      <h1>Dashboard</h1>
      <Menu />

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "20px",
        }}
      >
        <select onChange={handleQuestionFilter} value={selectedQuestion}>
          <option value="">Todas as perguntas</option>
          {data.map((d) => (
            <option key={d.id} value={d.name}>
              {d.name}
            </option>
          ))}
        </select>

        <select onChange={handleDateFilter} value={selectedDate}>
          <option value="">Todas as datas</option>
          {data.map((d) => (
            <option key={d.id} value={d.date}>
              {d.date}
            </option>
          ))}
        </select>
      </div>
      <ResponsiveContainer height={550}>
        <PieChart>
          <Pie
            data={filteredData}
            dataKey="value"
            cx="50%"
            cy="50%"
            outerRadius={200}
            labelLine={false}
            label={renderCustomizedLabel}
            fill="#8884d8"
          >
            {filteredData.map((entry, index) => (
              <Cell key={index} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Legend />
          <Tooltip content={<CustomTooltip />} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

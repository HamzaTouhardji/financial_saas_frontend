import React from 'react';
import { usePlanning } from '../context/PlanningContext';
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

const PlanningGraph = () => {
  const { planning } = usePlanning();

  if (!planning || planning.length === 0) {
    return <p>Pas de données disponibles pour afficher le graphique.</p>;
  }

  return (
    <div className="dark:bg-gray-900 dark:text-gray-200 p-4 rounded-lg">
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={planning}>
          <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
          <XAxis dataKey="month" stroke="#ccc" />
          <YAxis stroke="#ccc" />
          <Tooltip contentStyle={{ backgroundColor: '#333', color: '#fff' }} />
          <Legend />
          <Line
            type="monotone"
            dataKey="revenue"
            stroke="#8884d8"
            name="Chiffre d'affaires"
          />
          <Line
            type="monotone"
            dataKey="net_income"
            stroke="#82ca9d"
            name="Revenu net"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PlanningGraph;

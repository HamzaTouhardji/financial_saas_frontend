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
    <ResponsiveContainer width="100%" height={400}>
      <LineChart data={planning}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
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
  );
};

export default PlanningGraph;

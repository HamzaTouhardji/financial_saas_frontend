import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

import jsonData from "../data/data.json";

const Communication: React.FC = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const transformedData: any = jsonData.chiffreAffaires.map(
      (ca: any, index: any) => {
        const revenuNet = ca - jsonData.cogs[index];
        const ebitda = revenuNet - jsonData.opex[index];
        return {
          month: `Mois ${index + 1}`,
          chiffreAffaires: ca,
          cogs: jsonData.cogs[index],
          opex: jsonData.opex[index],
          revenuNet,
          ebitda,
        };
      }
    );
    setData(transformedData);
  }, []);

  return (
    <div className="dark:bg-gray-900 dark:text-gray-200">
      <h2>Graphique des données financières</h2>
      {data.length > 0 ? (
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="chiffreAffaires"
              stroke="#8884d8"
              name="Chiffre d'affaires"
            />
            <Line
              type="monotone"
              dataKey="revenuNet"
              stroke="#82ca9d"
              name="Revenu Net"
            />
            <Line
              type="monotone"
              dataKey="ebitda"
              stroke="#ff7300"
              name="EBITDA"
            />
          </LineChart>
        </ResponsiveContainer>
      ) : (
        <p>Chargement des données...</p>
      )}
    </div>
  );
};

export default Communication;

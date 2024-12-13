import React from 'react';
import { usePlanning } from '../context/PlanningContext';

const Planification: React.FC = () => {
  const { planning, setPlanning } = usePlanning();

  if (!planning) {
    return <div>Chargement des données...</div>;
  }

  const updateValue = (
    monthIndex: number,
    field: keyof (typeof planning)[0],
    value: number,
  ) => {
    const updatedPlanning = [...planning];
    updatedPlanning[monthIndex] = {
      ...updatedPlanning[monthIndex],
      [field]: value,
    };
    setPlanning(updatedPlanning);
  };

  const calculateRevenuNet = (monthIndex: number) =>
    planning[monthIndex].revenue - planning[monthIndex].cogs;

  const calculateEbitda = (monthIndex: number) =>
    calculateRevenuNet(monthIndex) - planning[monthIndex].opex;

  const calculateTax = (monthIndex: number) =>
    calculateEbitda(monthIndex) * 0.2;

  const calculateResultat = (monthIndex: number) =>
    calculateEbitda(monthIndex) - calculateTax(monthIndex);

  return (
    <div className="p-4 dark:bg-gray-900 dark:text-gray-200">
      <h2 className="text-lg font-bold mb-4">Planification</h2>
      <div className="overflow-x-auto">
        <table className="table-auto w-full border-collapse border border-gray-300 dark:border-gray-600">
          <thead>
            <tr className="bg-gray-100 dark:bg-gray-800">
              <th className="border px-4 py-2 dark:border-gray-600">Champs</th>
              {planning.map((_: any, monthIndex: any) => (
                <th
                  key={monthIndex}
                  className="border px-4 py-2 dark:border-gray-600"
                >
                  Mois {monthIndex + 1}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border px-4 py-2 dark:border-gray-600">
                Chiffre d'affaires
              </td>
              {planning.map((month: any, monthIndex: any) => (
                <td
                  key={monthIndex}
                  className="border px-4 py-2 dark:border-gray-600"
                >
                  <input
                    type="number"
                    value={month.revenue}
                    onChange={(e) =>
                      updateValue(monthIndex, 'revenue', Number(e.target.value))
                    }
                    className="w-full min-w-[100px] p-1 border border-gray-300 rounded dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200"
                  />
                </td>
              ))}
            </tr>

            <tr>
              <td className="border px-4 py-2 dark:border-gray-600">COGS</td>
              {planning.map((month: any, monthIndex: any) => (
                <td
                  key={monthIndex}
                  className="border px-4 py-2 dark:border-gray-600"
                >
                  <input
                    type="number"
                    value={month.cogs}
                    onChange={(e) =>
                      updateValue(monthIndex, 'cogs', Number(e.target.value))
                    }
                    className="w-full p-1 border border-gray-300 rounded dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200"
                  />
                </td>
              ))}
            </tr>

            <tr>
              <td className="border px-4 py-2 dark:border-gray-600">OPEX</td>
              {planning.map((month: any, monthIndex: any) => (
                <td
                  key={monthIndex}
                  className="border px-4 py-2 dark:border-gray-600"
                >
                  <input
                    type="number"
                    value={month.opex}
                    onChange={(e) =>
                      updateValue(monthIndex, 'opex', Number(e.target.value))
                    }
                    className="w-full p-1 border border-gray-300 rounded dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200"
                  />
                </td>
              ))}
            </tr>

            <tr>
              <td className="border px-4 py-2 dark:border-gray-600">
                Revenu Net
              </td>
              {planning.map((_: any, monthIndex: any) => (
                <td
                  key={monthIndex}
                  className="border px-4 py-2 dark:border-gray-600"
                >
                  {calculateRevenuNet(monthIndex)}
                </td>
              ))}
            </tr>

            <tr>
              <td className="border px-4 py-2 dark:border-gray-600">EBITDA</td>
              {planning.map((_: any, monthIndex: any) => (
                <td
                  key={monthIndex}
                  className="border px-4 py-2 dark:border-gray-600"
                >
                  {calculateEbitda(monthIndex)}
                </td>
              ))}
            </tr>

            <tr>
              <td className="border px-4 py-2 dark:border-gray-600">Tax</td>
              {planning.map((_: any, monthIndex: any) => (
                <td
                  key={monthIndex}
                  className="border px-4 py-2 dark:border-gray-600"
                >
                  {calculateTax(monthIndex)}
                </td>
              ))}
            </tr>

            <tr>
              <td className="border px-4 py-2 dark:border-gray-600">
                Résultat
              </td>
              {planning.map((_: any, monthIndex: any) => (
                <td
                  key={monthIndex}
                  className="border px-4 py-2 dark:border-gray-600"
                >
                  {calculateResultat(monthIndex)}
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Planification;

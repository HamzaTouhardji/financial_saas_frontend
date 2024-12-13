import React from 'react';
import data from '../data/data.json';

// type PlanificationData = {
//   chiffreAffaires: number[];
//   cogs: number[];
//   opex: number[];
// };

const Planification: React.FC = () => {
  const calculateRevenuNet = (month: number) =>
    data.chiffreAffaires[month] - data.cogs[month];
  const calculateEbitda = (month: number) =>
    calculateRevenuNet(month) - data.opex[month];
  const calculateTax = (month: number) => calculateEbitda(month) * 0.2;
  const calculateResultat = (month: number) =>
    calculateEbitda(month) - calculateTax(month);

  return (
    <div className="p-4 dark:bg-gray-900 dark:text-gray-200">
      <h2 className="text-lg font-bold mb-4">Planification</h2>
      <div className="overflow-x-auto">
        <table className="table-auto w-full border-collapse border border-gray-300 dark:border-gray-600">
          <thead>
            <tr className="bg-gray-100 dark:bg-gray-800">
              <th className="border px-4 py-2 dark:border-gray-600">Champs</th>
              {Array.from({ length: 12 }, (_, month) => (
                <th
                  key={month}
                  className="border px-4 py-2 dark:border-gray-600"
                >
                  Mois {month + 1}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border px-4 py-2 dark:border-gray-600">
                Chiffre d'affaires
              </td>
              {Array.from({ length: 12 }, (_, month) => (
                <td
                  key={month}
                  className="border px-4 py-2 dark:border-gray-600"
                >
                  <input
                    type="number"
                    value={data.chiffreAffaires[month]}
                    className="w-full min-w-[100px] p-1 border border-gray-300 rounded dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200"
                  />
                </td>
              ))}
            </tr>

            <tr>
              <td className="border px-4 py-2 dark:border-gray-600">COGS</td>
              {Array.from({ length: 12 }, (_, month) => (
                <td
                  key={month}
                  className="border px-4 py-2 dark:border-gray-600"
                >
                  <input
                    type="number"
                    value={data.cogs[month]}
                    className="w-full p-1 border border-gray-300 rounded dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200"
                  />
                </td>
              ))}
            </tr>

            <tr>
              <td className="border px-4 py-2 dark:border-gray-600">OPEX</td>
              {Array.from({ length: 12 }, (_, month) => (
                <td
                  key={month}
                  className="border px-4 py-2 dark:border-gray-600"
                >
                  <input
                    type="number"
                    value={data.opex[month]}
                    className="w-full p-1 border border-gray-300 rounded dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200"
                  />
                </td>
              ))}
            </tr>

            <tr>
              <td className="border px-4 py-2 dark:border-gray-600">
                Revenu Net
              </td>
              {Array.from({ length: 12 }, (_, month) => (
                <td
                  key={month}
                  className="border px-4 py-2 dark:border-gray-600"
                >
                  {calculateRevenuNet(month)}
                </td>
              ))}
            </tr>

            <tr>
              <td className="border px-4 py-2 dark:border-gray-600">EBITDA</td>
              {Array.from({ length: 12 }, (_, month) => (
                <td
                  key={month}
                  className="border px-4 py-2 dark:border-gray-600"
                >
                  {calculateEbitda(month)}
                </td>
              ))}
            </tr>

            <tr>
              <td className="border px-4 py-2 dark:border-gray-600">Tax</td>
              {Array.from({ length: 12 }, (_, month) => (
                <td
                  key={month}
                  className="border px-4 py-2 dark:border-gray-600"
                >
                  {calculateTax(month)}
                </td>
              ))}
            </tr>

            <tr>
              <td className="border px-4 py-2 dark:border-gray-600">
                Résultat
              </td>
              {Array.from({ length: 12 }, (_, month) => (
                <td
                  key={month}
                  className="border px-4 py-2 dark:border-gray-600"
                >
                  {calculateResultat(month)}
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

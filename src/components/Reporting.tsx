import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import { usePlanning } from '../context/PlanningContext';

const Reporting: React.FC = () => {
  const { setPlanning } = usePlanning();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();

      reader.onload = (event) => {
        const data = event.target?.result;

        if (data instanceof ArrayBuffer) {
          try {
            const workbook = XLSX.read(new Uint8Array(data), { type: 'array' });
            const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
            const jsonData = XLSX.utils.sheet_to_json<any>(firstSheet);

            const updatedData = jsonData.map((row: any) => {
              const revenue = parseFloat(row.Revenue || 0);
              const cogs = parseFloat(row.COGS || 0);
              const opex = parseFloat(row.OPEX || 0);
              const net_income = revenue - cogs;
              const ebitda = net_income - opex;
              const tax = ebitda * 0.2;
              const result = ebitda - tax;

              return {
                revenue,
                cogs,
                opex,
                month: row.Month || 'Unknown',
                year: parseInt(row.Year, 10) || new Date().getFullYear(),
                net_income,
                ebitda,
                tax,
                result,
              };
            });

            setPlanning(updatedData);
            setErrorMessage(null);
          } catch (error) {
            setErrorMessage(
              'Erreur lors de la lecture du fichier. Vérifiez le format.',
            );
          }
        }
      };

      reader.readAsArrayBuffer(file);
    }
  };

  return (
    <div className="flex justify-between items-center p-4 dark:bg-gray-900 dark:text-gray-200">
      <input
        type="file"
        accept=".xlsx, .xls"
        onChange={handleFileUpload}
        className="mb-4"
      />
      {errorMessage && <p className="text-red-500">{errorMessage}</p>}

      <a
        href="../assets/data/Planning_2024.xlsx"
        className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
        download
      >
        Télécharger un exemple
      </a>
    </div>
  );
};

export default Reporting;

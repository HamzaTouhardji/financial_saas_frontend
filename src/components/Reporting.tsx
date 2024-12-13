import React from 'react';

const Reporting: React.FC = () => {
  // const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const file = e.target.files?.[0];
  //   if (file) {
  //     const reader = new FileReader();
  //     reader.onload = (event) => {
  //       const data = event.target?.result;
  //       const workbook = XLSX.read(data, { type: "binary" });
  //       const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
  //       const jsonData = XLSX.utils.sheet_to_json<any>(firstSheet);

  //       const updatedData = {
  //         chiffreAffaires: jsonData.map((row) =>
  //           parseFloat(row.chiffreAffaires)
  //         ),
  //         cogs: jsonData.map((row) => parseFloat(row.cogs)),
  //         opex: jsonData.map((row) => parseFloat(row.opex)),
  //       };

  //       setData(updatedData);
  //     };
  //     reader.readAsBinaryString(file);
  //   }
  // };

  return (
    <div className="dark:bg-gray-900 dark:text-gray-200">
      <input type="file" accept=".xlsx, .xls" />
    </div>
  );
};

export default Reporting;

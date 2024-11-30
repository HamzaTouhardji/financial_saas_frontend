import React, { ReactNode } from "react";

const DashboardCard: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <div className="bg-white rounded-lg shadow-md max-w-[80vw]">
      {children}
    </div>
  );
};

export default DashboardCard;
import React from 'react';

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div className="flex">
      <div className="flex flex-col flex-grow bg-gray-100 min-h-screen">
        {children}
      </div>
    </div>
  );
};

export default MainLayout;

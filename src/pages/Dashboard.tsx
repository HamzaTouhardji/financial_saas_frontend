import React from 'react';
import DashboardCard from '../components/DashboardCard';
import ThemeToggleButton from '../components/ThemeToggleButton';
import Planification from '../components/Planification';
import Reporting from '../components/Reporting';
import PlanningGraph from '../components/graph';
import { PlanningProvider } from '../context/PlanningContext';

const Dashboard: React.FC = () => {
  return (
    <div className="p-6 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 min-h-screen">
      <div className="flex justify-between items-center mb-6 p-4 bg-white dark:bg-gray-900 shadow-md rounded-lg">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-200">
          Dashboard
        </h1>

        <div className="flex items-center space-x-4">
          <ThemeToggleButton />

          <div className="relative">
            <img
              src="/profil.jpeg"
              alt="User Avatar"
              className="w-10 h-10 rounded-full border-2 border-gray-300 dark:border-gray-600"
            />

            <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white dark:border-gray-900"></span>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-12">
        <PlanningProvider>
          <div className="flex flex-col gap-12">
            <DashboardCard>
              <Planification />
            </DashboardCard>

            <DashboardCard>
              <Reporting />
            </DashboardCard>

            <DashboardCard>
              <PlanningGraph />
            </DashboardCard>
          </div>
        </PlanningProvider>
      </div>
    </div>
  );
};

export default Dashboard;

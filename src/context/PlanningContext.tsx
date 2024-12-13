import React, { createContext, useContext, useState } from 'react';
import { Planning, PlanningContextType } from '../interface/PlanningInterface';

const PlanningContext = createContext<PlanningContextType | undefined>(
  undefined,
);

export const usePlanning = () => {
  const context = useContext(PlanningContext);
  if (!context) {
    throw new Error('usePlanning must be used within a PlanningProvider');
  }
  return context;
};

export const PlanningProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const initialPlanning: Planning[] = Array.from({ length: 12 }, (_, i) => ({
    result: Math.floor(Math.random() * 1000),
    tax: Math.floor(Math.random() * 500),
    ebitda: Math.floor(Math.random() * 2000),
    net_income: Math.floor(Math.random() * 1000),
    opex: Math.floor(Math.random() * 700),
    cogs: Math.floor(Math.random() * 600),
    revenue: Math.floor(Math.random() * 3000),
    month: new Date(0, i).toLocaleString('en', { month: 'long' }),
    year: 2024,
  }));

  const [planning, setPlanning] = useState<Planning[] | null>(initialPlanning);

  return (
    <PlanningContext.Provider value={{ planning, setPlanning }}>
      {children}
    </PlanningContext.Provider>
  );
};

export interface Planning {
  result: number;
  tax: number;
  ebitda: number;
  net_income: number;
  opex: number;
  cogs: number;
  revenue: number;
  month: string;
  year: number;
}

export interface PlanningContextType {
  planning: Planning[] | null;
  setPlanning: (planning: Planning[] | null) => void;
}

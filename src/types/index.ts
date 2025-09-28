export interface ViolenceApiResponse {
  metrics: {
    totalHomicides: number;
    totalLatrocinio: number;
    totalLesaoCorporal: number;
    totalVictims: number;
    homicideChange: number;
    totalChange: number;
  };
  timeSeries: {
    date: string;
    homicides: number;
    latrocinio: number;
    lesaoCorporal: number;
    total: number;
  }[];
  yearComparison: {
    year: number;
    homicides: number;
    total: number;
  }[];
  lastUpdate: string;
  source: string;
}

export interface DashboardMetric {
  title: string;
  value: number | string;
  change: number;
  description: string;
  trend: 'up' | 'down' | 'stable';
}

export interface Victim {
  id: string;
  name: string;
  age: number;
  neighborhood: string;
  date: string;
  tribute?: string;
  submittedBy?: string;
  isApproved: boolean;
}
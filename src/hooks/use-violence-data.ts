"use client";

import { useState, useEffect } from "react";
import { ViolenceApiResponse, DashboardMetric } from "@/types";

export function useViolenceData() {
  const [data, setData] = useState<ViolenceApiResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        const response = await fetch('/api/violence-data');
        
        if (!response.ok) {
          throw new Error('Erro ao carregar dados');
        }
        
        const result: ViolenceApiResponse = await response.json();
        setData(result);
        
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erro desconhecido');
        console.error('Erro ao carregar dados de violência:', err);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  const dashboardMetrics: DashboardMetric[] = data ? [
    {
      title: "Homicídios Dolosos",
      value: data.metrics.totalHomicides,
      change: data.metrics.homicideChange,
      description: "Dados SSP-BA 2024",
      trend: data.metrics.homicideChange < 0 ? 'down' : data.metrics.homicideChange > 0 ? 'up' : 'stable'
    },
    {
      title: "Latrocínios",
      value: data.metrics.totalLatrocinio,
      change: 0, // Será calculado quando tivermos mais dados históricos
      description: "Roubos seguidos de morte",
      trend: 'stable'
    },
    {
      title: "Lesão Corporal + Morte",
      value: data.metrics.totalLesaoCorporal,
      change: 0,
      description: "Agressões fatais",
      trend: 'stable'
    },
    {
      title: "Total de Vítimas",
      value: data.metrics.totalVictims,
      change: data.metrics.totalChange,
      description: "Mortes violentas em 2024",
      trend: data.metrics.totalChange < 0 ? 'down' : data.metrics.totalChange > 0 ? 'up' : 'stable'
    }
  ] : [];

  return {
    data,
    dashboardMetrics,
    timeSeries: data?.timeSeries || [],
    yearComparison: data?.yearComparison || [],
    isLoading,
    error,
    lastUpdate: data?.lastUpdate,
    source: data?.source
  };
}
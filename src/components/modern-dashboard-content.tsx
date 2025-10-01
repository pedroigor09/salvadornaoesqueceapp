"use client";

import { useViolenceData } from "@/hooks/use-violence-data";
import { AlertTriangle, Users, TrendingUp, MapPin } from "lucide-react";
import { HumanizedSection } from "./humanized-section";
import { ModernMetricCard } from "./modern-metric-card";
import { ServicesCard } from "./services-card";
import { ChartSection } from "./chart-section";
import { BottomSection } from "./bottom-section";
import { LoadingSkeleton, ErrorState } from "./dashboard-states";

interface ModernDashboardContentProps {
  onShowServices?: () => void;
}

export function ModernDashboardContent({ onShowServices }: ModernDashboardContentProps) {
  const { dashboardMetrics, timeSeries, yearComparison, isLoading, error } = useViolenceData();

  if (isLoading) {
    return <LoadingSkeleton />;
  }

  if (error) {
    return <ErrorState error={error} />;
  }

  // Preparar dados para gráficos
  const pieData = dashboardMetrics.map((metric, index) => ({
    name: metric.title,
    value: typeof metric.value === 'number' ? metric.value : 0,
    color: ['#3B82F6', '#10B981', '#F59E0B', '#EF4444'][index] || '#6B7280'
  }));

  // Calcular redução estimada
  const estimatedReduction = (() => {
    const homicides = dashboardMetrics[0];
    if (homicides && homicides.trend === 'down' && homicides.change > 0) {
      const currentValue = homicides.value as number;
      const reductionPercent = homicides.change / 100;
      return Math.round(currentValue * reductionPercent);
    }
    return undefined;
  })();

  return (
    <div className="space-y-4 md:space-y-6">
      {/* Card de destaque para serviços */}
      <ServicesCard onShowServices={onShowServices} />

      {/* Métricas principais */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {dashboardMetrics.map((metric, index) => (
          <ModernMetricCard
            key={index}
            title={metric.title}
            value={metric.value}
            change={metric.change}
            trend={metric.trend}
            icon={[AlertTriangle, Users, TrendingUp, MapPin][index] || AlertTriangle}
            color={[
              'bg-gradient-to-r from-red-500 to-red-600',
              'bg-gradient-to-r from-blue-500 to-blue-600', 
              'bg-gradient-to-r from-purple-500 to-purple-600',
              'bg-gradient-to-r from-green-500 to-green-600'
            ][index] || 'bg-gradient-to-r from-gray-500 to-gray-600'}
          />
        ))}
      </div>

      {/* Seção Humanizada - Esperança e Ação */}
      <HumanizedSection 
        totalVictims={dashboardMetrics[3]?.value as number || 0}
        reduction={estimatedReduction}
        onShowServices={onShowServices}
      />

      {/* Gráficos principais */}
      <ChartSection 
        timeSeries={timeSeries}
        yearComparison={yearComparison}
      />

      {/* Seção inferior */}
      <BottomSection pieData={pieData} />
    </div>
  );
}
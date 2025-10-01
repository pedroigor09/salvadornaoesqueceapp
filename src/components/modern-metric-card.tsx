"use client";

import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import { cn } from "@/lib/utils";

interface ModernMetricCardProps {
  title: string;
  value: string | number;
  change: number;
  trend: 'up' | 'down' | 'stable';
  icon: React.ComponentType<{ className?: string }>;
  color: string;
}

export function ModernMetricCard({ title, value, change, trend, icon: Icon, color }: ModernMetricCardProps) {
  const getTrendIcon = () => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="h-4 w-4" />;
      case 'down':
        return <TrendingDown className="h-4 w-4" />;
      default:
        return <Minus className="h-4 w-4" />;
    }
  };

  const getTrendColor = () => {
    switch (trend) {
      case 'up':
        return "text-red-400";
      case 'down':
        return "text-green-400";
      default:
        return "text-gray-400";
    }
  };

  return (
    <div className="bg-gray-900 rounded-xl p-4 md:p-6 border border-gray-800 hover:border-gray-700 transition-all duration-200">
      <div className="flex items-center justify-between mb-3 md:mb-4">
        <div className={`p-2 md:p-3 rounded-lg ${color}`}>
          <Icon className="h-5 w-5 md:h-6 md:w-6 text-white" />
        </div>
        <div className={cn("flex items-center space-x-1 text-xs md:text-sm", getTrendColor())}>
          {getTrendIcon()}
          <span>{Math.abs(change)}%</span>
        </div>
      </div>
      
      <div className="space-y-1">
        <h3 className="text-gray-400 text-xs md:text-sm font-medium">{title}</h3>
        <p className="text-white text-xl md:text-2xl font-bold">
          {typeof value === 'number' ? value.toLocaleString('pt-BR') : value}
        </p>
      </div>
    </div>
  );
}
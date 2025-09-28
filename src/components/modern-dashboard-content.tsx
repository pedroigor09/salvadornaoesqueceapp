"use client";

import { AreaChart, Area, BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { useViolenceData } from "@/hooks/use-violence-data";
import { TrendingUp, TrendingDown, Minus, AlertTriangle, Users, MapPin, Calendar, Heart } from "lucide-react";
import { cn } from "@/lib/utils";

interface ModernMetricCardProps {
  title: string;
  value: string | number;
  change: number;
  trend: 'up' | 'down' | 'stable';
  icon: React.ComponentType<{ className?: string }>;
  color: string;
}

function ModernMetricCard({ title, value, change, trend, icon: Icon, color }: ModernMetricCardProps) {
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
    <div className="bg-gray-900 rounded-xl p-6 border border-gray-800 hover:border-gray-700 transition-all duration-200">
      <div className="flex items-center justify-between mb-4">
        <div className={`p-3 rounded-lg ${color}`}>
          <Icon className="h-6 w-6 text-white" />
        </div>
        <div className={cn("flex items-center space-x-1 text-sm", getTrendColor())}>
          {getTrendIcon()}
          <span>{Math.abs(change)}%</span>
        </div>
      </div>
      
      <div className="space-y-1">
        <h3 className="text-gray-400 text-sm font-medium">{title}</h3>
        <p className="text-white text-2xl font-bold">
          {typeof value === 'number' ? value.toLocaleString('pt-BR') : value}
        </p>
      </div>
    </div>
  );
}

function TopProductsCard() {
  const mockProducts = [
    { name: "Centro Histórico", popularity: 85, sales: "18%" },
    { name: "Liberdade", popularity: 72, sales: "15%" },
    { name: "Subúrbio", popularity: 68, sales: "12%" },
    { name: "Cajazeiras", popularity: 45, sales: "8%" }
  ];

  return (
    <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
      <h3 className="text-white text-lg font-semibold mb-6">Bairros Mais Afetados</h3>
      <div className="space-y-4">
        {mockProducts.map((product, index) => (
          <div key={index} className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <span className="text-gray-400 text-sm font-medium">
                {String(index + 1).padStart(2, '0')}
              </span>
              <span className="text-white font-medium">{product.name}</span>
            </div>
            <div className="flex items-center space-x-4">
              <div className="w-24 bg-gray-800 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full" 
                  style={{ width: `${product.popularity}%` }}
                />
              </div>
              <span className="text-green-400 text-sm font-medium w-12 text-right">
                {product.sales}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

interface ModernDashboardContentProps {
  onShowServices?: () => void;
}

export function ModernDashboardContent({ onShowServices }: ModernDashboardContentProps) {
  const { dashboardMetrics, timeSeries, yearComparison, isLoading, error } = useViolenceData();

  if (isLoading) {
    return (
      <div className="space-y-6">
        {/* Skeleton loading */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="bg-gray-900 rounded-xl p-6 border border-gray-800 animate-pulse">
              <div className="h-12 bg-gray-800 rounded-lg mb-4" />
              <div className="h-4 bg-gray-800 rounded mb-2" />
              <div className="h-8 bg-gray-800 rounded" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="bg-gray-900 rounded-xl p-6 border border-red-800 text-center">
          <AlertTriangle className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <p className="text-red-400 font-medium">Erro ao carregar dados</p>
          <p className="text-gray-400 text-sm mt-2">{error}</p>
        </div>
      </div>
    );
  }

  // Preparar dados para gráficos
  const pieData = dashboardMetrics.map((metric, index) => ({
    name: metric.title,
    value: typeof metric.value === 'number' ? metric.value : 0,
    color: ['#3B82F6', '#10B981', '#F59E0B', '#EF4444'][index] || '#6B7280'
  }));

  return (
    <div className="space-y-6">
      {/* Card de destaque para serviços */}
      {onShowServices && (
        <div className="bg-gradient-to-r from-purple-900/50 via-pink-900/50 to-red-900/50 rounded-2xl p-6 border border-purple-500/30 backdrop-blur-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="p-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl">
                <Users className="h-8 w-8 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white mb-2">
                  Serviços de Apoio às Mulheres
                </h3>
                <p className="text-gray-300">
                  Encontre ajuda jurídica e psicológica gratuita na Bahia
                </p>
              </div>
            </div>
            <button
              onClick={onShowServices}
              className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl hover:from-purple-700 hover:to-pink-700 transition-all duration-300 font-medium hover:scale-105"
            >
              Ver Serviços
            </button>
          </div>
        </div>
      )}

      {/* Métricas principais */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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

      {/* Gráficos principais */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Gráfico de área - Evolução temporal */}
        <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-white text-lg font-semibold">Evolução Mensal</h3>
              <p className="text-gray-400 text-sm">Mortes violentas em 2024</p>
            </div>
            <div className="text-right">
              <p className="text-green-400 text-sm font-medium">↓ 8.5%</p>
              <p className="text-gray-400 text-xs">vs mês anterior</p>
            </div>
          </div>
          
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={timeSeries}>
              <defs>
                <linearGradient id="colorHomicides" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis 
                dataKey="date" 
                stroke="#9CA3AF"
                fontSize={12}
              />
              <YAxis stroke="#9CA3AF" fontSize={12} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1F2937', 
                  border: '1px solid #374151',
                  borderRadius: '8px',
                  color: '#F9FAFB'
                }}
              />
              <Area
                type="monotone"
                dataKey="homicides"
                stroke="#3B82F6"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#colorHomicides)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Gráfico de barras - Comparação anual */}
        <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-white text-lg font-semibold">Comparação Anual</h3>
              <p className="text-gray-400 text-sm">Homicídios por ano</p>
            </div>
          </div>
          
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={yearComparison}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis 
                dataKey="year" 
                stroke="#9CA3AF"
                fontSize={12}
              />
              <YAxis stroke="#9CA3AF" fontSize={12} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1F2937', 
                  border: '1px solid #374151',
                  borderRadius: '8px',
                  color: '#F9FAFB'
                }}
              />
              <Bar 
                dataKey="homicides" 
                fill="url(#barGradient)"
                radius={[4, 4, 0, 0]}
              />
              <defs>
                <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#10B981" />
                  <stop offset="100%" stopColor="#059669" />
                </linearGradient>
              </defs>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Seção inferior */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Bairros mais afetados */}
        <TopProductsCard />

        {/* Gráfico de pizza */}
        <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
          <h3 className="text-white text-lg font-semibold mb-6">Distribuição por Tipo</h3>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                innerRadius={40}
                outerRadius={80}
                paddingAngle={2}
                dataKey="value"
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1F2937', 
                  border: '1px solid #374151',
                  borderRadius: '8px',
                  color: '#F9FAFB'
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Insights */}
        <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
          <h3 className="text-white text-lg font-semibold mb-6">Insights</h3>
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-green-400 rounded-full mt-2" />
              <div>
                <p className="text-white text-sm font-medium">Redução de 8.5%</p>
                <p className="text-gray-400 text-xs">Homicídios vs mês anterior</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2" />
              <div>
                <p className="text-white text-sm font-medium">Centro em alerta</p>
                <p className="text-gray-400 text-xs">Aumento de casos na região</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-blue-400 rounded-full mt-2" />
              <div>
                <p className="text-white text-sm font-medium">Dados atualizados</p>
                <p className="text-gray-400 text-xs">Fonte: SSP-BA</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
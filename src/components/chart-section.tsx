"use client";

import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

interface ChartSectionProps {
  timeSeries: any[];
  yearComparison: any[];
}

export function ChartSection({ timeSeries, yearComparison }: ChartSectionProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
      {/* Gráfico de área - Evolução temporal */}
      <div className="bg-gray-900 rounded-xl p-4 md:p-6 border border-gray-800">
        <div className="flex items-center justify-between mb-4 md:mb-6">
          <div>
            <h3 className="text-white text-base md:text-lg font-semibold">Evolução Mensal</h3>
            <p className="text-gray-400 text-xs md:text-sm">Mortes violentas em 2024</p>
          </div>
          <div className="text-right">
            <p className="text-green-400 text-xs md:text-sm font-medium">↓ 8.5%</p>
            <p className="text-gray-400 text-xs">vs mês anterior</p>
          </div>
        </div>
        
        <ResponsiveContainer width="100%" height={250}>
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
              fontSize={10}
              tick={{ fontSize: 10 }}
              interval={1}
            />
            <YAxis stroke="#9CA3AF" fontSize={10} />
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
      <div className="bg-gray-900 rounded-xl p-4 md:p-6 border border-gray-800">
        <div className="flex items-center justify-between mb-4 md:mb-6">
          <div>
            <h3 className="text-white text-base md:text-lg font-semibold">Comparação Anual</h3>
            <p className="text-gray-400 text-xs md:text-sm">Homicídios por ano</p>
          </div>
        </div>
        
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={yearComparison}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis 
              dataKey="year" 
              stroke="#9CA3AF"
              fontSize={10}
              tick={{ fontSize: 10 }}
            />
            <YAxis stroke="#9CA3AF" fontSize={10} />
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
  );
}
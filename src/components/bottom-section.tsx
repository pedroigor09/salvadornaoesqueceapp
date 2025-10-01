"use client";

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { TopProductsCard } from "./top-products-card";

interface BottomSectionProps {
  pieData: Array<{
    name: string;
    value: number;
    color: string;
  }>;
}

export function BottomSection({ pieData }: BottomSectionProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
      {/* Bairros mais afetados */}
      <TopProductsCard />

      {/* Gráfico de pizza */}
      <div className="bg-gray-900 rounded-xl p-4 md:p-6 border border-gray-800">
        <h3 className="text-white text-base md:text-lg font-semibold mb-4 md:mb-6">Distribuição por Tipo</h3>
        <ResponsiveContainer width="100%" height={180}>
          <PieChart>
            <Pie
              data={pieData}
              cx="50%"
              cy="50%"
              innerRadius={30}
              outerRadius={60}
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
      <div className="bg-gray-900 rounded-xl p-4 md:p-6 border border-gray-800">
        <h3 className="text-white text-base md:text-lg font-semibold mb-4 md:mb-6">Insights</h3>
        <div className="space-y-3 md:space-y-4">
          <div className="flex items-start space-x-3">
            <div className="w-2 h-2 bg-green-400 rounded-full mt-2" />
            <div>
              <p className="text-white text-xs md:text-sm font-medium">Redução de 8.5%</p>
              <p className="text-gray-400 text-xs">Homicídios vs mês anterior</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2" />
            <div>
              <p className="text-white text-xs md:text-sm font-medium">Centro em alerta</p>
              <p className="text-gray-400 text-xs">Aumento de casos na região</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <div className="w-2 h-2 bg-blue-400 rounded-full mt-2" />
            <div>
              <p className="text-white text-xs md:text-sm font-medium">Dados atualizados</p>
              <p className="text-gray-400 text-xs">Fonte: SSP-BA</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
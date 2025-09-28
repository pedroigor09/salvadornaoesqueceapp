"use client";

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts";
import { MetricCard } from "@/components/metric-card";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useViolenceData } from "@/hooks/use-violence-data";
import { Skeleton } from "@/components/ui/skeleton";

export function DashboardContent() {
  const { dashboardMetrics, timeSeries, yearComparison, isLoading, error, lastUpdate, source } = useViolenceData();

  if (isLoading) {
    return <DashboardSkeleton />;
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-64">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6">
            <div className="text-center space-y-2">
              <p className="text-red-600 font-medium">Erro ao carregar dados</p>
              <p className="text-sm text-gray-500">{error}</p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-gray-900">
          Painel de Dados - Violência em Salvador
        </h1>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <p className="text-gray-600">
            Dados oficiais sobre mortes violentas na capital baiana
          </p>
          {lastUpdate && (
            <p className="text-sm text-gray-500">
              Atualizado em: {new Date(lastUpdate).toLocaleDateString('pt-BR')}
            </p>
          )}
        </div>
        {source && (
          <p className="text-xs text-gray-400">
            Fonte: {source}
          </p>
        )}
      </div>

      {/* Métricas principais */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {dashboardMetrics.map((metric, index) => (
          <MetricCard key={index} metric={metric} />
        ))}
      </div>

      {/* Gráficos */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Gráfico temporal */}
        <Card>
          <CardHeader>
            <CardTitle>Evolução Mensal - 2024</CardTitle>
            <CardDescription>
              Mortes violentas por mês em Salvador
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={timeSeries}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="date" 
                  tick={{ fontSize: 12 }}
                  angle={-45}
                  textAnchor="end"
                  height={60}
                />
                <YAxis />
                <Tooltip 
                  formatter={(value: number, name: string) => {
                    const labels: Record<string, string> = {
                      'homicides': 'Homicídios Dolosos',
                      'latrocinio': 'Latrocínios',
                      'lesaoCorporal': 'Lesão Corporal + Morte',
                      'total': 'Total'
                    };
                    return [value, labels[name] || name];
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="homicides" 
                  stroke="#dc2626" 
                  strokeWidth={2}
                  name="homicides"
                />
                <Line 
                  type="monotone" 
                  dataKey="latrocinio" 
                  stroke="#f59e0b" 
                  strokeWidth={2}
                  name="latrocinio"
                />
                <Line 
                  type="monotone" 
                  dataKey="lesaoCorporal" 
                  stroke="#7c3aed" 
                  strokeWidth={2}
                  name="lesaoCorporal"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Comparação anual */}
        <Card>
          <CardHeader>
            <CardTitle>Comparação Anual</CardTitle>
            <CardDescription>
              Total de homicídios por ano
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={yearComparison}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="year" />
                <YAxis />
                <Tooltip 
                  formatter={(value: number, name: string) => [
                    value, 
                    name === 'homicides' ? 'Homicídios' : 'Total'
                  ]}
                />
                <Bar dataKey="homicides" fill="#dc2626" name="homicides" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Tabela detalhada */}
      <Card>
        <CardHeader>
          <CardTitle>Dados Mensais Detalhados - 2024</CardTitle>
          <CardDescription>
            Breakdown por tipo de crime
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-2">Mês</th>
                  <th className="text-right p-2">Homicídios</th>
                  <th className="text-right p-2">Latrocínios</th>
                  <th className="text-right p-2">Lesão + Morte</th>
                  <th className="text-right p-2">Total</th>
                </tr>
              </thead>
              <tbody>
                {timeSeries.map((month, index) => (
                  <tr key={index} className="border-b">
                    <td className="p-2 font-medium">{month.date}</td>
                    <td className="p-2 text-right">{month.homicides}</td>
                    <td className="p-2 text-right">{month.latrocinio}</td>
                    <td className="p-2 text-right">{month.lesaoCorporal}</td>
                    <td className="p-2 text-right font-medium">{month.total}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function DashboardSkeleton() {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Skeleton className="h-8 w-96" />
        <Skeleton className="h-4 w-64" />
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <Card key={i}>
            <CardHeader className="space-y-2">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-8 w-20" />
            </CardHeader>
          </Card>
        ))}
      </div>
      
      <div className="grid gap-6 md:grid-cols-2">
        {Array.from({ length: 2 }).map((_, i) => (
          <Card key={i}>
            <CardHeader>
              <Skeleton className="h-6 w-48" />
              <Skeleton className="h-4 w-32" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-[300px] w-full" />
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
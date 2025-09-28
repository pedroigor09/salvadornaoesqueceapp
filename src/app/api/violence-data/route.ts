import { NextResponse } from 'next/server';
import { readFileSync } from 'fs';
import { join } from 'path';
import { 
  parseCSVLine, 
  processViolenceData, 
  filterSalvadorData, 
  calculateSalvadorStats,
  ProcessedViolenceData 
} from '@/lib/violence-data';

export async function GET() {
  try {
    // Ler o arquivo CSV
    const csvPath = join(process.cwd(), 'public', 'mortes_violentas_estado.csv');
    const csvContent = readFileSync(csvPath, 'utf-8');
    const lines = csvContent.split('\n');
    
    // Pular o cabeçalho e processar as linhas
    const processedData: ProcessedViolenceData[] = [];
    
    for (let i = 1; i < lines.length; i++) {
      const line = lines[i].trim();
      if (!line) continue;
      
      const rawData = parseCSVLine(line);
      if (rawData) {
        const processed = processViolenceData(rawData);
        processedData.push(processed);
      }
    }
    
    // Filtrar apenas dados de Salvador
    const salvadorData = filterSalvadorData(processedData);
    
    // Calcular estatísticas
    const stats = calculateSalvadorStats(salvadorData);
    
    // Calcular variações percentuais (comparando 2024 vs 2023)
    const currentYear = stats.yearComparison.find(y => y.year === 2024);
    const previousYear = stats.yearComparison.find(y => y.year === 2023);
    
    let homicideChange = 0;
    let totalChange = 0;
    
    if (currentYear && previousYear) {
      homicideChange = previousYear.homicides > 0 
        ? ((currentYear.homicides - previousYear.homicides) / previousYear.homicides) * 100
        : 0;
      
      totalChange = previousYear.total > 0 
        ? ((currentYear.total - previousYear.total) / previousYear.total) * 100
        : 0;
    }
    
    // Dados dos últimos meses para o gráfico temporal
    const recentMonths = stats.monthlyData.slice(-6);
    
    // Preparar resposta no formato esperado pelo frontend
    const response = {
      metrics: {
        totalHomicides: stats.totalHomicides,
        totalLatrocinio: stats.totalLatrocinio,
        totalLesaoCorporal: stats.totalLesaoCorporal,
        totalVictims: stats.totalVictims,
        homicideChange: Math.round(homicideChange * 10) / 10,
        totalChange: Math.round(totalChange * 10) / 10
      },
      timeSeries: recentMonths.map(month => ({
        date: month.month,
        homicides: month.homicides,
        latrocinio: month.latrocinio,
        lesaoCorporal: month.lesaoCorporal,
        total: month.total
      })),
      yearComparison: stats.yearComparison,
      lastUpdate: new Date().toISOString(),
      source: 'SSP-BA / Portal de Dados Abertos'
    };
    
    return NextResponse.json(response);
    
  } catch (error) {
    console.error('Erro ao processar dados de violência:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}
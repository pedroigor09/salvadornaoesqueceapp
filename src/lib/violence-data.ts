export interface RawViolenceData {
  ANO_1: string;
  ID_REGIAO: string;
  REGIAO: string;
  ID_MUNICIPIO: string;
  MUNICIPIO: string;
  ANO: string;
  MES: string;
  GR_NATUREZA: string;
  QT_VITIMAS: string;
}

export interface ProcessedViolenceData {
  year: number;
  month: number;
  municipality: string;
  region: string;
  crimeType: string;
  victims: number;
  date: string;
}

export interface SalvadorStats {
  totalHomicides: number;
  totalLatrocinio: number;
  totalLesaoCorporal: number;
  totalVictims: number;
  monthlyData: {
    month: string;
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
}

export const CRIME_TYPES = {
  'HOMICIDIO DOLOSO': 'Homicídio Doloso',
  'ROUBO COM RESULTADO MORTE - (LATROCINIO)': 'Latrocínio',
  'LESAO CORPORAL SEGUIDA DE MORTE': 'Lesão Corporal Seguida de Morte'
} as const;

export const MONTHS = [
  'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
  'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
];

export function parseCSVLine(line: string): RawViolenceData | null {
  const columns = line.split(',');
  
  if (columns.length < 9) return null;
  
  return {
    ANO_1: columns[0],
    ID_REGIAO: columns[1],
    REGIAO: columns[2],
    ID_MUNICIPIO: columns[3],
    MUNICIPIO: columns[4],
    ANO: columns[5],
    MES: columns[6],
    GR_NATUREZA: columns[7],
    QT_VITIMAS: columns[8]
  };
}

export function processViolenceData(raw: RawViolenceData): ProcessedViolenceData {
  const year = parseInt(raw.ANO);
  const month = parseInt(raw.MES);
  
  return {
    year,
    month,
    municipality: raw.MUNICIPIO,
    region: raw.REGIAO,
    crimeType: raw.GR_NATUREZA,
    victims: parseInt(raw.QT_VITIMAS) || 0,
    date: `${year}-${month.toString().padStart(2, '0')}`
  };
}

export function filterSalvadorData(data: ProcessedViolenceData[]): ProcessedViolenceData[] {
  return data.filter(item => item.municipality === 'Salvador');
}

export function calculateSalvadorStats(salvadorData: ProcessedViolenceData[]): SalvadorStats {
  const stats: SalvadorStats = {
    totalHomicides: 0,
    totalLatrocinio: 0,
    totalLesaoCorporal: 0,
    totalVictims: 0,
    monthlyData: [],
    yearComparison: []
  };

  // Calcular totais por tipo de crime
  salvadorData.forEach(item => {
    stats.totalVictims += item.victims;
    
    switch (item.crimeType) {
      case 'HOMICIDIO DOLOSO':
        stats.totalHomicides += item.victims;
        break;
      case 'ROUBO COM RESULTADO MORTE - (LATROCINIO)':
        stats.totalLatrocinio += item.victims;
        break;
      case 'LESAO CORPORAL SEGUIDA DE MORTE':
        stats.totalLesaoCorporal += item.victims;
        break;
    }
  });

  // Agrupar por mês (2024)
  const monthlyGroups = new Map<string, {
    homicides: number;
    latrocinio: number;
    lesaoCorporal: number;
    total: number;
  }>();

  salvadorData
    .filter(item => item.year === 2024)
    .forEach(item => {
      const monthKey = `${item.year}-${item.month.toString().padStart(2, '0')}`;
      
      if (!monthlyGroups.has(monthKey)) {
        monthlyGroups.set(monthKey, {
          homicides: 0,
          latrocinio: 0,
          lesaoCorporal: 0,
          total: 0
        });
      }
      
      const group = monthlyGroups.get(monthKey)!;
      group.total += item.victims;
      
      switch (item.crimeType) {
        case 'HOMICIDIO DOLOSO':
          group.homicides += item.victims;
          break;
        case 'ROUBO COM RESULTADO MORTE - (LATROCINIO)':
          group.latrocinio += item.victims;
          break;
        case 'LESAO CORPORAL SEGUIDA DE MORTE':
          group.lesaoCorporal += item.victims;
          break;
      }
    });

  // Converter para array ordenado
  stats.monthlyData = Array.from(monthlyGroups.entries())
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([monthKey, data]) => {
      const [year, month] = monthKey.split('-');
      const monthIndex = parseInt(month) - 1;
      
      return {
        month: MONTHS[monthIndex],
        ...data
      };
    });

  // Comparação anual
  const yearGroups = new Map<number, { homicides: number; total: number }>();
  
  salvadorData.forEach(item => {
    if (!yearGroups.has(item.year)) {
      yearGroups.set(item.year, { homicides: 0, total: 0 });
    }
    
    const group = yearGroups.get(item.year)!;
    group.total += item.victims;
    
    if (item.crimeType === 'HOMICIDIO DOLOSO') {
      group.homicides += item.victims;
    }
  });
  
  stats.yearComparison = Array.from(yearGroups.entries())
    .sort(([a], [b]) => a - b)
    .map(([year, data]) => ({ year, ...data }));

  return stats;
}
import { NextResponse } from 'next/server';
import { FogoCruzadoService } from '@/services/fogo-cruzado';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    
    // Parâmetros opcionais
    const initialDate = searchParams.get('initialDate');
    const finalDate = searchParams.get('finalDate');
    
    // Se não informar datas, pega dos últimos 12 meses
    const defaultFinalDate = new Date().toISOString().split('T')[0];
    const defaultInitialDate = new Date(Date.now() - 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];

    const salvadorData = await FogoCruzadoService.getSalvadorData({
      initialDate: initialDate || defaultInitialDate,
      finalDate: finalDate || defaultFinalDate
    });

    // Calcula estatísticas gerais
    const totalHomicidios = salvadorData.reduce((sum, bairro) => sum + bairro.homicidios, 0);
    const totalFeridos = salvadorData.reduce((sum, bairro) => sum + bairro.feridos, 0);
    const totalOcorrencias = salvadorData.reduce((sum, bairro) => sum + bairro.ocorrencias.length, 0);

    // Estatísticas por mês
    const monthlyStats = calculateMonthlyStats(salvadorData);

    return NextResponse.json({
      success: true,
      data: {
        totalHomicidios,
        totalFeridos,
        totalOcorrencias,
        bairros: salvadorData,
        monthlyStats,
        fonte: 'Instituto Fogo Cruzado',
        periodo: {
          inicio: initialDate || defaultInitialDate,
          fim: finalDate || defaultFinalDate
        }
      }
    });

  } catch (error) {
    console.error('Erro na API Fogo Cruzado:', error);
    
    // Fallback para dados locais caso a API do Fogo Cruzado falhe
    return NextResponse.json({
      success: false,
      error: 'API Fogo Cruzado indisponível',
      fallbackData: {
        totalHomicidios: 161, // Dados do CSV local como fallback
        totalFeridos: 50,
        totalOcorrencias: 200,
        bairros: [],
        fonte: 'Dados locais (SSP-BA)',
        note: 'Dados do Fogo Cruzado indisponíveis, usando dados locais'
      }
    }, { status: 200 }); // Status 200 para não quebrar o frontend
  }
}

function calculateMonthlyStats(bairrosData: any[]) {
  const monthlyMap = new Map();
  
  bairrosData.forEach(bairro => {
    bairro.ocorrencias.forEach((ocorrencia: any) => {
      const date = new Date(ocorrencia.data);
      const monthKey = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}`;
      
      if (!monthlyMap.has(monthKey)) {
        monthlyMap.set(monthKey, {
          mes: monthKey,
          homicidios: 0,
          feridos: 0,
          ocorrencias: 0
        });
      }
      
      const monthData = monthlyMap.get(monthKey);
      monthData.homicidios += ocorrencia.mortos;
      monthData.feridos += ocorrencia.feridos;
      monthData.ocorrencias += 1;
    });
  });
  
  return Array.from(monthlyMap.values()).sort((a, b) => a.mes.localeCompare(b.mes));
}
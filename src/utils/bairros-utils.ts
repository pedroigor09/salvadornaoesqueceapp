import { BairroData, VictimLight } from '@/types/bairros';
import { BAIRROS_BASE } from '@/data/bairros-data';

export async function fetchRealViolenceData(): Promise<{ total: number; porBairro: any[] }> {
  try {
    // Tenta primeiro a API do Fogo Cruzado
    const fogoCruzadoResponse = await fetch('/api/fogo-cruzado');
    
    if (fogoCruzadoResponse.ok) {
      const fogoCruzadoData = await fogoCruzadoResponse.json();
      
      if (fogoCruzadoData.success) {
        return {
          total: fogoCruzadoData.data.totalHomicidios,
          porBairro: fogoCruzadoData.data.bairros
        };
      }
    }
    
    // Fallback para API local
    const localResponse = await fetch('/api/violence-data');
    const localData = await localResponse.json();
    
    return {
      total: localData.totalHomicides || 161,
      porBairro: []
    };
  } catch (error) {
    console.error('Erro ao buscar dados de violência:', error);
    return {
      total: 161, // Fallback baseado nos dados de 2024 (81) + 2023 (80)
      porBairro: []
    };
  }
}

export function calculateBairrosData(
  totalHomicidiosSalvador: number, 
  dadosReaisPorBairro: any[] = []
): BairroData[] {
  return BAIRROS_BASE.map(bairro => {
    // Tenta encontrar dados reais para este bairro
    const dadosReais = dadosReaisPorBairro.find(real => 
      real.bairro.toLowerCase().includes(bairro.name.toLowerCase()) ||
      bairro.name.toLowerCase().includes(real.bairro.toLowerCase())
    );
    
    // Se tem dados reais, usa eles; senão usa distribuição proporcional
    const homicidios = dadosReais ? dadosReais.homicidios : 
      Math.round(totalHomicidiosSalvador * bairro.percentualViolencia);
    
    const taxa = (homicidios / bairro.populacao) * 100000; // Taxa por 100 mil habitantes
    
    return {
      ...bairro,
      homicidios,
      taxa: Math.round(taxa * 10) / 10, // Arredondar para 1 casa decimal
      lat: bairro.lat,
      lng: bairro.lng
    };
  });
}

function isValidCoordinate(lat: number, lng: number): boolean {
  // Limites mais precisos baseados nas coordenadas reais de Salvador
  // Usando as coordenadas fornecidas como referência
  const SALVADOR_BOUNDS = {
    north: -12.86, // Periperi é o mais ao norte
    south: -13.02, // Barra é o mais ao sul  
    east: -38.35,  // Itapuã é o mais a leste
    west: -38.54   // Barra é o mais a oeste
  };
  
  // Verifica se está dentro dos limites de Salvador
  const withinBounds = lat >= SALVADOR_BOUNDS.south && 
                      lat <= SALVADOR_BOUNDS.north &&
                      lng >= SALVADOR_BOUNDS.west && 
                      lng <= SALVADOR_BOUNDS.east;

  // Evita áreas muito próximas ao mar (margem de segurança)
  const safeFromOcean = lng <= -38.36; // Margem de segurança do oceano
  
  return withinBounds && safeFromOcean;
}

function getBairroDirectionConfig(bairroId: string) {
  const configs = {
    'centro-historico': { maxRadius: 0.006, direction: Math.PI * 1.25 }, // Noroeste
    'liberdade': { maxRadius: 0.008, direction: Math.PI * 1.5 }, // Oeste
    'suburbio': { maxRadius: 0.008, direction: Math.PI * 1.0 }, // Sul/oeste
    'cajazeiras': { maxRadius: 0.012, direction: Math.PI * Math.random() * 2 }, // Qualquer direção (interior)
    'itapua': { maxRadius: 0.008, direction: Math.PI * 1.25 }, // Noroeste (evita mar)
    'brotas': { maxRadius: 0.006, direction: Math.PI * 0.75 }, // Nordeste (evita mar)
    'barra': { maxRadius: 0.005, direction: Math.PI * 0.5 }, // Norte (evita mar e baía)
    'periperi': { maxRadius: 0.008, direction: Math.PI * 1.25 }, // Noroeste
    'fazenda-grande': { maxRadius: 0.007, direction: Math.PI * 1.5 }, // Oeste
  };
  
  return configs[bairroId as keyof typeof configs] || 
         { maxRadius: 0.008, direction: Math.PI * 1.25 };
}

export function generateVictimLights(bairrosData: BairroData[]): VictimLight[] {
  const lights: VictimLight[] = [];
  
  bairrosData.forEach(bairro => {
    for (let i = 0; i < bairro.homicidios; i++) {
      let validPoint = false;
      let attempts = 0;
      let lat: number = bairro.lat;
      let lng: number = bairro.lng;
      
      // Tenta até 10 vezes encontrar um ponto válido em terra
      while (!validPoint && attempts < 10) {
        const config = getBairroDirectionConfig(bairro.id);
        
        // Gera ângulo com preferência pela direção segura
        const randomAngle = config.direction + (Math.random() - 0.5) * Math.PI;
        const radius = 0.002 + (Math.random() * config.maxRadius);
        
        const offsetLat = Math.cos(randomAngle) * radius;
        const offsetLng = Math.sin(randomAngle) * radius;
        
        lat = bairro.lat + offsetLat;
        lng = bairro.lng + offsetLng;
        
        if (isValidCoordinate(lat, lng)) {
          validPoint = true;
        }
        
        attempts++;
      }
      
      // Se não encontrou ponto válido, usa uma posição bem próxima ao centro do bairro
      if (!validPoint) {
        lat = bairro.lat + (Math.random() - 0.5) * 0.003;
        lng = bairro.lng + (Math.random() - 0.5) * 0.003;
      }
      
      lights.push({
        lat,
        lng,
        bairro: bairro.name
      });
    }
  });
  
  return lights;
}
import {
  FogoCruzadoAuthResponse,
  FogoCruzadoResponse,
  FogoCruzadoState,
  FogoCruzadoCity,
  ProcessedFogoCruzadoData
} from '@/types/fogo-cruzado';

const FOGO_CRUZADO_API_BASE = 'https://api-service.fogocruzado.org.br/api/v2';

// Cache do token para evitar muitas requisições de autenticação
let cachedToken: string | null = null;
let tokenExpiry: number = 0;

export class FogoCruzadoService {
  
  // Autentica na API do Fogo Cruzado
  static async authenticate(email: string, password: string): Promise<string> {
    try {
      const response = await fetch(`${FOGO_CRUZADO_API_BASE}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error(`Erro na autenticação: ${response.status}`);
      }

      const data: FogoCruzadoAuthResponse = await response.json();
      
      // Cache do token
      cachedToken = data.data.accessToken;
      tokenExpiry = Date.now() + (data.data.expiresIn * 1000);
      
      return data.data.accessToken;
    } catch (error) {
      console.error('Erro ao autenticar na API Fogo Cruzado:', error);
      throw error;
    }
  }

  // Obtém o token válido (usa cache ou autentica novamente)
  static async getValidToken(): Promise<string> {
    // Se o token existe e ainda é válido, retorna ele
    if (cachedToken && Date.now() < tokenExpiry) {
      return cachedToken;
    }

    // Caso contrário, autentica novamente
    // NOTA: Você precisará configurar essas credenciais
    const email = process.env.FOGO_CRUZADO_EMAIL || '';
    const password = process.env.FOGO_CRUZADO_PASSWORD || '';
    
    if (!email || !password) {
      throw new Error('Credenciais do Fogo Cruzado não configuradas');
    }

    return await this.authenticate(email, password);
  }

  // Busca estados disponíveis
  static async getStates(): Promise<FogoCruzadoState[]> {
    try {
      const token = await this.getValidToken();
      
      const response = await fetch(`${FOGO_CRUZADO_API_BASE}/states`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Erro ao buscar estados: ${response.status}`);
      }

      const data = await response.json();
      return data.data;
    } catch (error) {
      console.error('Erro ao buscar estados:', error);
      throw error;
    }
  }

  // Busca cidades de um estado
  static async getCities(stateId?: string): Promise<FogoCruzadoCity[]> {
    try {
      const token = await this.getValidToken();
      
      let url = `${FOGO_CRUZADO_API_BASE}/cities`;
      if (stateId) {
        url += `?stateId=${stateId}`;
      }
      
      const response = await fetch(url, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Erro ao buscar cidades: ${response.status}`);
      }

      const data = await response.json();
      return data.data;
    } catch (error) {
      console.error('Erro ao buscar cidades:', error);
      throw error;
    }
  }

  // Busca ocorrências por filtros
  static async getOccurrences(params: {
    stateId?: string;
    cityIds?: string[];
    initialDate?: string;
    finalDate?: string;
    page?: number;
    take?: number;
  } = {}): Promise<FogoCruzadoResponse> {
    try {
      const token = await this.getValidToken();
      
      const searchParams = new URLSearchParams();
      
      if (params.stateId) searchParams.append('idState', params.stateId);
      if (params.cityIds) {
        params.cityIds.forEach(cityId => searchParams.append('idCities', cityId));
      }
      if (params.initialDate) searchParams.append('initialdate', params.initialDate);
      if (params.finalDate) searchParams.append('finaldate', params.finalDate);
      if (params.page) searchParams.append('page', params.page.toString());
      if (params.take) searchParams.append('take', params.take.toString());
      
      searchParams.append('order', 'DESC');
      searchParams.append('typeOccurrence', 'withVictim');
      
      const response = await fetch(`${FOGO_CRUZADO_API_BASE}/occurrences?${searchParams}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Erro ao buscar ocorrências: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Erro ao buscar ocorrências:', error);
      throw error;
    }
  }

  // Busca dados específicos de Salvador
  static async getSalvadorData(params: {
    initialDate?: string;
    finalDate?: string;
  } = {}): Promise<ProcessedFogoCruzadoData[]> {
    try {
      // Primeiro, busca o estado da Bahia
      const states = await this.getStates();
      const bahia = states.find(state => state.name.toLowerCase().includes('bahia'));
      
      if (!bahia) {
        throw new Error('Estado da Bahia não encontrado');
      }

      // Busca cidades da Bahia
      const cities = await this.getCities(bahia.id);
      const salvador = cities.find(city => city.name.toLowerCase().includes('salvador'));
      
      if (!salvador) {
        throw new Error('Salvador não encontrada');
      }

      // Busca ocorrências de Salvador
      const occurrences = await this.getOccurrences({
        stateId: bahia.id,
        cityIds: [salvador.id],
        initialDate: params.initialDate,
        finalDate: params.finalDate,
        take: 1000 // Limite maior para pegar mais dados
      });

      // Processa os dados por bairro
      return this.processOccurrencesByNeighborhood(occurrences.data);
      
    } catch (error) {
      console.error('Erro ao buscar dados de Salvador:', error);
      throw error;
    }
  }

  // Processa ocorrências agrupando por bairro
  private static processOccurrencesByNeighborhood(occurrences: any[]): ProcessedFogoCruzadoData[] {
    const bairrosMap = new Map<string, ProcessedFogoCruzadoData>();

    occurrences.forEach(occurrence => {
      const bairroName = occurrence.neighborhood?.name || 'Não identificado';
      const lat = parseFloat(occurrence.latitude);
      const lng = parseFloat(occurrence.longitude);

      if (!bairrosMap.has(bairroName)) {
        bairrosMap.set(bairroName, {
          bairro: bairroName,
          homicidios: 0,
          feridos: 0,
          latitude: lat,
          longitude: lng,
          ocorrencias: []
        });
      }

      const bairroData = bairrosMap.get(bairroName)!;
      
      // Conta vítimas
      let mortos = 0;
      let feridos = 0;
      
      occurrence.victims.forEach((victim: any) => {
        if (victim.situation === 'Dead') {
          mortos++;
        } else if (victim.situation === 'Injured') {
          feridos++;
        }
      });

      bairroData.homicidios += mortos;
      bairroData.feridos += feridos;

      // Adiciona ocorrência
      bairroData.ocorrencias.push({
        id: occurrence.id,
        endereco: occurrence.address,
        data: occurrence.date,
        motivo: occurrence.contextInfo.mainReason.name,
        vitimas: occurrence.victims.length,
        mortos,
        feridos
      });
    });

    return Array.from(bairrosMap.values()).sort((a, b) => b.homicidios - a.homicidios);
  }
}
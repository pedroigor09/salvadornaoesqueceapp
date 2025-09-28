// Tipos para a API do Instituto Fogo Cruzado
export interface FogoCruzadoAuth {
  accessToken: string;
  expiresIn: number;
}

export interface FogoCruzadoAuthResponse {
  msg: string;
  msgCode: string;
  code: number;
  data: FogoCruzadoAuth;
}

export interface FogoCruzadoState {
  id: string;
  name: string;
}

export interface FogoCruzadoCity {
  id: string;
  name: string;
  state: FogoCruzadoState;
}

export interface FogoCruzadoNeighborhood {
  id: string;
  name: string;
}

export interface FogoCruzadoVictim {
  id: string;
  occurrenceId: string;
  type: string;
  situation: 'Dead' | 'Injured';
  circumstances: string[];
  deathDate?: string;
  personType: string;
  age?: number;
  ageGroup: {
    id: string;
    name: string;
  };
  genre: {
    id: string;
    name: string;
  };
  race?: any;
  place: {
    id: string;
    name: string;
  };
}

export interface FogoCruzadoContextInfo {
  mainReason: {
    id: string;
    name: string;
  };
  complementaryReasons: any[];
  clippings: {
    id: string;
    name: string;
  }[];
  massacre: boolean;
  policeUnit?: string;
}

export interface FogoCruzadoOccurrence {
  id: string;
  documentNumber: number;
  address: string;
  state: FogoCruzadoState;
  city: FogoCruzadoCity;
  neighborhood: FogoCruzadoNeighborhood;
  subNeighborhood?: any;
  locality?: any;
  latitude: string;
  longitude: string;
  date: string;
  policeAction: boolean;
  agentPresence: boolean;
  contextInfo: FogoCruzadoContextInfo;
  victims: FogoCruzadoVictim[];
  animalVictims: any[];
}

export interface FogoCruzadoResponse {
  msg: string;
  msgCode: string;
  code: number;
  pageMeta: {
    page: number;
    take: number;
    itemCount: number;
    pageCount: number;
    hasPreviousPage: boolean;
    hasNextPage: boolean;
  };
  data: FogoCruzadoOccurrence[];
}

// Tipos processados para nosso sistema
export interface ProcessedFogoCruzadoData {
  bairro: string;
  homicidios: number;
  feridos: number;
  latitude: number;
  longitude: number;
  ocorrencias: {
    id: string;
    endereco: string;
    data: string;
    motivo: string;
    vitimas: number;
    mortos: number;
    feridos: number;
  }[];
}
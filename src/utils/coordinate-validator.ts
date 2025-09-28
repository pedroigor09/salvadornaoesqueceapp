// Utilitário para validar coordenadas de Salvador
export interface Coordinate {
  lat: number;
  lng: number;
  name: string;
}

// Limites aproximados de Salvador, BA
const SALVADOR_BOUNDS = {
  north: -12.82,
  south: -13.02,
  east: -38.30,
  west: -38.58
};

// Área aproximada da Baía de Todos os Santos (para evitar)
const BAY_AREA = {
  maxLng: -38.48, // Limite leste da baía
  minLat: -12.95  // Limite norte da baía
};

export function isValidSalvadorCoordinate(lat: number, lng: number): boolean {
  // Verifica se está dentro dos limites de Salvador
  const withinBounds = lat >= SALVADOR_BOUNDS.south && 
                      lat <= SALVADOR_BOUNDS.north &&
                      lng >= SALVADOR_BOUNDS.west && 
                      lng <= SALVADOR_BOUNDS.east;

  // Verifica se não está no mar (muito a leste)
  const notInOcean = lng <= -38.48;

  // Verifica se não está na baía (combinação específica)
  const notInBay = !(lng > BAY_AREA.maxLng && lat < BAY_AREA.minLat);

  return withinBounds && notInOcean && notInBay;
}

export function validateCoordinates(coordinates: Coordinate[]): {
  valid: Coordinate[];
  invalid: Coordinate[];
  warnings: string[];
} {
  const valid: Coordinate[] = [];
  const invalid: Coordinate[] = [];
  const warnings: string[] = [];

  coordinates.forEach(coord => {
    if (isValidSalvadorCoordinate(coord.lat, coord.lng)) {
      valid.push(coord);
    } else {
      invalid.push(coord);
      
      // Gera avisos específicos
      if (coord.lng > -38.48) {
        warnings.push(`${coord.name}: Coordenada pode estar no mar (lng: ${coord.lng})`);
      }
      if (coord.lat < SALVADOR_BOUNDS.south || coord.lat > SALVADOR_BOUNDS.north) {
        warnings.push(`${coord.name}: Latitude fora dos limites de Salvador (lat: ${coord.lat})`);
      }
      if (coord.lng < SALVADOR_BOUNDS.west || coord.lng > SALVADOR_BOUNDS.east) {
        warnings.push(`${coord.name}: Longitude fora dos limites de Salvador (lng: ${coord.lng})`);
      }
    }
  });

  return { valid, invalid, warnings };
}

// Coordenadas de referência conhecidas em Salvador
export const SALVADOR_LANDMARKS = {
  pelourinho: { lat: -12.9714, lng: -38.5145, name: "Pelourinho" },
  elevadorLacerda: { lat: -12.9735, lng: -38.5108, name: "Elevador Lacerda" },
  farolBarra: { lat: -13.0106, lng: -38.5326, name: "Farol da Barra" },
  itapua: { lat: -12.9450, lng: -38.3650, name: "Itapuã" },
  cajazeiras: { lat: -12.9500, lng: -38.3200, name: "Cajazeiras" },
  liberdade: { lat: -12.9350, lng: -38.5250, name: "Liberdade" }
};
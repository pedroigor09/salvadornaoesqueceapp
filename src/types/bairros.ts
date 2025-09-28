export interface BairroData {
  id: string;
  name: string;
  lat: number;
  lng: number;
  homicidios: number;
  populacao: number;
  taxa: number;
  descricao: string;
  nivel: "alto" | "medio" | "baixo";
  percentualViolencia: number;
}

export interface BairroInfo {
  id: string;
  name: string;
  lat: number;
  lng: number;
  homicidios: number;
  populacao: number;
  taxa: number;
  descricao: string;
  nivel: 'alto' | 'medio' | 'baixo';
}

export interface VictimLight {
  lat: number;
  lng: number;
  bairro: string;
}

export interface MapComponentProps {
  center: google.maps.LatLngLiteral;
  zoom: number;
  onMarkerClick: (bairro: BairroInfo) => void;
  selectedBairro: BairroInfo | null;
  showVictimLights: boolean;
  victimLights: VictimLight[];
  bairrosData: BairroData[];
}
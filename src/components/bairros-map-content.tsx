"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { Wrapper } from "@googlemaps/react-wrapper";
import { AlertTriangle, MapPin, Users, TrendingUp, Info } from "lucide-react";
import { Badge } from "@/components/ui/badge";

// Declaração dos tipos do Google Maps
declare global {
  interface Window {
    google: typeof google;
  }
}

// Dados dos bairros mais afetados com coordenadas de Salvador
const BAIRROS_DATA = [
  {
    id: "centro-historico",
    name: "Centro Histórico",
    lat: -12.9722,
    lng: -38.5014,
    homicidios: 23,
    populacao: 45000,
    taxa: 51.1,
    descricao: "Região central de Salvador, com alta concentração comercial e turística. Apresenta índices elevados de violência urbana.",
    nivel: "alto" as const
  },
  {
    id: "liberdade",
    name: "Liberdade",
    lat: -12.9450,
    lng: -38.5050,
    homicidios: 19,
    populacao: 32000,
    taxa: 59.4,
    descricao: "Bairro tradicional de Salvador, berço da cultura afro-brasileira. Enfrenta desafios socioeconômicos significativos.",
    nivel: "alto" as const
  },
  {
    id: "suburbio",
    name: "Subúrbio Ferroviário",
    lat: -12.8900,
    lng: -38.4600,
    homicidios: 15,
    populacao: 28000,
    taxa: 53.6,
    descricao: "Região periférica com densidade populacional alta. Necessita de maior investimento em segurança pública.",
    nivel: "medio" as const
  },
  {
    id: "cajazeiras",
    name: "Cajazeiras",
    lat: -12.9200,
    lng: -38.3800,
    homicidios: 12,
    populacao: 35000,
    taxa: 34.3,
    descricao: "Bairro em expansão na periferia de Salvador. Apresenta crescimento urbano desordenado.",
    nivel: "medio" as const
  }
];

interface BairroInfo {
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

interface MapComponentProps {
  center: google.maps.LatLngLiteral;
  zoom: number;
  onMarkerClick: (bairro: BairroInfo) => void;
  selectedBairro: BairroInfo | null;
}

function MapComponent({ center, zoom, onMarkerClick, selectedBairro }: MapComponentProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<google.maps.Map>();
  const [markers, setMarkers] = useState<google.maps.Marker[]>([]);

  useEffect(() => {
    if (ref.current && !map) {
      const newMap = new window.google.maps.Map(ref.current, {
        center,
        zoom,
        styles: [
          {
            "elementType": "geometry",
            "stylers": [
              {
                "hue": "#ff4400"
              },
              {
                "saturation": -68
              },
              {
                "lightness": -4
              },
              {
                "gamma": 0.72
              }
            ]
          },
          {
            "featureType": "road",
            "elementType": "labels.icon",
            "stylers": [
              {
                "visibility": "off"
              }
            ]
          },
          {
            "featureType": "landscape.man_made",
            "elementType": "geometry",
            "stylers": [
              {
                "hue": "#0077ff"
              },
              {
                "gamma": 3.1
              }
            ]
          },
          {
            "featureType": "water",
            "stylers": [
              {
                "hue": "#00ccff"
              },
              {
                "gamma": 0.44
              },
              {
                "saturation": -33
              }
            ]
          },
          {
            "featureType": "poi.park",
            "stylers": [
              {
                "hue": "#44ff00"
              },
              {
                "saturation": -23
              }
            ]
          },
          {
            "featureType": "water",
            "elementType": "labels.text.fill",
            "stylers": [
              {
                "hue": "#007fff"
              },
              {
                "gamma": 0.77
              },
              {
                "saturation": 65
              },
              {
                "lightness": 99
              }
            ]
          },
          {
            "featureType": "water",
            "elementType": "labels.text.stroke",
            "stylers": [
              {
                "gamma": 0.11
              },
              {
                "weight": 5.6
              },
              {
                "saturation": 99
              },
              {
                "hue": "#0091ff"
              },
              {
                "lightness": -86
              }
            ]
          },
          {
            "featureType": "transit.line",
            "elementType": "geometry",
            "stylers": [
              {
                "lightness": -48
              },
              {
                "hue": "#ff5e00"
              },
              {
                "gamma": 1.2
              },
              {
                "saturation": -23
              }
            ]
          },
          {
            "featureType": "transit",
            "elementType": "labels.text.stroke",
            "stylers": [
              {
                "saturation": -64
              },
              {
                "hue": "#ff9100"
              },
              {
                "lightness": 16
              },
              {
                "gamma": 0.47
              },
              {
                "weight": 2.7
              }
            ]
          }
        ]
      });
      setMap(newMap);
    }
  }, [ref, map, center, zoom]);

  useEffect(() => {
    if (map) {
      // Limpar marcadores anteriores
      markers.forEach(marker => marker.setMap(null));

      // Criar novos marcadores
      const newMarkers = BAIRROS_DATA.map(bairro => {
        const marker = new google.maps.Marker({
          position: { lat: bairro.lat, lng: bairro.lng },
          map,
          title: bairro.name,
          icon: {
            path: google.maps.SymbolPath.CIRCLE,
            scale: bairro.nivel === 'alto' ? 12 : 8,
            fillColor: bairro.nivel === 'alto' ? '#EF4444' : '#F59E0B',
            fillOpacity: 0.8,
            strokeColor: '#FFFFFF',
            strokeWeight: 2
          }
        });

        marker.addListener('click', () => {
          onMarkerClick(bairro);
        });

        return marker;
      });

      setMarkers(newMarkers);
    }
  }, [map, onMarkerClick]);

  return <div ref={ref} className="w-full h-full rounded-lg" />;
}

function BairroCard({ bairro }: { bairro: BairroInfo }) {
  const getNivelColor = (nivel: string) => {
    switch (nivel) {
      case 'alto':
        return 'bg-red-500';
      case 'medio':
        return 'bg-yellow-500';
      default:
        return 'bg-green-500';
    }
  };

  const getNivelLabel = (nivel: string) => {
    switch (nivel) {
      case 'alto':
        return 'Alto Risco';
      case 'medio':
        return 'Médio Risco';
      default:
        return 'Baixo Risco';
    }
  };

  return (
    <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-white text-xl font-bold">{bairro.name}</h3>
          <Badge className={`${getNivelColor(bairro.nivel)} text-white mt-2`}>
            {getNivelLabel(bairro.nivel)}
          </Badge>
        </div>
        <MapPin className="h-6 w-6 text-gray-400" />
      </div>

      <p className="text-gray-300 text-sm mb-6 leading-relaxed">
        {bairro.descricao}
      </p>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <AlertTriangle className="h-4 w-4 text-red-400" />
            <span className="text-gray-400 text-sm">Homicídios</span>
          </div>
          <p className="text-white text-2xl font-bold">{bairro.homicidios}</p>
        </div>

        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Users className="h-4 w-4 text-blue-400" />
            <span className="text-gray-400 text-sm">População</span>
          </div>
          <p className="text-white text-2xl font-bold">
            {bairro.populacao.toLocaleString('pt-BR')}
          </p>
        </div>

        <div className="space-y-2 col-span-2">
          <div className="flex items-center space-x-2">
            <TrendingUp className="h-4 w-4 text-purple-400" />
            <span className="text-gray-400 text-sm">Taxa por 100k habitantes</span>
          </div>
          <p className="text-white text-2xl font-bold">{bairro.taxa}</p>
        </div>
      </div>
    </div>
  );
}

export function BairrosMapContent() {
  const [selectedBairro, setSelectedBairro] = useState<BairroInfo | null>(null);

  const center = {
    lat: -12.9714,
    lng: -38.5014
  };

  const handleMarkerClick = useCallback((bairro: BairroInfo) => {
    setSelectedBairro(bairro);
  }, []);

  return (
    <div className="h-full space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-white text-2xl font-bold">Mapa de Bairros</h1>
          <p className="text-gray-400 text-sm">
            Visualização geográfica dos dados de violência em Salvador
          </p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <span className="text-gray-400 text-sm">Alto Risco</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            <span className="text-gray-400 text-sm">Médio Risco</span>
          </div>
        </div>
      </div>

      {/* Conteúdo principal */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100%-100px)]">
        {/* Mapa */}
        <div className="lg:col-span-2 bg-gray-900 rounded-xl border border-gray-800 overflow-hidden">
          <Wrapper apiKey="AIzaSyCXlnYAEgr2kdEgSfE3nf2TpOUK90Aa4Xk">
            <MapComponent
              center={center}
              zoom={12}
              onMarkerClick={handleMarkerClick}
              selectedBairro={selectedBairro}
            />
          </Wrapper>
        </div>

        {/* Painel lateral */}
        <div className="space-y-6">
          {selectedBairro ? (
            <BairroCard bairro={selectedBairro} />
          ) : (
            <div className="bg-gray-900 rounded-xl p-6 border border-gray-800 text-center">
              <Info className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-white text-lg font-semibold mb-2">
                Selecione um Bairro
              </h3>
              <p className="text-gray-400 text-sm">
                Clique em um marcador no mapa para ver informações detalhadas sobre o bairro.
              </p>
            </div>
          )}

          {/* Lista de bairros */}
          <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
            <h3 className="text-white text-lg font-semibold mb-4">
              Bairros Monitorados
            </h3>
            <div className="space-y-3">
              {BAIRROS_DATA.map((bairro) => (
                <button
                  key={bairro.id}
                  onClick={() => setSelectedBairro(bairro)}
                  className={`w-full text-left p-3 rounded-lg transition-all duration-200 ${
                    selectedBairro?.id === bairro.id
                      ? 'bg-blue-600/20 border border-blue-600/30'
                      : 'bg-gray-800 hover:bg-gray-700'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-white font-medium">{bairro.name}</p>
                      <p className="text-gray-400 text-xs">
                        {bairro.homicidios} homicídios
                      </p>
                    </div>
                    <div className={`w-2 h-2 rounded-full ${
                      bairro.nivel === 'alto' ? 'bg-red-500' : 'bg-yellow-500'
                    }`} />
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
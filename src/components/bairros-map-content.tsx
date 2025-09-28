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

// Dados dos bairros mais afetados com coordenadas corretas de Salvador
const BAIRROS_DATA = [
  {
    id: "centro-historico",
    name: "Centro Histórico",
    lat: -12.9714,
    lng: -38.5145, // Pelourinho/Centro Histórico
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
    lng: -38.5095, // Liberdade (ao norte do centro)
    homicidios: 19,
    populacao: 32000,
    taxa: 59.4,
    descricao: "Bairro tradicional de Salvador, berço da cultura afro-brasileira. Enfrenta desafios socioeconômicos significativos.",
    nivel: "alto" as const
  },
  {
    id: "suburbio",
    name: "Subúrbio Ferroviário",
    lat: -12.8650,
    lng: -38.4750, // Região do Subúrbio
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
    lng: -38.3400, // Cajazeiras (mais a oeste)
    homicidios: 12,
    populacao: 35000,
    taxa: 34.3,
    descricao: "Bairro em expansão na periferia de Salvador. Apresenta crescimento urbano desordenado.",
    nivel: "medio" as const
  }
];

// Geração de pontos de luz para cada vítima (distribuídos pelos bairros, evitando o mar)
const generateVictimLights = () => {
  const lights: Array<{lat: number, lng: number, bairro: string}> = [];
  
  BAIRROS_DATA.forEach(bairro => {
    for (let i = 0; i < bairro.homicidios; i++) {
      let validPoint = false;
      let attempts = 0;
      let lat: number = bairro.lat;
      let lng: number = bairro.lng;
      
      // Tenta até 10 vezes encontrar um ponto válido em terra
      while (!validPoint && attempts < 10) {
        // Área segura baseada no bairro específico
        let maxRadius: number, preferredDirection: number;
        
        switch (bairro.id) {
          case 'centro-historico':
            // Centro Histórico - prefere ir para o interior (leste/nordeste)
            maxRadius = 0.008;
            preferredDirection = Math.PI * 0.25; // 45 graus (nordeste)
            break;
          case 'liberdade':
            // Liberdade - prefere ir para norte/noroeste
            maxRadius = 0.01;
            preferredDirection = Math.PI * 1.25; // 225 graus (noroeste)
            break;
          case 'suburbio':
            // Subúrbio - pode se espalhar mais para o norte/leste
            maxRadius = 0.012;
            preferredDirection = Math.PI * 0.5; // 90 graus (norte)
            break;
          case 'cajazeiras':
            // Cajazeiras - interior, pode se espalhar em qualquer direção
            maxRadius = 0.015;
            preferredDirection = Math.PI * Math.random() * 2; // Qualquer direção
            break;
          default:
            maxRadius = 0.008;
            preferredDirection = Math.PI;
        }
        
        // Gera ângulo com preferência pela direção segura
        const randomAngle = preferredDirection + (Math.random() - 0.5) * Math.PI;
        const radius = 0.002 + (Math.random() * maxRadius);
        
        const offsetLat = Math.cos(randomAngle) * radius;
        const offsetLng = Math.sin(randomAngle) * radius;
        
        lat = bairro.lat + offsetLat;
        lng = bairro.lng + offsetLng;
        
        // Verifica se o ponto não está muito próximo do mar
        // Salvador tem o mar a leste, então evitamos lng muito alto
        const isInLand = lng < bairro.lng + 0.01 && // Não vai muito para leste
                        lat > -12.98 && // Não vai muito para sul
                        lat < -12.85;   // Não vai muito para norte
        
        if (isInLand) {
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
        lat: lat,
        lng: lng,
        bairro: bairro.name
      });
    }
  });
  
  return lights;
};

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
  showVictimLights: boolean;
  victimLights: Array<{lat: number, lng: number, bairro: string}>;
}

function MapComponent({ center, zoom, onMarkerClick, selectedBairro, showVictimLights, victimLights }: MapComponentProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<google.maps.Map>();
  const [markers, setMarkers] = useState<google.maps.Marker[]>([]);
  const [lightMarkers, setLightMarkers] = useState<google.maps.Marker[]>([]);

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

      // Criar novos marcadores dos bairros (mais discretos quando luzes estão acesas)
      const newMarkers = BAIRROS_DATA.map(bairro => {
        const marker = new google.maps.Marker({
          position: { lat: bairro.lat, lng: bairro.lng },
          map,
          title: bairro.name,
          icon: {
            path: google.maps.SymbolPath.CIRCLE,
            scale: showVictimLights ? (bairro.nivel === 'alto' ? 8 : 6) : (bairro.nivel === 'alto' ? 12 : 8),
            fillColor: bairro.nivel === 'alto' ? '#EF4444' : '#F59E0B',
            fillOpacity: showVictimLights ? 0.4 : 0.8, // Mais discretos quando luzes estão acesas
            strokeColor: '#FFFFFF',
            strokeWeight: showVictimLights ? 1 : 2
          }
        });

        marker.addListener('click', () => {
          onMarkerClick(bairro);
        });

        return marker;
      });

      setMarkers(newMarkers);
    }
  }, [map, onMarkerClick, showVictimLights]);

  // Gerenciar pontos de luz das vítimas
  useEffect(() => {
    if (map) {
      // Limpar pontos de luz anteriores
      lightMarkers.forEach(marker => marker.setMap(null));

      if (showVictimLights) {
        console.log(`Criando ${victimLights.length} pontos de luz...`);
        
        // Criar pontos de luz para cada vítima com efeito bonito
        const newLightMarkers = victimLights.map((light, index) => {
          // Cores alternadas para os pontos de luz
          const colors = ['#FFD700', '#FF69B4', '#00BFFF', '#FFFFFF', '#FFA500'];
          const color = colors[index % colors.length];
          
          // Ponto de luz simples mas bonito
          const lightIcon = {
            path: google.maps.SymbolPath.CIRCLE,
            scale: 4,
            fillColor: color,
            fillOpacity: 0.9,
            strokeColor: '#FFFFFF',
            strokeWeight: 2,
            strokeOpacity: 0.8
          };

          const marker = new google.maps.Marker({
            position: { lat: light.lat, lng: light.lng },
            map,
            title: `✨ Vida perdida em ${light.bairro}`,
            icon: lightIcon,
            animation: google.maps.Animation.DROP,
            optimized: false,
            zIndex: 1000 // Garantir que apareça por cima dos outros marcadores
          });

          // Efeito de brilho pulsante simples
          setTimeout(() => {
            let scale = 4;
            let growing = true;
            
            const pulseInterval = setInterval(() => {
              if (marker.getMap()) {
                if (growing) {
                  scale += 0.5;
                  if (scale >= 6) growing = false;
                } else {
                  scale -= 0.5;
                  if (scale <= 3) growing = true;
                }

                const currentIcon = marker.getIcon() as google.maps.Symbol;
                marker.setIcon({
                  ...currentIcon,
                  scale: scale,
                  fillOpacity: growing ? 1 : 0.7
                });
              } else {
                clearInterval(pulseInterval);
              }
            }, 500); // Pulsação mais lenta e suave

          }, index * 50); // Aparição em cascata

          // Hover effect
          marker.addListener('mouseover', () => {
            const currentIcon = marker.getIcon() as google.maps.Symbol;
            marker.setIcon({
              ...currentIcon,
              scale: 1.3,
              fillOpacity: 1,
              strokeWeight: 3
            });
          });

          marker.addListener('mouseout', () => {
            const currentIcon = marker.getIcon() as google.maps.Symbol;
            marker.setIcon({
              ...currentIcon,
              scale: 0.8,
              fillOpacity: 0.9,
              strokeWeight: 2
            });
          });

          return marker;
        });

        console.log(`Criados ${newLightMarkers.length} marcadores de luz`);
        setLightMarkers(newLightMarkers);
      } else {
        console.log('Luzes das vítimas desligadas');
      }
    }
  }, [map, showVictimLights, victimLights]);

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
  const [showVictimLights, setShowVictimLights] = useState(false);
  const [victimLights, setVictimLights] = useState<Array<{lat: number, lng: number, bairro: string}>>([]);

  const center = {
    lat: -12.9200,
    lng: -38.4600
  };

  // Gera os pontos de luz das vítimas
  useEffect(() => {
    setVictimLights(generateVictimLights());
  }, []);

  const handleMarkerClick = useCallback((bairro: BairroInfo) => {
    setSelectedBairro(bairro);
  }, []);

  const toggleVictimLights = useCallback(() => {
    setShowVictimLights(prev => !prev);
  }, []);

  return (
    <div className="h-full space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-white text-2xl font-bold">Mapa Emocional de Salvador</h1>
          <p className="text-gray-400 text-sm">
            Cada ponto de luz representa uma vida perdida - Salvador brilha, mas carrega dor
          </p>
        </div>
        <div className="flex items-center space-x-4">
          <button
            onClick={toggleVictimLights}
            className={`px-4 py-2 rounded-lg transition-all duration-300 ${
              showVictimLights 
                ? 'bg-yellow-500 text-black font-medium' 
                : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
            }`}
          >
            {showVictimLights ? '✨ Luzes Acesas' : '💡 Acender Luzes'}
          </button>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <span className="text-gray-400 text-sm">Alto Risco</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            <span className="text-gray-400 text-sm">Médio Risco</span>
          </div>
          {showVictimLights && (
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-white rounded-full animate-pulse"></div>
              <span className="text-gray-400 text-sm">Vidas Perdidas</span>
            </div>
          )}
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
              showVictimLights={showVictimLights}
              victimLights={victimLights}
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
                {showVictimLights ? 'Luzes da Memória' : 'Selecione um Bairro'}
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                {showVictimLights 
                  ? `${victimLights.length} pontos de luz iluminam Salvador. Cada luz representa uma vida que se apagou, mas sua memória permanece brilhando.`
                  : 'Clique em um marcador no mapa para ver informações detalhadas sobre o bairro.'
                }
              </p>
              {showVictimLights && (
                <div className="mt-4 p-3 bg-yellow-500/10 rounded-lg border border-yellow-500/20">
                  <p className="text-yellow-300 text-xs italic">
                    "Salvador se ilumina de pontos, mas cada ponto é uma vida apagada"
                  </p>
                </div>
              )}
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
"use client";

import { useState, useRef, useEffect } from "react";
import { MapComponentProps } from '@/types/bairros';

export function MapComponent({ 
  center, 
  zoom, 
  onMarkerClick, 
  selectedBairro, 
  showVictimLights, 
  victimLights, 
  bairrosData 
}: MapComponentProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<google.maps.Map>();
  const [markers, setMarkers] = useState<google.maps.Marker[]>([]);
  const [lightMarkers, setLightMarkers] = useState<google.maps.Marker[]>([]);

  // Estilos do mapa
  const mapStyles = [
    {
      "elementType": "geometry",
      "stylers": [
        { "hue": "#ff4400" },
        { "saturation": -68 },
        { "lightness": -4 },
        { "gamma": 0.72 }
      ]
    },
    {
      "featureType": "road",
      "elementType": "labels.icon",
      "stylers": [{ "visibility": "off" }]
    },
    {
      "featureType": "landscape.man_made",
      "elementType": "geometry",
      "stylers": [
        { "hue": "#0077ff" },
        { "gamma": 3.1 }
      ]
    },
    {
      "featureType": "water",
      "stylers": [
        { "hue": "#00ccff" },
        { "gamma": 0.44 },
        { "saturation": -33 }
      ]
    },
    {
      "featureType": "poi.park",
      "stylers": [
        { "hue": "#44ff00" },
        { "saturation": -23 }
      ]
    },
    {
      "featureType": "water",
      "elementType": "labels.text.fill",
      "stylers": [
        { "hue": "#007fff" },
        { "gamma": 0.77 },
        { "saturation": 65 },
        { "lightness": 99 }
      ]
    },
    {
      "featureType": "water",
      "elementType": "labels.text.stroke",
      "stylers": [
        { "gamma": 0.11 },
        { "weight": 5.6 },
        { "saturation": 99 },
        { "hue": "#0091ff" },
        { "lightness": -86 }
      ]
    },
    {
      "featureType": "transit.line",
      "elementType": "geometry",
      "stylers": [
        { "lightness": -48 },
        { "hue": "#ff5e00" },
        { "gamma": 1.2 },
        { "saturation": -23 }
      ]
    },
    {
      "featureType": "transit",
      "elementType": "labels.text.stroke",
      "stylers": [
        { "saturation": -64 },
        { "hue": "#ff9100" },
        { "lightness": 16 },
        { "gamma": 0.47 },
        { "weight": 2.7 }
      ]
    }
  ];

  // Inicializar mapa
  useEffect(() => {
    if (ref.current && !map) {
      const newMap = new window.google.maps.Map(ref.current, {
        center,
        zoom,
        styles: mapStyles
      });
      setMap(newMap);
    }
  }, [ref, map, center, zoom]);

  // Gerenciar marcadores dos bairros
  useEffect(() => {
    if (map) {
      // Limpar marcadores anteriores
      markers.forEach(marker => marker.setMap(null));

      // Criar novos marcadores dos bairros
      const newMarkers = bairrosData.map(bairro => {
        const marker = new google.maps.Marker({
          position: { lat: bairro.lat, lng: bairro.lng },
          map,
          title: bairro.name,
          icon: {
            path: google.maps.SymbolPath.CIRCLE,
            scale: showVictimLights ? (bairro.nivel === 'alto' ? 8 : 6) : (bairro.nivel === 'alto' ? 12 : 8),
            fillColor: bairro.nivel === 'alto' ? '#EF4444' : '#F59E0B',
            fillOpacity: showVictimLights ? 0.4 : 0.8,
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
  }, [map, onMarkerClick, showVictimLights, bairrosData]);

  // Gerenciar pontos de luz das vítimas
  useEffect(() => {
    if (map) {
      // Limpar pontos de luz anteriores
      lightMarkers.forEach(marker => marker.setMap(null));

      if (showVictimLights) {
        // Criar pontos de luz para cada vítima
        const colors = ['#FFD700', '#FF69B4', '#00BFFF', '#FFFFFF', '#FFA500'];
        
        const newLightMarkers = victimLights.map((light, index) => {
          const color = colors[index % colors.length];
          
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
            zIndex: 1000
          });

          // Efeito de pulsação
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
            }, 500);
          }, index * 50);

          // Hover effects
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

        setLightMarkers(newLightMarkers);
      }
    }
  }, [map, showVictimLights, victimLights]);

  return <div ref={ref} className="w-full h-full rounded-lg" />;
}
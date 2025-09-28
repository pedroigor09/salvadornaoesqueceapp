"use client";

import { useState, useEffect, useRef } from "react";
import { Star, Phone, MapPin, Clock, Mail, Shield, Heart } from "lucide-react";
import { Service } from "../data/services-data";

interface ServiceCardProps {
  service: Service;
  index: number;
  isVisible: boolean;
  onIntersect: (cardId: number) => void;
}

export function ServiceCard({ service, index, isVisible, onIntersect }: ServiceCardProps) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (cardRef.current) {
      onIntersect(service.id);
    }
  }, [service.id, onIntersect]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  };

  const getCardAnimation = (index: number) => {
    const animations = [
      'animate-slide-in-left',
      'animate-slide-in-right', 
      'animate-fade-in-up',
      'animate-zoom-in',
      'animate-rotate-in',
      'animate-bounce-in'
    ];
    return animations[index % animations.length];
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'police': return 'from-blue-600/30 to-blue-700/20';
      case 'cram': return 'from-green-600/30 to-green-700/20'; 
      case 'emergency': return 'from-red-600/30 to-red-700/20';
      default: return 'from-amber-600/30 to-amber-700/20';
    }
  };

  const getTypeBorder = (type: string) => {
    switch (type) {
      case 'police': return 'border-blue-400/30';
      case 'cram': return 'border-green-400/30';
      case 'emergency': return 'border-red-400/30';
      default: return 'border-amber-400/30';
    }
  };

  return (
    <div
      ref={cardRef}
      data-card-id={service.id}
      onMouseMove={handleMouseMove}
      className={`
        relative bg-gradient-to-br ${getTypeColor(service.type)} backdrop-blur-sm rounded-3xl p-8 
        border ${getTypeBorder(service.type)} hover:scale-105 transition-all duration-500 
        shadow-2xl hover:shadow-3xl group overflow-hidden
        ${isVisible ? getCardAnimation(index) : 'opacity-0'}
        ${service.isHighlighted ? 'ring-2 ring-amber-400/50 shadow-amber-500/20' : ''}
      `}
    >
      {/* Spotlight Effect */}
      <div 
        className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-300 pointer-events-none"
        style={{
          background: `radial-gradient(circle 200px at ${mousePosition.x}px ${mousePosition.y}px, rgba(255,255,255,0.3), transparent)`
        }}
      />

      {service.isHighlighted && (
        <div className="absolute top-4 right-4">
          <Star className="w-6 h-6 text-amber-400 fill-current animate-pulse" />
        </div>
      )}

      <div className="relative z-10">
        <div className="flex items-start gap-4 mb-6">
          <div className={`
            p-3 rounded-2xl ${service.type === 'police' ? 'bg-blue-500/20' : 
                              service.type === 'cram' ? 'bg-green-500/20' : 
                              'bg-red-500/20'}
          `}>
            {service.type === 'police' ? (
              <Shield className={`w-8 h-8 ${service.type === 'police' ? 'text-blue-400' : 'text-blue-400'}`} />
            ) : service.type === 'cram' ? (
              <Heart className="w-8 h-8 text-green-400" />
            ) : (
              <Phone className="w-8 h-8 text-red-400" />
            )}
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-bold text-white mb-2 group-hover:text-amber-300 transition-colors">
              {service.title}
            </h3>
            <p className="text-gray-300 text-sm leading-relaxed">
              {service.description}
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center gap-3 text-amber-200">
            <Phone className="w-5 h-5 text-amber-400" />
            <span className="font-semibold text-lg">{service.phone}</span>
          </div>
          
          <div className="flex items-start gap-3 text-gray-300">
            <MapPin className="w-5 h-5 text-amber-400 mt-1" />
            <div>
              <div className="font-medium">{service.address}</div>
              <div className="text-sm text-gray-400">{service.city} - {service.region}</div>
            </div>
          </div>

          <div className="flex items-center gap-3 text-gray-300">
            <Clock className="w-5 h-5 text-amber-400" />
            <span className="text-sm">{service.hours}</span>
          </div>

          <div className="flex items-start gap-3 text-gray-300">
            <Mail className="w-5 h-5 text-amber-400 mt-1" />
            <span className="text-sm break-all">{service.email}</span>
          </div>
        </div>

        <div className="mt-6">
          <div className="text-sm text-amber-300 mb-2 font-semibold">Especialidades:</div>
          <div className="flex flex-wrap gap-2">
            {service.specialties.map((specialty, i) => (
              <span
                key={i}
                className="px-3 py-1 bg-white/10 rounded-full text-xs text-gray-200 border border-white/20"
              >
                {specialty}
              </span>
            ))}
          </div>
        </div>

        <button className="w-full mt-6 bg-gradient-to-r from-amber-500 to-amber-400 text-black font-semibold py-3 rounded-2xl hover:scale-105 transition-all duration-300 shadow-lg shadow-amber-500/25">
          Entrar em Contato
        </button>
      </div>
    </div>
  );
}
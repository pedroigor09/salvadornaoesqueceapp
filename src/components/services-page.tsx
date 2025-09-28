'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Star, Phone, Shield, Heart, Sparkles, ArrowUp } from 'lucide-react';
import { ServicesHeader } from './services-header';
import { ServicesStats } from './services-stats';
import { ServiceCard } from './service-card';
import { EmergencySection } from './emergency-section';
import { servicesData, type Service } from '../data/services-data';
import { servicesAnimations } from '../styles/services-animations';

interface ServicesPageProps {
  onBack?: () => void;
}

const ServicesPageRefactored = ({ onBack }: ServicesPageProps) => {
  const [filter, setFilter] = useState<'all' | 'police' | 'cram' | 'emergency'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [visibleCards, setVisibleCards] = useState<number[]>([]);
  const [scrollY, setScrollY] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const observerRef = useRef<IntersectionObserver | null>(null);

  const filteredServices = servicesData.filter(service => {
    const matchesFilter = filter === 'all' || service.type === filter;
    const matchesSearch = service.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         service.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         service.specialties.some(specialty => 
                           specialty.toLowerCase().includes(searchTerm.toLowerCase())
                         );
    return matchesFilter && matchesSearch;
  });

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const cardId = parseInt(entry.target.getAttribute('data-card-id') || '0');
          if (entry.isIntersecting) {
            setVisibleCards(prev => [...prev.filter(id => id !== cardId), cardId]);
          }
        });
      },
      { threshold: 0.1, rootMargin: '-50px' }
    );

    return () => observerRef.current?.disconnect();
  }, []);

  const gradientProgress = Math.min(scrollY / 1000, 1);
  const backgroundOpacity = Math.min(scrollY / 500, 0.7);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen text-white relative overflow-hidden">
      <style jsx>{servicesAnimations}</style>

      {/* Dynamic Background */}
      <div 
        className="absolute inset-0 transition-all duration-1000"
        style={{
          background: `
            radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, 
              rgba(139, 69, 19, ${0.3 + gradientProgress * 0.2}) 0%, 
              rgba(160, 82, 45, ${0.2 + gradientProgress * 0.15}) 20%,
              rgba(101, 67, 33, ${0.1 + gradientProgress * 0.1}) 40%,
              transparent 70%
            ),
            linear-gradient(
              ${45 + scrollY * 0.05}deg,
              rgba(139, 69, 19, ${0.4 + backgroundOpacity * 0.3}) 0%,
              rgba(160, 82, 45, ${0.3 + backgroundOpacity * 0.2}) 25%,
              rgba(101, 67, 33, ${0.2 + backgroundOpacity * 0.15}) 50%,
              rgba(62, 39, 35, ${0.3 + backgroundOpacity * 0.2}) 75%,
              rgba(0, 0, 0, ${0.8 + backgroundOpacity * 0.2}) 100%
            )
          `
        }}
      />

      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              transform: `translateY(${scrollY * (0.1 + Math.random() * 0.3)}px)`
            }}
          >
            <Sparkles 
              className={`w-${2 + Math.floor(Math.random() * 4)} h-${2 + Math.floor(Math.random() * 4)} text-amber-400 opacity-${Math.floor(20 + Math.random() * 60)}`}
            />
          </div>
        ))}
      </div>

      {/* Header Section */}
      <ServicesHeader scrollY={scrollY} />

      {/* Back Button */}
      {onBack && (
        <div className="relative z-10 max-w-7xl mx-auto px-4 pt-8">
          <button
            onClick={onBack}
            className="bg-gradient-to-r from-amber-500 to-amber-400 text-black px-6 py-3 rounded-full font-semibold shadow-lg hover:scale-105 transition-transform duration-300 flex items-center gap-2"
          >
            <ArrowUp className="w-5 h-5 rotate-180" />
            Voltar
          </button>
        </div>
      )}

      {/* Stats Section */}
      <div className="relative z-10 flex justify-center pb-16">
        <ServicesStats />
      </div>

      {/* Filters and Search */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 py-12">
        <div className="bg-gradient-to-r from-black/40 to-amber-900/20 backdrop-blur-lg rounded-3xl p-8 border border-amber-400/20 mb-12">
          <div className="flex flex-col md:flex-row gap-6 items-center">
            <div className="flex flex-wrap gap-3">
              {[
                { key: 'all', label: 'Todos', icon: Star },
                { key: 'police', label: 'Delegacias', icon: Shield },
                { key: 'cram', label: 'CRAM', icon: Heart },
                { key: 'emergency', label: 'Emergência', icon: Phone }
              ].map(({ key, label, icon: Icon }) => (
                <button
                  key={key}
                  onClick={() => setFilter(key as any)}
                  className={`
                    flex items-center gap-2 px-6 py-3 rounded-2xl font-semibold transition-all duration-300
                    ${filter === key 
                      ? 'bg-gradient-to-r from-amber-500 to-amber-400 text-black shadow-lg shadow-amber-500/25 scale-105' 
                      : 'bg-white/10 text-amber-100 hover:bg-white/20 hover:scale-105'
                    }
                  `}
                >
                  <Icon className="w-5 h-5" />
                  {label}
                </button>
              ))}
            </div>
            
            <div className="flex-1 max-w-md">
              <input
                type="text"
                placeholder="Buscar por cidade, serviço ou especialidade..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-6 py-3 rounded-2xl bg-white/10 border border-white/20 text-white placeholder-amber-200 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent backdrop-blur-sm"
              />
            </div>
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredServices.map((service, index) => (
            <ServiceCard 
              key={service.id}
              service={service}
              index={index}
              isVisible={visibleCards.includes(service.id)}
              onIntersect={(cardId) => {
                const element = document.querySelector(`[data-card-id="${cardId}"]`);
                if (element && observerRef.current) {
                  observerRef.current.observe(element);
                }
              }}
            />
          ))}
        </div>

        {/* Emergency Section */}
        {(filter === 'all' || filter === 'emergency') && (
          <EmergencySection />
        )}
      </div>

      {/* Scroll to Top Button */}
      {scrollY > 500 && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-20 bg-gradient-to-r from-amber-500 to-amber-400 p-4 rounded-full shadow-2xl shadow-amber-500/25 hover:scale-110 transition-all duration-300 group"
        >
          <ArrowUp className="w-6 h-6 text-black group-hover:scale-110 transition-transform" />
        </button>
      )}
    </div>
  );
};

export default ServicesPageRefactored;
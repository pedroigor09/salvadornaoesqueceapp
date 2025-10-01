"use client";

import { useState, useEffect } from "react";
import { Star } from "lucide-react";

// Pontos de conexão para as estrelas/partículas
export const CONNECTION_POINTS = [
  { x: 15, y: 25, delay: 0 },
  { x: 30, y: 15, delay: 0.5 },
  { x: 45, y: 35, delay: 1 },
  { x: 60, y: 20, delay: 1.5 },
  { x: 75, y: 40, delay: 2 },
  { x: 85, y: 25, delay: 2.5 },
  { x: 20, y: 60, delay: 3 },
  { x: 50, y: 70, delay: 3.5 },
  { x: 80, y: 65, delay: 4 },
];

interface FloatingPointProps {
  point: typeof CONNECTION_POINTS[0];
  index: number;
}

export function FloatingPoint({ point, index }: FloatingPointProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, point.delay * 1000);

    return () => clearTimeout(timer);
  }, [point.delay]);

  return (
    <div
      className={`absolute transition-all duration-1000 ${
        isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-50'
      }`}
      style={{
        left: `${point.x}%`,
        top: `${point.y}%`,
        transform: 'translate(-50%, -50%)',
        zIndex: 2
      }}
    >
      <div className="relative">
        <Star 
          className="w-3 h-3 text-white animate-pulse" 
          fill="currentColor"
          style={{ animationDelay: `${index * 0.2}s` }}
        />
        <div 
          className="absolute inset-0 w-3 h-3 bg-white rounded-full opacity-20 animate-ping"
          style={{ animationDelay: `${index * 0.3}s` }}
        />
      </div>
    </div>
  );
}
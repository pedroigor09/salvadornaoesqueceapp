"use client";

import { useState, useEffect } from "react";

interface ConnectionLineProps {
  from: { x: number; y: number };
  to: { x: number; y: number };
  isDrawn: boolean;
  delay: number;
}

export function ConnectionLine({ from, to, isDrawn, delay }: ConnectionLineProps) {
  const [progress, setProgress] = useState(0);
  
  useEffect(() => {
    if (isDrawn) {
      const timer = setTimeout(() => {
        setProgress(1);
      }, delay * 1200);
      
      return () => clearTimeout(timer);
    } else {
      setProgress(0);
    }
  }, [isDrawn, delay]);

  const pathData = `M ${from.x} ${from.y} Q ${(from.x + to.x) / 2} ${Math.min(from.y, to.y) - 20} ${to.x} ${to.y}`;
  
  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 1 }}
    >
      <defs>
        <linearGradient id="connectionGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.3" />
          <stop offset="50%" stopColor="#ffffff" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0.2" />
        </linearGradient>
        <filter id="connectionGlow">
          <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
          <feMerge> 
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>
      <path
        d={pathData}
        stroke="url(#connectionGradient)"
        strokeWidth="1"
        fill="none"
        filter="url(#connectionGlow)"
        strokeDasharray="300"
        strokeDashoffset={300 * (1 - progress)}
        opacity={isDrawn ? 1 : 0}
        style={{
          transition: 'stroke-dashoffset 2s ease-in-out, opacity 0.5s ease-in-out'
        }}
      />
    </svg>
  );
}
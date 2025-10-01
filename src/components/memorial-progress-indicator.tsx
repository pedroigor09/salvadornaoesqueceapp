"use client";

interface MemorialProgressIndicatorProps {
  currentPhase: number;
  totalPhases: number;
}

export function MemorialProgressIndicator({ currentPhase, totalPhases }: MemorialProgressIndicatorProps) {
  return (
    <div className="text-center">
      <div className="flex space-x-2 justify-center">
        {Array.from({ length: totalPhases }, (_, index) => (
          <div
            key={index}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentPhase ? 'bg-purple-400 scale-125' : 
              index < currentPhase ? 'bg-purple-600' : 'bg-gray-600'
            }`}
          />
        ))}
      </div>
      <p className="text-center text-gray-500 text-xs mt-2">
        {currentPhase + 1} de {totalPhases}
      </p>
    </div>
  );
}
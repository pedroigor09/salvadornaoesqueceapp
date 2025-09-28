"use client";

import { Heart } from "lucide-react";

export function MemorialHeader() {
  return (
    <div className="text-center space-y-6 mb-16">
      <div className="flex justify-center">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-red-500 to-red-700 shadow-2xl">
          <Heart className="h-10 w-10 text-white fill-current" />
        </div>
      </div>
      <div className="space-y-4">
        <h1 className="text-5xl font-bold text-white drop-shadow-2xl">
          Memorial das Vítimas
        </h1>
        <p className="text-xl text-gray-100 max-w-3xl mx-auto leading-relaxed drop-shadow-lg">
          Em memória daqueles que perdemos para a violência. 
          Suas histórias, sonhos e legados não serão esquecidos.
        </p>
      </div>
    </div>
  );
}
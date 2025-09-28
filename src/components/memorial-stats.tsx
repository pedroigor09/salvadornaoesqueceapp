"use client";

import { Users, Calendar, MapPin } from "lucide-react";
import { Victim } from "@/types";

interface MemorialStatsProps {
  victims: Victim[];
  filteredVictims: Victim[];
  selectedYear: string;
  neighborhoodStats: Record<string, number>;
}

export function MemorialStats({ victims, filteredVictims, selectedYear, neighborhoodStats }: MemorialStatsProps) {
  const stats = [
    { 
      icon: Users, 
      value: victims.length, 
      label: "Vítimas lembradas", 
      gradient: "from-blue-500 to-purple-600" 
    },
    { 
      icon: Calendar, 
      value: filteredVictims.length, 
      label: `Em ${selectedYear}`, 
      gradient: "from-green-500 to-teal-600" 
    },
    { 
      icon: MapPin, 
      value: Object.keys(neighborhoodStats).length, 
      label: "Bairros afetados", 
      gradient: "from-red-500 to-pink-600" 
    }
  ];

  return (
    <div className="grid gap-6 md:grid-cols-3 mb-12 max-w-4xl mx-auto">
      {stats.map((stat, index) => (
        <div key={index} className="relative group">
          <div className="absolute inset-0 bg-gradient-to-r from-white/15 to-white/10 rounded-xl blur-xl group-hover:blur-2xl transition-all duration-500" />
          <div className="relative backdrop-blur-md bg-black/40 rounded-xl p-6 border border-white/30 shadow-2xl">
            <div className="flex items-center space-x-4">
              <div className={`flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-r ${stat.gradient} shadow-lg`}>
                <stat.icon className="h-6 w-6 text-white" />
              </div>
              <div>
                <p className="text-3xl font-bold text-white drop-shadow-lg">{stat.value}</p>
                <p className="text-sm text-gray-200 drop-shadow">{stat.label}</p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
"use client";

import { Shield, Building, Clock } from "lucide-react";

export function ServicesStats() {
  const stats = [
    { 
      number: "15", 
      label: "Delegacias especializadas na Bahia", 
      icon: <Shield className="h-8 w-8" /> 
    },
    { 
      number: "31", 
      label: "Cidades com CRAM ativo", 
      icon: <Building className="h-8 w-8" /> 
    },
    { 
      number: "24h", 
      label: "Atendimento disponível", 
      icon: <Clock className="h-8 w-8" /> 
    }
  ];

  return (
    <div className="py-8 relative overflow-hidden bg-gradient-to-b from-black via-purple-900/10 to-black">
      <div className="max-w-6xl mx-auto px-8 text-center relative z-10">
        <h2 className="text-3xl md:text-4xl font-light mb-8 text-white">
          Você Não Está Sozinha
        </h2>
        
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="group">
              <div className="p-6 bg-gradient-to-br from-slate-800/50 to-slate-900/50 rounded-2xl border border-slate-700 group-hover:border-purple-500 transition-all duration-500">
                <div className="text-purple-400 mb-4 flex justify-center group-hover:scale-110 transition-transform">
                  {stat.icon}
                </div>
                <div className="text-4xl font-bold text-white mb-2">{stat.number}</div>
                <p className="text-gray-400">{stat.label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
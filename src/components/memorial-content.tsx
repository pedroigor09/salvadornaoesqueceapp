"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Heart, Plus, Calendar, MapPin, Users } from "lucide-react";
import { Victim } from "@/types";

// Dados exemplo para o memorial - em produção viria de uma API
const MOCK_VICTIMS: Victim[] = [
  {
    id: "1",
    name: "João da Silva Santos",
    age: 25,
    neighborhood: "Liberdade",
    date: "2024-08-15",
    tribute: "Filho dedicado, sempre ajudou a família. Sonhava em ser professor.",
    submittedBy: "Família Santos",
    isApproved: true
  },
  {
    id: "2", 
    name: "Maria Conceição Oliveira",
    age: 32,
    neighborhood: "Subúrbio Ferroviário",
    date: "2024-07-22",
    tribute: "Mãe de três filhos, trabalhava como enfermeira. Uma guerreira.",
    submittedBy: "Irmã Carla",
    isApproved: true
  },
  {
    id: "3",
    name: "Carlos Eduardo Lima",
    age: 19,
    neighborhood: "Cajazeiras",
    date: "2024-09-03",
    tribute: "Jovem artista, fazia grafites pela cidade. Sua arte vive em nós.",
    submittedBy: "Coletivo de Arte",
    isApproved: true
  },
  {
    id: "4",
    name: "Ana Paula Rodrigues",
    age: 28,
    neighborhood: "Itapuã",
    date: "2024-06-18",
    tribute: "Estudante de direito, lutava por justiça social. Seu legado continua.",
    submittedBy: "Colegas da Faculdade",
    isApproved: true
  }
];

interface MemorialCardProps {
  victim: Victim;
}

function MemorialCard({ victim }: MemorialCardProps) {
  return (
    <Card className="transition-all duration-200 hover:shadow-lg border-l-4 border-l-red-500">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <CardTitle className="text-lg">{victim.name}</CardTitle>
            <div className="flex items-center gap-4 text-sm text-gray-500">
              <span className="flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                {new Date(victim.date).toLocaleDateString('pt-BR')}
              </span>
              <span className="flex items-center gap-1">
                <MapPin className="h-3 w-3" />
                {victim.neighborhood}
              </span>
            </div>
          </div>
          <Badge variant="secondary">{victim.age} anos</Badge>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        {victim.tribute && (
          <div className="space-y-2">
            <p className="text-sm text-gray-700 leading-relaxed">
              "{victim.tribute}"
            </p>
            {victim.submittedBy && (
              <p className="text-xs text-gray-500 italic">
                — {victim.submittedBy}
              </p>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export function MemorialContent() {
  const [victims] = useState<Victim[]>(MOCK_VICTIMS);
  const [selectedYear, setSelectedYear] = useState<string>("2024");

  const filteredVictims = victims.filter(victim => 
    victim.date.startsWith(selectedYear) && victim.isApproved
  );

  const availableYears = [...new Set(victims.map(v => v.date.split('-')[0]))].sort().reverse();

  const neighborhoodStats = victims.reduce((acc, victim) => {
    const neighborhood = victim.neighborhood;
    acc[neighborhood] = (acc[neighborhood] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-4 py-8">
        <div className="flex justify-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
            <Heart className="h-8 w-8 text-red-600" />
          </div>
        </div>
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-gray-900">
            Memorial das Vítimas
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Em memória daqueles que perdemos para a violência. 
            Suas histórias, sonhos e legados não serão esquecidos.
          </p>
        </div>
      </div>

      {/* Estatísticas */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center space-x-2">
              <Users className="h-5 w-5 text-gray-400" />
              <div>
                <p className="text-2xl font-bold">{victims.length}</p>
                <p className="text-sm text-gray-500">Vítimas lembradas</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center space-x-2">
              <Calendar className="h-5 w-5 text-gray-400" />
              <div>
                <p className="text-2xl font-bold">{filteredVictims.length}</p>
                <p className="text-sm text-gray-500">Em {selectedYear}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center space-x-2">
              <MapPin className="h-5 w-5 text-gray-400" />
              <div>
                <p className="text-2xl font-bold">{Object.keys(neighborhoodStats).length}</p>
                <p className="text-sm text-gray-500">Bairros afetados</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filtros e Ações */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <Tabs value={selectedYear} onValueChange={setSelectedYear} className="w-auto">
          <TabsList>
            {availableYears.map(year => (
              <TabsTrigger key={year} value={year}>
                {year}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
        
        <Button className="bg-red-600 hover:bg-red-700 text-white">
          <Plus className="mr-2 h-4 w-4" />
          Adicionar Tributo
        </Button>
      </div>

      {/* Lista de Vítimas */}
      <div className="space-y-4">
        {filteredVictims.length > 0 ? (
          <div className="grid gap-4 md:grid-cols-2">
            {filteredVictims.map(victim => (
              <MemorialCard key={victim.id} victim={victim} />
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="pt-6">
              <div className="text-center py-8">
                <Heart className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">
                  Nenhuma vítima registrada para {selectedYear}
                </p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Informações sobre colaboração */}
      <Card className="bg-yellow-50 border-yellow-200">
        <CardContent className="pt-6">
          <div className="space-y-2">
            <h3 className="font-semibold text-yellow-800">
              Como colaborar com o Memorial
            </h3>
            <p className="text-sm text-yellow-700">
              Este memorial é colaborativo. Familiares e amigos podem enviar tributos 
              para honrar a memória das vítimas. Todas as submissões passam por moderação 
              antes de serem publicadas.
            </p>
            <p className="text-xs text-yellow-600 mt-2">
              O objetivo é criar um espaço de memória, não de exposição. 
              Respeitamos a dor das famílias e a dignidade das vítimas.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
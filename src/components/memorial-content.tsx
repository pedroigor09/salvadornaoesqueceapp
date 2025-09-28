"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Heart, Plus, Calendar, MapPin, Users, Loader2 } from "lucide-react";
import { Victim } from "@/types";
import { AddVictimModal } from "@/components/add-victim-modal";
import { useVictims } from "@/hooks/useVictims";

// Dados exemplo para o memorial - em produção viria de uma API
const MOCK_VICTIMS: Victim[] = [
  {
    id: "1",
    name: "João da Silva Santos",
    age: 25,
    neighborhood: "Liberdade",
    date: "2024-08-15",
    tribute: "Filho dedicado, sempre ajudou a família. Sonhava em ser professor. Era conhecido por todos no bairro pela sua bondade e sempre estava disposto a ajudar quem precisava.",
    submittedBy: "Família Santos",
    isApproved: true
  },
  {
    id: "2", 
    name: "Maria Conceição Oliveira",
    age: 32,
    neighborhood: "Subúrbio Ferroviário",
    date: "2024-07-22",
    tribute: "Mãe de três filhos, trabalhava como enfermeira no Hospital Roberto Santos. Uma guerreira que dedicou sua vida a cuidar dos outros e de sua família com muito amor.",
    submittedBy: "Irmã Carla",
    isApproved: true
  },
  {
    id: "3",
    name: "Carlos Eduardo Lima",
    age: 19,
    neighborhood: "Cajazeiras",
    date: "2024-09-03",
    tribute: "Jovem artista, fazia grafites pela cidade com mensagens de paz e esperança. Sua arte vive em nós e continua inspirando jovens do bairro a seguir o caminho da arte.",
    submittedBy: "Coletivo de Arte",
    isApproved: true
  },
  {
    id: "4",
    name: "Ana Paula Rodrigues",
    age: 28,
    neighborhood: "Itapuã",
    date: "2024-06-18",
    tribute: "Estudante de direito na UFBA, lutava por justiça social e direitos humanos. Seu legado continua através dos projetos sociais que iniciou na comunidade.",
    submittedBy: "Colegas da Faculdade",
    isApproved: true
  },
  {
    id: "5",
    name: "Roberto Silva Oliveira",
    age: 34,
    neighborhood: "Pelourinho",
    date: "2024-05-12",
    tribute: "Músico e compositor, tocava na Praça Terreiro de Jesus. Suas canções falavam de amor, paz e da beleza de Salvador. A música baiana perdeu uma grande voz.",
    submittedBy: "Grupo Musical Olodum",
    isApproved: true
  },
  {
    id: "6",
    name: "Lucia Santos Pereira",
    age: 41,
    neighborhood: "Brotas",
    date: "2024-04-08",
    tribute: "Professora da rede pública, dedicou 15 anos da sua vida à educação. Transformou a vida de centenas de crianças com seu carinho e dedicação ao ensino.",
    submittedBy: "Escola Municipal Castro Alves",
    isApproved: true
  }
];

// Cores de gradiente inspiradas em Salvador/Bahia
const VICTIM_GRADIENTS = [
  "from-yellow-400 via-orange-500 to-red-500", // Pôr do sol baiano
  "from-blue-400 via-teal-500 to-green-500",   // Mar da Bahia
  "from-purple-400 via-pink-500 to-red-500",   // Capoeira/cultura
  "from-orange-400 via-red-500 to-pink-500",   // Acarajé/temperos
  "from-indigo-400 via-purple-500 to-pink-500", // Arte/música
  "from-green-400 via-blue-500 to-purple-500"   // Natureza/Todos os Santos
];

interface EpicMemorialCardProps {
  victim: Victim;
  isHovered: boolean;
  onHover: () => void;
  onLeave: () => void;
  gradient: string;
}

function EpicMemorialCard({ victim, isHovered, onHover, onLeave, gradient }: EpicMemorialCardProps) {
  return (
    <div
      className={`
        relative group cursor-pointer transition-all duration-700 ease-out
        ${isHovered ? 'transform scale-105 z-20' : 'transform scale-100 z-10'}
      `}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
    >
      {/* Card com efeito 3D */}
      <div
        className={`
          relative h-96 rounded-2xl overflow-hidden shadow-2xl transition-all duration-700 ease-out
          ${isHovered 
            ? 'transform translate-y-[-10px] shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5),0_0_30px_rgba(255,255,255,0.1)]' 
            : 'transform translate-y-0 shadow-lg'
          }
        `}
      >
        {/* Imagem de fundo se disponível */}
        {victim.image && (
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${victim.image})` }}
          />
        )}
        
        {/* Fundo gradiente */}
        <div className={`absolute inset-0 bg-gradient-to-br ${gradient} ${victim.image ? 'opacity-70' : 'opacity-90'}`} />
        
        {/* Overlay escuro para melhor legibilidade */}
        <div className={`absolute inset-0 bg-black ${victim.image ? 'bg-opacity-60' : 'bg-opacity-40'}`} />
        
        {/* Efeito de brilho no hover */}
        <div 
          className={`
            absolute inset-0 bg-gradient-to-tr from-white/20 via-transparent to-white/10 
            transition-opacity duration-500
            ${isHovered ? 'opacity-100' : 'opacity-0'}
          `} 
        />
        
        {/* Conteúdo do card */}
        <div className="relative z-10 h-full flex flex-col justify-between p-8 text-white">
          {/* Header */}
          <div className="space-y-3">
            <div className="flex items-start justify-between">
              <div className="space-y-2">
                <h3 className="text-2xl font-bold leading-tight">{victim.name}</h3>
                <div className="flex items-center gap-4 text-sm opacity-90">
                  <span className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    {new Date(victim.date).toLocaleDateString('pt-BR')}
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    {victim.neighborhood}
                  </span>
                </div>
              </div>
              <Badge className="bg-white/20 text-white border-white/30 hover:bg-white/30">
                {victim.age} anos
              </Badge>
            </div>
          </div>

          {/* Tributo */}
          <div className="space-y-4">
            <div 
              className={`
                transition-all duration-500 ease-out
                ${isHovered ? 'transform translate-y-0 opacity-100' : 'transform translate-y-4 opacity-70'}
              `}
            >
              <p className="text-lg leading-relaxed font-medium">
                "{victim.tribute}"
              </p>
              {victim.submittedBy && (
                <p className="text-sm mt-3 opacity-80 italic">
                  — {victim.submittedBy}
                </p>
              )}
            </div>

            {/* Coração decorativo */}
            <div className="flex justify-center">
              <div 
                className={`
                  transition-all duration-500
                  ${isHovered 
                    ? 'transform scale-110 rotate-12 text-white' 
                    : 'transform scale-100 rotate-0 text-white/60'
                  }
                `}
              >
                <Heart className="h-6 w-6 fill-current" />
              </div>
            </div>
          </div>
        </div>

        {/* Border glow effect */}
        <div 
          className={`
            absolute inset-0 rounded-2xl border-2 transition-all duration-500
            ${isHovered ? 'border-white/50' : 'border-white/20'}
          `} 
        />
      </div>
    </div>
  );
}

export function MemorialContent() {
  const { victims, loading, error, addVictim } = useVictims();
  const [selectedYear, setSelectedYear] = useState<string>("2024");
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredVictims = victims.filter(victim => 
    victim.date.startsWith(selectedYear) && victim.isApproved
  );

  const availableYears = [...new Set(victims.map(v => v.date.split('-')[0]))].sort().reverse();

  const neighborhoodStats = victims.reduce((acc, victim) => {
    const neighborhood = victim.neighborhood;
    acc[neighborhood] = (acc[neighborhood] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const handleAddVictim = async (victimData: any) => {
    const success = await addVictim({
      name: victimData.name,
      age: victimData.age,
      date: victimData.date,
      location: victimData.location,
      description: victimData.description,
      author: victimData.author,
      image: victimData.image
    });
    
    if (success) {
      setIsModalOpen(false);
    }
  };

  return (
    <div className="h-full relative text-white w-full overflow-hidden">
      {/* Background image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'url(/background.jpg)',
          filter: 'grayscale(20%) sepia(10%)'
        }}
      />
      
      {/* Multiple overlay gradients for depth and readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-black/30" />
      
      {/* Dynamic overlay com blur nos cards não hovereados */}
      <div 
        className={`
          absolute inset-0 transition-all duration-700 z-10
          ${hoveredCard ? 'backdrop-blur-sm bg-black/60' : 'backdrop-blur-none bg-transparent'}
        `}
      />

      <div className="relative z-20 py-8 px-6 w-full h-full overflow-y-auto">
        {/* Header épico */}
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

        {/* Estatísticas em estilo gaming */}
        <div className="grid gap-6 md:grid-cols-3 mb-12 max-w-4xl mx-auto">
          {[
            { icon: Users, value: victims.length, label: "Vítimas lembradas", gradient: "from-blue-500 to-purple-600" },
            { icon: Calendar, value: filteredVictims.length, label: `Em ${selectedYear}`, gradient: "from-green-500 to-teal-600" },
            { icon: MapPin, value: Object.keys(neighborhoodStats).length, label: "Bairros afetados", gradient: "from-red-500 to-pink-600" }
          ].map((stat, index) => (
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

        {/* Controles */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 mb-12 max-w-6xl mx-auto">
          <Tabs value={selectedYear} onValueChange={setSelectedYear} className="w-auto">
            <TabsList className="bg-white/10 border border-white/20">
              {availableYears.map(year => (
                <TabsTrigger 
                  key={year} 
                  value={year}
                  className="data-[state=active]:bg-white/20 data-[state=active]:text-white"
                >
                  {year}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
          
          <Button 
            onClick={() => setIsModalOpen(true)}
            className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white border-0 shadow-lg transition-all duration-300 hover:scale-105"
          >
            <Plus className="mr-2 h-5 w-5" />
            Adicionar Tributo
          </Button>
        </div>

        {/* Grid de vítimas estilo Epic Games */}
        <div className="max-w-7xl mx-auto">
          {loading ? (
            <div className="flex items-center justify-center py-16">
              <div className="flex items-center space-x-3 text-white">
                <Loader2 className="h-8 w-8 animate-spin" />
                <span className="text-lg">Carregando memorial...</span>
              </div>
            </div>
          ) : error ? (
            <div className="flex items-center justify-center py-16">
              <div className="text-center space-y-4">
                <p className="text-red-400 text-lg">Erro ao carregar o memorial</p>
                <p className="text-gray-300 text-sm">{error}</p>
              </div>
            </div>
          ) : filteredVictims.length > 0 ? (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {filteredVictims.map((victim, index) => (
                <div
                  key={victim.id}
                  className={`
                    transition-all duration-700 ease-out
                    ${hoveredCard && hoveredCard !== victim.id 
                      ? 'opacity-30 blur-sm scale-95' 
                      : 'opacity-100 blur-none scale-100'
                    }
                  `}
                >
                  <EpicMemorialCard
                    victim={victim}
                    isHovered={hoveredCard === victim.id}
                    onHover={() => setHoveredCard(victim.id)}
                    onLeave={() => setHoveredCard(null)}
                    gradient={VICTIM_GRADIENTS[index % VICTIM_GRADIENTS.length]}
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <Heart className="h-16 w-16 text-gray-500 mx-auto mb-6" />
              <p className="text-xl text-gray-400">
                Nenhuma vítima registrada para {selectedYear}
              </p>
            </div>
          )}
        </div>

        {/* Informações sobre colaboração */}
        <div className="mt-16 max-w-4xl mx-auto">
          <div className="backdrop-blur-md bg-gradient-to-r from-yellow-500/20 to-orange-500/20 rounded-2xl p-8 border border-yellow-500/40 shadow-2xl">
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-yellow-200 drop-shadow-lg">
                Como colaborar com o Memorial
              </h3>
              <p className="text-gray-100 leading-relaxed drop-shadow">
                Este memorial é colaborativo. Familiares e amigos podem enviar tributos 
                para honrar a memória das vítimas. Todas as submissões passam por moderação 
                antes de serem publicadas.
              </p>
              <p className="text-sm text-gray-200 drop-shadow">
                O objetivo é criar um espaço de memória, não de exposição. 
                Respeitamos a dor das famílias e a dignidade das vítimas.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Modal para adicionar vítima */}
      <AddVictimModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAdd={handleAddVictim}
      />
    </div>
  );
}
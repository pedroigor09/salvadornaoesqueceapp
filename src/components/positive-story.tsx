"use client";

import { Users, Star, Heart } from "lucide-react";

interface PositiveStoryProps {
  title: string;
  description: string;
  location: string;
  participants: number;
}

const POSITIVE_STORIES: PositiveStoryProps[] = [
  {
    title: "Projeto Juventude Ativa",
    description: "jovens participaram de oficinas de arte e esporte",
    location: "Cajazeiras",
    participants: 120
  },
  {
    title: "Rede de Apoio Feminino",
    description: "mulheres receberam atendimento psicológico gratuito",
    location: "Centro Histórico",
    participants: 85
  },
  {
    title: "Mediação de Conflitos",
    description: "conflitos foram resolvidos pacificamente",
    location: "Liberdade",
    participants: 45
  },
  {
    title: "Capacitação Profissional",
    description: "pessoas se formaram em cursos técnicos",
    location: "Subúrbio",
    participants: 200
  }
];

export function PositiveStory() {
  const story = POSITIVE_STORIES[Math.floor(Math.random() * POSITIVE_STORIES.length)];

  return (
    <div className="bg-gradient-to-r from-green-900/30 via-emerald-900/30 to-teal-900/30 rounded-xl p-4 md:p-6 border border-green-500/20 backdrop-blur-sm">
      <div className="flex items-start space-x-3 md:space-x-4">
        <div className="p-2 md:p-3 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full">
          <Star className="h-5 w-5 md:h-6 md:w-6 text-white" />
        </div>
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-2">
            <h4 className="text-white text-sm md:text-base font-semibold">
              {story.title}
            </h4>
            <span className="px-2 py-1 bg-green-500/20 text-green-400 text-xs rounded-full">
              {story.location}
            </span>
          </div>
          <p className="text-gray-300 text-xs md:text-sm leading-relaxed">
            <span className="text-green-400 font-bold">+{story.participants}</span> {story.description} este mês
          </p>
        </div>
      </div>
    </div>
  );
}
"use client";

import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus } from "lucide-react";

interface MemorialControlsProps {
  selectedYear: string;
  onYearChange: (year: string) => void;
  availableYears: string[];
  onAddClick: () => void;
}

export function MemorialControls({ selectedYear, onYearChange, availableYears, onAddClick }: MemorialControlsProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 mb-12 max-w-6xl mx-auto">
      <Tabs value={selectedYear} onValueChange={onYearChange} className="w-auto">
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
        onClick={onAddClick}
        className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white border-0 shadow-lg transition-all duration-300 hover:scale-105"
      >
        <Plus className="mr-2 h-5 w-5" />
        Adicionar Tributo
      </Button>
    </div>
  );
}
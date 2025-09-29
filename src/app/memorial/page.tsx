"use client";

import { useState } from "react";
import { ModernSidebar } from "@/components/modern-sidebar";
import { MemorialContent } from "@/components/memorial-content";
import { MemorialIntro } from "@/components/memorial-intro";
import { MemorialTransition } from "@/components/memorial-transition";

export default function Memorial() {
  const [currentPhase, setCurrentPhase] = useState<'intro' | 'transition' | 'memorial'>('intro');

  const handleIntroComplete = () => {
    setCurrentPhase('transition');
  };

  const handleTransitionComplete = () => {
    setCurrentPhase('memorial');
  };

  if (currentPhase === 'intro') {
    return <MemorialIntro onComplete={handleIntroComplete} />;
  }

  if (currentPhase === 'transition') {
    return <MemorialTransition onComplete={handleTransitionComplete} />;
  }

  return (
    <ModernSidebar>
      <div className="h-full animate-fade-in">
        <MemorialContent />
      </div>
    </ModernSidebar>
  );
}
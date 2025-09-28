"use client";

import { useState } from "react";
import { ModernSidebar } from "@/components/modern-sidebar";
import { MemorialContent } from "@/components/memorial-content";
import { MemorialIntro } from "@/components/memorial-intro";

export default function Memorial() {
  const [showIntro, setShowIntro] = useState(true);

  const handleIntroComplete = () => {
    setShowIntro(false);
  };

  if (showIntro) {
    return <MemorialIntro onComplete={handleIntroComplete} />;
  }

  return (
    <ModernSidebar>
      <div className="h-full animate-fade-in">
        <MemorialContent />
      </div>
    </ModernSidebar>
  );
}
"use client";

import { useState, useEffect } from "react";
import { ModernSidebar } from "@/components/modern-sidebar";
import { ModernDashboardContent } from "@/components/modern-dashboard-content";
import { MainIntro } from "@/components/main-intro";
import { ServicesPage } from "@/components/services-page";

export default function Home() {
  const [showIntro, setShowIntro] = useState(true);
  const [showMainContent, setShowMainContent] = useState(false);
  const [showServices, setShowServices] = useState(false);

  const handleIntroComplete = () => {
    setShowIntro(false);
    // Pequeno delay para sincronizar com o fade-out da intro
    setTimeout(() => {
      setShowMainContent(true);
    }, 200);
  };

  const handleShowServices = () => {
    setShowServices(true);
  };

  const handleBackFromServices = () => {
    setShowServices(false);
  };

  if (showIntro) {
    return <MainIntro onComplete={handleIntroComplete} />;
  }

  if (showServices) {
    return <ServicesPage onBack={handleBackFromServices} />;
  }

  return (
    <div className={`transition-all duration-1000 ease-in-out ${
      showMainContent 
        ? 'opacity-100 transform translate-y-0' 
        : 'opacity-0 transform translate-y-4'
    }`}>
      <ModernSidebar>
        <ModernDashboardContent onShowServices={handleShowServices} />
      </ModernSidebar>
      
      <style jsx>{`
        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-slide-in-up {
          animation: slideInUp 0.8s ease-out forwards;
        }
      `}</style>
    </div>
  );
}

"use client";

import { useState } from "react";
import { Phone, Mail } from "lucide-react";
import { Service } from "../data/services-data";
import { ContactModal } from "./contact-modal";

interface ContactButtonProps {
  service: Service;
}

export function ContactButton({ service }: ContactButtonProps) {
  const [showContactModal, setShowContactModal] = useState(false);

  const handleContact = () => {
    const phoneNumber = service.phone.replace(/\D/g, '');
    const isEmergencyNumber = ['180', '190', '192', '193'].includes(phoneNumber);
    const isValidPhone = phoneNumber.length >= 10 || isEmergencyNumber;
    
    // Detecta se está em dispositivo móvel
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    if (isValidPhone) {
      if (isMobile) {
        // Em mobile, inicia ligação diretamente
        const telNumber = isEmergencyNumber ? phoneNumber : `+55${phoneNumber}`;
        window.location.href = `tel:${telNumber}`;
      } else {
        // Em desktop, abre modal elegante
        setShowContactModal(true);
      }
    } else {
      // Se não há telefone válido, vai direto para email
      window.location.href = `mailto:${service.email}?subject=Solicitação de Ajuda - ${service.title}`;
    }
  };

  const getButtonContent = () => {
    const phoneNumber = service.phone.replace(/\D/g, '');
    const isEmergencyNumber = ['180', '190', '192', '193'].includes(phoneNumber);
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    if (isEmergencyNumber) {
      return (
        <>
          <Phone className="w-5 h-5" />
          {isMobile ? 'Ligar Agora' : 'Contatar'}
        </>
      );
    } else if (phoneNumber.length >= 10) {
      return (
        <>
          <Phone className="w-5 h-5" />
          {isMobile ? 'Ligar' : 'Telefone/Email'}
        </>
      );
    } else {
      return (
        <>
          <Mail className="w-5 h-5" />
          Enviar Email
        </>
      );
    }
  };

  const getHelpText = () => {
    const phoneNumber = service.phone.replace(/\D/g, '');
    const isEmergencyNumber = ['180', '190', '192', '193'].includes(phoneNumber);
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    if (isEmergencyNumber) {
      return isMobile ? 'Toque para ligar imediatamente' : 'Clique no telefone acima para copiar';
    } else if (phoneNumber.length >= 10) {
      return isMobile ? 'Toque para ligar' : 'Escolha telefone ou email';
    } else {
      return 'Clique para enviar email';
    }
  };

  return (
    <>
      <div className="mt-6 space-y-2">
        <button 
          onClick={handleContact}
          className="w-full bg-gradient-to-r from-amber-500 to-amber-400 text-black font-semibold py-3 rounded-2xl hover:scale-105 transition-all duration-300 shadow-lg shadow-amber-500/25 flex items-center justify-center gap-2"
        >
          {getButtonContent()}
        </button>
        
        {/* Dica visual sutil */}
        <p className="text-xs text-gray-400 text-center">
          {getHelpText()}
        </p>
      </div>

      <ContactModal 
        service={service}
        isOpen={showContactModal}
        onClose={() => setShowContactModal(false)}
      />
    </>
  );
}
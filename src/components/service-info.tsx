"use client";

import { Phone, MapPin, Clock, Mail } from "lucide-react";
import { Service } from "../data/services-data";

interface ServiceInfoProps {
  service: Service;
}

export function ServiceInfo({ service }: ServiceInfoProps) {
  const handlePhoneClick = () => {
    const phoneNumber = service.phone.replace(/\D/g, '');
    const isEmergency = ['180', '190', '192', '193'].includes(phoneNumber);
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    if (isMobile) {
      const telNumber = isEmergency ? phoneNumber : `+55${phoneNumber}`;
      window.location.href = `tel:${telNumber}`;
    } else {
      navigator.clipboard.writeText(service.phone).then(() => {
        alert(`✅ Telefone copiado: ${service.phone}`);
      });
    }
  };

  const handleEmailClick = () => {
    window.location.href = `mailto:${service.email}?subject=Solicitação de Ajuda - ${service.title}`;
  };

  return (
    <div className="space-y-4">
      <div 
        className="flex items-center gap-3 text-amber-200 cursor-pointer hover:text-amber-100 transition-colors"
        onClick={handlePhoneClick}
      >
        <Phone className="w-5 h-5 text-amber-400" />
        <span className="font-semibold text-lg">{service.phone}</span>
      </div>
      
      <div className="flex items-start gap-3 text-gray-300">
        <MapPin className="w-5 h-5 text-amber-400 mt-1" />
        <div>
          <div className="font-medium">{service.address}</div>
          <div className="text-sm text-gray-400">{service.city} - {service.region}</div>
        </div>
      </div>

      <div className="flex items-center gap-3 text-gray-300">
        <Clock className="w-5 h-5 text-amber-400" />
        <span className="text-sm">{service.hours}</span>
      </div>

      <div 
        className="flex items-start gap-3 text-gray-300 cursor-pointer hover:text-gray-200 transition-colors"
        onClick={handleEmailClick}
      >
        <Mail className="w-5 h-5 text-amber-400 mt-1" />
        <span className="text-sm break-all">{service.email}</span>
      </div>
    </div>
  );
}
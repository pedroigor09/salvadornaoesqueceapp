"use client";

import { Phone, Mail } from "lucide-react";
import { Service } from "../data/services-data";

interface ContactModalProps {
  service: Service;
  isOpen: boolean;
  onClose: () => void;
}

export function ContactModal({ service, isOpen, onClose }: ContactModalProps) {
  if (!isOpen) return null;

  const handlePhoneContact = () => {
    navigator.clipboard.writeText(service.phone).then(() => {
      onClose();
      // Toast elegante
      const toast = document.createElement('div');
      toast.className = 'fixed top-4 right-4 bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-4 rounded-xl shadow-2xl z-50 toast-notification flex items-center gap-3';
      toast.innerHTML = `
        <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
        </svg>
        <div>
          <div class="font-semibold">Telefone copiado!</div>
          <div class="text-sm text-green-100">${service.phone}</div>
        </div>
      `;
      document.body.appendChild(toast);
      setTimeout(() => {
        toast.remove();
      }, 3000);
    }).catch(() => {
      onClose();
      alert(`Telefone: ${service.phone}`);
    });
  };

  const handleEmailContact = () => {
    onClose();
    window.location.href = `mailto:${service.email}?subject=Solicitação de Ajuda - ${service.title}`;
  };

  return (
    <>
      <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={onClose}>
        <div 
          className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl p-8 max-w-md w-full border border-amber-400/20 shadow-2xl animate-fade-in"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="text-center mb-6">
            <h3 className="text-2xl font-bold text-white mb-2">Como deseja entrar em contato?</h3>
            <p className="text-gray-300 text-sm">{service.title}</p>
          </div>

          <div className="space-y-4">
            {/* Botão Telefone */}
            <button
              onClick={handlePhoneContact}
              className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold py-4 rounded-2xl hover:scale-105 transition-all duration-300 shadow-lg flex items-center justify-center gap-3"
            >
              <Phone className="w-6 h-6" />
              <div className="text-left">
                <div className="font-bold">Copiar Telefone</div>
                <div className="text-sm text-blue-100">{service.phone}</div>
              </div>
            </button>

            {/* Botão Email */}
            <button
              onClick={handleEmailContact}
              className="w-full bg-gradient-to-r from-amber-500 to-amber-600 text-black font-semibold py-4 rounded-2xl hover:scale-105 transition-all duration-300 shadow-lg flex items-center justify-center gap-3"
            >
              <Mail className="w-6 h-6" />
              <div className="text-left">
                <div className="font-bold">Enviar Email</div>
                <div className="text-sm text-amber-100">{service.email}</div>
              </div>
            </button>
          </div>

          {/* Botão Fechar */}
          <button
            onClick={onClose}
            className="w-full mt-4 text-gray-400 hover:text-white transition-colors py-2"
          >
            Cancelar
          </button>
        </div>
      </div>

      {/* Estilos globais para animações */}
      <style jsx global>{`
        .animate-fade-in {
          animation: fadeIn 0.3s ease-out forwards;
        }
        
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        
        .toast-notification {
          animation: slideInRight 0.3s ease-out forwards, slideOutRight 0.3s ease-in 2.7s forwards;
        }
        
        @keyframes slideInRight {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        
        @keyframes slideOutRight {
          from {
            transform: translateX(0);
            opacity: 1;
          }
          to {
            transform: translateX(100%);
            opacity: 0;
          }
        }
      `}</style>
    </>
  );
}
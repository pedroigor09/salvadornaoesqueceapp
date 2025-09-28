export const servicesAnimations = `
  @keyframes slide-in-left {
    from { 
      opacity: 0; 
      transform: translateX(-100px) rotateY(-30deg);
      filter: blur(5px);
    }
    to { 
      opacity: 1; 
      transform: translateX(0) rotateY(0deg);
      filter: blur(0px);
    }
  }
  
  @keyframes slide-in-right {
    from { 
      opacity: 0; 
      transform: translateX(100px) rotateY(30deg);
      filter: blur(5px);
    }
    to { 
      opacity: 1; 
      transform: translateX(0) rotateY(0deg);
      filter: blur(0px);
    }
  }
  
  @keyframes fade-in-up {
    from { 
      opacity: 0; 
      transform: translateY(60px) scale(0.8);
      filter: blur(8px);
    }
    to { 
      opacity: 1; 
      transform: translateY(0) scale(1);
      filter: blur(0px);
    }
  }
  
  @keyframes zoom-in {
    from { 
      opacity: 0; 
      transform: scale(0.3) rotateZ(-10deg);
      filter: blur(10px);
    }
    to { 
      opacity: 1; 
      transform: scale(1) rotateZ(0deg);
      filter: blur(0px);
    }
  }
  
  @keyframes rotate-in {
    from { 
      opacity: 0; 
      transform: rotateY(90deg) scale(0.5);
      filter: blur(15px);
    }
    to { 
      opacity: 1; 
      transform: rotateY(0deg) scale(1);
      filter: blur(0px);
    }
  }
  
  @keyframes bounce-in {
    0% { 
      opacity: 0; 
      transform: translateY(-100px) scale(0.3);
      filter: blur(20px);
    }
    50% { 
      opacity: 0.8; 
      transform: translateY(20px) scale(1.1);
      filter: blur(5px);
    }
    100% { 
      opacity: 1; 
      transform: translateY(0) scale(1);
      filter: blur(0px);
    }
  }
  
  .animate-slide-in-left { animation: slide-in-left 1.2s cubic-bezier(0.4, 0, 0.2, 1); }
  .animate-slide-in-right { animation: slide-in-right 1.2s cubic-bezier(0.4, 0, 0.2, 1); }
  .animate-fade-in-up { animation: fade-in-up 1.5s cubic-bezier(0.4, 0, 0.2, 1); }
  .animate-zoom-in { animation: zoom-in 1.8s cubic-bezier(0.4, 0, 0.2, 1); }
  .animate-rotate-in { animation: rotate-in 2s cubic-bezier(0.4, 0, 0.2, 1); }
  .animate-bounce-in { animation: bounce-in 2.2s cubic-bezier(0.68, -0.55, 0.265, 1.55); }
`;
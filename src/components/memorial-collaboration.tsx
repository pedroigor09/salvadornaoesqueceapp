"use client";

export function MemorialCollaboration() {
  return (
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
  );
}
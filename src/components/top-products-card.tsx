"use client";

export function TopProductsCard() {
  const mockProducts = [
    { name: "Centro Histórico", popularity: 85, sales: "18%" },
    { name: "Liberdade", popularity: 72, sales: "15%" },
    { name: "Subúrbio", popularity: 68, sales: "12%" },
    { name: "Cajazeiras", popularity: 45, sales: "8%" }
  ];

  return (
    <div className="bg-gray-900 rounded-xl p-4 md:p-6 border border-gray-800">
      <h3 className="text-white text-base md:text-lg font-semibold mb-4 md:mb-6">Bairros Mais Afetados</h3>
      <div className="space-y-3 md:space-y-4">
        {mockProducts.map((product, index) => (
          <div key={index} className="flex items-center justify-between">
            <div className="flex items-center space-x-2 md:space-x-3 flex-1 min-w-0">
              <span className="text-gray-400 text-xs md:text-sm font-medium">
                {String(index + 1).padStart(2, '0')}
              </span>
              <span className="text-white font-medium text-sm md:text-base truncate">{product.name}</span>
            </div>
            <div className="flex items-center space-x-2 md:space-x-4">
              <div className="w-16 md:w-24 bg-gray-800 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full" 
                  style={{ width: `${product.popularity}%` }}
                />
              </div>
              <span className="text-green-400 text-xs md:text-sm font-medium w-8 md:w-12 text-right">
                {product.sales}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
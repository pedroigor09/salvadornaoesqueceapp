import { BairroData } from '@/types/bairros';

// Base de dados dos bairros com coordenadas PRECISAS de Salvador
// Coordenadas fornecidas por múltiplas fontes confiáveis (Wikipedia, Wikidata, etc.)
export const BAIRROS_BASE = [
  {
    id: "centro-historico",
    name: "Centro Histórico",
    lat: -12.967000,
    lng: -38.500000, // Pelourinho - coordenada Wikipedia
    populacao: 45000,
    percentualViolencia: 0.18,
    descricao: "Região central de Salvador, com alta concentração comercial e turística. Apresenta índices elevados de violência urbana.",
    nivel: "alto" as const
  },
  {
    id: "liberdade",
    name: "Liberdade",
    lat: -12.950018,
    lng: -38.503510, // Liberdade - coordenada Wikidata
    populacao: 32000,
    percentualViolencia: 0.16,
    descricao: "Bairro tradicional de Salvador, berço da cultura afro-brasileira. Enfrenta desafios socioeconômicos significativos.",
    nivel: "alto" as const
  },
  {
    id: "suburbio",
    name: "Subúrbio Ferroviário",
    lat: -12.87972,
    lng: -38.46889, // Subúrbio - coordenada Wikimapia (12°52′47″S 38°28′08″W)
    populacao: 28000,
    percentualViolencia: 0.14,
    descricao: "Região periférica com densidade populacional alta. Necessita de maior investimento em segurança pública.",
    nivel: "medio" as const
  },
  {
    id: "cajazeiras",
    name: "Cajazeiras",
    lat: -12.89994,
    lng: -38.40816, // Cajazeiras - coordenada Mapcarta
    populacao: 35000,
    percentualViolencia: 0.12,
    descricao: "Bairro em expansão na periferia de Salvador. Apresenta crescimento urbano desordenado.",
    nivel: "medio" as const
  },
  {
    id: "itapua",
    name: "Itapuã",
    lat: -12.93716,
    lng: -38.35567, // Itapuã - coordenada Guiamapa.com (Rua Bahia de Itapuã / Av. Dorival Caymmi)
    populacao: 42000,
    percentualViolencia: 0.08,
    descricao: "Bairro litorâneo famoso pelas praias e cultura local. Região turística com índices menores de violência.",
    nivel: "baixo" as const
  },
  {
    id: "brotas",
    name: "Brotas",
    lat: -12.98576,
    lng: -38.49982, // Brotas - coordenada bm.toponavi.com
    populacao: 38000,
    percentualViolencia: 0.10,
    descricao: "Bairro de classe média com boa infraestrutura. Apresenta índices moderados de criminalidade.",
    nivel: "baixo" as const
  },
  {
    id: "barra",
    name: "Barra",
    lat: -13.01035,
    lng: -38.53292, // Barra - coordenada SGB (Farol / Forte de Santo Antônio da Barra)
    populacao: 30000,
    percentualViolencia: 0.06,
    descricao: "Área nobre e turística de Salvador. Concentra hotéis, restaurantes e vida noturna.",
    nivel: "baixo" as const
  },
  {
    id: "periperi",
    name: "Periperi",
    lat: -12.86336,
    lng: -38.47367, // Periperi - coordenada Mapcarta
    populacao: 25000,
    percentualViolencia: 0.09,
    descricao: "Bairro do subúrbio ferroviário com características industriais e residenciais populares.",
    nivel: "medio" as const
  },
  {
    id: "fazenda-grande",
    name: "Fazenda Grande",
    lat: -12.94280,
    lng: -38.47737, // Fazenda Grande do Retiro - coordenada Mapcarta
    populacao: 33000,
    percentualViolencia: 0.07,
    descricao: "Bairro popular com grande densidade demográfica e desafios de infraestrutura urbana.",
    nivel: "medio" as const
  }
];
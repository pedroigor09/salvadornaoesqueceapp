import { 
  Globe, 
  MessageSquare, 
  Building, 
  Shield, 
  Gavel, 
  UserCheck, 
  Scale, 
  Users 
} from "lucide-react";

export interface Service {
  id: number;
  title: string;
  description: string;
  phone: string;
  address: string;
  email: string;
  city: string;
  region: string;
  hours: string;
  specialties: string[];
  type: 'police' | 'cram' | 'emergency';
  isHighlighted?: boolean;
}

export const servicesData: Service[] = [
  {
    id: 1,
    title: "Delegacia Especializada de Atendimento à Mulher (DEAM) - Salvador",
    description: "Atendimento especializado para mulheres vítimas de violência doméstica e sexual",
    phone: "(71) 3116-3579",
    address: "Rua da Grécia, 56 - Rio Vermelho",
    email: "deam.salvador@pc.ba.gov.br",
    city: "Salvador",
    region: "Região Metropolitana",
    hours: "24 horas",
    specialties: ["Violência Doméstica", "Violência Sexual", "Feminicídio", "Stalking"],
    type: "police",
    isHighlighted: true
  },
  {
    id: 2,
    title: "CRAM Salvador - Centro de Referência de Atendimento à Mulher",
    description: "Apoio psicossocial e jurídico para mulheres em situação de violência",
    phone: "(71) 3113-4490", 
    address: "Rua Visconde de Itaboraí, 44 - Amaralina",
    email: "cram.salvador@sjdhds.ba.gov.br",
    city: "Salvador",
    region: "Região Metropolitana",
    hours: "Segunda a Sexta: 8h às 18h",
    specialties: ["Apoio Psicológico", "Assistência Social", "Orientação Jurídica", "Acolhimento"],
    type: "cram"
  },
  {
    id: 3,
    title: "Delegacia de Proteção à Mulher - Feira de Santana",
    description: "Delegacia especializada no atendimento à mulher em situação de violência",
    phone: "(75) 3161-7031",
    address: "Av. Getúlio Vargas, 1312 - Centro",
    email: "dpm.feirasantana@pc.ba.gov.br", 
    city: "Feira de Santana",
    region: "Interior",
    hours: "24 horas",
    specialties: ["Violência Doméstica", "Violência Sexual", "Medidas Protetivas", "Inquéritos"],
    type: "police"
  },
  {
    id: 4,
    title: "CRAM Feira de Santana",
    description: "Centro de referência com atendimento multidisciplinar",
    phone: "(75) 3602-8181",
    address: "Rua Marechal Deodoro, 628 - Centro", 
    email: "cram.feirasantana@sjdhds.ba.gov.br",
    city: "Feira de Santana",
    region: "Interior",
    hours: "Segunda a Sexta: 7h às 17h",
    specialties: ["Atendimento Psicológico", "Serviço Social", "Assessoria Jurídica", "Grupos Terapêuticos"],
    type: "cram"
  },
  {
    id: 5,
    title: "Delegacia da Mulher - Vitória da Conquista", 
    description: "Atendimento especializado para crimes contra a mulher",
    phone: "(77) 3424-3117",
    address: "Av. Bartolomeu de Gusmão, 177 - Recreio",
    email: "dm.vconquista@pc.ba.gov.br",
    city: "Vitória da Conquista", 
    region: "Sudoeste",
    hours: "24 horas",
    specialties: ["Violência Física", "Violência Psicológica", "Ameaças", "Lesão Corporal"],
    type: "police"
  },
  {
    id: 6,
    title: "CRAM Vitória da Conquista",
    description: "Apoio integral à mulher vítima de violência",
    phone: "(77) 3422-2891",
    address: "Rua Siqueira Campos, 120 - Centro",
    email: "cram.vconquista@sjdhds.ba.gov.br", 
    city: "Vitória da Conquista",
    region: "Sudoeste", 
    hours: "Segunda a Quinta: 8h às 18h, Sexta: 8h às 17h",
    specialties: ["Atendimento Psicossocial", "Orientação Jurídica", "Encaminhamentos", "Oficinas"],
    type: "cram"
  },
  {
    id: 7,
    title: "Central de Atendimento à Mulher - Ligue 180",
    description: "Atendimento telefônico nacional 24 horas para orientação e denúncias",
    phone: "180",
    address: "Atendimento telefônico em todo território nacional",
    email: "central180@mdh.gov.br",
    city: "Nacional",
    region: "Todo Brasil", 
    hours: "24 horas, 7 dias por semana",
    specialties: ["Orientação", "Denúncias", "Informações sobre Direitos", "Encaminhamentos"],
    type: "emergency",
    isHighlighted: true
  },
  {
    id: 8,
    title: "SAMU - Serviço de Atendimento Móvel de Urgência",
    description: "Atendimento médico de emergência",
    phone: "192", 
    address: "Atendimento móvel em todo estado da Bahia",
    email: "samu.bahia@saude.ba.gov.br",
    city: "Estadual",
    region: "Bahia",
    hours: "24 horas, 7 dias por semana", 
    specialties: ["Emergências Médicas", "Primeiros Socorros", "Transporte de Urgência", "Suporte Avançado"],
    type: "emergency"
  },
  {
    id: 9,
    title: "Polícia Militar - Emergência",
    description: "Atendimento policial de emergência",
    phone: "190",
    address: "Atendimento em todo território baiano",
    email: "190@pm.ba.gov.br", 
    city: "Estadual",
    region: "Bahia",
    hours: "24 horas, 7 dias por semana",
    specialties: ["Emergências Policiais", "Violência em Flagrante", "Patrulhamento", "Primeiros Socorros"],
    type: "emergency"
  },
  {
    id: 10,
    title: "Bombeiros - Emergência",
    description: "Corpo de Bombeiros para emergências e resgates",
    phone: "193",
    address: "Atendimento em todo estado da Bahia", 
    email: "193@cbm.ba.gov.br",
    city: "Estadual", 
    region: "Bahia",
    hours: "24 horas, 7 dias por semana",
    specialties: ["Combate a Incêndios", "Resgate", "Emergências", "Prevenção"],
    type: "emergency"
  }
];
  {
    title: "Delegacia Virtual",
    description: "Ampliou as opções de registros de ocorrências incluindo violência doméstica contra mulher. As denúncias podem ser feitas pela internet.",
    contact: "www.delegaciavirtual.sinesp.gov.br",
    icon: <Globe className="h-6 w-6 text-white" />
  },
  {
    title: "Tribunal de Justiça - Judi",
    description: "Assistente virtual que fornece informações sobre tipos de violência doméstica e familiar, além de acesso aos canais de denúncia.",
    contact: "(71) 99978-4768",
    icon: <MessageSquare className="h-6 w-6 text-white" />
  },
  {
    title: "Centro de Referência de Atendimento à Mulher (CRAM)",
    description: "Oferece acompanhamento multidisciplinar com orientação jurídica em Salvador e outros 30 municípios da Bahia.",
    contact: "(71) 3235-4268",
    address: "Praça Almirante Coelho Neto, nº 1, Barris",
    hours: "8h às 18h",
    icon: <Building className="h-6 w-6 text-white" />
  },
  {
    title: "Núcleo de Defesa da Mulher (Nudem)",
    description: "Serviço da Defensoria Pública que oferece atendimento emergencial de médio e longo prazo para garantir direitos a uma vida sem violência.",
    contact: "(71) 3324-1587",
    address: "Rua Arquimedes Gonçalves, Jardim Baiano - 3º andar",
    hours: "7h às 16h",
    icon: <Shield className="h-6 w-6 text-white" />
  },
  {
    title: "Grupo de Atuação Especial em Defesa da Mulher (Gedem)",
    description: "Ação do Ministério Público que atua no atendimento e proteção do direito da mulher, baseado na Lei Maria da Penha.",
    contact: "(71) 3321-1949",
    address: "Rua Arquimedes Gonçalves, nº 142, Jardim Baiano",
    hours: "8h às 12h e 14h às 18h",
    icon: <Gavel className="h-6 w-6 text-white" />
  },
  {
    title: "Delegacias de Atendimento à Mulher (DEAM)",
    description: "15 unidades na Bahia. Em Salvador: Engenho Velho de Brotas e Periperi. Atendimento especializado para mulheres vítimas de violência.",
    contact: "(71) 3116-7000 / (71) 3117-8203",
    address: "Engenho Velho de Brotas e Periperi",
    icon: <UserCheck className="h-6 w-6 text-white" />
  },
  {
    title: "Coordenadoria Estadual das Mulheres",
    description: "Criada pelo TJ-BA, atende mulheres em situação de violência doméstica e intermedia com outros órgãos de apoio.",
    contact: "(71) 3372-1867/1895",
    address: "Centro Administrativo da Bahia - 5ª Avenida, nº 560",
    icon: <Scale className="h-6 w-6 text-white" />
  },
  {
    title: "TamoJuntas",
    description: "Organização que presta assessoria jurídica, psicológica, social e pedagógica gratuita para mulheres em situação de violência.",
    contact: "(71) 99185-4691",
    address: "Rua da Mangueira, nº 73, Nazaré",
    icon: <Users className="h-6 w-6 text-white" />
  }
];
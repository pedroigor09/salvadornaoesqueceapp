import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // Seed de vítimas para o memorial
  const victims = [
    {
      name: "João da Silva Santos",
      age: 25,
      neighborhood: "Liberdade",
      date: new Date("2024-08-15"),
      tribute: "Filho dedicado, sempre ajudou a família. Sonhava em ser professor. Era conhecido por todos no bairro pela sua bondade e sempre estava disposto a ajudar quem precisava.",
      submittedBy: "Família Santos",
      isApproved: true
    },
    {
      name: "Maria Conceição Oliveira",
      age: 32,
      neighborhood: "Subúrbio Ferroviário",
      date: new Date("2024-07-22"),
      tribute: "Mãe de três filhos, trabalhava como enfermeira no Hospital Roberto Santos. Uma guerreira que dedicou sua vida a cuidar dos outros e de sua família com muito amor.",
      submittedBy: "Irmã Carla",
      isApproved: true
    },
    {
      name: "Carlos Eduardo Lima",
      age: 19,
      neighborhood: "Centro Histórico",
      date: new Date("2024-09-03"),
      tribute: "Jovem talentoso, estudante de música na UFBA. Tocava violão nas praças do Centro Histórico e sonhava em formar uma banda. Sua música alegrava o coração de todos.",
      submittedBy: "Amigos da UFBA",
      isApproved: true
    },
    {
      name: "Ana Paula Santos",
      age: 28,
      neighborhood: "Cajazeiras",
      date: new Date("2024-06-18"),
      tribute: "Professora dedicada, formada em Pedagogia. Trabalhava em uma escola municipal e era amada por todos os alunos. Deixa uma filha de 5 anos.",
      submittedBy: "Colegas de trabalho",
      isApproved: true
    },
    {
      name: "Roberto Silva Pereira",
      age: 35,
      neighborhood: "Brotas",
      date: new Date("2024-05-12"),
      tribute: "Pai de família exemplar, trabalhava como mecânico. Sempre disposto a ajudar os vizinhos e amigos. Era conhecido pela sua generosidade e bom humor.",
      submittedBy: "Vizinhos",
      isApproved: true
    },
    {
      name: "Lucia Santos Pereira",
      age: 41,
      neighborhood: "Brotas",
      date: new Date("2024-04-08"),
      tribute: "Professora da rede pública, dedicou 15 anos da sua vida à educação. Transformou a vida de centenas de crianças com seu carinho e dedicação ao ensino.",
      submittedBy: "Escola Municipal Castro Alves",
      isApproved: true
    }
  ];

  console.log('Iniciando seed do banco de dados...');

  for (const victim of victims) {
    await prisma.victim.create({
      data: victim
    });
  }

  console.log('Seed concluído com sucesso!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
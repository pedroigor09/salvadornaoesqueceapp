# Salvador Não Esquece 🏴󠁢󠁲󠁢󠁡󠁿

Uma aplicação web para visualização de dados sobre violência em Salvador/BA e memorial das vítimas.

## 📊 Funcionalidades

### 1. Painel de Dados da Violência
- **Métricas em tempo real** baseadas nos dados oficiais da SSP-BA
- **Gráficos interativos** mostrando evolução temporal
- **Comparação anual** de homicídios e outros crimes
- **Dados mensais detalhados** por tipo de crime

### 2. Memorial das Vítimas
- **Espaço colaborativo** para honrar a memória das vítimas
- **Tributos de familiares e amigos** (com moderação)
- **Estatísticas por bairro e ano**
- **Interface respeitosa e digna**

## 🛠 Tecnologias Utilizadas

- **Next.js 15** - Framework React com App Router
- **TypeScript** - Tipagem estática
- **Tailwind CSS** - Estilização utilitária
- **shadcn/ui** - Componentes de interface
- **Recharts** - Gráficos e visualizações
- **Lucide React** - Ícones

## 📈 Fonte de Dados

Os dados são provenientes da **SSP-BA (Secretaria de Segurança Pública da Bahia)** através do Portal de Dados Abertos:

- **Dataset**: `MORTES_VIOLENTAS_ESTADO_2023_2024.csv`
- **Atualização**: Mensal
- **Última atualização**: Setembro/2024 (dados até agosto/2024)
- **Licença**: Dados abertos (citar fonte obrigatório)

### Tipos de Crimes Incluídos:
- Homicídio Doloso
- Latrocínio (Roubo seguido de morte)
- Lesão Corporal Seguida de Morte
- Feminicídio

## 🚀 Como Executar

1. **Clone o repositório**
```bash
git clone [url-do-repositorio]
cd salvadornaoesqueceapp
```

2. **Instale as dependências**
```bash
npm install
```

3. **Adicione o arquivo de dados**
   - Coloque o arquivo `mortes_violentas_estado.csv` na pasta `public/`

4. **Execute o servidor de desenvolvimento**
```bash
npm run dev
```

5. **Acesse a aplicação**
   - Abra [http://localhost:3000](http://localhost:3000)

## 📁 Estrutura do Projeto

```
src/
├── app/                    # App Router do Next.js
│   ├── api/               # API Routes
│   │   └── violence-data/ # Endpoint para dados da SSP-BA
│   ├── memorial/          # Página do memorial
│   └── page.tsx          # Página principal (dashboard)
├── components/           # Componentes React
│   ├── ui/              # Componentes base do shadcn/ui
│   ├── dashboard-content.tsx
│   ├── memorial-content.tsx
│   ├── metric-card.tsx
│   └── navigation.tsx
├── hooks/               # Custom hooks
│   └── use-violence-data.ts
├── lib/                # Utilitários e configurações
│   ├── violence-data.ts # Processamento de dados CSV
│   └── utils.ts        # Utilitários gerais
└── types/              # Definições de tipos TypeScript
    └── index.ts
```

## 🎨 Design e UX

A aplicação segue o tema de Salvador/Bahia com:
- **Cores quentes** (amarelo, laranja, vermelho) na navegação
- **Interface limpa e acessível**
- **Visualizações claras** dos dados
- **Respeito às vítimas** no memorial

## 📱 Responsividade

- ✅ Desktop
- ✅ Tablet
- ✅ Mobile

## 🔧 Configuração de Desenvolvimento

### Boas Práticas Implementadas:
- **TypeScript rigoroso** - Sem uso de `any`
- **Componentes tipados** com interfaces claras
- **Hooks customizados** para lógica de estado
- **Separation of concerns** - API, UI e lógica separadas
- **Performance** - Carregamento otimizado de dados
- **Acessibilidade** - Componentes semânticos

### Scripts Disponíveis:
```bash
npm run dev      # Servidor de desenvolvimento
npm run build    # Build de produção
npm run start    # Servidor de produção
npm run lint     # Linting do código
```

## 🚨 Importante

Esta aplicação trata de um tema sensível. **Sempre**:
- Trate os dados com seriedade e respeito
- Mantenha a dignidade das vítimas
- Cite a fonte dos dados (SSP-BA)
- Use para fins educacionais e de conscientização

## 📄 Licença

Os dados são de domínio público (SSP-BA). O código da aplicação está sob licença MIT.

---

**Desenvolvido com 💛 para Salvador, Bahia**

*"Em memória daqueles que perdemos, pela esperança de um futuro mais seguro."*

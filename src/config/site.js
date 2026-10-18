/*
 * SITE: everything that changes from one landing page to the next lives here.
 * Components only read from this file (and theme.css), so screens, actions and
 * animations stay identical across projects.
 * Images go in /public: logo, /gallery/*, /app-screens/*.
 */

export const brand = {
  name: "Baruque",
  kind: "Barbearia", // small word under the logo
  fullName: "Barbearia Baruque",
  logo: "/baruque-logo-official.png",
  tagline: "Vem pra Baruque", // big line at the top of the footer
};

// Used by vite.config.js to fill index.html (title, meta, fonts, preload).
export const seo = {
  title: "Barbearia Baruque | Barbearia em Contagem, MG",
  description:
    "Barbearia Baruque: corte, barba e um ambiente para desacelerar em Contagem, MG. Agende pelo app para Android e iPhone.",
  ogTitle: "Barbearia Baruque | Contagem, MG",
  ogDescription:
    "Corte preciso, barba bem feita e aquele ambiente que faz você voltar. Agende pelo app.",
  ogImage: "/gallery/baruque-03.jpeg",
  themeColor: "#111519", // keep equal to --dark in theme.css
  fontsUrl:
    "https://fonts.googleapis.com/css2?family=Bodoni+Moda:ital,opsz,wght@0,6..96,400..600;1,6..96,400..500&family=Hanken+Grotesk:wght@400;500;600;700&display=swap",
};

// Every piece of copy shown on the page, grouped by section.
export const copy = {
  cta: "Agendar horário",
  ctaShort: "Agendar agora",
  hero: {
    line1: "Seu estilo.",
    line2: "Sua assinatura.",
    text: "Corte preciso, barba bem feita e aquele ambiente que faz você voltar. A Baruque cuida de cada detalhe para você sair na sua melhor versão.",
    link: "Conheça a Baruque",
    pauseVideo: "Pausar vídeo",
    playVideo: "Reproduzir vídeo",
    scrollHint: "Role para conhecer",
  },
  intro: {
    first: "Mais que um corte.",
    second: "Um momento seu.",
    text: "Na Baruque, cada detalhe importa. Um espaço acolhedor em Contagem para cuidar do visual, desacelerar e sair sentindo que o corte ficou do jeito certo.",
    stepsLabel: "Como funciona",
  },
  features: {
    first: "O que nos torna",
    second: "diferentes",
    action: "Ver todos os serviços",
  },
  team: {
    label: "Nossa equipe",
    title: "Quem cuida de você",
    photoAlt: "Barbeiro trabalhando",
  },
  pricing: { title: "Valores" },
  ambient: { first: "Nosso", second: "ambiente" },
  reviews: {
    label: "Depoimentos",
    title: "O que dizem sobre nós",
    source: "no Google",
  },
  app: {
    first: "Agende pelo",
    second: "app Baruque",
    text: "Seu próximo horário a poucos toques. O app é gratuito para Android e iPhone.",
    screens: [
      "/app-screens/baruque-scheduling.png",
      "/app-screens/baruque-login.png",
    ], // rear, front
    modalTitle: "Baixe o app Baruque",
    modalText:
      "Agende seu horário com o profissional que preferir e receba lembretes direto no celular.",
    footerText: "Baixe o app e agende pelo celular",
  },
  visit: {
    first: "Venha nos",
    second: "visitar",
    mapsAction: "Abrir no Google Maps",
  },
};

export const contact = {
  phoneLabel: "(31) 97336-6715",
  phoneHref: "tel:+5531973366715",
  whatsapp:
    "https://wa.me/5531973366715?text=Ol%C3%A1!%20Vi%20o%20site%20da%20Barbearia%20Baruque%20e%20gostaria%20de%20agendar%20um%20hor%C3%A1rio.",
  instagram: "https://www.instagram.com/barbeariabaruque_/",
  address: [
    "Av. Juscelino Kubitschek, nº 1185",
    "Industrial, Contagem — MG",
    "32223-400",
  ],
  mapsEmbed:
    "https://www.google.com/maps?q=Av.+Juscelino+Kubitschek,+1185,+Contagem,+MG&output=embed",
  mapsLink:
    "https://www.google.com/maps/search/?api=1&query=Barbearia+Baruque+Av.+Juscelino+Kubitschek+1185+Contagem",
};

export const apps = {
  ios: "https://apps.apple.com/br/app/barbearia-baruque/id6502325832",
  android: "https://play.google.com/store/apps/details?id=baruque.app",
};

export const hours = [
  ["Segunda", "Fechado"],
  ["Terça a sexta", "09h às 19h30"],
  ["Sábado", "08h às 19h"],
  ["Domingo", "Fechado"],
];

export const nav = [
  ["inicio", "Início"],
  ["experiencia", "Experiência"],
  ["equipe", "Equipe"],
  ["servicos", "Valores"],
  ["ambiente", "Ambiente"],
  ["contato", "Contato"],
];

// width/height are the real pixel sizes, used for the lightbox aspect ratio.
const photo = (n, alt, width, height) => ({
  src: `/gallery/baruque-${n}.jpeg`,
  alt,
  width,
  height,
});

export const photos = {
  salon: photo("03", "Salão da Baruque com as cadeiras de corte", 1282, 1600),
  lounge: photo("01", "Sala de espera com sofá de couro e moto", 1600, 1072),
  cut: photo("02", "Barbeiro finalizando um corte", 1277, 1600),
  hand: photo("04", "Vem pra Baruque", 1273, 1600),
  bar: photo("05", "Bar da barbearia com whiskies", 1600, 1067),
  relax: photo("06", "Detalhes da casa", 1277, 1600),
  beers: photo("07", "Cervejas artesanais no balcão", 1279, 1600),
  facade: photo("08", "Fachada da Barbearia Baruque", 1349, 1600),
  moto: photo("10", "Moto em exposição na sala de espera", 1600, 1596),
  massage: {
    src: "/gallery/massagens.jpg",
    alt: "Sala de massagens da Baruque com maca e iluminação acolhedora",
    width: 988,
    height: 1692,
  },
};

export const heroVideo = {
  src: "/video/snapinsta-1792365312322.mp4",
  type: "video/mp4",
  poster: photos.salon.src,
};

export const stats = [
  { value: 10, suffix: "+", label: "Anos cuidando do seu estilo" },
  { value: 4.9, decimals: 1, label: "Nota no Google" },
  { value: 118, label: "Avaliações no Google" },
];

export const process = [
  [
    "Agendamento",
    "Reserve pelo app em segundos. Escolha seu barbeiro, horário e serviço preferido.",
  ],
  [
    "Consultoria",
    "Uma conversa inicial para entender seu estilo, formato do rosto e rotina de cuidados.",
  ],
  [
    "Execução",
    "Corte com técnicas modernas e clássicas, usando produtos premium selecionados.",
  ],
  [
    "Finalização",
    "Styling perfeito, dicas personalizadas e um café para fechar a experiência.",
  ],
];

export const features = [
  {
    photo: photos.cut,
    tag: "Looks",
    title: "Cuidado e estilo",
    text: "Um ambiente pensado para você cuidar do visual com personalidade.",
  },
  {
    photo: photos.massage,
    tag: "Bem-estar",
    title: "Massagens",
    text: "Relaxe com uma massagem em uma sala acolhedora, preparada para o seu bem-estar.",
  },
  {
    photo: photos.bar,
    tag: "Experiência",
    title: "Baruque Bar",
    text: "Boa conversa, café e drinks enquanto você espera.",
  },
  {
    photo: photos.lounge,
    tag: "Ambiente",
    title: "Estilo Baruque",
    text: "Sofá de couro, sinuca e detalhes que tornam cada visita especial.",
  },
  {
    photo: {
      src: "/gallery/ambiente-03.jpg",
      alt: "Cappuccino com a marca da Baruque",
      width: 1330,
      height: 1784,
    },
    tag: "Café da casa",
    title: "Uma pausa com sabor",
    text: "Um café para acompanhar sua visita e aproveitar o tempo com calma.",
  },
  {
    photo: {
      src: "/gallery/ambiente-01.jpg",
      alt: "Cuidado com a barba e vapor facial na Baruque",
      width: 1802,
      height: 1206,
    },
    tag: "Barba",
    title: "Cuidado em cada detalhe",
    text: "Atenção ao acabamento e ao conforto em cada etapa do cuidado com a barba.",
  },
  {
    photo: {
      src: "/gallery/ambiente-07.jpg",
      alt: "Recepção com sofá e poltrona clássicos",
      width: 1800,
      height: 1210,
    },
    tag: "Recepção",
    title: "Sinta-se em casa",
    text: "Um espaço acolhedor para chegar, se acomodar e desacelerar.",
  },
  {
    photo: photos.beers,
    tag: "Para aproveitar",
    title: "Cervejas artesanais",
    text: "Mais uma opção para curtir o ambiente e a boa conversa durante a visita.",
  },
];

// Portraits supplied by the team; originals are preserved in src/assets.
export const team = [
  {
    photo: "/team/edgar.jpg",
    name: "Edgar",
    role: "Barbeiro e fundador Baruque",
  },
  {
    photo: "/team/daniel.jpg",
    name: "Daniel",
    role: "Barbeiro",
  },
  {
    photo: "/team/mark.jpg",
    name: "Mark",
    role: "Barbeiro",
  },
  {
    photo: "/team/victor.jpg",
    name: "Victor",
    role: "Barbeiro",
  },
];

export const prices = [
  { name: "Corte", time: "30 min", price: "R$ 65" },
  { name: "Barba", time: "30 min", price: "R$ 50" },
  { name: "Corte + Barba", time: "50 min", price: "R$ 115", featured: true },
  { name: "Acabamento", time: "15 min", price: "R$ 20" },
  { name: "Sobrancelha navalha", time: "15 min", price: "R$ 20" },
  { name: "Pigmentação de barba", time: "15 min", price: "a partir de R$ 30" },
];

export const ambient = [
  photos.salon,
  photos.bar,
  photos.hand,
  photos.beers,
  photos.moto,
  photos.facade,
  {
    src: "/gallery/ambiente-01.jpg",
    alt: "Cuidado com a barba e vapor facial na Baruque",
    width: 1802,
    height: 1206,
  },
  {
    src: "/gallery/ambiente-02.jpg",
    alt: "Uma visita especial na recepção da Baruque",
    width: 1328,
    height: 1784,
  },
  {
    src: "/gallery/ambiente-03.jpg",
    alt: "Cappuccino com a marca da Baruque",
    width: 1330,
    height: 1784,
  },
  {
    src: "/gallery/ambiente-04.jpg",
    alt: "Bolo e decoração de Páscoa no café da casa",
    width: 1330,
    height: 1776,
  },
  {
    src: "/gallery/ambiente-05.jpg",
    alt: "Cafés especiais servidos no balcão",
    width: 1332,
    height: 1774,
  },
  {
    src: "/gallery/ambiente-06.jpg",
    alt: "Moto vermelha e detalhes da decoração",
    width: 1580,
    height: 1568,
  },
  {
    src: "/gallery/ambiente-07.jpg",
    alt: "Recepção com sofá e poltrona clássicos",
    width: 1800,
    height: 1210,
  },
  {
    src: "/gallery/ambiente-08.jpg",
    alt: "Sala de cuidados com maca e iluminação suave",
    width: 1408,
    height: 1746,
  },
  {
    src: "/gallery/ambiente-09.jpg",
    alt: "Lounge com sofá de couro, moto e mesa de sinuca",
    width: 1810,
    height: 1200,
  },
];

export const reviews = [
  {
    name: "Julio César Duarte Da Costa",
    when: "7 meses atrás",
    text: "Atendimento impecável do início ao fim. Edgar profissional extremamente qualificado, atento aos detalhes e com um domínio técnico que fica evidente em cada corte e acabamento. Além da excelência no serviço, passa confiança, sabe ouvir o cliente e entrega exatamente ou até melhor do que foi pedido. Ambiente agradável, higiene impecável e um padrão de qualidade que está acima da média. Recomendo de olhos fechados!",
  },
  {
    name: "Marcos Eduardo",
    when: "2 anos atrás",
    text: "Sensacional. Barbearia de primeira linha, a equipe é massa demais, ambiente super agradável, e o Edgar é um cara diferenciado. Espaço ideal para quem procura bem estar e cuidados estéticos; para os noivos, é o espaço perfeito para ensaios fotográficos, com pacotes diferenciados e total assistência dessa equipe de primeira.",
  },
  {
    name: "Guilherme Silveira",
    when: "2 anos atrás",
    text: "Local bem estiloso, organizado e limpo, profissionais bem preparados e com uma variedade ótima de procedimentos, do corte de cabelo masculino ou feminino a uma massagem relaxante e procedimentos estéticos. Valor muito bom para tudo que oferece.",
  },
  {
    name: "Bruno Mendes",
    when: "2 anos atrás",
    text: "Estrutura e ambiente nota 10. Atendimento de primeira qualidade. Capacidade técnica dos profissionais nota 1000. Cliente exigente e detalhista, aprovo e recomendo.",
  },
  {
    name: "Hebert Freitas",
    when: "Cliente Baruque",
    text: "Excelente atendimento, fiquei satisfeito com todos os cortes que já fiz. Local super aconchegante. E pra ficar ainda mais perfeito, aquela variedade de café, aí não tem como.",
  },
];

export const appPerks = [
  "Escolha o profissional e o horário",
  "Receba lembretes do seu agendamento",
  "Acompanhe seu histórico e as promoções",
];

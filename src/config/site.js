/*
 * SITE: everything that changes from one landing page to the next lives here.
 * Components only read from this file (and theme.css), so screens, actions and
 * animations stay identical across projects.
 * Images go in /public: logo, /gallery/*, /app-screens/*.
 */

export const brand = {
  name: 'Baruque',
  kind: 'Barbearia',                 // small word under the logo
  fullName: 'Barbearia Baruque',
  logo: '/baruque-logo-official.png',
  tagline: 'Vem pra Baruque',        // big line at the top of the footer
}

// Used by vite.config.js to fill index.html (title, meta, fonts, preload).
export const seo = {
  title: 'Barbearia Baruque | Barbearia em Contagem, MG',
  description: 'Barbearia Baruque: corte, barba e um ambiente para desacelerar em Contagem, MG. Agende pelo app para Android e iPhone.',
  ogTitle: 'Barbearia Baruque | Contagem, MG',
  ogDescription: 'Corte preciso, barba bem feita e aquele ambiente que faz você voltar. Agende pelo app.',
  ogImage: '/gallery/baruque-03.jpeg',
  themeColor: '#111519',             // keep equal to --dark in theme.css
  fontsUrl: 'https://fonts.googleapis.com/css2?family=Bodoni+Moda:ital,opsz,wght@0,6..96,400..600;1,6..96,400..500&family=Hanken+Grotesk:wght@400;500;600;700&display=swap',
}

// Every piece of copy shown on the page, grouped by section.
export const copy = {
  cta: 'Agendar horário',
  ctaShort: 'Agendar agora',
  hero: {
    line1: 'Seu estilo.',
    line2: 'Sua assinatura.',
    text: 'Corte preciso, barba bem feita e aquele ambiente que faz você voltar. A Baruque cuida de cada detalhe para você sair na sua melhor versão.',
    link: 'Conheça a Baruque',
    slidesLabel: 'Fotos do ambiente',
  },
  intro: {
    first: 'Mais que um corte.',
    second: 'Um momento seu.',
    text: 'Na Baruque, cada detalhe importa. Um espaço acolhedor em Contagem para cuidar do visual, desacelerar e sair sentindo que o corte ficou do jeito certo.',
    stepsLabel: 'Como funciona',
  },
  features: { first: 'O que nos torna', second: 'diferentes', action: 'Ver todos os serviços' },
  team: { label: 'Nossa equipe', title: 'Quem cuida de você', photoAlt: 'Barbeiro trabalhando' },
  pricing: { title: 'Valores' },
  ambient: { first: 'Nosso', second: 'ambiente' },
  reviews: { label: 'Depoimentos', title: 'O que dizem sobre nós', source: 'no Google' },
  app: {
    first: 'Agende pelo',
    second: 'app Baruque',
    text: 'Seu próximo horário a poucos toques. O app é gratuito para Android e iPhone.',
    screens: ['/app-screens/baruque-scheduling.png', '/app-screens/baruque-login.png'], // rear, front
    modalTitle: 'Baixe o app Baruque',
    modalText: 'Agende seu horário com o profissional que preferir e receba lembretes direto no celular.',
    footerText: 'Baixe o app e agende pelo celular',
  },
  visit: { first: 'Venha nos', second: 'visitar', mapsAction: 'Abrir no Google Maps' },
}

export const contact = {
  phoneLabel: '(31) 97336-6715',
  phoneHref: 'tel:+5531973366715',
  whatsapp: 'https://wa.me/5531973366715?text=Ol%C3%A1!%20Vi%20o%20site%20da%20Barbearia%20Baruque%20e%20gostaria%20de%20agendar%20um%20hor%C3%A1rio.',
  instagram: 'https://www.instagram.com/barbeariabaruque_/',
  address: ['Av. Juscelino Kubitschek, nº 1185', 'Industrial, Contagem — MG', '32223-400'],
  mapsEmbed: 'https://www.google.com/maps?q=Av.+Juscelino+Kubitschek,+1185,+Contagem,+MG&output=embed',
  mapsLink: 'https://www.google.com/maps/search/?api=1&query=Barbearia+Baruque+Av.+Juscelino+Kubitschek+1185+Contagem',
}

export const apps = {
  ios: 'https://apps.apple.com/br/app/barbearia-baruque/id6502325832',
  android: 'https://play.google.com/store/apps/details?id=baruque.app',
}

export const hours = [
  ['Segunda', 'Fechado'],
  ['Terça a sexta', '09h às 19h30'],
  ['Sábado', '08h às 19h'],
  ['Domingo', 'Fechado'],
]

export const nav = [
  ['inicio', 'Início'],
  ['experiencia', 'Experiência'],
  ['equipe', 'Equipe'],
  ['servicos', 'Valores'],
  ['ambiente', 'Ambiente'],
  ['contato', 'Contato'],
]

// width/height are the real pixel sizes, used for the lightbox aspect ratio.
const photo = (n, alt, width, height) => ({ src: `/gallery/baruque-${n}.jpeg`, alt, width, height })

export const photos = {
  salon: photo('03', 'Salão da Baruque com as cadeiras de corte', 1282, 1600),
  lounge: photo('01', 'Sala de espera com sofá de couro e moto', 1600, 1072),
  cut: photo('02', 'Barbeiro finalizando um corte', 1277, 1600),
  hand: photo('04', 'Vem pra Baruque', 1273, 1600),
  bar: photo('05', 'Bar da barbearia com whiskies', 1600, 1067),
  relax: photo('06', 'Detalhes da casa', 1277, 1600),
  beers: photo('07', 'Cervejas artesanais no balcão', 1279, 1600),
  facade: photo('08', 'Fachada da Barbearia Baruque', 1349, 1600),
  moto: photo('10', 'Moto em exposição na sala de espera', 1600, 1596),
}

export const heroSlides = [photos.salon, photos.lounge, photos.facade]

export const stats = [
  { value: 10, suffix: '+', label: 'Anos cuidando do seu estilo' },
  { value: 4.9, decimals: 1, label: 'Nota no Google' },
  { value: 118, label: 'Avaliações no Google' },
]

export const process = [
  ['Agendamento', 'Reserve pelo app em segundos. Escolha seu barbeiro, horário e serviço preferido.'],
  ['Consultoria', 'Uma conversa inicial para entender seu estilo, formato do rosto e rotina de cuidados.'],
  ['Execução', 'Corte com técnicas modernas e clássicas, usando produtos premium selecionados.'],
  ['Finalização', 'Styling perfeito, dicas personalizadas e um café para fechar a experiência.'],
]

export const features = [
  { photo: photos.cut, tag: 'Looks', title: 'Cuidado e estilo', text: 'Um ambiente pensado para você cuidar do visual com personalidade.', size: 'large' },
  { photo: photos.relax, tag: 'Relax', title: 'Conforto em cada detalhe', text: 'Um espaço acolhedor para desacelerar e aproveitar o momento.' },
  { photo: photos.bar, tag: 'Experiência', title: 'Baruque Bar', text: 'Boa conversa, café e drinks enquanto você espera.' },
  { photo: photos.lounge, tag: 'Ambiente', title: 'Estilo Baruque', text: 'Sofá de couro, sinuca e detalhes que tornam cada visita especial.', size: 'wide' },
]

// Placeholder photos of barbers at work; swap for real portraits of the team.
export const team = [
  { photo: 'https://images.unsplash.com/photo-1567894340315-735d7c361db0?auto=format&fit=crop&w=700&q=85', name: 'Túlio', role: 'Cortes modernos', text: 'Apaixonado por degradês e linhas precisas.' },
  { photo: 'https://images.unsplash.com/photo-1534297635766-a262cdcb8ee4?auto=format&fit=crop&w=700&q=85', name: 'Lucas', role: 'Cortes clássicos', text: 'A técnica tradicional com o toque moderno.' },
  { photo: 'https://images.unsplash.com/photo-1517832606299-7ae9b720a186?auto=format&fit=crop&w=700&q=85', name: 'Tariki', role: 'Especialista em barba', text: 'Mestre na navalha e no ritual da barba.' },
]

export const prices = [
  { name: 'Corte', time: '30 min', price: 'R$ 65' },
  { name: 'Barba', time: '30 min', price: 'R$ 50' },
  { name: 'Corte + Barba', time: '50 min', price: 'R$ 115', featured: true },
  { name: 'Acabamento', time: '15 min', price: 'R$ 20' },
  { name: 'Sobrancelha navalha', time: '15 min', price: 'R$ 20' },
  { name: 'Pigmentação de barba', time: '15 min', price: 'a partir de R$ 30' },
]

export const ambient = [photos.salon, photos.bar, photos.hand, photos.beers, photos.moto, photos.facade]

export const reviews = [
  { name: 'Julio César Duarte Da Costa', when: '7 meses atrás', text: 'Atendimento impecável do início ao fim. Edgar profissional extremamente qualificado, atento aos detalhes e com um domínio técnico que fica evidente em cada corte e acabamento. Além da excelência no serviço, passa confiança, sabe ouvir o cliente e entrega exatamente ou até melhor do que foi pedido. Ambiente agradável, higiene impecável e um padrão de qualidade que está acima da média. Recomendo de olhos fechados!' },
  { name: 'Marcos Eduardo', when: '2 anos atrás', text: 'Sensacional. Barbearia de primeira linha, a equipe é massa demais, ambiente super agradável, e o Edgar é um cara diferenciado. Espaço ideal para quem procura bem estar e cuidados estéticos; para os noivos, é o espaço perfeito para ensaios fotográficos, com pacotes diferenciados e total assistência dessa equipe de primeira.' },
  { name: 'Guilherme Silveira', when: '2 anos atrás', text: 'Local bem estiloso, organizado e limpo, profissionais bem preparados e com uma variedade ótima de procedimentos, do corte de cabelo masculino ou feminino a uma massagem relaxante e procedimentos estéticos. Valor muito bom para tudo que oferece.' },
  { name: 'Bruno Mendes', when: '2 anos atrás', text: 'Estrutura e ambiente nota 10. Atendimento de primeira qualidade. Capacidade técnica dos profissionais nota 1000. Cliente exigente e detalhista, aprovo e recomendo.' },
  { name: 'Hebert Freitas', when: 'Cliente Baruque', text: 'Excelente atendimento, fiquei satisfeito com todos os cortes que já fiz. Local super aconchegante. E pra ficar ainda mais perfeito, aquela variedade de café, aí não tem como.' },
]

export const appPerks = [
  'Escolha o profissional e o horário',
  'Receba lembretes do seu agendamento',
  'Acompanhe seu histórico e as promoções',
]

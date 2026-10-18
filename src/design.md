# Barbearia Baruque — design tokens

Layout segue a estrutura de barbeariaparadise.com.br (hero em tela cheia, números + como funciona,
bento de diferenciais, equipe, valores, mosaico do ambiente, depoimentos, visita + mapa, footer).
Cores tiradas da própria casa: paredes grafite com boiserie, couro conhaque, luz de whisky.

## Cores (src/config/theme.css)

- `--dark` `#111519` — header, hero, seção do app, footer
- `--dark-2` `#1b2127` — fundo de fotos e superfícies escuras
- `--neutral` `#56626b` — ícones e detalhes (cor das paredes)
- `--surface` `#eceeed` — seções alternadas (com moldura de boiserie sutil)
- `--base` `#f9f9f7` — fundo principal claro
- `--text` `#171b1f` / `--muted` `#5d666d` — texto sobre fundo claro
- `--accent` `#97502b` — filetes, rótulos, preço em destaque (couro)
- `--accent-light` `#d6a060` — acentos sobre fundo escuro, progresso, sublinhado do hero
- `--on-dark` `#f1eee9` / `--on-dark-muted` — texto sobre fundo escuro

## Tipografia

- `Bodoni Moda` — títulos (segunda linha em itálico), preços, nomes
- `Hanken Grotesk` — corpo, navegação, botões

## Carrossel de diferenciais

- No mobile, cards dimensionados pela altura útil da viewport, com espaçamento compacto para manter título, imagens, indicadores e CTA juntos. Sem descrição externa abaixo das fotos.
- Oito cards em leque, seguindo as posições, rotações e escalas da referência flick-cards-stack, adaptados ao React e às fontes e cores da Baruque.
- Primeira troca automática após 1,2 segundo visível; seguintes a cada quatro segundos. Arraste, teclado, indicadores em traços e controle de pausa sobre a imagem, no mesmo estilo da galeria do ambiente; sem setas ou contador numérico. Foco do teclado, arraste, aba oculta e seção fora da tela suspendem o temporizador; passar o mouse não bloqueia o início automático.
- Movimento reduzido desativa a troca automática e a animação do leque. As fotos abrem a lightbox com transição independente.

## Galeria do ambiente

- Carrossel inspirado no Material Slider: a foto ativa se expande e as vizinhas ficam recortadas, com cantos arredondados.
- Arraste horizontal, setas, indicadores e teclado (← / →, Home / End); a foto ativa abre a lightbox.
- Troca automática a cada quatro segundos, com botão de pausa. Ao chegar à última foto, a sequência percorre as anteriores mantendo a mesma animação. Pausa durante a interação, fora da tela, em aba oculta ou com movimento reduzido.
- Transição automática de 1,4 segundo, com aceleração e desaceleração graduais; legendas e ícones acompanham a expansão da foto em vez de trocar abruptamente. A navegação manual mantém sua resposta mais rápida.
- Geometria responsiva em `src/lib/material-slider.js`; movimento controlado pelos tokens existentes e desativado com movimento reduzido.

## Motion (src/lib/motion-tokens.js)

- Todos os tempos, distâncias e springs vêm de `motionTokens` / `springs`; nada inline.
- Hero: vídeo local sem som, em loop e inline no celular, com controle de pausa; foto alternativa para falha ou movimento reduzido. Pausa fora da tela ou em aba oculta. Entrada coordenada com reveal vertical por clip-path, título linha a linha e stagger dos botões; sem parallax. Movimento reduzido exibe o conteúdo imediatamente.
- Desktop: grid editorial assimétrico alinhado ao header, título Bodoni Moda ampliado e vídeo vertical 9:16 com cantos discretos e sombra suave. Fundo preto/grafite com iluminação ambiente sutil, sem foto desfocada. Vídeo com cores originais, sem filtro; dourado discreto no filete e nas interações. No celular (até 640px), a HERO exibe o vídeo sem texto, CTA ou sombra sobrepostos, com controle de pausa por ícone e nome acessível.
- No celular, o indicador discreto “Role para conhecer” sinaliza a continuação da página e leva à seção de experiência ao tocar. A seta faz três movimentos suaves e respeita movimento reduzido.
- Seções: `whileInView` com `viewport={{ once: true }}`; stagger entre 0.06 e 0.10.
- Fotos: hover com zoom + cor + moldura interna; clique abre lightbox com fade e escala independentes do card,
  setas, teclado (← → Esc), arrastar no celular.
- Modais (app, lightbox): focus trap, Esc, scroll lock, `role="dialog"`, `aria-modal`.
- `MotionConfig reducedMotion="user"` respeita `prefers-reduced-motion`.

## Depoimentos

- Depoimentos compartilham a mesma célula de grid, reservando a altura do maior texto conforme a largura e a fonte. Troca por opacidade sem desmontagem, deslocamento horizontal ou mudança de altura da seção; apenas o depoimento ativo fica disponível para leitores de tela. Movimento reduzido torna a troca imediata. Navegação por gesto horizontal, teclado e indicadores em traços no padrão das galerias, sem setas visíveis. Troca automática a cada sete segundos, com pausa/reprodução ao lado dos indicadores; foco do teclado, gesto em andamento, seção fora da tela e aba oculta suspendem o temporizador; movimento reduzido desativa autoplay. Rolagem vertical e zoom por pinça preservados.

## Navegação ao final da página

- WhatsApp disponível no rodapé, sem botão flutuante. Voltar ao topo aparece apenas ao final do rodapé, como link para o início. Galerias e lightbox não exibem contadores numéricos.

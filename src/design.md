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

## Motion (src/lib/motion-tokens.js)

- Todos os tempos, distâncias e springs vêm de `motionTokens` / `springs`; nada inline.
- Hero: slideshow com Ken Burns, título linha a linha, sublinhado desenhado (pathLength), parallax no scroll.
- Seções: `whileInView` com `viewport={{ once: true }}`; stagger entre 0.06 e 0.10.
- Fotos: hover com zoom + cor + moldura interna; clique abre lightbox com `layoutId` (a foto cresce do lugar),
  setas, teclado (← → Esc), arrastar no celular.
- Modais (app, lightbox): focus trap, Esc, scroll lock, `role="dialog"`, `aria-modal`.
- `MotionConfig reducedMotion="user"` respeita `prefers-reduced-motion`.

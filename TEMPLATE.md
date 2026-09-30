# Criando uma nova landing page a partir deste template

Telas, ações, animações e transições ficam em `src/components`, `src/App.css` e
`src/lib/motion-tokens.js` e **não devem ser alteradas** por projeto. Cada nova
landing muda apenas três coisas:

| O quê | Onde |
| --- | --- |
| Cores, fontes, raio das bordas | `src/config/theme.css` |
| Marca, SEO, textos, serviços, preços, equipe, depoimentos, contato, horários, links | `src/config/site.js` |
| Logo, fotos da galeria, telas do app | `public/` (caminhos referenciados em `site.js`) |

## Passo a passo

1. Crie o projeto novo a partir do template:
   - GitHub: *Settings → Template repository*, depois **Use this template**; ou
   - `npx degit <usuario>/<repo-template> nome-do-cliente`
2. `npm install`
3. Edite `src/config/theme.css`:
   - troque as cores; quando a cor tiver uma variante `*-rgb`, atualize as duas (ex.: `#97502b` → `151 80 43`);
   - troque `--font-display` / `--font-body` e o `seo.fontsUrl` em `site.js` (Google Fonts).
4. Edite `src/config/site.js`: `brand`, `seo` (use `themeColor` igual a `--dark`), `copy`, `contact`, `hours`, `prices` etc.
5. Substitua as imagens em `public/` e ajuste `photos` em `site.js` (largura/altura reais de cada foto).
6. `npm run dev` para conferir e `npm run build` para publicar.

## Dicas

- `--accent` é usado sobre fundos claros e `--accent-light` sobre fundos escuros. Mantenha contraste suficiente nos dois casos.
- Para remover uma seção (ex.: app), apague o componente em `src/App.jsx` e o item correspondente em `nav`.
- Melhorias de efeito ou layout devem ser feitas **no template** e depois copiadas para os projetos que precisarem delas.

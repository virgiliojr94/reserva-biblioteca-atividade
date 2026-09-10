# Atividade Prática — Reserva da Biblioteca

**Módulo 04 — Desenvolvimento Front-end com React**
Capacitação em Desenvolvimento Full Stack · ITEAM · Boa Vista/RR
Professor: Esp. Virgílio do Rego Monteiro Borges Junior

---

## O que é esta atividade

Você vai construir uma pequena aplicação de **reserva de livros de biblioteca**, usando **apenas** o que foi visto nas Aulas 1 a 5.

O repositório já vem com o projeto criado e funcionando — mas escrito do jeito mais tosco possível: tudo repetido, tudo na mão, nada organizado. **É exatamente o ponto em que a gente estava no fim da Aula 1.**

Sua tarefa é fazer com este projeto o mesmo caminho que a gente fez com o My Daily Habits nas Aulas 2, 3, 4 e 5.

> **Por que outro projeto?** Porque copiar o My Daily Habits não prova nada. Fazer o mesmo raciocínio num domínio diferente prova que você entendeu.

---

## O que você NÃO precisa usar

Nada de `useEffect`, `localStorage`, Context, rotas ou requisições HTTP. Isso é matéria das próximas aulas.

Se você usar, não ganha ponto extra. O objetivo é mostrar domínio do que já foi dado.

---

## Como começar

### Passo 1 — crie o seu repositório

1. Abra o repositório da atividade no GitHub.
2. Clique no botão verde **"Use this template"** e depois em **"Create a new repository"**.
3. Dê o nome `reserva-biblioteca-SEUNOME` (exemplo: `reserva-biblioteca-maria-silva`).
4. Deixe como **Public**.
5. Clique em **Create repository**.

Agora esse repositório é **seu**, na sua conta.

### Passo 2 — traga para a sua máquina

```bash
git clone https://github.com/SEU-USUARIO/reserva-biblioteca-SEUNOME.git
cd reserva-biblioteca-SEUNOME
npm install
npm run dev
```

Abra o endereço que aparecer no terminal. Você deve ver três livros na tela.

### Passo 3 — confirme que consegue enviar

```bash
git add .
git commit -m "chore: primeiro commit"
git push
```

> Se o `git push` reclamar de *upstream*, use `git push -u origin main` desta primeira vez.

**Faça isso no começo, não no fim.** Se algo estiver errado com o seu Git, é melhor descobrir agora.

---

## O que tem no repositório

```
reserva-biblioteca/
├── src/
│   ├── App.jsx          ← você vai mexer bastante aqui
│   ├── App.css          ← JÁ ESTÁ PRONTO, não precisa mexer
│   ├── main.jsx         ← não precisa mexer
│   ├── index.css        ← não precisa mexer
│   ├── components/      ← pasta vazia, é aqui que você cria os componentes
│   └── data/
│       └── books.js     ← 6 livros prontos, você vai usar na Etapa 2
├── GUIA.md              ← consulte quando travar
├── ENTREGA.md           ← checklist antes de entregar
└── README.md            ← este arquivo
```

> **O CSS já está pronto.** Todas as classes que você vai precisar (`book-card`, `badge`, `book-form`, `panel`…) já existem. Não perca tempo com aparência — o foco é React.

---

## As etapas

As etapas seguem a ordem das aulas. **Faça na ordem** e **faça um commit ao fim de cada uma.**

---

### ETAPA 1 — Ambiente e primeiro commit
*(referência: Aula 1)*

- [ ] Repositório criado a partir do template
- [ ] `npm install` e `npm run dev` funcionando
- [ ] Primeiro commit enviado ao GitHub

```bash
git commit -m "chore: primeiro commit"
```

---

### ETAPA 2 — Componentes, listas e chaves
*(referência: Aula 2)*

Hoje o `App.jsx` tem três livros escritos à mão, um embaixo do outro. Isso não escala.

**O que fazer:**

- [ ] Crie `src/components/BookCard.jsx` com o cartão de **um** livro
- [ ] Importe `books` de `src/data/books.js` no `App.jsx`
- [ ] Crie `src/components/BookList.jsx`, que percorre a lista com `.map()` e devolve um `BookCard` para cada livro
- [ ] Use `key={book.id}` — a chave vem do dado, nunca do índice
- [ ] Se a lista estiver vazia, mostre a mensagem `Nenhum livro no acervo.`
- [ ] Cada cartão mostra uma etiqueta: **Disponível** ou **Reservado**, conforme o livro

**Como fica a etiqueta:**

```jsx
<span className={`badge ${available ? "badge-ok" : "badge-off"}`}>
  {available ? "Disponível" : "Reservado"}
</span>
```

**Resultado esperado:** os **seis** livros do arquivo aparecem na tela, cada um com sua etiqueta, e o console não mostra nenhum aviso sobre `key`.

```bash
git commit -m "feat: extrai componentes e renderiza a lista"
```

---

### ETAPA 3 — Props, callback e children
*(referência: Aula 3)*

**O que fazer:**

- [ ] `BookCard` recebe as props com **desestruturação** na assinatura
- [ ] `BookCard` tem um botão. Ao clicar, ele chama uma função recebida por prop, passando o `id` do livro
- [ ] `BookList` **não decide nada** — apenas encaminha a função que recebeu
- [ ] A função de verdade mora no `App`
- [ ] Crie `src/components/Panel.jsx`, que recebe `title` e `children`, e use-o para envolver a lista

**Por enquanto**, a função no `App` pode só mostrar um alerta:

```jsx
function handleReserve(bookId) {
  window.alert(`Livro ${bookId} — ação ainda não implementada`);
}
```

> Isso é temporário. Na Etapa 4 ela vira a ação de verdade.

**Resultado esperado:** clicar no botão de qualquer livro abre um alerta com o `id` **daquele** livro. A lista aparece dentro de um painel com título.

```bash
git commit -m "feat: adiciona props, callback e composição com children"
```

---

### ETAPA 4 — Estado com `useState`
*(referência: Aula 4)*

Agora o clique vai **mudar a tela**.

**O que fazer:**

- [ ] No `App`, guarde a lista de livros em estado com `useState`
- [ ] Troque o alerta por uma função que alterna o campo `available` do livro clicado
- [ ] A atualização precisa ser **imutável** — nada de `livro.available = true` nem `push`
- [ ] O texto do botão muda conforme a situação: **Reservar** quando disponível, **Devolver** quando reservado
- [ ] No topo da página, mostre um contador: `X de Y livros disponíveis`
- [ ] O contador precisa ser **calculado**, não guardado em outro estado

**Resultado esperado:** clicar em Reservar muda a etiqueta para Reservado, muda o texto do botão para Devolver, e o contador do topo acompanha. Clicar de novo desfaz.

```bash
git commit -m "feat: adiciona estado e alterna reserva"
```

---

### ETAPA 5 — Formulário controlado
*(referência: Aula 5)*

Falta o bibliotecário poder cadastrar um livro novo.

**O que fazer:**

- [ ] Crie `src/components/BookForm.jsx`
- [ ] Dois campos controlados: **Título** e **Autor**
- [ ] Um único `handleChange` cuida dos dois campos (use `name` e chave calculada)
- [ ] No envio: `event.preventDefault()` para a página não recarregar
- [ ] Se algum campo estiver vazio, mostre a mensagem `Preencha o título e o autor.` e **não** cadastre
- [ ] Se estiver tudo certo, o livro entra na lista com `id` gerado por `crypto.randomUUID()` e `available: true`
- [ ] Depois de cadastrar, os campos limpam e a mensagem de erro some
- [ ] Coloque o formulário dentro de um `Panel` com o título `Novo livro`, acima da lista

**Resultado esperado:** você cadastra um livro, ele aparece na hora no fim da lista, já com a etiqueta Disponível, e pode ser reservado como os outros. Enviar vazio mostra a mensagem sem recarregar a página.

```bash
git commit -m "feat: adiciona formulario de cadastro de livros"
```

---

## Desafios opcionais

Só depois de terminar as cinco etapas. **Não valem nota** — servem para quem quer ir além.

- **Filtro:** um botão ou caixa de seleção que mostra apenas os livros disponíveis. Dica: mais um `useState` e uma lista derivada.
- **Contagem no formulário:** mostrar quantos caracteres foram digitados no título.
- **Ano de publicação:** os livros do arquivo já têm o campo `year`. Mostre no cartão e permita informar no formulário.

---

## Como entregar

1. Confira o `ENTREGA.md` do repositório, item por item.
2. Garanta que os cinco commits estão no GitHub.
3. Envie o **link do seu repositório** da forma combinada em sala.

**Prazo:** definido pelo professor em sala.

---

## Como isto será avaliado

| Critério | Pontos |
|---|---:|
| Repositório criado, projeto roda, commits presentes | 1,0 |
| Componentes separados em arquivos próprios | 1,5 |
| Lista com `.map()` e `key` vinda do `id` | 1,5 |
| Renderização condicional (etiqueta e lista vazia) | 1,0 |
| Props com desestruturação e callback do filho para o pai | 1,5 |
| `Panel` usando `children` | 0,5 |
| `useState` e atualização sem mutação | 1,5 |
| Valor derivado (contador) calculado, não guardado | 0,5 |
| Formulário controlado com validação e cadastro funcionando | 1,0 |
| **Total** | **10,0** |

> **Entrega parcial conta.** Se você fechou até a Etapa 3, entregue assim mesmo. É melhor do que não entregar — e o professor consegue ver exatamente onde você parou.

---

## Se você travar

1. Abra o `GUIA.md` deste repositório.
2. Consulte a apostila — os capítulos 2, 3, 4 e 5 têm o mesmo raciocínio no My Daily Habits.
3. Leia a mensagem de erro no console do navegador (F12). Ela quase sempre diz o nome do arquivo e a linha.
4. Pergunte. Travar faz parte; ficar travado calado, não.

**Não copie o My Daily Habits inteiro e troque as palavras.** Além de dar errado, é fácil de perceber — e você perde a única chance de descobrir o que ainda não entendeu.

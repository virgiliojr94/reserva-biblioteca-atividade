# Atividade Prática — Parte 2: Persistência, Contexto e Rotas

**Módulo 04 — Desenvolvimento Front-end com React**
Capacitação em Desenvolvimento Full Stack · ITEAM · Boa Vista/RR
Professor: Esp. Virgílio do Rego Monteiro Borges Junior

---

## Antes de começar

Esta é a **continuação** da atividade Reserva da Biblioteca. Você vai trabalhar **no mesmo repositório** que já criou — não crie outro.

```bash
cd reserva-biblioteca-SEUNOME
npm run dev
```

**Pré-requisito:** as Etapas 1 a 5 precisam estar funcionando. Se você parou antes, termine-as primeiro. Esta parte constrói em cima daquilo.

> **Perdeu o repositório?** Crie de novo a partir do template e refaça as Etapas 1 a 5. Elas são rápidas na segunda vez — e se não forem, é sinal de que vale mesmo refazer.

---

## O que você vai construir

Hoje o acervo tem uma tela só, e tudo some quando você recarrega a página.

Ao final desta parte, a aplicação vai ter:

- os livros **sobrevivendo ao F5**;
- o estado morando em **um lugar só**, acessível de qualquer página;
- **quatro endereços** diferentes, com menu e botão voltar funcionando.

O foco é a **Etapa 8**. As Etapas 6 e 7 são a fundação — e são o mesmo padrão que você já viu no My Daily Habits, então devem sair rápido.

---

## O que você NÃO precisa usar

Nada de parâmetros de rota (`/livros/:id`), rotas aninhadas, `Outlet`, rotas protegidas, `fetch`, Axios ou TypeScript.

Isso é matéria das próximas aulas. Usar não dá ponto extra.

---

### ETAPA 6 — Os livros param de sumir
*(referência: Aula 6 — `useEffect` e `localStorage`)*

Hoje, se você cadastrar um livro e apertar F5, ele some. Vamos resolver.

**O que fazer, em `src/App.jsx`:**

- [ ] Fora do componente, crie uma constante com a chave do armazenamento:
      `const STORAGE_KEY = "reserva-biblioteca:books";`
- [ ] Fora do componente, crie a função `loadBooks()`, que:
      lê a chave do `localStorage`; se não houver nada, devolve o array `books` importado;
      se houver, converte com `JSON.parse` e confirma que é um array;
      e devolve `books` caso qualquer coisa dê errado (use `try` / `catch`)
- [ ] Troque o `useState(books)` por `useState(loadBooks)` — **sem parênteses** no fim
- [ ] Crie um `useEffect` que salva a lista no `localStorage` sempre que ela mudar

> **Por que sem parênteses:** com `loadBooks()`, a função roda em toda renderização e o resultado só serve na primeira. Sem parênteses, você entrega a função e o React executa uma vez só.

**Resultado esperado:** você reserva um livro, cadastra outro, aperta **F5**, e tudo continua exatamente como estava. Abra `F12 → Application → Local Storage` e encontre a chave `reserva-biblioteca:books`.

```bash
git commit -m "feat: persiste o acervo no navegador"
```

---

### ETAPA 7 — Um lugar só para o estado
*(referência: Aula 7 — `useContext`)*

Hoje o `App` é dono dos livros e passa tudo por props. Na próxima etapa vão existir páginas, e passar props através das rotas fica ruim. Vamos resolver antes.

**O que fazer:**

- [ ] Crie `src/context/BooksContext.jsx`
- [ ] Nesse arquivo, exporte `BooksContext` criado com `createContext(null)`
- [ ] Exporte também o componente `BooksProvider`, que recebe `children` e concentra:
      o `useState` com `loadBooks`, o `useEffect` que salva, a função que alterna a reserva,
      a função que adiciona um livro, e o contador de disponíveis
- [ ] Monte o objeto que vai no `value` com: `books`, `availableCount`, `toggleBook`, `addBook`
- [ ] Em `src/main.jsx`, envolva o `<App />` com `<BooksProvider>`
- [ ] Faça `BookList` ler `books` e `toggleBook` do contexto, em vez de receber por props
- [ ] Faça `BookForm` ler `addBook` do contexto
- [ ] Remova do `App` o `useState`, o `useEffect`, as funções e o `loadBooks` — tudo isso mudou de endereço

> **Dica de ordem:** troque primeiro o `BookList`, depois o `BookForm`, e **só no fim** o `App`. Fazendo nessa ordem, a aplicação continua funcionando a cada passo.
>
> Durante essa troca, o contador do topo pode ficar errado por alguns minutos. Isso é esperado: por um momento existem duas cópias do estado. Some quando você terminar o `App`.

**Resultado esperado:** tudo funciona exatamente como antes. O `App` ficou bem menor. Nenhuma prop de livros ou funções é passada para `BookList` e `BookForm`.

```bash
git commit -m "refactor: compartilha o acervo com contexto"
```

---

### ETAPA 8 — Quatro endereços — **o foco desta atividade**
*(referência: Aula 8 — React Router)*

Agora a aplicação ganha páginas de verdade.

#### 8.1 Instale e ligue o roteador

- [ ] Pare o servidor e rode `npm install react-router`
- [ ] Confirme que a dependência apareceu no `package.json`
- [ ] Em `src/main.jsx`, envolva tudo com `<BrowserRouter>`, **por fora** do `BooksProvider`

A ordem dos embrulhos fica assim:

```text
BrowserRouter
  BooksProvider
    App
```

#### 8.2 Crie as páginas

Crie a pasta `src/pages/` com quatro arquivos:

- [ ] **`AcervoPage.jsx`** — o cabeçalho com o contador `X de Y livros disponíveis` e o `Panel` com a `BookList`
- [ ] **`NovoLivroPage.jsx`** — um título e o `Panel` com o `BookForm`
- [ ] **`SobrePage.jsx`** — um texto curto explicando o projeto (escreva o que quiser)
- [ ] **`NotFoundPage.jsx`** — a mensagem de página não encontrada e um `Link` para voltar ao início

> Página é só um componente comum. A diferença é que ela representa uma tela inteira.
>
> Os imports mudam de `./` para `../` porque você saiu da pasta.

#### 8.3 Transforme o `App` em casca

- [ ] O `App` passa a ter um cabeçalho fixo com o nome do projeto e um menu
- [ ] O menu usa `NavLink` para: **Acervo** (`/`), **Novo livro** (`/novo`) e **Sobre** (`/sobre`)
- [ ] O `NavLink` da raiz precisa da prop `end`
- [ ] Dentro de um `<main>`, coloque o `<Routes>` com as quatro rotas:

```text
/        →  AcervoPage
/novo    →  NovoLivroPage
/sobre   →  SobrePage
*        →  NotFoundPage
```

> **Regra de ouro:** o que é fixo fica **fora** do `<Routes>`. O que troca fica **dentro**.

#### 8.4 Estilo do menu

O `App.css` do template não tem as classes do cabeçalho. **Cole isto no fim do arquivo:**

```css
.app-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  padding: 16px 4%;
  border-bottom: 1px solid #d7dde5;
  background: #ffffff;
}

.app-header nav {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}

.app-header a {
  padding: 8px 10px;
  border-radius: 8px;
  color: #334155;
  text-decoration: none;
}

.app-header a.active {
  background: #1f2937;
  color: #ffffff;
}
```

Use `className="app-header"` no cabeçalho do `App`.

#### 8.5 Teste — faça os cinco

- [ ] clicar em cada item do menu troca o conteúdo **e** a URL muda na barra do navegador
- [ ] o link da página atual fica destacado (e **só** ele)
- [ ] digitar `/pagina-que-nao-existe` mostra a página 404
- [ ] o botão **voltar** do navegador funciona
- [ ] cadastrar um livro em `/novo` e ir para `/` mostra o livro na lista

```bash
git commit -m "feat: adiciona rotas e paginas"
```

---

## Desafio opcional

Só depois das três etapas. **Não vale nota.**

- **Voltar sozinho após cadastrar:** faça a aplicação ir para `/` automaticamente depois de cadastrar um livro. Procure por `useNavigate` na documentação do React Router.
- **Página de disponíveis:** uma rota `/disponiveis` que mostra só os livros disponíveis, usando o mesmo contexto.

---

## Como entregar

1. Confira a lista abaixo, item por item.
2. Garanta que os **três commits** novos estão no GitHub.
3. **Atualize o seu comentário** na issue de entregas, informando que concluiu a Parte 2.

---

## Checklist final

### Etapa 6 — persistência

- [ ] existe `STORAGE_KEY` e a função `loadBooks`
- [ ] `useState(loadBooks)` — sem parênteses
- [ ] `useEffect` salva quando a lista muda
- [ ] F5 preserva reservas e livros cadastrados
- [ ] a chave aparece no Local Storage

### Etapa 7 — contexto

- [ ] existe `src/context/BooksContext.jsx`
- [ ] o `BooksProvider` envolve o `App` no `main.jsx`
- [ ] `BookList` e `BookForm` leem do contexto
- [ ] o `App` não tem mais `useState` dos livros
- [ ] tudo funciona igual a antes da refatoração

### Etapa 8 — rotas

- [ ] `react-router` no `package.json`
- [ ] `BrowserRouter` por fora do `BooksProvider`
- [ ] quatro arquivos em `src/pages/`
- [ ] cabeçalho e menu **fora** do `<Routes>`
- [ ] as quatro rotas funcionam, inclusive a coringa
- [ ] o `NavLink` da raiz usa `end`
- [ ] nenhuma navegação interna usa `<a href>`
- [ ] cadastrar em `/novo` aparece em `/`

---

## Como isto será avaliado

| Critério | Pontos |
|---|---:|
| `loadBooks` com tratamento de erro e `useState` com inicialização preguiçosa | 1,0 |
| `useEffect` salvando e persistência funcionando no F5 | 1,0 |
| `BooksContext` criado com `createContext` e `BooksProvider` | 1,5 |
| `BookList` e `BookForm` consumindo o contexto; `App` sem estado próprio | 1,5 |
| `BrowserRouter` instalado e posicionado corretamente | 1,0 |
| Quatro páginas criadas em `src/pages/` | 1,0 |
| `Routes` e `Route` configurados, incluindo a rota coringa | 1,5 |
| `NavLink` com `end` e link ativo destacado | 0,5 |
| Navegação sem recarregamento e estado preservado entre páginas | 1,0 |
| **Total** | **10,0** |

> **Entrega parcial conta.** Fechou até a Etapa 7? Entregue. O professor vê exatamente onde você parou.

---

## Se você travar

1. O `GUIA.md` do seu repositório continua valendo.
2. Os capítulos 6, 7 e 8 da apostila fazem o mesmo caminho no My Daily Habits.
3. Leia o erro no console (F12). Os mais comuns desta parte:

| Sintoma | Primeira verificação |
|---|---|
| `useNavigate`/`useLocation` fora do Router | `BrowserRouter` está no `main.jsx`? |
| `No routes matched location` | o `path` bate com a URL? |
| todos os links aparecem ativos | falta `end` no `NavLink` da raiz |
| a página inteira recarrega ao navegar | tem `<a href>` onde deveria ter `Link` |
| `Cannot destructure property ... of null` | o componente está fora do `BooksProvider` |
| import não encontrado | o pacote é `react-router` ou `react-router-dom`? Siga o `package.json` |

4. Pergunte. Travar faz parte; ficar travado calado, não.

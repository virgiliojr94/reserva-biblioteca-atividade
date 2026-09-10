# Guia de apoio

Consulte este arquivo quando travar. Ele não dá a resposta — dá o caminho.

## O modelo das duas zonas

Todo componente React tem duas zonas:

```jsx
export default function MeuComponente({ props }) {

  // ══ ZONA 1 — LÓGICA ══
  // useState, funções, cálculos
  // roda ANTES de a tela ser desenhada

  return (
    // ══ ZONA 2 — TELA ══
    // JSX; JavaScript só dentro de { }
  );
}
```

Quando não souber onde uma linha vai, pergunte: isso **pensa** ou isso **mostra**?

| Isto… | vai na… |
|---|---|
| `const [x, setX] = useState(...)` | Zona 1 |
| `function handleAlgumaCoisa(...)` | Zona 1 |
| `const total = lista.filter(...).length` | Zona 1 |
| `<button>`, `<input>`, `{titulo}` | Zona 2 |
| `{erro && <p>...</p>}` | Zona 2 |

## Vocabulário

**props** — o que o componente recebe pronto de fora. Ele lê, não altera.

**state** — o caderninho do próprio componente, onde ele anota o que precisa lembrar.

**renderizar** — desenhar a tela de novo com os dados atuais.

**campo controlado** — o campo de texto não guarda nada sozinho; quem manda é o estado.

**valor derivado** — algo que dá para calcular a partir do que você já tem. Não vira estado.

## Erros que mais aparecem

| Mensagem ou sintoma | Causa provável |
|---|---|
| `Each child in a list should have a unique "key"` | faltou `key={item.id}` no `.map()` |
| `Cannot read properties of undefined` | o nome da prop não bate entre pai e filho |
| a página recarrega ao enviar o formulário | faltou `event.preventDefault()` |
| o campo não aceita digitação | tem `value`, mas o `onChange` não atualiza o estado |
| um campo apaga o outro ao digitar | faltou o spread (`...`) ao atualizar o objeto |
| a tela não muda ao clicar | alteração direta no objeto em vez de criar um novo |
| `is not a function` | a função não foi passada por prop, ou o nome está diferente |
| alerta dispara sozinho ao abrir a página | a função foi **chamada** em vez de **passada** |

## Passar × executar

```jsx
onClick={minhaFuncao}          // ✅ passa a função
onClick={minhaFuncao()}        // ❌ executa agora

onClick={() => minhaFuncao(id)} // ✅ embrulha e espera o clique
onClick={minhaFuncao(id)}       // ❌ executa na renderização
```

## Atualizar sem mutação

```jsx
// ❌ evite
lista.push(novo);
item.disponivel = true;

// ✅ prefira
setLista((atual) => [...atual, novo]);
setLista((atual) =>
  atual.map((item) =>
    item.id === alvo ? { ...item, disponivel: !item.disponivel } : item,
  ),
);
```

## Onde estudar cada etapa

| Etapa | Apostila | Documentação |
|---|---|---|
| 2 — componentes e listas | Capítulo 2 | https://pt-br.react.dev/learn/rendering-lists |
| 3 — props e children | Capítulo 3 | https://pt-br.react.dev/learn/passing-props-to-a-component |
| 4 — estado | Capítulo 4 | https://pt-br.react.dev/learn/state-a-components-memory |
| 5 — formulários | Capítulo 5 | https://pt-br.react.dev/learn/responding-to-events |

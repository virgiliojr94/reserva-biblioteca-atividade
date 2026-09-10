# Checklist de entrega

Confira antes de enviar o link do seu repositório.

## Funciona

- [ ] `npm install` e `npm run dev` rodam sem erro
- [ ] os seis livros do arquivo aparecem na tela
- [ ] o console do navegador (F12) não mostra erro nem aviso de `key`

## Etapa 2 — componentes e listas

- [ ] existe `src/components/BookCard.jsx`
- [ ] existe `src/components/BookList.jsx`
- [ ] a lista usa `.map()` com `key={book.id}`
- [ ] a etiqueta mostra Disponível ou Reservado conforme o livro
- [ ] lista vazia mostra `Nenhum livro no acervo.`

## Etapa 3 — props e children

- [ ] as props são desestruturadas na assinatura do componente
- [ ] o botão do cartão chama uma função recebida por prop, com o `id`
- [ ] `BookList` apenas encaminha a função, sem decidir nada
- [ ] existe `src/components/Panel.jsx` usando `children`

## Etapa 4 — estado

- [ ] o `App` guarda a lista em `useState`
- [ ] reservar e devolver funciona em qualquer livro
- [ ] a atualização não usa `push` nem altera o objeto direto
- [ ] o texto do botão alterna entre Reservar e Devolver
- [ ] o contador do topo é calculado, não guardado em outro estado

## Etapa 5 — formulário

- [ ] existe `src/components/BookForm.jsx`
- [ ] os dois campos são controlados
- [ ] enviar vazio mostra a mensagem e **não** recarrega a página
- [ ] o livro cadastrado aparece na lista imediatamente
- [ ] os campos limpam após o cadastro
- [ ] o livro novo pode ser reservado como os outros

## Git

- [ ] há pelo menos cinco commits, um por etapa
- [ ] `node_modules` **não** foi enviado
- [ ] o repositório está público
- [ ] o link foi entregue da forma combinada em sala

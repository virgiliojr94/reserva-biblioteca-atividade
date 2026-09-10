import "./App.css";

export default function App() {
  return (
    <main className="app">
      <header className="hero">
        <p className="eyebrow">BIBLIOTECA ITEAM</p>
        <h1>Reserva de livros do acervo.</h1>
        <p>Consulte a disponibilidade e reserve o que precisar.</p>
      </header>

      <section className="book-list" aria-label="Acervo">
        <article className="book-card">
          <div>
            <h2>Dom Casmurro</h2>
            <p>Machado de Assis</p>
          </div>
          <span className="badge badge-ok">Disponível</span>
        </article>

        <article className="book-card">
          <div>
            <h2>Vidas Secas</h2>
            <p>Graciliano Ramos</p>
          </div>
          <span className="badge badge-off">Reservado</span>
        </article>

        <article className="book-card">
          <div>
            <h2>O Cortiço</h2>
            <p>Aluísio Azevedo</p>
          </div>
          <span className="badge badge-ok">Disponível</span>
        </article>
      </section>
    </main>
  );
}

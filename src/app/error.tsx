"use client";
export default function ErrorPage({ reset }: { reset: () => void }) {
  return (
    <section className="not-found">
      <span className="eyebrow">A RECOVERABLE STATE</span>
      <h1>Something interrupted the journey.</h1>
      <p>Try loading this section again.</p>
      <button className="button primary" onClick={reset}>
        Try again ↗
      </button>
    </section>
  );
}

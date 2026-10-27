import Link from "next/link";
export default function NotFound() {
  return (
    <section className="not-found">
      <span className="eyebrow">404 / OUTSIDE THE PLAYABLE AREA</span>
      <h1>This path ends here.</h1>
      <p>
        The page may have moved, or this corner of the world hasn’t been built
        yet.
      </p>
      <Link href="/" className="button primary">
        Back to the journal ↗
      </Link>
    </section>
  );
}

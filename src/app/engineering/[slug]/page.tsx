import { notFound } from "next/navigation";
import Link from "next/link";
import { studies } from "@/content/case-studies";
import { PageIntro, Status } from "@/components/editorial";
import { TraversalLab, QuestLab, NetworkLab } from "@/components/labs";
export function generateStaticParams() {
  return studies.map((s) => ({ slug: s.slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const s = studies.find((s) => s.slug === slug);
  return { title: s?.subtitle || "Study not found", description: s?.problem };
}
export default async function Study({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const s = studies.find((s) => s.slug === slug);
  if (!s) notFound();
  const index = studies.indexOf(s);
  const next = studies[(index + 1) % studies.length];
  return (
    <article className="page-shell study-page">
      <Link href="/engineering" className="text-link">
        ← All engineering notes
      </Link>
      <PageIntro label={`${s.category} / ${s.readTime} READ`} title={s.title}>
        <p>{s.subtitle}</p>
      </PageIntro>
      <Status>{"Illustrative"}</Status>
      <p className="editorial-notice">{s.context}</p>
      <div className="study-body">
        <aside className="study-toc">
          <span className="eyebrow">IN THIS STUDY</span>
          {[
            "Problem",
            "Constraints",
            "Approach",
            "Trade-offs",
            "Edge cases",
            "Validation",
            "Lessons",
          ].map((x) => (
            <a href={`#${x.toLowerCase().replaceAll(" ", "-")}`} key={x}>
              {x}
            </a>
          ))}
        </aside>
        <div className="prose">
          <section id="problem">
            <span className="eyebrow">01 / THE PROBLEM</span>
            <h2>{s.problem}</h2>
          </section>
          <section id="constraints">
            <h2>Constraints first.</h2>
            <ul>
              {s.constraints.map((c) => (
                <li key={c}>{c}</li>
              ))}
            </ul>
          </section>
          <section id="approach">
            <h2>A deliberate sequence.</h2>
            <p>{s.approach}</p>
            <figure className="architecture">
              <figcaption className="eyebrow">
                ILLUSTRATIVE ARCHITECTURE
              </figcaption>
              <ol>
                {s.architecture.map((a, i) => (
                  <li key={a}>
                    <small>0{i + 1}</small>
                    {a}
                    <span aria-hidden="true">→</span>
                  </li>
                ))}
              </ol>
            </figure>
            <div className="code-block">
              <span className="eyebrow">
                {s.language} / EDUCATIONAL EXCERPT
              </span>
              <pre
                tabIndex={0}
                aria-label="Scrollable educational code example"
              >
                <code>{s.code}</code>
              </pre>
            </div>
          </section>
          <section id="trade-offs">
            <h2>The trade-off.</h2>
            <p>{s.tradeoff}</p>
          </section>
          <section id="edge-cases">
            <h2>Where it gets interesting.</h2>
            <ul>
              {s.edges.map((e) => (
                <li key={e}>{e}</li>
              ))}
            </ul>
          </section>
          <section id="validation">
            <h2>How to know it holds.</h2>
            <p>{s.validation}</p>
          </section>
          <section id="lessons">
            <h2>What to carry forward.</h2>
            <p>{s.lesson}</p>
          </section>
        </div>
      </div>
      {["traversal", "quest-state", "multiplayer"].includes(slug) && (
        <section className="study-demo">
          <span className="eyebrow">
            INSPECT THE IDEA / WORKING BROWSER DEMO
          </span>
          <h2>Put the model to work.</h2>
          {slug === "traversal" ? (
            <TraversalLab />
          ) : slug === "quest-state" ? (
            <QuestLab />
          ) : (
            <NetworkLab />
          )}
        </section>
      )}
      <Link className="next-study" href={`/engineering/${next.slug}`}>
        <span className="eyebrow">NEXT FIELD NOTE</span>
        <h2>{next.subtitle} ↗</h2>
      </Link>
    </article>
  );
}

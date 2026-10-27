import Link from "next/link";
import { ArrowUpRight, MoveUpRight } from "lucide-react";
import { Hero } from "@/components/hero";
import { ProjectFeature, SectionHead } from "@/components/editorial";
import { projects } from "@/content/projects";
import { studies } from "@/content/case-studies";
import { experiments } from "@/content/experiments";
export default function Home() {
  return (
    <>
      <Hero />
      <div className="manifesto">
        <span className="eyebrow">THE CRAFT BEHIND THE PLAY</span>
        <p>
          From the systems that make a character move
          <br className="desktop-break" /> to the choices that make a story
          matter.
        </p>
        <span className="manifesto-note">
          A collection of engineering studies,
          <br />
          original concepts, and working experiments.
        </span>
      </div>
      <section className="section" id="selected-work">
        <SectionHead
          number="01"
          title="Selected explorations."
          href="/work"
          label="All work"
        />
        {projects.slice(0, 2).map((p) => (
          <ProjectFeature key={p.slug} project={p} />
        ))}
      </section>
      <section className="concept-banner">
        <div className="concept-lines" aria-hidden="true" />
        <div>
          <span className="eyebrow">ORIGINAL CONCEPT / INTERACTIVE STUDY</span>
          <h2>
            What if your memories
            <br />
            weren’t <em>yours?</em>
          </h2>
          <p>
            Echoes of the Divide. A city built on borrowed memories.
            <br />A story assembled one fragment at a time.
          </p>
          <Link className="text-link" href="/work/echoes-of-the-divide">
            Enter the archive <ArrowUpRight size={18} />
          </Link>
        </div>
        <span className="vertical-label">
          ARCHIVE 003 / RECONSTRUCTION PENDING
        </span>
      </section>
      <section className="section">
        <SectionHead
          number="02"
          title="Under the surface."
          href="/engineering"
          label="All engineering notes"
        />
        <div className="engineering-intro">
          <p>
            The decisions behind the behavior.
            <br />
            The trade-offs behind the decisions.
          </p>
          <span>
            Illustrative analyses. Explicit constraints.
            <br />
            No black boxes.
          </span>
        </div>
        <div className="study-list">
          {studies.slice(0, 3).map((s, i) => (
            <Link href={`/engineering/${s.slug}`} key={s.slug}>
              <span className="study-number">0{i + 1}</span>
              <div>
                <span className="eyebrow">{s.category}</span>
                <h3>{s.subtitle}</h3>
              </div>
              <span className="study-time">{s.readTime} read</span>
              <ArrowUpRight size={22} />
            </Link>
          ))}
        </div>
      </section>
      <section className="playground-home section">
        <SectionHead
          number="03"
          title="Less theory. More play."
          href="/playground"
          label="Open the playground"
        />
        <div className="experiment-previews">
          {experiments.map((e, i) => (
            <Link href={`/playground#${e.id}`} key={e.id}>
              <div className={`mini-diagram mini-${i}`} aria-hidden="true">
                {i === 0 ? (
                  <>
                    <span className="mini-ground" />
                    <span className="mini-wall" />
                    <span className="mini-character" />
                  </>
                ) : i === 1 ? (
                  <>
                    <span>◇</span>
                    <span>──◇──</span>
                    <span>◇</span>
                  </>
                ) : (
                  <>
                    <span className="radar-ring" />
                    <span className="radar-dot" />
                  </>
                )}
              </div>
              <span className="eyebrow">EXPERIMENT 0{i + 1}</span>
              <h3>
                {e.title}
                <ArrowUpRight size={17} />
              </h3>
              <p>{e.description}</p>
            </Link>
          ))}
        </div>
      </section>
      <section className="about-home section">
        <span className="eyebrow">04 / A LITTLE CONTEXT</span>
        <h2>
          Good architecture
          <br />
          makes room for
          <br />
          <em>unexpected ideas.</em>
        </h2>
        <div>
          <p>
            A responsive movement system. A quest that remembers. A small
            debugging tool that makes the next problem easier to see.
          </p>
          <p>
            This is a space for exploring how those pieces connect—and what they
            let a player do.
          </p>
          <Link className="text-link" href="/about">
            The thinking behind the work <MoveUpRight size={16} />
          </Link>
        </div>
      </section>
    </>
  );
}

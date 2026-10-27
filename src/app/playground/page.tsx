import { PageIntro, Status } from "@/components/editorial";
import { TraversalLab, QuestLab, AiLab } from "@/components/labs";
import { experiments } from "@/content/experiments";
export const metadata = { title: "Playground" };
export default function Playground() {
  return (
    <div className="page-shell">
      <PageIntro
        label="03 / THE PLAYGROUND"
        title="Small systems. Visible thinking."
      >
        <p>
          Three working browser experiments. Change the inputs, inspect the
          state, and follow what happens next.
        </p>
      </PageIntro>
      <Status>{"Demonstrated implementation"}</Status>
      <div className="labs-stack">
        {[TraversalLab, QuestLab, AiLab].map((Lab, i) => (
          <section id={experiments[i].id} className="lab-section" key={i}>
            <div className="lab-description">
              <span className="eyebrow">EXPERIMENT 0{i + 1}</span>
              <h2>{experiments[i].title}</h2>
              <p>{experiments[i].description}</p>
              <span className="mono">{experiments[i].tag}</span>
            </div>
            <Lab />
          </section>
        ))}
      </div>
    </div>
  );
}

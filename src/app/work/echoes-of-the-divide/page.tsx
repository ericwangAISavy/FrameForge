import Link from "next/link";
import { PageIntro, Status } from "@/components/editorial";
import { Landscape } from "@/components/landscape";
import { MemoryLab } from "@/components/labs";
export const metadata = {
  title: "Echoes of the Divide — Interactive concept study",
};
export default function Echoes() {
  return (
    <div className="echoes-page">
      <div className="echoes-hero">
        <Landscape variant="memory" />
        <div className="page-shell">
          <Link href="/work" className="text-link">
            ← Selected explorations
          </Link>
          <PageIntro
            label="ORIGINAL NARRATIVE CONCEPT / ARCHIVE 003"
            title="Echoes of the Divide"
          >
            <p>
              In a city where memories can be traded,
              <br />
              the truth belongs to whoever keeps the record.
            </p>
          </PageIntro>
          <Status>{"Interactive concept study"}</Status>
        </div>
      </div>
      <div className="page-shell">
        <section className="concept-intro">
          <span className="eyebrow">DISCOVERY → CONFLICT → CONSEQUENCES</span>
          <h2>
            You remember the event.
            <br />
            <em>Just not the same way.</em>
          </h2>
          <p>
            A former investigator finds evidence that the city’s collective
            memory was altered to hide a catastrophe. Reconstructing the past
            opens new conversations—and makes some relationships harder to
            repair.
          </p>
          <p className="editorial-notice">
            This concept comes from the illustrative source profile. The
            interactive archive below is implemented for this portfolio; a Unity
            game, playable RPG, and production narrative are not claimed.
          </p>
        </section>
        <MemoryLab />
        <section className="section concept-architecture">
          <h2>The story beneath the interaction.</h2>
          <div className="two-col">
            <div>
              <span className="eyebrow">IMPLEMENTED IN THIS BROWSER</span>
              <p>
                Three evidence flags gate two mutually exclusive
                interpretations. Each interpretation selects a deterministic
                dialogue conclusion. Reset clears all local component state. No
                backend or generated dialogue is involved.
              </p>
            </div>
            <div>
              <span className="eyebrow">CONCEPTUAL GAME ARCHITECTURE</span>
              <p>
                A larger implementation could connect evidence IDs to quest
                dependencies, relationship state and versioned saves. Unity
                ScriptableObjects and a dialogue tool are possibilities, not
                completed integrations.
              </p>
            </div>
          </div>
          <Link className="text-link" href="/engineering/quest-state">
            Explore quest persistence →
          </Link>
        </section>
      </div>
    </div>
  );
}

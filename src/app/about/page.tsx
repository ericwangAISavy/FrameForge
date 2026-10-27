import Image from "next/image";
import { PageIntro, Status } from "@/components/editorial";
import { ResumeLink } from "@/components/site";
import { profile, technicalDomains } from "@/content/profile";
import { assets } from "@/content/assets";
import { experience, verifiedExperience } from "@/content/experience";
export const metadata = { title: "About" };
export default function About() {
  return (
    <div className="page-shell">
      <PageIntro
        label="04 / THE PERSON BEHIND THE SYSTEMS"
        title="A little less black box."
      >
        <p>
          {profile.name || "WORLDSMITH — identity pending owner confirmation."}
        </p>
      </PageIntro>
      <div className="about-editorial">
        <div className="about-monogram">
          {assets.portrait ? (
            <Image
              src={assets.portrait}
              alt={profile.name || "Portfolio owner"}
              fill
              sizes="(max-width: 700px) 100vw, 40vw"
            />
          ) : (
            <>
              <span>W</span>
              <small>SYSTEMS / STORIES / POSSIBILITIES</small>
            </>
          )}
        </div>
        <div>
          <Status>{profile.bio.status}</Status>
          <h2>
            Where the pieces
            <br />
            begin to connect.
          </h2>
          <p>{profile.bio.text}</p>
          <p className="editorial-notice">
            Editorial draft for owner approval. Personal anecdotes, opinions and
            years of experience have not been supplied as verified facts.
          </p>
          <ResumeLink />
        </div>
      </div>
      <section className="section" id="experience">
        <span className="eyebrow">BACKGROUND / CONTENT FRAMEWORK</span>
        <h2>A path through the craft.</h2>
        <p className="section-description">
          The stages below organize the supplied illustrative profile. They are
          areas of study, not a verified employment timeline. Employer names,
          dates and titles appear only after verification.
        </p>
        <div className="timeline">
          {(verifiedExperience.length ? verifiedExperience : experience).map(
            (e, i) => (
              <div key={e.stage}>
                <span className="mono">0{i + 1}</span>
                <div>
                  <h3>{e.stage}</h3>
                  {e.status === "Verified" && (
                    <span>
                      {e.employer} · {e.title} · {e.period}
                    </span>
                  )}
                  <p>{e.focus}</p>
                </div>
                <Status>{e.status}</Status>
              </div>
            ),
          )}
        </div>
        {!assets.resume && (
          <p className="editorial-notice">
            A verified résumé has not been supplied. This page intentionally
            provides background context in place of a downloadable document.
          </p>
        )}
      </section>
      <section className="section">
        <span className="eyebrow">
          TECHNICAL THREADS / ILLUSTRATIVE STUDY THEMES
        </span>
        <h2>Tools in context.</h2>
        <div className="interests">
          {technicalDomains.map((domain) => (
            <div key={domain.title}>
              <h3>{domain.title}</h3>
              <p>{domain.context}</p>
            </div>
          ))}
        </div>
        <p className="editorial-notice">
          Source-derived topics, not verified personal proficiency. Engine
          integrations are educational analyses; browser implementations are
          identified separately.
        </p>
      </section>
      <section className="section">
        <h2>Things worth coming back to.</h2>
        <div className="interests">
          {[
            [
              "Character movement",
              "The difference between a valid action and one that feels right.",
            ],
            [
              "Debugging tools",
              "Making hidden transitions visible before changing the code.",
            ],
            [
              "Interactive narrative",
              "Stories that respond to what a player does, not only what they select.",
            ],
            [
              "Creative constraints",
              "Architecture that gives designers room without making every state legal.",
            ],
          ].map(([t, d]) => (
            <div key={t}>
              <h3>{t}</h3>
              <p>{d}</p>
            </div>
          ))}
        </div>
        <p className="editorial-notice">
          Proposed editorial themes, awaiting owner approval.
        </p>
      </section>
    </div>
  );
}

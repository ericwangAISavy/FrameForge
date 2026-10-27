import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import { Landscape } from "./landscape";
import { projects, type Project } from "@/content/projects";
import { assets } from "@/content/assets";
import type { ReactNode } from "react";
export function Status({ children }: { children: ReactNode }) {
  return (
    <span className="status">
      <i />
      {children}
    </span>
  );
}
export function SectionHead({
  number,
  title,
  href,
  label,
}: {
  number: string;
  title: string;
  href?: string;
  label?: string;
}) {
  return (
    <div className="section-head">
      <div>
        <span className="eyebrow">{number} / THE JOURNAL</span>
        <h2>{title}</h2>
      </div>
      {href && (
        <Link className="text-link" href={href}>
          {label || "View all"}
          <ArrowUpRight size={16} />
        </Link>
      )}
    </div>
  );
}
export function ProjectArt({ project }: { project: Project }) {
  const asset = assets.projects[project.slug]?.thumbnail;
  return (
    <div className={`project-art art-${project.variant}`}>
      {asset ? (
        <Image
          src={asset}
          alt={`Authorized visual for ${project.focus}`}
          fill
          sizes="(max-width: 700px) 100vw, 60vw"
        />
      ) : project.variant === "quest" ? (
        <svg
          viewBox="0 0 600 380"
          role="img"
          aria-label="Original branching quest diagram"
        >
          <path
            d="M100 190H210L310 90H470M210 190l100 100h160"
            stroke="currentColor"
            fill="none"
          />
          <path
            d="M310 90v200"
            stroke="currentColor"
            strokeDasharray="4 8"
            opacity=".3"
          />
          {[
            [100, 190],
            [210, 190],
            [310, 90],
            [310, 290],
            [470, 90],
            [470, 290],
          ].map(([x, y], i) => (
            <g key={i}>
              <rect
                x={x - 15}
                y={y - 15}
                width="30"
                height="30"
                fill="#1e292c"
                stroke="currentColor"
                transform={`rotate(45 ${x} ${y})`}
              />
              <circle cx={x} cy={y} r="3" fill="currentColor" />
            </g>
          ))}
          <g fill="currentColor" fontSize="10" fontFamily="monospace">
            <text x="70" y="240">
              DISCOVERY
            </text>
            <text x="350" y="65">
              EVIDENCE → ACCORD
            </text>
            <text x="350" y="340">
              PASSAGE → RESOLVE
            </text>
          </g>
        </svg>
      ) : (
        <Landscape variant={project.variant} />
      )}
      <span className="art-caption">
        FIG. {project.number} —{" "}
        {project.variant === "memory"
          ? "THE MEMORY ARCHIVE"
          : project.variant === "quest"
            ? "A WORLD OF POSSIBLE STATES"
            : "CONTEXT / CONTACT / CONTINUITY"}
      </span>
    </div>
  );
}
export function ProjectFeature({
  project,
  compact = false,
}: {
  project: Project;
  compact?: boolean;
}) {
  const href =
    project.variant === "memory"
      ? "/work/echoes-of-the-divide"
      : `/engineering/${project.slug}`;
  return (
    <article className={`project-feature ${compact ? "compact" : ""}`}>
      <Link href={href} className="art-link">
        <ProjectArt project={project} />
        <span className="art-arrow">
          <ArrowUpRight size={23} />
        </span>
      </Link>
      <div className="project-copy">
        <div className="project-meta">
          <span>
            {project.number} / {project.kind}
          </span>
          <Status>{project.status}</Status>
        </div>
        <h3>
          <Link href={href}>{project.title}</Link>
        </h3>
        <p>{project.description}</p>
        <div className="tags">
          {project.technology.map((t) => (
            <span key={t}>{t}</span>
          ))}
        </div>
        <Link className="text-link" href={href}>
          Explore the study <ArrowRight size={16} />
        </Link>
      </div>
    </article>
  );
}
export function WorkList() {
  return (
    <>
      {projects.map((p) => (
        <ProjectFeature key={p.slug} project={p} />
      ))}
    </>
  );
}
export function PageIntro({
  label,
  title,
  children,
}: {
  label: string;
  title: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="page-intro">
      <span className="eyebrow">{label}</span>
      <h1>{title}</h1>
      {children && <div className="intro-copy">{children}</div>}
    </div>
  );
}

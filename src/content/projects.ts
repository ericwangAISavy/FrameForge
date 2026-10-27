import type { Verification } from "./verification";
export type Project = {
  slug: string;
  title: string;
  number: string;
  kind: string;
  status: Verification;
  focus: string;
  description: string;
  technology: string[];
  variant: "traversal" | "quest" | "memory";
};
export const projects: Project[] = [
  {
    slug: "traversal",
    title: "The space between two surfaces.",
    number: "01",
    kind: "Character systems",
    status: "Illustrative",
    focus: "Traversal architecture",
    description:
      "A wall ends. The movement shouldn’t. Exploring the collision checks, state ownership and recovery paths behind contextual traversal.",
    technology: ["C++ / UE5 concepts", "State machines"],
    variant: "traversal",
  },
  {
    slug: "quest-state",
    title: "Every choice leaves a trace.",
    number: "02",
    kind: "Narrative systems",
    status: "Illustrative",
    focus: "Quest state architecture",
    description:
      "Branching stories need unambiguous rules. A study in conditional objectives, mutually exclusive outcomes and worlds that remember.",
    technology: ["Directed graphs", "Persistent state"],
    variant: "quest",
  },
  {
    slug: "echoes-of-the-divide",
    title: "Echoes of the Divide",
    number: "03",
    kind: "Original concept exploration",
    status: "Independent concept",
    focus: "Interactive storytelling",
    description:
      "In a city that trades in memories, the evidence is personal. An interactive concept study about truth, identity and what we choose to preserve.",
    technology: ["Narrative design", "Browser concept study"],
    variant: "memory",
  },
];

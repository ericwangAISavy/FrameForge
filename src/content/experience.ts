import type { Verification } from "./verification";
export type Experience = {
  stage: string;
  employer: string;
  period: string;
  title: string;
  status: Verification;
  focus: string;
};
export const experience: Experience[] = [
  {
    stage: "Software foundations",
    employer: "Microsoft",
    period: "2018–2020",
    title: "Software Engineer",
    status: "Illustrative",
    focus:
      "Resource ownership, asynchronous SDK calls, C++ components and Unity integration samples.",
  },
  {
    stage: "Connected gameplay",
    employer: "Obsidian Entertainment",
    period: "2020–2022",
    title: "Gameplay Engineer",
    status: "Illustrative",
    focus:
      "Object interactions, inventory invalidation and authoritative shared state.",
  },
  {
    stage: "Systems that tell stories",
    employer: "Obsidian Entertainment",
    period: "2022–2024",
    title: "Gameplay Engineer",
    status: "Illustrative",
    focus:
      "RPG abilities, conditional objectives and persistent quest decisions.",
  },
  {
    stage: "Character systems",
    employer: "Respawn Entertainment",
    period: "2024–2026",
    title: "Senior Gameplay Engineer",
    status: "Illustrative",
    focus:
      "Traversal continuity, animation integration and cross-system debugging.",
  },
  {
    stage: "Independent exploration",
    employer: "Independent",
    period: "2025–2026",
    title: "Prototype developer",
    status: "Independent concept",
    focus:
      "Memory reconstruction, branching narrative and inspectable NPC behavior.",
  },
];
export const verifiedExperience = experience.filter(
  (x) => x.status === "Verified",
);

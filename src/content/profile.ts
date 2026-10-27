import type { Claim } from "./verification";
export const profile = {
  name: null as string | null,
  identity: "WORLDSMITH",
  role: "Gameplay engineering & interactive systems",
  email: null as string | null,
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || null,
  availability: null as string | null,
  bio: {
    text: "The interesting part of gameplay engineering is often the boundary: movement meeting animation, an interaction meeting network authority, a player choice meeting a persistent world. This journal explores those boundaries through small, inspectable systems.",
    status: "Illustrative",
  } satisfies Claim,
};

// Source-derived study topics, not a claim of verified personal proficiency.
export const technicalDomains = [
  {
    title: "Gameplay engineering",
    context:
      "Character movement, traversal, ability activation, inventory and equipment. Explicit ownership connects input, collision and animation.",
  },
  {
    title: "Architecture & authoring",
    context:
      "Unreal Actor Components, Data Assets, Gameplay Tags and Blueprint interfaces. Unity C# and ScriptableObjects are conceptual authoring alternatives.",
  },
  {
    title: "Multiplayer & runtime",
    context:
      "Replication, server authority, object lifetime and asynchronous callbacks. Profiling with Unreal Insights or Unity Profiler requires reproducible captures.",
  },
  {
    title: "Narrative & AI",
    context:
      "Quest dependency graphs, conditional dialogue, NPC state machines and deterministic world-state changes. Python/ML training remains experimental source material.",
  },
];

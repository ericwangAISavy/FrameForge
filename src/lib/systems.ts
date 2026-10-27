export type Movement =
  | "Idle"
  | "Running"
  | "Falling"
  | "Traversal Candidate"
  | "Climbing"
  | "Recovering";
export type Traversal = { x: number; y: number; state: Movement };
export const initialTraversal: Traversal = { x: 70, y: 0, state: "Idle" };
export function traverse(
  s: Traversal,
  command: "left" | "right" | "climb" | "advance" | "drop",
): Traversal {
  if (command === "drop") return s.y > 0 ? { ...s, state: "Falling" } : s;
  if (command === "advance") {
    if (s.state === "Traversal Candidate") return s;
    if (s.state === "Climbing") return { x: 300, y: 105, state: "Recovering" };
    if (s.state === "Recovering") return { ...s, state: "Idle" };
    if (s.state === "Falling") return { x: 220, y: 0, state: "Recovering" };
    return { ...s, state: "Idle" };
  }
  if (
    s.state === "Climbing" ||
    s.state === "Recovering" ||
    s.state === "Falling"
  )
    return s;
  if (command === "climb")
    return s.state === "Traversal Candidate" ? { ...s, state: "Climbing" } : s;
  const x = Math.max(
    s.y > 0 ? 280 : 30,
    Math.min(s.y > 0 ? 490 : 250, s.x + (command === "right" ? 30 : -30)),
  );
  return {
    ...s,
    x,
    state: s.y === 0 && x >= 230 ? "Traversal Candidate" : "Running",
  };
}
export type Quest = { evidence: boolean; outcome: null | "Accord" | "Passage" };
export const initialQuest: Quest = { evidence: false, outcome: null };
export function decideQuest(
  s: Quest,
  action: "evidence" | "negotiate" | "bypass",
): Quest {
  if (s.outcome) return s;
  if (action === "evidence") return { ...s, evidence: true };
  if (action === "negotiate")
    return s.evidence ? { ...s, outcome: "Accord" } : s;
  return { ...s, outcome: "Passage" };
}
export function restoreQuest(raw: string | null): Quest {
  try {
    const s = JSON.parse(raw || "null");
    if (
      s &&
      typeof s.evidence === "boolean" &&
      [null, "Accord", "Passage"].includes(s.outcome) &&
      !(s.outcome === "Accord" && !s.evidence)
    )
      return { evidence: s.evidence, outcome: s.outcome };
  } catch {}
  return initialQuest;
}
export type Npc =
  "Idle" | "Patrol" | "Investigate" | "Alert" | "Search" | "Return";
export type NpcEvent = "tick" | "sound" | "sight" | "lost";
export function npcTransition(s: Npc, e: NpcEvent): Npc {
  if (e === "sight") return "Alert";
  if (e === "lost" && s === "Alert") return "Search";
  if (e === "sound" && s !== "Alert") return "Investigate";
  if (e === "tick")
    return (
      {
        Idle: "Patrol",
        Patrol: "Patrol",
        Investigate: "Search",
        Alert: "Alert",
        Search: "Return",
        Return: "Patrol",
      } as const
    )[s];
  return s;
}
export type Request = { player: string; at: number; id: string };
export function resolveCollection(requests: Request[]) {
  const seen = new Set<string>();
  let claimed = false;
  return [...requests]
    .sort((a, b) => a.at - b.at || a.player.localeCompare(b.player))
    .map((r) => {
      if (seen.has(r.id))
        return { ...r, accepted: false, reason: "Duplicate request" };
      seen.add(r.id);
      const accepted = !claimed;
      claimed = true;
      return {
        ...r,
        accepted,
        reason: accepted ? "Ownership committed" : "Object already claimed",
      };
    });
}
export function memoryConclusion(
  evidence: number[],
  choice: "protect" | "publish",
): string | null {
  if (![0, 1, 2].every((i) => evidence.includes(i))) return null;
  return choice === "protect"
    ? "You seal the archive. Mara keeps her memories, but the city inherits an unanswered question. “You believed me,” she says. “Now help me remember the rest.”"
    : "You release the archive. The official history fractures. Mara sees her testimony in every window. “The truth is out,” she says. “I wish you had asked me first.”";
}

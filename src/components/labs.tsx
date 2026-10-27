"use client";
import { useState, useSyncExternalStore, type ReactNode } from "react";
import {
  ArrowLeft,
  ArrowRight,
  RotateCcw,
  Eye,
  Volume2,
  StepForward,
} from "lucide-react";
import {
  traverse,
  initialTraversal,
  initialQuest,
  decideQuest,
  restoreQuest,
  npcTransition,
  resolveCollection,
  memoryConclusion,
  type Npc,
  type Quest,
  type NpcEvent,
} from "@/lib/systems";
const subscribe = (cb: () => void) => {
  window.addEventListener("worldsmith-quest", cb);
  return () => window.removeEventListener("worldsmith-quest", cb);
};
function snapshot() {
  try {
    return sessionStorage.getItem("worldsmith-quest");
  } catch {
    return null;
  }
}
const subscribeReady = () => () => {};
const readySnapshot = () => true;
const serverSnapshot = () => false;
function useReady() {
  return useSyncExternalStore(subscribeReady, readySnapshot, serverSnapshot);
}
function LabFrame({
  children,
  className = "lab",
}: {
  children: ReactNode;
  className?: string;
}) {
  const ready = useReady();
  return (
    <fieldset className={className} disabled={!ready} aria-busy={!ready}>
      {children}
    </fieldset>
  );
}
export function TraversalLab() {
  const ready = useReady();
  const [s, set] = useState(initialTraversal);
  const [debug, setDebug] = useState(true);
  const cmd = (c: Parameters<typeof traverse>[1]) =>
    set((old) => traverse(old, c));
  return (
    <LabFrame>
      <div className="lab-top">
        <span>01 / CONTEXTUAL MOVEMENT</span>
        <button aria-pressed={debug} onClick={() => setDebug(!debug)}>
          <Eye size={14} /> Debug {debug ? "on" : "off"}
        </button>
      </div>
      <div
        className="lab-world"
        tabIndex={ready ? 0 : -1}
        role="group"
        aria-label="Traversal scene. Arrow keys move, Space climbs, Enter advances, D drops."
        onKeyDown={(e) => {
          const c = (
            {
              ArrowLeft: "left",
              ArrowRight: "right",
              " ": "climb",
              Enter: "advance",
              d: "drop",
            } as const
          )[e.key as "ArrowLeft"];
          if (c) {
            e.preventDefault();
            cmd(c);
          }
        }}
      >
        <svg
          viewBox="0 0 560 260"
          role="img"
          aria-label={`Character at x ${s.x}, height ${s.y}. State: ${s.state}`}
        >
          <defs>
            <pattern
              id="labGrid"
              width="25"
              height="25"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M25 0H0V25"
                stroke="#819c9c"
                strokeOpacity=".1"
                fill="none"
              />
            </pattern>
          </defs>
          <path d="M0 0h560v260H0z" fill="url(#labGrid)" />
          <path
            d="M20 220h520M280 220V115H510V220"
            stroke="#a5b9b3"
            fill="#2a3b3c"
          />
          <path d="M280 115h230" stroke="#c4a676" strokeWidth="3" />
          {debug && (
            <>
              <path
                d={`M${s.x} ${199 - s.y}h55`}
                stroke="#c6a878"
                strokeDasharray="4 4"
              />
              <circle
                cx={s.x}
                cy={199 - s.y}
                r="40"
                fill="none"
                stroke="#c6a878"
                strokeOpacity=".3"
              />
              <text
                x="300"
                y="100"
                fill="#b8a381"
                fontSize="11"
                fontFamily="monospace"
              >
                VALID LANDING REGION
              </text>
            </>
          )}
          <g
            className="player-glyph"
            transform={`translate(${s.x},${s.state === "Climbing" ? 145 : 199 - s.y})`}
          >
            <rect x="-8" y="-12" width="16" height="32" rx="3" fill="#c6ae85" />
            <circle cy="-20" r="6" fill="#e7dcc6" />
          </g>
        </svg>
      </div>
      <div className="lab-status" role="status">
        <span>STATE</span>
        <strong>{s.state}</strong>
        <code>
          x {s.x} / y {s.y}
        </code>
      </div>
      <div className="lab-controls">
        <button onClick={() => cmd("left")} aria-label="Move left">
          <ArrowLeft size={16} />
        </button>
        <button onClick={() => cmd("right")} aria-label="Move right">
          <ArrowRight size={16} />
        </button>
        <button
          onClick={() => cmd("climb")}
          disabled={s.state !== "Traversal Candidate"}
        >
          Climb
        </button>
        <button onClick={() => cmd("advance")}>
          Step <StepForward size={14} />
        </button>
        <button onClick={() => cmd("drop")} disabled={!s.y}>
          Drop
        </button>
        <button
          onClick={() => set(initialTraversal)}
          aria-label="Reset traversal"
        >
          <RotateCcw size={15} />
        </button>
      </div>
      <p className="lab-help">
        Move right to the ledge, climb, then step through recovery. On the
        scene: ← → move · Space climb · Enter step · D drop. A discrete browser
        model, not a physics simulation.
      </p>
    </LabFrame>
  );
}
export function QuestLab() {
  const raw = useSyncExternalStore(subscribe, snapshot, () => null);
  const [fallback, setFallback] = useState<Quest | null>(null);
  const s = fallback || restoreQuest(raw);
  function save(n: Quest) {
    setFallback(n);
    try {
      sessionStorage.setItem("worldsmith-quest", JSON.stringify(n));
      window.dispatchEvent(new Event("worldsmith-quest"));
    } catch {}
  }
  const act = (a: Parameters<typeof decideQuest>[1]) => save(decideQuest(s, a));
  return (
    <LabFrame>
      <div className="lab-top">
        <span>02 / THE OBSERVATORY GATE</span>
        <span>SESSION PERSISTENCE</span>
      </div>
      <div className="quest-graph">
        <span className="graph-node active">Discover the gate</span>
        <div className="graph-line" />
        <div className="graph-branches">
          <span className={`graph-node ${s.evidence ? "active" : ""}`}>
            Recover testimony
          </span>
          <span className="graph-node">Find service tunnel</span>
        </div>
        <div className="graph-branches">
          <span
            className={`graph-node ${s.outcome === "Accord" ? "active" : ""}`}
          >
            Accord
          </span>
          <span
            className={`graph-node ${s.outcome === "Passage" ? "active" : ""}`}
          >
            Passage
          </span>
        </div>
      </div>
      <div className="lab-status" role="status">
        <span>OUTCOME</span>
        <strong>{s.outcome || "Undecided"}</strong>
        <code>evidence: {String(s.evidence)}</code>
      </div>
      <div className="lab-controls">
        <button
          onClick={() => act("evidence")}
          disabled={s.evidence || !!s.outcome}
        >
          Recover evidence
        </button>
        <button
          onClick={() => act("negotiate")}
          disabled={!s.evidence || !!s.outcome}
        >
          Negotiate
        </button>
        <button onClick={() => act("bypass")} disabled={!!s.outcome}>
          Take tunnel
        </button>
        <button onClick={() => save(initialQuest)} aria-label="Reset quest">
          <RotateCcw size={15} />
        </button>
      </div>
      <p className="lab-help">
        Negotiation requires testimony. The tunnel is always available before
        resolution. Committing either outcome locks the other; reset to explore
        another path.
      </p>
    </LabFrame>
  );
}
const npcStates: Npc[] = [
  "Idle",
  "Patrol",
  "Investigate",
  "Alert",
  "Search",
  "Return",
];
export function AiLab() {
  const [s, set] = useState<Npc>("Idle");
  const [history, setHistory] = useState(["Idle — simulation initialized"]);
  function event(e: NpcEvent) {
    const n = npcTransition(s, e);
    set(n);
    setHistory((h) => [`${s} → ${n} / ${e}`, ...h].slice(0, 5));
  }
  return (
    <LabFrame>
      <div className="lab-top">
        <span>03 / PERCEPTION & RESPONSE</span>
        <span>DETERMINISTIC FSM</span>
      </div>
      <div className="ai-scene">
        <div
          className={`detection-cone ${s === "Alert" ? "alert" : ""}`}
          aria-hidden="true"
        />
        <span className="npc-glyph" aria-hidden="true">
          ◆
        </span>
        <div className="npc-states">
          {npcStates.map((n) => (
            <span className={s === n ? "active" : ""} key={n}>
              {n}
            </span>
          ))}
        </div>
      </div>
      <div className="lab-status" role="status">
        <span>NPC STATE</span>
        <strong>{s}</strong>
      </div>
      <div className="lab-controls">
        <button onClick={() => event("sound")}>
          <Volume2 size={15} /> Make sound
        </button>
        <button onClick={() => event("sight")}>
          <Eye size={15} /> Enter sight
        </button>
        <button onClick={() => event("lost")} disabled={s !== "Alert"}>
          Leave sight
        </button>
        <button onClick={() => event("tick")}>Advance time</button>
        <button
          onClick={() => {
            set("Idle");
            setHistory(["Idle — simulation reset"]);
          }}
          aria-label="Reset AI"
        >
          <RotateCcw size={15} />
        </button>
      </div>
      <ol className="event-log" aria-label="Recent NPC transitions">
        {history.map((h, i) => (
          <li key={`${h}-${i}`}>{h}</li>
        ))}
      </ol>
      <p className="lab-help">
        Each advance is a simulated interval. Sound prompts investigation, sight
        takes priority, and losing sight leads to search → return → patrol. No
        machine learning is involved.
      </p>
    </LabFrame>
  );
}
export function NetworkLab() {
  const [delay, setDelay] = useState(80);
  const [run, setRun] = useState(false);
  const results = resolveCollection([
    { player: "A", at: 80, id: "a" },
    { player: "B", at: delay, id: "b" },
    { player: "A", at: 160, id: "a" },
  ]);
  return (
    <LabFrame>
      <div className="lab-top">
        <span>AUTHORITY / ONE SHARED OBJECT</span>
        <span>SIMULATED TIME</span>
      </div>
      <div className="network-control">
        <label htmlFor="delay">Player B request arrival: {delay} ms</label>
        <input
          id="delay"
          type="range"
          min="20"
          max="140"
          step="20"
          value={delay}
          onChange={(e) => {
            setDelay(Number(e.target.value));
            setRun(false);
          }}
        />
        <button onClick={() => setRun(true)}>
          Resolve requests <ArrowRight size={15} />
        </button>
      </div>
      {run ? (
        <ol className="network-results" aria-live="polite">
          {results.map((r, i) => (
            <li key={i}>
              <code>{r.at} ms</code>
              <strong>Player {r.player}</strong>
              <span className={r.accepted ? "accepted" : ""}>{r.reason}</span>
            </li>
          ))}
        </ol>
      ) : (
        <p className="lab-help">
          Both players request the same object. A repeats its request. Change
          arrival order and inspect the authority’s decision.
        </p>
      )}
    </LabFrame>
  );
}
const fragments = [
  {
    title: "The recording",
    text: "A voice orders the archive sealed. The speaker sounds like Mara, but the timestamp predates her arrival.",
  },
  {
    title: "The maintenance log",
    text: "A city technician records a twelve-minute clock drift. The archive’s timestamp cannot establish who gave the order.",
  },
  {
    title: "The witness",
    text: "Mara remembers opening the doors to let people escape. Her memory was edited after the evacuation.",
  },
];
export function MemoryLab() {
  const [found, setFound] = useState<number[]>([]);
  const [choice, setChoice] = useState<"protect" | "publish" | null>(null);
  const conclusion = choice ? memoryConclusion(found, choice) : null;
  return (
    <LabFrame className="memory-lab">
      <div className="lab-top">
        <span>MEMORY RECONSTRUCTION / 001</span>
        <span>{found.length} OF 3 FRAGMENTS</span>
      </div>
      <div className="fragments">
        {fragments.map((f, i) => (
          <button
            className={found.includes(i) ? "found" : ""}
            key={f.title}
            aria-expanded={found.includes(i)}
            onClick={() =>
              setFound((old) => (old.includes(i) ? old : [...old, i]))
            }
          >
            <span className="fragment-index">
              0{i + 1} / {found.includes(i) ? "RECOVERED" : "SEALED"}
            </span>
            <h3>{f.title}</h3>
            {found.includes(i) ? (
              <p>{f.text}</p>
            ) : (
              <span className="fragment-seal">
                ◇<small>Recover fragment</small>
              </span>
            )}
          </button>
        ))}
      </div>
      <div className="interpretation">
        <h3>What will you do with the truth?</h3>
        <p>
          {found.length < 3
            ? "Recover all three fragments before forming an interpretation."
            : "The evidence challenges the official account. It does not tell you who should control Mara’s testimony."}
        </p>
        <div className="lab-controls">
          <button
            disabled={found.length < 3 || !!choice}
            onClick={() => setChoice("protect")}
          >
            Protect the witness
          </button>
          <button
            disabled={found.length < 3 || !!choice}
            onClick={() => setChoice("publish")}
          >
            Publish the archive
          </button>
          <button
            onClick={() => {
              setFound([]);
              setChoice(null);
            }}
            aria-label="Reset memory study"
          >
            <RotateCcw size={15} />
          </button>
        </div>
        {conclusion && <blockquote role="status">{conclusion}</blockquote>}
      </div>
    </LabFrame>
  );
}

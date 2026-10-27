export type Study = {
  slug: string;
  title: string;
  subtitle: string;
  category: string;
  readTime: string;
  problem: string;
  context: string;
  constraints: string[];
  approach: string;
  architecture: string[];
  tradeoff: string;
  edges: string[];
  validation: string;
  lesson: string;
  code: string;
  language: string;
};
export const studies: Study[] = [
  {
    slug: "traversal",
    title: "A ledge is a question, not a command.",
    subtitle: "Character traversal architecture",
    category: "Character systems",
    readTime: "6 min",
    problem:
      "At a join between adjacent wall meshes, one trace misses. A valid climb abruptly becomes a fall.",
    context:
      "An illustrative UE5-style subsystem, independent of any commercial game. The browser lab simplifies movement into explicit steps.",
    constraints: [
      "Collision geometry is not perfectly continuous.",
      "Animation can move the character while gameplay owns eligibility.",
      "Input can be cancelled during a transition.",
    ],
    approach:
      "Separate entry checks from continuation checks. Detect geometry with a capsule sweep, reject unsuitable surface normals, and validate landing clearance before committing. Once attached, use bounded continuity tolerances instead of rerunning entry logic verbatim.",
    architecture: [
      "Input",
      "Detection",
      "Eligibility",
      "Movement",
      "Animation",
      "Recovery",
    ],
    tradeoff:
      "Forgiving continuation reduces mesh-seam failures, but too much tolerance allows traversal across real gaps. Bound it by distance, angle and time. A missed trace is never unconditional acceptance.",
    edges: [
      "Target actor is destroyed during a climb.",
      "A moving surface invalidates the landing transform.",
      "A notify arrives after cancellation.",
    ],
    validation:
      "Exercise seams, corners, overhangs, blocked landings and moving platforms. Record action IDs and transition reasons. Assert every terminal path releases movement ownership.",
    lesson:
      "Recovery paths define robustness as much as a successful climb. The lab demonstrates eligibility, not Unreal collision physics.",
    code: "// Educational Unreal C++; not game source.\nbool UTraversalComponent::CanStart(const FHitResult& Hit) const\n{\n    return IsValid(Hit.GetActor()) && Hit.bBlockingHit\n        && State == ETraversalState::Idle\n        && FMath::Abs(Hit.ImpactNormal.Z) < MaxWallNormalZ;\n}\n// Reach and landing clearance are additional prerequisites.",
    language: "C++ / Unreal concepts",
  },
  {
    slug: "multiplayer",
    title: "Two players. One object. One truth.",
    subtitle: "Multiplayer interaction consistency",
    category: "Networked gameplay",
    readTime: "5 min",
    problem:
      "Two clients see an available object. Granting both collection requests locally creates an ownership conflict.",
    context:
      "An educational server-authority model. Arrival time is simulated; equal times use a stable player-ID tie-break to make the demonstration reproducible.",
    constraints: [
      "Client visibility may be stale.",
      "Requests can arrive twice.",
      "The object may disappear before processing.",
    ],
    approach:
      "Clients send intent, not outcome. The authority validates range, player state, object generation and availability; commits the ownership transfer atomically; then replicates the result. Cache outcomes by request ID to prevent duplicate rewards.",
    architecture: [
      "Intent",
      "Validation",
      "Atomic claim",
      "Replication",
      "Reconcile",
    ],
    tradeoff:
      "Authority adds latency. Predict an animation locally, but keep rewards authoritative and reconcile rejected feedback.",
    edges: [
      "A duplicate arrives after transfer.",
      "Two arrivals have equal timestamps.",
      "An object ID is recycled.",
    ],
    validation:
      "Vary ordering and latency; replay IDs and disconnect the winning client. Assert one award per object generation and eventual client agreement.",
    lesson:
      "Idempotency is a gameplay contract. This is a deterministic event queue, not a real transport simulation.",
    code: "// Educational Unreal C++; surrounding RPC omitted.\nif (!IsValid(Item) || !IsValid(RequestingPawn)) return;\nif (SeenRequests.Contains(RequestId)) return;\nif (!Item->IsAvailable() || !IsInRange(RequestingPawn, Item)) return;\nSeenRequests.Add(RequestId);\nItem->ClaimFor(RequestingPawn); // authority-owned",
    language: "C++ / server authority",
  },
  {
    slug: "quest-state",
    title: "Let the story branch. Keep the state precise.",
    subtitle: "RPG quest state architecture",
    category: "Narrative systems",
    readTime: "7 min",
    problem:
      "Independent flags accidentally activate both a negotiated settlement and a secret escape. Dialogue and saved state disagree.",
    context:
      "An original scenario: reopen an observatory by recovering evidence or finding a maintenance route.",
    constraints: [
      "Outcomes are mutually exclusive.",
      "Saved state must load into a valid configuration.",
      "Dialogue reacts to progression without owning it.",
    ],
    approach:
      "Represent the terminal outcome as one value, not competing flags. Check evidence requirements, commit the new state once, then broadcast an event. Validate deserialized data before accepting it.",
    architecture: [
      "Discover",
      "Evidence",
      "Evaluate",
      "Commit",
      "Persist",
      "React",
    ],
    tradeoff:
      "Data-driven graphs help designers iterate but need tooling for cycles and unreachable objectives. Treat saved data as untrusted input.",
    edges: [
      "A route is selected twice.",
      "The save contains an impossible outcome.",
      "A clue is found after the quest ends.",
    ],
    validation:
      "Enumerate reachable states. Reject negotiation without evidence, lock outcomes, round-trip valid saves and reset malformed data. The explorer persists valid decisions for the browser session.",
    lesson:
      "Narrative ambiguity can coexist with a precise record of what actually happened.",
    code: "// Educational Unity C#.\npublic enum Resolution { None, Accord, Passage }\npublic bool TryNegotiate()\n{\n    if (!HasEvidence || Outcome != Resolution.None) return false;\n    Outcome = Resolution.Accord;\n    OnChanged?.Invoke();\n    return true;\n}",
    language: "C# / Unity concepts",
  },
  {
    slug: "combat",
    title: "Responsive does not mean unconditional.",
    subtitle: "Combat and ability integration",
    category: "Action systems",
    readTime: "5 min",
    problem:
      "Attack, dodge and interaction inputs arrive together. Animation and gameplay disagree about which action owns the character.",
    context:
      "An illustrative activation pipeline, without commercial combat-system claims.",
    constraints: [
      "Cooldowns can change mid-action.",
      "Cancellation depends on animation phase.",
      "Buffered input must still obey eligibility rules.",
    ],
    approach:
      "Query eligibility before activation, carry an action token through execution, and use one terminal cleanup path. Buffer intent for a bounded window. Notifies must match the active token so late callbacks cannot affect a new action.",
    architecture: [
      "Input",
      "Eligibility",
      "Activation",
      "Commit",
      "Recovery",
      "Cleanup",
    ],
    tradeoff:
      "Long input buffers feel forgiving but may execute stale intent. Tune windows per action and expose them to design.",
    edges: [
      "Target disappears before impact.",
      "Stun interrupts the animation.",
      "A late notify fires during a dodge.",
    ],
    validation:
      "Test cancellation at every phase, target loss and repeated input. Assert interruption releases tags, timers and movement locks exactly once.",
    lesson:
      "Predictable permission to act matters more than accepting every input.",
    code: "// Educational Unreal-style architectural sketch.\nif (!CanActivate(Context)) return EActionResult::Rejected;\nconst FGuid ActionId = BeginAction(Context);\n// Callbacks must match the active ActionId.\n// Completion and interruption share idempotent cleanup.",
    language: "C++ / architectural sketch",
  },
  {
    slug: "debugging",
    title: "Follow the transition that should not have happened.",
    subtitle: "Gameplay performance and debugging",
    category: "Runtime systems",
    readTime: "6 min",
    problem:
      "Traversal oscillates at a mesh seam. Repeated entry attempts multiply collision queries, making a correctness bug resemble a performance problem.",
    context:
      "A constructed debugging scenario. No production benchmarks or measured improvements are claimed.",
    constraints: [
      "Instrumentation must stay bounded.",
      "Moving actors invalidate cached results.",
      "Lower query frequency cannot repair a bad transition.",
    ],
    approach:
      "Capture transition reasons and surface IDs in a bounded trace. Correlate query scopes in Unreal Insights. Correct the continuation rule, then profile again before changing cadence. Use events for static eligibility and bounded spatial updates.",
    architecture: [
      "Reproduce",
      "Instrument",
      "Correlate",
      "Isolate",
      "Correct",
      "Re-profile",
    ],
    tradeoff:
      "Caching reduces repeated work but adds invalidation obligations. Cache stable configuration; refresh geometry when transforms or action context change.",
    edges: [
      "Debug builds distort timing.",
      "A cache outlives its actor.",
      "An optimization misses a moving obstacle.",
    ],
    validation:
      "Repeat the same seam-crossing path on the same hardware and build. Compare query counts and frame scopes. Retain raw traces alongside future metrics.",
    lesson:
      "Fix the model before optimizing its mistakes. This diagram is a workflow, not a fabricated profiler capture.",
    code: "// Educational Unreal C++ instrumentation.\nTRACE_CPUPROFILER_EVENT_SCOPE(Traversal_ValidateSurface);\nconst bool bValid = ValidateSurface(Contact);\n// Bounded logs: action ID, surface ID and reason.\n// Re-profile the same path after the correctness fix.",
    language: "C++ / instrumentation",
  },
];

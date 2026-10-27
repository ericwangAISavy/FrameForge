import { test } from "node:test";
import assert from "node:assert/strict";
import {
  traverse,
  initialTraversal,
  decideQuest,
  initialQuest,
  restoreQuest,
  npcTransition,
  resolveCollection,
  memoryConclusion,
} from "../src/lib/systems";
test("traversal rejects climbing without a nearby ledge and recovers onto it", () => {
  let s = initialTraversal;
  assert.equal(traverse(s, "climb").state, "Idle");
  for (let i = 0; i < 6; i++) s = traverse(s, "right");
  assert.equal(s.state, "Traversal Candidate");
  s = traverse(s, "climb");
  assert.equal(s.state, "Climbing");
  s = traverse(s, "advance");
  assert.equal(s.state, "Recovering");
  s = traverse(s, "advance");
  assert.equal(s.y, 105);
  assert.equal(s.state, "Idle");
});
test("quest requires evidence for negotiation and keeps endings mutually exclusive", () => {
  assert.equal(decideQuest(initialQuest, "negotiate").outcome, null);
  let s = decideQuest(initialQuest, "evidence");
  s = decideQuest(s, "negotiate");
  assert.equal(s.outcome, "Accord");
  assert.equal(decideQuest(s, "bypass").outcome, "Accord");
  assert.equal(decideQuest(initialQuest, "bypass").outcome, "Passage");
});
test("corrupt and impossible quest saves safely reset", () => {
  assert.deepEqual(restoreQuest("oops"), initialQuest);
  assert.deepEqual(
    restoreQuest('{"evidence":false,"outcome":"Accord"}'),
    initialQuest,
  );
  assert.deepEqual(restoreQuest('{"evidence":true,"outcome":"Accord"}'), {
    evidence: true,
    outcome: "Accord",
  });
});
test("NPC investigation and loss of sight return through search", () => {
  assert.equal(npcTransition("Idle", "sound"), "Investigate");
  assert.equal(npcTransition("Investigate", "sight"), "Alert");
  assert.equal(npcTransition("Alert", "lost"), "Search");
  assert.equal(npcTransition("Search", "tick"), "Return");
  assert.equal(npcTransition("Return", "tick"), "Patrol");
});
test("server awards one object once even with duplicate and equal-time requests", () => {
  const result = resolveCollection([
    { player: "B", at: 20, id: "b" },
    { player: "A", at: 20, id: "a" },
    { player: "A", at: 30, id: "a" },
  ]);
  assert.equal(result.filter((x) => x.accepted).length, 1);
  assert.equal(result[0].player, "A");
  assert.equal(result[2].reason, "Duplicate request");
});
test("memory interpretation requires all evidence and produces distinct conclusions", () => {
  assert.equal(memoryConclusion([0, 1], "protect"), null);
  assert.notEqual(
    memoryConclusion([0, 1, 2], "protect"),
    memoryConclusion([0, 1, 2], "publish"),
  );
});

test("dropping on the ground is a no-op and movement respects world bounds", () => {
  assert.deepEqual(traverse(initialTraversal, "drop"), initialTraversal);
  let s = initialTraversal;
  for (let i = 0; i < 50; i++) s = traverse(s, "left");
  assert.equal(s.x, 30);
  for (let i = 0; i < 50; i++) s = traverse(s, "right");
  assert.equal(s.x, 250);
});

test("advancing time at an unchanged ledge preserves climb eligibility", () => {
  let s = initialTraversal;
  for (let i = 0; i < 6; i++) s = traverse(s, "right");
  s = traverse(s, "advance");
  assert.equal(s.state, "Traversal Candidate");
  assert.equal(traverse(s, "climb").state, "Climbing");
});

import { test, expect } from "@playwright/test";
test("all pages load, original scenes render, internal routes work", async ({
  page,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (e) => errors.push(e.message));
  for (const url of [
    "/",
    "/work",
    "/engineering",
    "/engineering/traversal",
    "/engineering/multiplayer",
    "/engineering/quest-state",
    "/engineering/combat",
    "/engineering/debugging",
    "/playground",
    "/about",
    "/contact",
    "/work/echoes-of-the-divide",
  ]) {
    const r = await page.goto(url);
    expect(r?.status()).toBe(200);
    await expect(page.locator("h1")).toBeVisible();
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBeTruthy();
    await expect(page.getByRole("main")).not.toContainText(
      /Respawn Entertainment|Obsidian Entertainment|Microsoft Corporation/,
    );
    const hrefs = await page
      .locator('main a[href^="/"]')
      .evaluateAll((els) => els.map((e) => e.getAttribute("href")));
    for (const h of hrefs) expect(h).not.toBe("/#");
  }
  expect(errors).toEqual([]);
  const missing = await page.goto("/not-a-real-page");
  expect(missing?.status()).toBe(404);
});
test("hero inspector and navigation are keyboard usable", async ({
  page,
}, testInfo) => {
  await page.goto("/");
  await page.getByRole("button", { name: "Inspect scene" }).click();
  await expect(
    page.getByText("SCENE INSPECTOR", { exact: true }),
  ).toBeVisible();
  await page.keyboard.press("Tab");
  if (testInfo.project.name === "mobile") {
    await page.getByRole("button", { name: "Open navigation" }).click();
    await page
      .getByRole("navigation", { name: "Mobile" })
      .getByRole("link", { name: "Playground" })
      .click();
  } else
    await page
      .getByRole("navigation", { name: "Primary" })
      .getByRole("link", { name: "Playground" })
      .click();
  await expect(page).toHaveURL("/playground");
});
test("traversal, quest persistence, NPC transitions, and reset", async ({
  page,
}) => {
  await page.goto("/playground");
  const traversal = page.locator("#traversal");
  await expect(
    traversal.getByRole("button", { name: "Climb", exact: true }),
  ).toBeDisabled();
  for (let i = 0; i < 6; i++)
    await traversal.getByRole("button", { name: "Move right" }).click();
  await expect(traversal.getByRole("status")).toContainText(
    "Traversal Candidate",
  );
  await traversal.getByRole("button", { name: "Climb", exact: true }).click();
  await expect(traversal.getByRole("status")).toContainText("Climbing");
  await traversal.getByRole("button", { name: "Step", exact: true }).click();
  await expect(traversal.getByRole("status")).toContainText("Recovering");
  const q = page.locator("#quest");
  await expect(
    q.getByRole("button", { name: "Negotiate", exact: true }),
  ).toBeDisabled();
  await q.getByRole("button", { name: "Recover evidence" }).click();
  await q.getByRole("button", { name: "Negotiate", exact: true }).click();
  await expect(q.getByRole("status")).toContainText("Accord");
  await page.reload();
  await expect(q.getByRole("status")).toContainText("Accord");
  await expect(q.getByRole("button", { name: "Take tunnel" })).toBeDisabled();
  await q.getByRole("button", { name: "Reset quest" }).click();
  await expect(q.getByRole("status")).toContainText("Undecided");
  const ai = page.locator("#ai");
  await ai.getByRole("button", { name: "Make sound" }).click();
  await expect(ai.getByRole("status")).toContainText("Investigate");
  await ai.getByRole("button", { name: "Enter sight" }).click();
  await expect(ai.getByRole("status")).toContainText("Alert");
  await ai.getByRole("button", { name: "Leave sight" }).click();
  await expect(ai.getByRole("status")).toContainText("Search");
  await ai.getByRole("button", { name: "Advance time" }).click();
  await expect(ai.getByRole("status")).toContainText("Return");
});
test("memory reconstruction gates interpretation and resets", async ({
  page,
}) => {
  await page.goto("/work/echoes-of-the-divide");
  await expect(
    page.getByRole("button", { name: "Protect the witness" }),
  ).toBeDisabled();
  for (const t of ["The recording", "The maintenance log", "The witness"])
    await page
      .getByRole("button")
      .filter({ has: page.getByRole("heading", { name: t, exact: true }) })
      .click();
  await page.getByRole("button", { name: "Protect the witness" }).click();
  await expect(page.getByRole("status")).toContainText("You seal the archive");
  await page.getByRole("button", { name: "Reset memory study" }).click();
  await expect(
    page.getByRole("button", { name: "Publish the archive" }),
  ).toBeDisabled();
});
test("deterministic network resolution and reduced motion", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/engineering/multiplayer");
  await page.getByRole("button", { name: "Resolve requests" }).click();
  await expect(
    page.getByText("Ownership committed", { exact: true }),
  ).toHaveCount(1);
  await expect(
    page.getByText("Duplicate request", { exact: true }),
  ).toBeVisible();
  expect(
    await page.evaluate(
      () => getComputedStyle(document.documentElement).scrollBehavior,
    ),
  ).toBe("auto");
});

import { test, expect } from "@playwright/test";

test("development server survives first compilation and browsing every route", async ({
  page,
  request,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  for (const route of [
    "/",
    "/work",
    "/engineering",
    "/engineering/traversal",
    "/engineering/multiplayer",
    "/engineering/quest-state",
    "/engineering/combat",
    "/engineering/debugging",
    "/about",
    "/contact",
    "/work/echoes-of-the-divide",
    "/playground",
  ]) {
    const response = await page.goto(route);
    expect(response?.status(), route).toBe(200);
    await expect(page.locator("h1")).toBeVisible();
  }
  const lab = page.locator("#traversal");
  await lab.getByRole("button", { name: "Move right" }).click();
  await expect(lab.getByRole("status")).toContainText("Running");
  const quest = page.locator("#quest");
  await quest.getByRole("button", { name: "Recover evidence" }).click();
  await quest.getByRole("button", { name: "Negotiate", exact: true }).click();
  await expect(quest.getByRole("status")).toContainText("Accord");
  await page
    .getByRole("navigation", { name: "Primary" })
    .getByRole("link", { name: "Work", exact: true })
    .click();
  await expect(page).toHaveURL("/work");
  await expect(page.locator("h1")).toContainText(
    "Systems with a point of view",
  );
  // Another request after client navigation catches a server that exited on compilation.
  expect((await request.get("/")).status()).toBe(200);
  expect(errors).toEqual([]);
});

import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
test("primary pages and demos have no automated WCAG A/AA violations", async ({
  page,
}) => {
  for (const url of [
    "/",
    "/work",
    "/engineering/traversal",
    "/playground",
    "/about",
    "/contact",
    "/work/echoes-of-the-divide",
  ]) {
    await page.goto(url);
    await page.locator("h1").waitFor();
    const result = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
      .analyze();
    expect(
      result.violations.map((v) => ({
        id: v.id,
        nodes: v.nodes.map((n) => n.target),
      })),
      url,
    ).toEqual([]);
  }
});
test("scene keyboard commands and unavailable session storage recover", async ({
  page,
}) => {
  await page.addInitScript(() => {
    Object.defineProperty(window, "sessionStorage", {
      get() {
        throw new Error("Storage unavailable");
      },
    });
  });
  await page.goto("/playground");
  const scene = page.getByRole("group", { name: /Traversal scene/ });
  await scene.focus();
  for (let i = 0; i < 6; i++) await page.keyboard.press("ArrowRight");
  await page.keyboard.press("Space");
  await expect(page.locator("#traversal").getByRole("status")).toContainText(
    "Climbing",
  );
  const q = page.locator("#quest");
  await q.getByRole("button", { name: "Take tunnel" }).click();
  await expect(q.getByRole("status")).toContainText("Passage");
});
test("all rendered internal links resolve and social preview is an image", async ({
  page,
  request,
}) => {
  const urls = new Set<string>();
  for (const path of [
    "/",
    "/work",
    "/engineering",
    "/about",
    "/contact",
    "/work/echoes-of-the-divide",
  ]) {
    await page.goto(path);
    await page.locator("h1").waitFor();
    for (const href of await page
      .locator('a[href^="/"]')
      .evaluateAll((nodes) => nodes.map((n) => n.getAttribute("href")!)))
      urls.add(href.split("#")[0]);
  }
  for (const url of urls) {
    const res = await request.get(url);
    expect(res.status(), url).toBe(200);
  }
  const og = await request.get("/social-preview");
  expect(og.status()).toBe(200);
  expect(og.headers()["content-type"]).toContain("image/png");
});

test("mobile disclosure disappears when viewport becomes desktop", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  await page.getByRole("button", { name: "Open navigation" }).click();
  await expect(page.getByRole("navigation", { name: "Mobile" })).toBeVisible();
  await page.setViewportSize({ width: 1440, height: 1000 });
  await expect(page.getByRole("navigation", { name: "Mobile" })).toBeHidden();
});

test("experiment controls wait for client activation", async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  try {
    const page = await context.newPage();
    await page.goto("http://127.0.0.1:3000/playground");
    await expect(
      page.locator("#traversal").getByRole("button", { name: "Move right" }),
    ).toBeDisabled();
  } finally {
    await context.close();
  }
});

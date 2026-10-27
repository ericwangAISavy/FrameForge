import { defineConfig } from "@playwright/test";
import base from "./playwright.config";

export default defineConfig({
  ...base,
  testDir: "./tests/dev",
  timeout: 120_000,
  workers: 1,
  use: { ...base.use, baseURL: "http://127.0.0.1:3100" },
  webServer: {
    command: "npm run dev -- --port 3100",
    url: "http://127.0.0.1:3100",
    reuseExistingServer: false,
    timeout: 120_000,
  },
  projects: [{ name: "development-chromium" }],
});

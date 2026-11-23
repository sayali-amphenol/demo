const { defineConfig, devices } = require("@playwright/test");

module.exports = defineConfig({
  testDir: "tests",
  reporter: "list",
  use: { ...devices["Desktop Chrome"], viewport: { width: 1440, height: 900 } }
});

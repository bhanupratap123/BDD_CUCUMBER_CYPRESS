import { defineConfig } from "cypress";
import {createEsbuildPlugin }from "@badeball/cypress-cucumber-preprocessor/esbuild";
import { addCucumberPreprocessorPlugin } from "@badeball/cypress-cucumber-preprocessor";
import createBundler from "@bahmutov/cypress-esbuild-preprocessor";

export default defineConfig({
  chromeWebSecurity: false,
  defaultCommandTimeout: 10000,
  viewportWidth: 1280,
  viewportHeight: 720,
  pageLoadTimeout: 60000,
  reporter: "cypress-mochawesome-reporter",

  reporterOptions: {
    reportDir: "cypress/reports",
    overwrite: false,
    html: true,
    json: true,
    charts: true,
    embeddedScreenshots: true,
    inlineAssets: true,
    saveAllAttempts: false,
  },

  screenshotsFolder: "cypress/reports/assets",
  videosFolder: "cypress/reports/assets",
  video: false,

  e2e: {
    specPattern: "**/*.feature", // 👈 correct for cucumber
    async setupNodeEvents(on, config) {
      // 👇 hook in the cucumber preprocessor
      await addCucumberPreprocessorPlugin(on, config);

      on(
        "file:preprocessor",
        createBundler({
          plugins: [createEsbuildPlugin(config)],
        })
      );

      return config;
    },
  },
});
import { defineConfig, mergeConfig } from "vitest/config";
// @ts-ignore
import viteConfig from "@learnedlocal/config/vitest/vitest.config.mjs";

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      environment: "jsdom",
    },
  })
);

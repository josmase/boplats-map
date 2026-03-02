import { describe, expect, it } from "vitest";
import App from "./App.vue";

describe("App", () => {
  it("component is defined and not null", () => {
    expect(App).toBeDefined();
    expect(App).not.toBeNull();
  });

  it("component is imported successfully", () => {
    // Vue single-file components are imported as module objects
    // The actual test is that import doesn't fail
    expect(typeof App).not.toBe("undefined");
  });
});

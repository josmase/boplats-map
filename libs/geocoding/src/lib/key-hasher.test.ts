import { createHash } from "node:crypto";
import { KeyHasher } from "./key-hasher.ts";
import { expect } from "@std/expect";
import { stub } from "@std/testing/mock";
import { describe, it } from "@std/testing/bdd";

Deno.test("KeyHasher", () => {
  describe("hashQuery", () => {
    it("should hash a string query correctly", () => {
      const keyHasher = new KeyHasher();
      const query = "example query";
      const expectedHash = createHash("sha1")
        .update(JSON.stringify(query))
        .digest("base64");

      const result = keyHasher.hashQuery(query);

      expect(result).toEqual(expectedHash);
    });

    it("should hash a structured query correctly", () => {
      const keyHasher = new KeyHasher();
      const query = { city: "Stockholm", country: "Sweden" };
      const expectedHash = createHash("sha1")
        .update(JSON.stringify(query))
        .digest("base64");

      const result = keyHasher.hashQuery(query);

      expect(result).toEqual(expectedHash);
    });

    it(
      "should produce consistent hashes for the same input when structured query",
      () => {
        const keyHasher = new KeyHasher();
        const query = { city: "Stockholm", country: "Sweden" };

        const hash1 = keyHasher.hashQuery(query);
        const hash2 = keyHasher.hashQuery(query);

        expect(hash1).toEqual(hash2);
      },
    );

    it(
      "should produce consistent hashes for the same input when string",
      () => {
        const keyHasher = new KeyHasher();
        const query = "example query";

        const hash1 = keyHasher.hashQuery(query);
        const hash2 = keyHasher.hashQuery(query);

        expect(hash1).toEqual(hash2);
      },
    );

    it("should handle empty objects", () => {
      const keyHasher = new KeyHasher();
      const query = {};
      const expectedHash = createHash("sha1")
        .update(JSON.stringify(query))
        .digest("base64");

      const result = keyHasher.hashQuery(query);

      expect(result).toEqual(expectedHash);
    });

    it("should handle empty strings", () => {
      const keyHasher = new KeyHasher();
      const query = "";
      const expectedHash = createHash("sha1")
        .update(JSON.stringify(query))
        .digest("base64");

      const result = keyHasher.hashQuery(query);

      expect(result).toEqual(expectedHash);
    });

    it("should handle exceptions gracefully", () => {
      const keyHasher = new KeyHasher();
      const query = undefined as unknown as string; // Invalid input
      stub(createHash.prototype, "update", () => {
        throw new Error("Mocked hash error");
      });

      expect(keyHasher.hashQuery(query)).toThrow("Mocked hash error");
    });
  });
});

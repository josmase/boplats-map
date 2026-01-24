import type { KeyHasher } from "../key-hasher.ts";
import { createMock } from "@boplats/testing";

export class MockKeyHasher implements KeyHasher {
  hashQuery(query: any): string {
    return "mocked-hash";
  }
}

export const createMockKeyHasher = (): KeyHasher => {
  return createMock<KeyHasher>(new MockKeyHasher());
};

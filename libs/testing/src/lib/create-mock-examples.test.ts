import { expect, describe, it } from "bun:test";
import { createMock } from "@boplats/testing";

// Example showing how to use createMock with different scenarios

describe("createMock usage examples", () => {
  it("example 1: simple mock without private members", () => {
    interface Calculator {
      add(a: number, b: number): number;
    }

    class MockCalculator {
      add(a: number, b: number) {
        return 0; // mocked behavior
      }
    }

    const mockCalc = createMock<Calculator>(new MockCalculator());
    expect(mockCalc.add(1, 2)).toBe(0);
  });

  it("example 2: mock with class that has private members", () => {
    class UserService {
      constructor(private readonly apiKey: string) {}
      
      async getUser(id: string) {
        return this.fetchFromApi(id);
      }
      
      private async fetchFromApi(id: string) {
        return { id, name: "real" };
      }
    }

    // Mock cannot implement UserService due to private members
    class MockUserService {
      async getUser(id: string) {
        return { id, name: "mocked" };
      }
    }

    const mockService = createMock<UserService>(new MockUserService());
    const result = mockService.getUser("123");
    expect(result).resolves.toEqual({ id: "123", name: "mocked" });
  });

  it("example 3: factory function pattern (recommended)", () => {
    interface EmailService {
      send(to: string, message: string): Promise<void>;
    }

    class MockEmailService {
      async send(to: string, message: string) {
        // mock does nothing
      }
    }

    const createMockEmailService = (): EmailService => {
      return createMock<EmailService>(new MockEmailService());
    };

    const service = createMockEmailService();
    expect(service.send("test@example.com", "Hello")).resolves.toBeUndefined();
  });
});

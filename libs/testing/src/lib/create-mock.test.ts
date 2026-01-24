import { expect, describe, it } from "bun:test";
import { createMock } from "./create-mock.ts";

class ServiceWithPrivates {
  constructor(private readonly config: any) {}
  
  public doSomething() {
    return this.privateMethod();
  }
  
  private privateMethod() {
    return "real implementation";
  }
}

class MockServiceWithPrivates {
  public doSomething() {
    return "mocked implementation";
  }
}

describe("createMock", () => {
  it("should create a type-safe mock", () => {
    const mock = createMock<ServiceWithPrivates>(new MockServiceWithPrivates());
    
    const result = mock.doSomething();
    
    expect(result).toBe("mocked implementation");
  });

  it("should work with factory functions", () => {
    const createMockService = (): ServiceWithPrivates => {
      return createMock<ServiceWithPrivates>(new MockServiceWithPrivates());
    };
    
    const mock = createMockService();
    expect(mock.doSomething()).toBe("mocked implementation");
  });
});

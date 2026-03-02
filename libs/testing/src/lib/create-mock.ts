/**
 * Creates a type-safe mock object from a mock class instance.
 * This helper avoids TypeScript errors when mock classes try to implement
 * classes with private members by using type assertion.
 * 
 * @param mockInstance - The mock instance to convert
 * @returns The mock instance typed as T
 * 
 * @example
 * ```typescript
 * const mock = createMock<MyService>(new MockMyService());
 * ```
 */
export function createMock<T>(mockInstance: any): T {
  return mockInstance as unknown as T;
}

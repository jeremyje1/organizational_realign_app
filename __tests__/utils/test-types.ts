// __tests__/utils/test-types.ts
// TypeScript definitions for Jest utility functions

import { jest } from '@jest/globals';

/**
 * Creates a typed mock function with proper generic type support
 * @param implementation Optional mock implementation
 */
export function createTypedMock<T extends (...args: any[]) => any>(implementation?: T): jest.MockedFunction<T> {
  return jest.fn(implementation) as unknown as jest.MockedFunction<T>;
}

/**
 * Helper for creating mock objects with typed methods
 * @param mockObj The object to add typed mocks to
 * @returns The mock object with properly typed mock functions
 */
export function createMockObject<T extends Record<string, (...args: any[]) => any>>(
  mockObj: {[K in keyof T]?: jest.MockedFunction<T[K]>}
): {[K in keyof T]: jest.MockedFunction<T[K]>} {
  const result = { ...mockObj } as {[K in keyof T]: jest.MockedFunction<T[K]>};
  
  // Fill in any missing properties with jest.fn()
  for (const key in mockObj) {
    if (mockObj[key] === undefined) {
      result[key] = jest.fn() as unknown as jest.MockedFunction<T[typeof key]>;
    }
  }
  
  return result;
}

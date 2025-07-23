// __tests__/api/simple.test.js
const { describe, expect, test } = require('@jest/globals');

describe('Simple Test Suite', () => {
  test('should add numbers correctly', () => {
    expect(1 + 1).toBe(2);
  });
});

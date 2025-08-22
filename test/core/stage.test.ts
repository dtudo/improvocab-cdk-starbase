import { Stage } from '../../src/core';

describe('Stage', () => {
  it('should have the expected values', () => {
    expect(Stage.BETA).toBe('beta');
    expect(Stage.GAMMA).toBe('gamma');
    expect(Stage.PROD).toBe('prod');
    expect(Object.values(Stage)).toStrictEqual(['beta', 'gamma', 'prod']);
  });
});

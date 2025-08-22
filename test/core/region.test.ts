import { Region } from '../../src/core';

describe('Account', () => {
  it('should have the expected values', () => {
    expect(Region.US_EAST_1).toBe('us-east-1');
    expect(Object.values(Region)).toStrictEqual(['us-east-1']);
  });
});

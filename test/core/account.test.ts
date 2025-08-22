import { Account } from '../../src/core';

describe('Account', () => {
  it('should have the expected values', () => {
    expect(Account.BETA).toBe('693925625321');
    expect(Account.GAMMA).toBe('124713843761');
    expect(Account.PROD).toBe('189387675777');
    expect(Object.values(Account)).toStrictEqual(['693925625321', '124713843761', '189387675777']);
  });
});

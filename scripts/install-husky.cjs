#!/usr/bin/env node
/**
 * Install Husky hooks unless running in CI
 */
async function main() {
  if (process.env.CI === 'true') {
    console.log('⚠️  Skipping Husky install (CI mode)');
    return;
  }

  try {
    const husky = (await import('husky')).default;
    husky();
  } catch (err) {
    throw new Error('❌  Failed to install Husky hooks', { cause: err });
  }

  console.log('✅  Husky hooks installed');
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});

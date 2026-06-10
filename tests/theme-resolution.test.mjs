import test from 'node:test';
import assert from 'node:assert/strict';

function resolveTheme(stored, cookie, prefersDark) {
  if (stored === 'dark' || stored === 'light') return stored;
  if (cookie === 'dark' || cookie === 'light') return cookie;
  return prefersDark ? 'dark' : 'light';
}

test('stored theme wins over cookie and system preference', () => {
  assert.equal(resolveTheme('dark', 'light', false), 'dark');
});

test('cookie wins when storage is invalid', () => {
  assert.equal(resolveTheme('bogus', 'dark', false), 'dark');
});

test('system preference is fallback', () => {
  assert.equal(resolveTheme(null, null, true), 'dark');
  assert.equal(resolveTheme(undefined, undefined, false), 'light');
});

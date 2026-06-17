import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { spawnSync } from 'node:child_process';

const distDir = 'dist';
const assetsDir = join(distDir, 'assets');
const indexPath = join(distDir, 'index.html');

function fail(message) {
  console.error(`[build] ${message}`);
  process.exit(1);
}

if (!existsSync(indexPath)) {
  fail('Missing dist/index.html. Commit or generate the static site before deploying.');
}

if (!existsSync(assetsDir)) {
  fail('Missing dist/assets directory. Commit or generate the static site before deploying.');
}

const indexHtml = readFileSync(indexPath, 'utf8');
const jsAssets = readdirSync(assetsDir).filter((file) => file.endsWith('.js'));
const cssAssets = readdirSync(assetsDir).filter((file) => file.endsWith('.css'));

if (jsAssets.length === 0) {
  fail('Missing JavaScript asset in dist/assets.');
}

if (cssAssets.length === 0) {
  fail('Missing CSS asset in dist/assets.');
}

for (const asset of [...jsAssets, ...cssAssets]) {
  if (!indexHtml.includes(`/assets/${asset}`) && !indexHtml.includes(`./assets/${asset}`)) {
    fail(`dist/index.html does not reference ${asset}.`);
  }
}

for (const asset of jsAssets) {
  const result = spawnSync(process.execPath, ['--check', join(assetsDir, asset)], {
    stdio: 'inherit',
  });

  if (result.status !== 0) {
    fail(`JavaScript syntax check failed for ${asset}.`);
  }
}

console.log('[build] Prebuilt dist verified. Cloudflare Pages can deploy dist/.');

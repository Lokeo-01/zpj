const fs = require('fs');
const path = require('path');

const root = process.cwd();
const dist = path.join(root, 'dist');
const skip = new Set(['dist', 'node_modules']);

fs.mkdirSync(dist, { recursive: true });

for (const entry of fs.readdirSync(root, { withFileTypes: true })) {
  if (skip.has(entry.name)) continue;
  if (entry.name.endsWith('.zip')) continue;

  const from = path.join(root, entry.name);
  const to = path.join(dist, entry.name);
  fs.cpSync(from, to, { recursive: true, force: true });
}

console.log('Static portfolio copied to dist.');

const fs = require('node:fs');

const file = process.argv[2];

if (!file) {
  console.error('Usage: node scripts/disable-opening-animation.cjs <asset-file>');
  process.exit(1);
}

let text = fs.readFileSync(file, 'utf8');

const patterns = [
  {
    old: 'const r=window.matchMedia("(prefers-reduced-motion: reduce)").matches,s=dt.context(()=>{',
    next: 'const r=!0,s=dt.context(()=>{',
  },
  {
    old: "const r=window.matchMedia('(prefers-reduced-motion: reduce)').matches,s=dt.context(()=>{",
    next: 'const r=!0,s=dt.context(()=>{',
  },
];

let changed = false;
for (const pattern of patterns) {
  if (text.includes(pattern.old)) {
    text = text.replace(pattern.old, pattern.next);
    changed = true;
    break;
  }
}

if (!changed) {
  console.error('Opening animation pattern not found:', file);
  process.exit(1);
}

fs.writeFileSync(file, text, 'utf8');
console.log('Opening animation disabled:', file);

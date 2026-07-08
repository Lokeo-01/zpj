const fs = require('node:fs');
const path = require('node:path');

const baseUrl = process.argv[2] || 'http://127.0.0.1:5188/';
const outDir = path.resolve(process.argv[3] || '最终版-来自5188');

const staticFiles = [
  '/',
  '/build.cjs',
  '/package.json',
  '/README.md',
  '/server.cjs',
];

function localPathFromUrl(urlPath) {
  const clean = decodeURIComponent(urlPath.split('?')[0]).replace(/^\/+/, '') || 'index.html';
  return path.join(outDir, clean);
}

async function fetchText(urlPath) {
  const response = await fetch(new URL(urlPath, baseUrl));
  if (!response.ok) throw new Error(`${response.status} ${urlPath}`);
  return response.text();
}

async function download(urlPath) {
  const response = await fetch(new URL(urlPath, baseUrl));
  if (!response.ok) {
    console.warn(`[skip] ${response.status} ${urlPath}`);
    return false;
  }

  const filePath = localPathFromUrl(urlPath);
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, Buffer.from(await response.arrayBuffer()));
  return true;
}

function collectAssetPaths(text) {
  const paths = new Set();
  const quoted = /["'`](?:\.\/|\/)(assets|backgrounds|icons|optimized|works)\/[^"'`?#)]+/g;
  const cssUrl = /url\((?:["']?)(?:\.\/|\/)?(assets|backgrounds|icons|optimized|works)\/[^"')?#]+/g;

  for (const match of text.matchAll(quoted)) {
    const raw = match[0].slice(1).replace(/^\.\//, '/');
    paths.add(raw.startsWith('/') ? raw : `/${raw}`);
  }

  for (const match of text.matchAll(cssUrl)) {
    const raw = match[0].replace(/^url\(["']?/, '').replace(/^\.\//, '/');
    paths.add(raw.startsWith('/') ? raw : `/${raw}`);
  }

  return paths;
}

async function main() {
  fs.rmSync(outDir, { recursive: true, force: true });
  fs.mkdirSync(outDir, { recursive: true });

  const queue = new Set(staticFiles);
  const downloaded = new Set();

  while (queue.size) {
    const [urlPath] = queue;
    queue.delete(urlPath);
    if (downloaded.has(urlPath)) continue;
    downloaded.add(urlPath);

    const ok = await download(urlPath);
    if (!ok) continue;

    const ext = path.extname(urlPath.split('?')[0]).toLowerCase();
    if (urlPath === '/' || ext === '.html' || ext === '.js' || ext === '.css') {
      const text = fs.readFileSync(localPathFromUrl(urlPath), 'utf8');
      for (const assetPath of collectAssetPaths(text)) queue.add(assetPath);
    }
  }

  const files = [];
  const walk = (dir) => {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) walk(full);
      else files.push(full);
    }
  };
  walk(outDir);

  const largest = files.reduce((max, file) => Math.max(max, fs.statSync(file).size), 0);
  console.log(`[mirror] ${files.length} files`);
  console.log(`[mirror] largest=${largest}`);
  console.log(`[mirror] output=${outDir}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});

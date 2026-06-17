const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');

const root = path.join(__dirname, '..', 'dist');
const port = 5188;

const types = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
};

function send(res, status, body, headers = {}) {
  res.writeHead(status, headers);
  res.end(body);
}

http
  .createServer((req, res) => {
    const url = new URL(req.url || '/', `http://127.0.0.1:${port}`);
    const pathname = decodeURIComponent(url.pathname);
    const safePath = path.normalize(pathname === '/' ? 'index.html' : pathname.replace(/^\/+/, ''));
    const filePath = path.join(root, safePath);

    if (!filePath.startsWith(root)) {
      send(res, 403, 'Forbidden');
      return;
    }

    fs.readFile(filePath, (error, data) => {
      if (error) {
        send(res, 404, 'Not found');
        return;
      }

      const type = types[path.extname(filePath).toLowerCase()] || 'application/octet-stream';
      send(res, 200, data, {
        'Content-Type': type,
        'Cache-Control': 'no-store',
      });
    });
  })
  .listen(port, '127.0.0.1', () => {
    console.log(`Local preview: http://127.0.0.1:${port}/`);
  });

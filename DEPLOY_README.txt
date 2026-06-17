Cloudflare Pages settings:
Build command: npm run build
Output directory: dist

Local preview:
Double-click preview-local.bat, keep the black window open, then open:
http://127.0.0.1:5188/

Contents:
- dist contains the generated website, JavaScript, CSS, and images.
- scripts/verify-dist.mjs checks the deployed dist folder.
- scripts/preview-local.cjs runs a local preview server.

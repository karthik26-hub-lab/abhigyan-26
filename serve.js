const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;
const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.json': 'application/json',
  '.woff2': 'font/woff2',
  '.woff': 'font/woff'
};

const server = http.createServer((req, res) => {
  const parsedUrl = req.url.split('?')[0];
  let reqUrl = (parsedUrl === '/' || parsedUrl === '') ? '/index.html' : parsedUrl;
  const filePath = path.join(__dirname, reqUrl);
  const ext = path.extname(filePath);

  fs.readFile(filePath, (err, content) => {
    if (err) {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end(`File not found: ${reqUrl}`);
    } else {
      res.writeHead(200, { 'Content-Type': MIME_TYPES[ext] || 'application/octet-stream' });
      res.end(content);
    }
  });
});

server.listen(PORT, () => {
  console.log(`Abhigyan '26 dev server running at http://localhost:${PORT}/`);
});

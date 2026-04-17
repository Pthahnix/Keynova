// Zero-dependency Node.js dev server with hot reload
// Usage: node dev-server/serve.js presentations/my-talk/
// Serves on localhost:3000 (or --port NNNN)

var http = require('http');
var fs = require('fs');
var path = require('path');
var crypto = require('crypto');

var args = process.argv.slice(2);
var dir = args.find(function(a) { return !a.startsWith('--'); }) || '.';
var port = parseInt((args.find(function(a) { return a.startsWith('--port'); }) || '').split('=')[1]) || 3000;
dir = path.resolve(dir);

var MIME = {
  '.html': 'text/html', '.css': 'text/css', '.js': 'application/javascript',
  '.json': 'application/json', '.png': 'image/png', '.jpg': 'image/jpeg',
  '.svg': 'image/svg+xml', '.ico': 'image/x-icon', '.woff2': 'font/woff2'
};

var WS_SCRIPT = '<script>(function(){var ws=new WebSocket("ws://"+location.host+"/__reload");ws.onmessage=function(){location.reload()};ws.onclose=function(){setTimeout(function(){location.reload()},1000)};})()</script>';

var wsClients = [];

function handleUpgrade(req, socket) {
  var key = req.headers['sec-websocket-key'];
  var accept = crypto.createHash('sha1')
    .update(key + '258EAFA5-E914-47DA-95CA-5AB5DC562615')
    .digest('base64');
  socket.write(
    'HTTP/1.1 101 Switching Protocols\r\n' +
    'Upgrade: websocket\r\n' +
    'Connection: Upgrade\r\n' +
    'Sec-WebSocket-Accept: ' + accept + '\r\n\r\n'
  );
  wsClients.push(socket);
  socket.on('close', function() {
    wsClients = wsClients.filter(function(s) { return s !== socket; });
  });
  socket.on('error', function() {
    wsClients = wsClients.filter(function(s) { return s !== socket; });
  });
}

function notifyReload() {
  var frame = Buffer.alloc(4);
  frame[0] = 0x81;
  frame[1] = 2;
  frame[2] = 0x6F;
  frame[3] = 0x6B;
  wsClients.forEach(function(socket) {
    try { socket.write(frame); } catch (e) {}
  });
}

var server = http.createServer(function(req, res) {
  var urlPath = req.url.split('?')[0];
  if (urlPath === '/') urlPath = '/index.html';
  var filePath = path.join(dir, urlPath);

  if (!filePath.startsWith(dir)) {
    res.writeHead(403);
    res.end('Forbidden');
    return;
  }

  fs.readFile(filePath, function(err, data) {
    if (err) {
      res.writeHead(404);
      res.end('Not found: ' + urlPath);
      return;
    }
    var ext = path.extname(filePath);
    var mime = MIME[ext] || 'application/octet-stream';
    if (ext === '.html') {
      data = data.toString().replace('</body>', WS_SCRIPT + '</body>');
    }
    res.writeHead(200, { 'Content-Type': mime });
    res.end(data);
  });
});

server.on('upgrade', function(req, socket) {
  if (req.url === '/__reload') handleUpgrade(req, socket);
  else socket.destroy();
});

var debounce = null;
fs.watch(dir, { recursive: true }, function(event, filename) {
  if (!filename) return;
  clearTimeout(debounce);
  debounce = setTimeout(function() {
    console.log('[reload] ' + filename + ' changed');
    notifyReload();
  }, 200);
});

server.listen(port, function() {
  console.log('Serving ' + dir + ' at http://localhost:' + port);
  console.log('Press Ctrl+C to stop');
});

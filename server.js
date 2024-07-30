const https = require('https');
const fs = require('fs');
const path = require('path');

const server = https.createServer({
  key: fs.readFileSync(path.join(__dirname, 'certs/server/server_key.pem')),
  cert: fs.readFileSync(path.join(__dirname, 'certs/server/server_cert.pem')),
  ca: [
    fs.readFileSync(path.join(__dirname, 'certs/server/server_cert.pem')),
  ],
  requestCert: true,
  rejectUnauthorized: false,
}, (req, res) => {
  if (!req.client.authorized) {
    res.writeHead(401, {'Content-Type': 'text/plain'});
    res.end('Unauthorized\n');
    return;
  }
  const cert = req.socket.getPeerCertificate();
  res.writeHead(200);
  res.end(`Hello ${cert.subject.CN}!\n`);
});

server.listen(1234, () => {
  console.log('Server listening on https://localhost:1234');
});
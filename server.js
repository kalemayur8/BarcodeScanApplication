var fs = require('fs');
var http = require('http');
var https = require('https');
var privateKey  = fs.readFileSync('server.key', 'utf8');
var certificate = fs.readFileSync('server.cert', 'utf8');

var credentials = {key: privateKey, cert: certificate};
var express = require('express');
var app = express();

var express = require('express');
var app = express();

app.use(express.static(__dirname + '/www'));
//app.listen('3000');
// your express configuration here
var httpServer = http.createServer(app);
var httpsServer = https.createServer(credentials, app);
httpServer.listen(8080,'0.0.0.0');
httpsServer.listen(8443,'0.0.0.0');
console.log('http : 8080');
console.log('https : 8443');

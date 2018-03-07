var http = require('http');
var https = require('https');
var IP = '192.168.1.114';

var PROD = false;
var lex = require('greenlock-express').create({
  server: PROD ? 'https://acme-v01.api.letsencrypt.org/directory' : 'staging',
  approveDomains: (opts, certs, cb) => {
    if (certs) {
      opts.domains = ['coffelytics.com', 'coffelytics.com']
    } else { 
      opts.email = 'coffelytics@gmail.com'; 
      opts.agreeTos = true;
    }
    cb(null, { options: opts, certs: certs });
  }
});
var middlewareWrapper = lex.middleware;

function handler(req, res) {
  res.end('Hello World!');
}

http.createServer(handler).listen(8000);
https.createServer(
  lex.httpsOptions,
  middlewareWrapper(handler)
).listen(1000);
console.log('Servidor Criado!!');
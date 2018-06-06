var fs = require('fs');
var crypto = require('crypto');
var data = fs.readFileSync('./uploads/1528117181847_.PNG');
var wallet = "asdasd";
var hash = crypto.createHash('sha256').update(data).digest('base64');
hash = crypto.createHash('sha256').update(data+wallet).digest('base64');
console.log(hash);

console.log(new Date().valueOf().toString());

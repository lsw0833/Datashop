var database = require('../model/database');
var BlockChainParser = require('../model/BlockChainParser');
var fs = require('fs');
var crypto = require('crypto');

var db = new database('127.0.0.1', 'root', 'rootpw', 3306, 'DS');
var parse = new BlockChainParser();
db.connectInMysql(() => {
  console.log("Mysql start!");
});
var home = function(req, res) {
  res.render('main.ejs', {
    pass: 0
  });
};
var dataList = function(req, res) {
  db.selectInMysql((rows) => {
    res.send(rows);
  });
};
var download = function(req, res) {
  var s_wallet = req.query.s_wallet || req.body.s_wallet;
  var dataId = req.query.dataId || req.body.dataId;
  db.selectOneInMysql(dataId, (row) => {
    if (row.length!=0) {
      var temp = row[0];
      var data = fs.readFileSync('./uploads/' + temp.file);
      var hash = crypto.createHash('sha256').update(data).digest('base64');
      hash = crypto.createHash('sha256').update(hash + temp.wallet).digest('base64');
      parse.parseData((result) => {
        if (result.indexOf(hash) == -1) {
          console.log("없음");
          res.render('main.ejs', {
            pass: 2
          });
        } else {
          console.log("존재");
          res.download('./uploads/' + temp.file);
        }
      });
    }else{
      res.render('main.ejs', {
        pass: 2
      });
    }
  });
};
module.exports.home = home;
module.exports.dataList = dataList;
module.exports.download = download;

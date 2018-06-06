var request = require('request');

class BlockChainParser {
  constructor(){}
  parseData(callback){
    var result=[];
    var options = {
      url: 'http://163.180.117.185:30300/blockChain',
      method: 'GET',
      headers: this.headers,
      json: true
    };
    request(options, (err, res, body) => {
      var blockChain = body.blockChain;
      for(var i =0; i<blockChain.length; i++){
        var dataInBlock = blockChain[i].data;
        for(var j=0; j<dataInBlock.length; j++){
          if(dataInBlock[j].TXID.indexOf('datashop')==0){
            result.push(dataInBlock[j].TXData);
          }
        }
      }
      callback(result);
    });
  }
}
module.exports = BlockChainParser;

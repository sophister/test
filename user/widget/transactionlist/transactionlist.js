 var Common = require('common'),
     Protocol = require('protocol'),
     list = require('list');

 var rsp = Common.loadJSON('#transactions-rsp', true);
 var list = new list({
    name: 'transactions',
    api: Protocol.API.getUserTransactions,
    title: true,
    pagination: true
  })
var listinit = function(){
	list.init(rsp);
}


var transactionslist = {
	list : list,
	listinit:listinit,
    liststatus:rsp.status
}


// var transactionslist = {
// 	list : "ddd"
// }

 module.exports = transactionslist;
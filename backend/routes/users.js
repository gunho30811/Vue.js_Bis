var express = require('express');
var router = express.Router();

var mysql =require('mysql'); //mysql 사용을 위함
//mysql Connect
var connection =mysql.createConnection({
  host:'localhost',
  port:3306,
  user:'root',
  password:'123456',
  database:'example'
});
//만약 DB 접속이 에러가 나면 처리해주는 코드
connection.connect(function(err){
  if(err){
    console.error('mysql connection error');
    console.error(err);
    throw err;
  }
});
/* GET users listing. */
router.get('/', function(req, res) {
  connection.query('SELECT*FROM bistellist', function(err,rows){
    if(err) throw err;
    res.send(rows);
  });
});

/* Post users listing */
// router.post('/y', function(req, res){
//   if(req.body.option == )

// })

module.exports = router;

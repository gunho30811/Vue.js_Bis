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
router.post('/y', function(req, res){
  console.log(req.body.options);
  console.log(req.body.searchkeyword);
  if(req.body.options == 'Name'){
    connection.query("SELECT*FROM bistellist WHERE employee like ? ",'%'+req.body.searchkeyword+'%', function(err,rows){
      if(err) throw err;
      res.send(rows);
    })
  }else if(req.body.options == 'Dep'){
    connection.query("SELECT*FROM bistellist WHERE department like ? ",'%'+req.body.searchkeyword+'%', function(err,rows){
      if(err) throw err;
      res.send(rows);
    })
  }else if(req.body.options == 'Team'){
    connection.query("SELECT*FROM bistellist WHERE team like ? ",'%'+req.body.searchkeyword+'%', function(err,rows){
      if(err) throw err;
      res.send(rows);
    })
  }
  else { 
    console.log("데이터보내기실패");
  };
});

/*post update */
router.post('/u', function(req, res){
  console.log('백엔드에서 동작하나?');
  var updatedlist=req.body.updating;
  console.log(updatedlist);
  var key=updatedlist.map(row=>row.Num);
  var employee=updatedlist.map(row=>row.employee);
  var employeeenglish=updatedlist.map(row=>row.employeeenglish);
  var department=updatedlist.map(row=>row.department);
  var team=updatedlist.map(row=>row.team);
  var email=updatedlist.map(row=>row.email);
  console.log(email);
  connection.query("UPDATE bistellist SET employee=?,employeeenglish=?,department=?,team=?,email=? WHERE Num=?",
  [employee,employeeenglish,department,team,email,key], function(err,rows){
    if(err) throw err;
    res.send(rows);
  });
});

router.post('/add', function(req, res){
  console.log('백엔드 add에서 동작하나?');
  const Num=req.body.add_Num;
  const Name=req.body.add_Name;
  const dep=req.body.add_dep;
  const team=req.body.add_team;
  const email=req.body.add_email;
  const Eng=req.body.add_Eng;
  connection.query("INSERT INTO bistellist values(?,?,?,?,?,?)",
  [Num,Name,Eng,dep,team,email], function(err,rows){
  if(err) throw err;
  res.send(rows);
  });
});

router.post('/del', function(req, res){
  console.log('백엔드 del에서 동작하나?');
  var Num=req.body.del_Num;
  connection.query("DELETE FROM bistellist WHERE Num = ?",
  Num, function(err,rows){
  if(err) throw err;
  res.send(rows);
  });
});


module.exports = router;

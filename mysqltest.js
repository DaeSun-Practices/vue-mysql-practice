const mysql = require('mysql'); //mysql을 가져옴

const connection = mysql.createConnection({ //mysql을 init
  host     : '115.71.233.22',
  user     : 'testuser',
  password : 'testuser!@#',
  database : 'testdb'
});
 
connection.connect(); //다른 프로세스가 비동기적으로 실행함

//각각의 쿼리는 병렬적으로 실행된다.
//그래서 뭐가 먼저 실행될지 모른다.
connection.query('update User set lastlogin=now() where uid=?', ['user2'], function (error, results, fields) {
  if (error) throw error;
  console.log('The Update', results.affectedRows);

connection.query('select * from User where uid=?', ['user2'], function (error, results, fields) {  //이건 다른 쓰레드가 주는 것
  if (error) throw error;                          // 이 두줄은 내프로세스가 실행하는 것
  console.log('The First User is: ', results[0]);  //

connection.end();







//쿼리 안에 쿼리를 넣어줌으로써 실행 순서를 정해줄 수 있다.
connection.query('update User set lastlogin=now() where uid=?', ['user2'], function (error, results, fields) {
  if (error) throw error;
  console.log('The Update', results.affectedRows);

  connection.query('select * from User where uid=?', ['user2'], function (error, results, fields) {
    if (error) throw error;
    console.log('The First User is: ', results[0]);

    connection.query('delete ', (error) => {
      if (error) throw error;
      connection.end();  //모든 쿼리가 끝난 다음에 커넥션을 끊어줘야 한다.
      //그런데, 중간에 error가 뜨면 어떻게 하나?
      //지옥이다
    });

    
  });
});

//
connection.beginTransaction(err2 => {
  connection.query('update User set lastlogin=now() where uid=?', ['user2'], function (error, results, fields) {
    if (error) throw error;
    console.log('The Update', results.affectedRows);

    connection.query('select * from User where uid=?', ['user2'], function (error, results, fields) {
      if (error) throw error;
      console.log('The First User is: ', results[0]);

      connection.query('delete ', (error) => {
        if (error) throw error;
        connection.end();  
      });

      
    });
  });
});
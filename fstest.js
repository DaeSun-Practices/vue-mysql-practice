const fs = require('fs');    //파일 시스템을 불러오기
const util = require('util'); //util가져오기

// __dirname : 현재 디렉토리를 의미한다.

//fs에게 업무를 줘버리고 계속 프로세스를 진행하게 된다. : 이것이 비동기이다.
fs.readFile(__dirname + '/test.json', 'utf-8', (err, data) => {
        if (err) return console.error(err);

        util.log("data>>", data);
});

util.log("------------------------"); //util로 콘솔을 찍으면 찍힌 시간이 나온다.

const msgfile = __dirname + '/message.txt';
// writeFileSync는 말그대로, Synchronoce하게, 동기적으로 읽는 것으로, 파일을 다 읽을 때까지 기다려야 한다.
fs.writeFileSync(msgfile, 'Hello Node.js 세종대왕!!', (err) => {
  if (err) throw err;
  console.log('The file has been saved!');
});

let data2 = fs.readFileSync(msgfile, 'utf-8');
util.log("data2>>", data2);

util.log("===================================", data2);


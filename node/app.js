const express = require('express');

const app = express();
const port = 3000;


app.get('/', ( _ ,res) => {
    res.sendFile(__dirname + '/index.html');
});

/*expree 내부 http 모듈이 http.createServer() 후 
생성된 서버에 포트 연결 listen ->listen 메소드는 비동기적으로 작용, 완료시 콜백이 실행됨*/
const server = app.listen( port, () => {
    console.log('Express listening on port', port);
});

//서버에 socket서버 붙임
const listen = require('socket.io');
const io = listen(server);

//socket서버 띄우기
//받는건 on으로 보내는건 emit으로 
io.on('connection',(socket)=>{
    //브라우저에서 client message라는 변수명으로 서버에 데이터 전송
    //받는쪽에선 socket.on으로 계속 대기
    socket.on('client message',data=>{
        //서버와 연결된 클라이언트들에게 다 뿌림
        io.emit('server message',{
            message : data.message
        })
    });
});
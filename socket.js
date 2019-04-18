const WebSocket = require('ws');
const SocketIO = require('socket.io');
module.exports = (server) =>{
    //socketio이용
    //path부분이 클라이언트의 path(pug의 부분)와 일치해야 통신이 가능함 
    const io = SocketIO(server, {path : '/socket.io'});
    io.on('connection', (socket) =>{
        const req = socket.request;
        const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
        console.log('새로운 클라이언트 접속!', ip, socket.id, req.ip);
        socket.on('disconnect', () =>{
            console.log('클라이언트 접속 해제', ip, socket.id);
            clearInterval(socket.interval);
        });
        socket.on('error', (error) =>{
            console.error(error);
        });
        //reply는 사용자가 새로 만든 것! => 데이터를 보낼때 서버에서 받는 것 
        socket.on('reply', (data) =>{
            console.log(data);
        });
        socket.interval = setInterval(()=>{
            //news라는 이름으로 이벤트 보냄. 뒤에 인자를 내용으로 클라이언트에게 데이터를 보냄
            //메세지 받으려면 news 이벤트 리스너 만들어야함 
            socket.emit('news', 'hello socket.io');
        }, 3000);

    })


    //websocket이용
    /*
    const wss = new WebSocket.Server({server});

    wss.on('connection', (ws, req) =>{
        //클라이언트의 ip알아내는 방법 
        const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
        console.log('새로운 클라이언트 접속  client connection', ip);
        ws.on('message', (message) =>{
            console.log(message);
        });
        ws.on('error', (error) =>{
            console.error(error);
        });
        ws.on('close', ()=>{
            console.log('클라이언트 연결 끊김', ip);
            //아래서 지정한 interval을 없애는것 메모리 누수 막기 위함
            clearInterval(ws.interval);
        });

        //3초마다 연결된 모든 클라이언트에게 보냄 지금 open상태인지 확인 
        const interval = setInterval(()=>{
            if(ws.readyState === ws.OPEN){
                ws.send('서버에서 클라이언트로 메세지 전송');
            }
        }, 3000);
        ws.interval = interval;
    });*/
};
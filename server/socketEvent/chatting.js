const { socket: socketController } = require('../controllers');

const eventRoute = {
    // 'apply chatting' : socketController.applyChatting,
    
}


let connectionList = [];

const chattingRegist = (socket) => {
    console.log('chatting socket 연결 성공')

    //list 중복 고려하여 제거
    let check= false;
    connectionList.forEach(key => {
        if(key.userIdx === socket.user.userIdx) {
            key.socket = socket.id; //새로고침시 저장된 소켓아이디 정보 업데이트   
            return check=true;
        }
    })
    if(!check) connectionList.push(socket.user);
    
    socket.emit('connect_user', connectionList);

    socket.on('apply chatting', (userIdx)=> {
        let toSocketId;
        // 해당 userIdx의 socket id를 저장한다.
        connectionList.forEach(key => {
            if(key.userIdx === userIdx){
                toSocketId = key.socket;
            }
        })
        console.log(socket)
        socket.server.emit('send apply', {data : 1})
        // socket.server.socket(toSocketId).emit('apply chatting', {data : 1});
    })


    socket.on('disconnect', ()=> {
        const idx = connectionList.findIndex((item)=> item.socket === socket.id);
        if(idx>-1) connectionList.splice(idx, 1);
        socket.emit('connect_user', connectionList);
    })
    socket.on('error', (err)=> {
        console.log(err);
    })

    // Object.keys(eventRoute).forEach((key)=> {
    //     socket.on(key, () => {
    //         socket.on(key, eventRoute[key](socket));
    //     });
    // })
    
};

module.exports = {
    chattingRegist
};

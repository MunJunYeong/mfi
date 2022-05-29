

const disconnectEvent = (socket) => () => {
    socket.server.emit('current', socket.server.engine.clientsCount);
    console.log('socket 연결 끊김');
};


let userList = [];
const disconnectChattingEvent = (socket, io) => () =>  {
    console.log('chatting socket 연결 끊김');
    console.log(socket.nsp.userMap);
    delete socket.nsp.userMap[socket.user.userIdx];
    socket.emit('connecting_user', Object.values(socket.nsp.userMap));
};

const applyChatting =  (socket, io)=> (userIdx)=> {
    let toSocketId;
    // 해당 userIdx의 socket id를 저장한다.
    userList.forEach(key => {
        if(key.userIdx === userIdx){
            toSocketId = key.socket;
        }
    });
    io.to(toSocketId).emit('sendApply', socket.user.nickName);
}

const chattingError = (socket)=>(err)=> {
    console.log(err)
}

module.exports = {
    disconnectEvent,
    disconnectChattingEvent,
    applyChatting,
    chattingError,
}
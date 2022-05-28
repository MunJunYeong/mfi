

const disconnectEvent = (socket) => () => {
    socket.server.emit('current', socket.server.engine.clientsCount);
    console.log('socket 연결 끊김');
};


let userList = [];
const disconnectChattingEvent = (socket, io) => () =>  {
    console.log('chatting socket 연결 끊김');
    socket.leave(socket.user.socket);
    const idx = userList.findIndex((item)=> item.socket === socket.id);
    if(idx>-1) userList.splice(idx, 1);
    socket.emit('connect_user', userList);
};

const connectUser =(socket, io) => () => {
    userList.push(socket.user);
    socket.join(socket.user.socket);
    // console.log(socket.server.sockets.sockets)
    socket.emit('getUserList', userList);
}

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
    connectUser,
    chattingError,
}
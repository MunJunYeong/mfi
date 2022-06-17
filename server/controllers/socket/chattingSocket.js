
const disconnectChattingEvent = (socket, io) => () =>  {
    console.log('chatting socket 연결 끊김');
    delete socket.nsp.userMap[socket.user.userIdx];
    socket.emit('connecting_user', Object.values(socket.nsp.userMap));
};

const toApplyChatting =  (socket, io)=> (userIdx)=> {
    let toSocketId = socket.nsp.userMap[userIdx].socket;
    io.to(toSocketId).emit('applyResponse', socket.user);
}
const sendResultApply =  (socket, io)=> (data)=> {
    if(!data.flag){
        io.to(data.socket).emit('rejectChatting', socket.user.nickName); return;
    }
    //room naming 건 사람 - 수락한 사람
    socket.join(`${data.userIdx}-${socket.user.userIdx}`);
    io.to(data.socket).emit('joinRoom', socket.user.userIdx);
}

const joinRoom = (socket, io)=>(userIdx)=> {
    socket.join(`${socket.user.userIdx}-${userIdx}`);
}



const socketError = (socket, io)=>(err)=> {
    console.log(err)
}

module.exports = {
    disconnectChattingEvent,
    toApplyChatting,
    socketError,
    sendResultApply,
    joinRoom
}
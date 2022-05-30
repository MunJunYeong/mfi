
const disconnectChattingEvent = (socket, io) => () =>  {
    console.log('chatting socket 연결 끊김');
    delete socket.nsp.userMap[socket.user.userIdx];
    socket.emit('connecting_user', Object.values(socket.nsp.userMap));
};

const toApplyChatting =  (socket, io)=> (userIdx)=> {
    let toSocketId = socket.nsp.userMap[userIdx].socket;
    io.to(toSocketId).emit('applyResponse', socket.user.nickName);
}

const socketError = (socket, io)=>(err)=> {
    console.log(err)
}

module.exports = {
    disconnectChattingEvent,
    toApplyChatting,
    socketError,
}
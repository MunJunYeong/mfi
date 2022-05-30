const { socket : socketController } = require('../controllers');

const eventRoute = {
    'disconnect' : socketController.chatting.disconnectChattingEvent,
    'toApplyChatting' : socketController.chatting.toApplyChatting,
    'error' : socketController.chatting.socketError,
}


// let userIdx;
const chattingRegist = (socket, io) => {
    console.log('chatting socket 연결 성공')
    socket.nsp.userMap[socket.user.userIdx] = socket.user;
    socket.nsp.emit('connecting_user', Object.values(socket.nsp.userMap));

    Object.keys(eventRoute).forEach((key)=> {
        socket.on(key, eventRoute[key](socket, io));
    })
    
};

module.exports = {
    chattingRegist
};

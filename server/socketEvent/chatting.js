const { socket: socketController } = require('../controllers');

const eventRoute = {
    'disconnect' : socketController.disconnectChattingEvent,
    'connectUser' : socketController.connectUser,
    'applyChatting' : socketController.applyChatting,
    'error' : socketController.chattingError,
}


let userList = [];
// let userIdx;
const chattingRegist = (socket, io) => {
    console.log('chatting socket 연결 성공')

    Object.keys(eventRoute).forEach((key)=> {
        socket.on(key, eventRoute[key](socket, io));
    })
    
};

module.exports = {
    chattingRegist
};

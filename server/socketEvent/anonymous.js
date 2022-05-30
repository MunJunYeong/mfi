const { socket: socketController } = require('../controllers');

const anymousEventRoute = {
    'disconnect': socketController.anonymous.disconnectEvent,
    'error' : socketController.anonymous.socketError,
}

const anonymousRegist = (socket) => {
    console.log('anonymous socket 연결 성공');
    
    socket.server.emit('current', socket.server.engine.clientsCount);
    Object.keys(anymousEventRoute).forEach((key)=> {
        socket.on(key, anymousEventRoute[key](socket));
    })
};

module.exports = {
    anonymousRegist
};

const { socket: socketController } = require('../controllers');


const eventRoute = {
    'disconnect': socketController.disconnectEvent,
    // 'current' : socketController.currentConnectedEvent,
}


const registEvent = (socket) => {
    console.log('a user connected');

    socket.emit('current', socket.server.engine.clientsCount)

    Object.keys(eventRoute).forEach((key)=> {
        socket.on(key, eventRoute[key](socket));
    }) 
};

module.exports = {
    registEvent
};




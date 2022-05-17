const { socket: socketController } = require('../controllers');


const eventRoute = {
    'disconnect': socketController.disconnectEvent,
    // 'current' : socketController.currentConnectedEvent,
}


const registEvent = (socket) => {
    console.log('a user connected');

    socket.on('chat', (data) => {
        console.log(`message from ${data.name} : ${data.msg}`);
        const msg = {
            from : {
                name : data.name,
                avatar : data.avatar
            },
            msg : data.msg
        }
        socket.emit('chat', msg);
    })

    socket.emit('current', socket.server.engine.clientsCount)

    Object.keys(eventRoute).forEach((key)=> {
        socket.on(key, eventRoute[key](socket));
    }) 
};

module.exports = {
    registEvent
};




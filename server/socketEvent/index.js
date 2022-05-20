const { socket: socketController } = require('../controllers');


const eventRoute = {
    'disconnect': socketController.disconnectEvent,
    'test' : socketController.test,
}


const registEvent = (socket, io) => {
    console.log('a user connected');
    io.emit('current', socket.server.engine.clientsCount)

    const verify = io.of('/verify');
    verify.on('connection', (socket)=> {
        io.emit('verify', socket.server.engine.clientsCount)
        console.log('verify 서버 접속 완료')
    })
    // socket.on('chat', (data) => {
    //     console.log(`message from ${data.name} : ${data.msg}`);
    //     const msg = {
    //         from : {
    //             name : data.name,
    //             avatar : data.avatar
    //         },
    //         msg : data.msg
    //     }
    //     socket.emit('chat', msg);
    // })

    //middleware
    // io.use((socket, next)=> {
    //     console.log(socket.handshake.auth.token);
    // })


    Object.keys(eventRoute).forEach((key)=> {
        socket.on(key, eventRoute[key](socket, io));
    }) 
};

module.exports = {
    registEvent
};




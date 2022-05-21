const { socket: socketController } = require('../controllers');
const { middleware } = require('../lib/common');


const eventRoute = {
    'test' : socketController.test,
}

const anymousEventRoute = {
    'disconnect': socketController.disconnectEvent,
}


const registEvent = (socket, io) => {
    console.log(socket.user);
    socket.server.emit('current', socket.server.engine.clientsCount)


    const testmiddle = (next) => { console.log(socket.user) ; return true;};

    Object.keys(eventRoute).forEach((key)=> {
        socket.on(key, () => {
            const result = testmiddle();
            if(!result) return;
            
            eventRoute[key](socket);
        });
    }) 

    




    Object.keys(anymousEventRoute).forEach((key)=> {
        socket.on(key, anymousEventRoute[key](socket, io));
    }) 
};

module.exports = {
    registEvent
};




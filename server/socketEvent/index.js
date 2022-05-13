const { socket: socketController } = require('../controllers');


const eventRoute = {
    'disconnect': socketController.disconnectEvent,
}




const registEvent = (socket) => {
    Object.keys(eventRoute).forEach((key) =>{
        socket.on(key, eventRoute[key](socket));
    }) 
};

module.exports = {
    registEvent
};
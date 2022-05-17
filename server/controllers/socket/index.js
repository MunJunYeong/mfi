

const disconnectEvent = (socket, io) => () => {
    io.emit('current', socket.server.engine.clientsCount);
    console.log('user disconnected');
};



const currentConnectedEvent = (socket)=> ()=>{
    console.log('dsfasfsa')
    socket.emit('current', 12)
    // io.emit('currentConnected', socket.server.engine.clientsCount);
    console.log(socket.server.engine.clientsCount)
}


module.exports = {
    disconnectEvent,
    currentConnectedEvent,
}
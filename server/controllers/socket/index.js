

const disconnectEvent = (socket, io) => () => {
    io.emit('current', socket.server.engine.clientsCount);
    console.log('user disconnected');
};



const test = (socket)=> {
    console.log('aaaaaaaaaaaaaaaaaaa')
    // socket.emit('test', 'testetstetse');
}


module.exports = {
    disconnectEvent,
    test,
}
const disconnectEvent = (socket) => () => {
    // io.emit('numberConnections', {data: now});
    console.log(socket.server.engine.clientsCount);
    console.log('user disconnected');
};



module.exports = {
    disconnectEvent,
}


const disconnectEvent = (socket) => () => {
    socket.server.emit('current', socket.server.engine.clientsCount);
    console.log('socket 연결 끊김');
};

const socketError = (socket)=>(err)=> {
    console.log(err)
}

module.exports = {
    disconnectEvent,
    socketError,
}


const disconnectEvent = (socket) => () => {
    socket.server.emit('current', socket.server.engine.clientsCount);
    console.log('socket 연결 끊김');
};



const applyChatting = (socket)=> {
    console.log('dfafsdaf')
    // socket.server.emit('connect_user', connectionList);
    // socket.server.emit()
}


module.exports = {
    disconnectEvent,
    applyChatting,
}
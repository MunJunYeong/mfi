

const disconnectEvent = (socket, connectionList) => () => {
    console.log('socket 연결 끊김');
};



const sendConnectData = (socket, connectionList)=> {
    
    // socket.server.emit('connect_user', connectionList);
    // socket.server.emit()
}


module.exports = {
    disconnectEvent,
    sendConnectData,
}
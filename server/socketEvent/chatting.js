const { socket: socketController } = require('../controllers');

const eventRoute = {
    'connect_user' : socketController.sendConnectData,
}


let connectionList = [];

const chattingRegist = (socket) => {
    console.log('chatting socket 연결 성공')

    let check= false;
    connectionList.forEach(key => {
        if(key.userIdx === socket.user.userIdx) return check=true;
    })
    if(!check) connectionList.push(socket.user);
    
    console.log(connectionList)

    Object.keys(eventRoute).forEach((key)=> {
        socket.on(key, () => {

        });
    })
    
};

module.exports = {
    chattingRegist
};

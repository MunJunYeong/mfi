const { socket: socketController } = require('../controllers');

// const eventRoute = {
//     'connect_user' : socketController.sendConnectData,
// }


let connectionList = [];

const chattingRegist = (socket) => {
    console.log('chatting socket 연결 성공')

    //list 중복 고려하여 제거
    let check= false;
    connectionList.forEach(key => {
        if(key.userIdx === socket.user.userIdx) {
            key.socket = socket.id; //새로고침시 저장된 소켓아이디 정보 업데이트   
            return check=true;
        }
    })
    if(!check) connectionList.push(socket.user);
    
    socket.emit('connect_user', connectionList);

    socket.on('disconnect', ()=> {
        const idx = connectionList.findIndex((item)=> item.socket === socket.id);
        if(idx>-1) connectionList.splice(idx, 1);
        socket.emit('connect_user', connectionList);
    })


    // Object.keys(eventRoute).forEach((key)=> {
    //     socket.on(key, () => {

    //     });
    // })
    
};

module.exports = {
    chattingRegist
};

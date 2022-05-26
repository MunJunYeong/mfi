const { socket: socketController } = require('../controllers');

const eventRoute = {
    // 'apply chatting' : socketController.applyChatting,
    
}


let userList = [];
// let userIdx;
const chattingRegist = (socket) => {
    console.log('chatting socket 연결 성공')

    socket.on('connect user', ()=> {
        userList.push(socket.user);
        // userIdx = socket.user.userIdx;
        //userIdx로 room join
        socket.join(socket.user.userIdx);
        socket.emit('getUserList', userList);
    })

    
    socket.on('applyChatting', (userIdx)=> {
        let toSocketId;
        // 해당 userIdx의 socket id를 저장한다.
        userList.forEach(key => {
            if(key.userIdx === userIdx){
                toSocketId = key.socket;
            }
        })
        // console.log(socket.server.sockets.adapter.rooms)
        // let clientSocket = socket.server.sockets.connected[toSocketId];
        // clientSocket.emit('sendApply', 1);
        socket.server.to(toSocketId).emit('sendApply', 1);
        // io.to(toSocketId).emit('sendApply', 1);
        socket.server.emit('sendApply', 1);
    })


    socket.on('disconnect', ()=> {
        socket.leave(socket.user.userIdx);
        const idx = userList.findIndex((item)=> item.socket === socket.id);
        if(idx>-1) userList.splice(idx, 1);
        socket.emit('connect_user', userList);
    })
    socket.on('error', (err)=> {
        console.log(err);
    })

    // Object.keys(eventRoute).forEach((key)=> {
    //     socket.on(key, () => {
    //         socket.on(key, eventRoute[key](socket));
    //     });
    // })
    
};

module.exports = {
    chattingRegist
};

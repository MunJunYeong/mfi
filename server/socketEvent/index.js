const anonymousRegist = require('./anonymous');
const chattingRegist = require('./chatting');

module.exports = {
    anonymousRegist,
    chattingRegist
}
// const socketMiddleware = (socket) => {
//     const data = jwtUtils.verify(socket.handshake.auth.token);
//     if(data === 'accesstoken expired') return false;
//     socket.user ={
//         data : data,
//     }
//     //list  중복있는지 확인
//     let check =false;
    
//     connectionList.forEach((item)=> {
//         if(item.userIdx === data.userIdx){
//             item.socketId = socket.id; //새로고침할시 소켓 id는 계속해서 변경됨
//             return check=true;
//         }
//     })
//     if(!check) {
//         const temp = {
//             userIdx : data.userIdx,
//             nickName : data.nickName,
//             socketId : socket.id
//         };
//         connectionList.push(temp);
//     }
//     return true;
// };

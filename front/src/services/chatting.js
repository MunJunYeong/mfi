import {socket} from '../lib/chattingSocket';


const toApplyChatting = async (userIdx)=> {
    await socket.emit('toApplyChatting', userIdx);
}
const sendResultApply = async (data)=> {
    await socket.emit('sendResultApply', data);
}
const joinTargetRoom = async (data)=> {
    await socket.emit('joinTargetRoom', data);
}
const sendMsg = async (data)=> {
    await socket.emit('sendMsg', data);
}
const quitChatting = async (data) => {
    await socket.emit('quitChatting', data);
}

export default {
    toApplyChatting, sendResultApply, joinTargetRoom, sendMsg, quitChatting
}

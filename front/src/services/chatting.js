import {socket} from '../lib/chattingSocket';


const toApplyChatting = async (userIdx)=> {
    await socket.emit('toApplyChatting', userIdx);
}
const sendResultApply = async (data)=> {
    await socket.emit('sendResultApply', data);
}
const joinRoom = async (userIdx)=> {
    await socket.emit('joinRoom', userIdx);
}

export default {
    toApplyChatting, sendResultApply, joinRoom
}

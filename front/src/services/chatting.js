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

export default {
    toApplyChatting, sendResultApply, joinTargetRoom
}

import {socket} from '../lib/chattingSocket';


const applyChatting = async (userIdx)=> {
    await socket.emit('toApplyChatting', userIdx);
}

export default {
    applyChatting,
}

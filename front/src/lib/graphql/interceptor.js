import store from '../../store';

let isTokenRefreshing = false;
let exe;
let promiseHandling = {}

const reIssueToken = async (err)=> {
    let newAccessToken;
    if(isTokenRefreshing === false){
        isTokenRefreshing = true;
        promiseHandling = ()=> {
            return new Promise((resolve, reject) => {
                exe = {
                    resolve,
                    reject
                }
            })
        };
        const refreshToken = localStorage.getItem('refreshToken');
        const accessToken = localStorage.getItem('accessToken');
        const tokenData = {
            refreshToken : refreshToken,
            accessToken : accessToken
        }
        newAccessToken = await store.dispatch('auth_reissue_token', tokenData);
        if(exe){
            exe.resolve();
        }
        isTokenRefreshing = false;
    }else {
        console.log('waiting part');
        newAccessToken = await promiseHandling();
    }
    // 기존 req의 header에 setting 및 body에 실리는 token도 수정해서 재 요청을 보내고

    
}

export {
    reIssueToken
}
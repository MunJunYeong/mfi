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
        // console.log(newAccessToken)
    }
}

export {
    reIssueToken
}
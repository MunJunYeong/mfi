import axios from 'axios'
import store from '../store'

axios.interceptors.request.use(
  function(config) {
    // Do something before request is sent
    config.withCredentials = true;
    return config;
  },
  function(error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// const httpPromiseHandler = async (httpReuest) => {
//     const originRequest = [...httpReuest];
//     const result = await Promise.allSettled(httpReuest);
//     result.map((res) => {
//         if(res.erroCode === 'expired'){
//             await refreshToken();
//             axios(originRequest[i]);
//         }
//     })
//     return result;
// } 

axios.interceptors.response.use(
    async (response) => {
        
        if( await response.data.message === 'unvalid accesstoken'){
            const refreshToken = localStorage.getItem('refreshToken');
            const accessToken = localStorage.getItem('accessToken');
            const tokenData = {
                refreshToken : refreshToken,
                accessToken : accessToken
            }
            const newToken = await  store.dispatch('auth_refresh_token', tokenData);
            console.log(newToken)
        }
        // if(status === 401){
        //     if(response.data.message === 'unvalid accesstoken'){
        //         const originalRequest = config;
        //         const refreshToken = localStorage.getItem('refreshToken');
        //         const accessToken = localStorage.getItem('accessToken');
        //         const tokenData = {
        //             refreshToken : refreshToken,
        //             accessToken : accessToken
        //         }
        //         const newToken = await  this.$store.dispatch('auth_refresh_token', tokenData);
        //         axios.defaults.headers.common.Authorization = `${newToken}`;
        //         originalRequest.headers.Authorization = `${newToken}`;
        //         return axios(originalRequest);
        //     }
        // }
        return response;
    },
    async (error) => {
        return Promise.reject(error);
    }
);
// const refreshToekn = () =>{

// }

// export.default = axios;
// module.exports = axios;
export default axios;
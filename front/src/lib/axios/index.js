import axios from 'axios'
import store from '../../store'

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

let isTokenRefreshing = false
let promiseHandling = { 

}

let exe;

axios.interceptors.response.use(
    async (response) => {
      return response;
    },
    async (error) => {
      console.log(error)
      const{
        config,
        response : {status},
      } = error;
      const originalRequest = config;
      let newToken;
      if(status === 401) {
        if(!isTokenRefreshing){
          isTokenRefreshing = true;
          promiseHandling = () => {
            return new Promise((resolve,reject) => {
              exe = {
                resolve,
                reject,
              }
            })
          };
          const refreshToken = localStorage.getItem('refreshToken');
          const accessToken = localStorage.getItem('accessToken');
          const tokenData = {
            refreshToken : refreshToken,
            accessToken : accessToken
          }
          newToken = await store.dispatch('auth_refresh_token', tokenData);
          if(exe) {
            exe.resolve();
          }
          isTokenRefreshing = false;
        }else{
          console.log('wait!!!!')
          newToken = await promiseHandling();
        }

        originalRequest.headers.Authorization = newToken;
        
        const res = await axios(originalRequest);
        return res;
      }
      return Promise.reject(error);
    }
);


export default axios;
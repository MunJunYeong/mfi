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

let isTokenRefreshing = false
let test = { 

}
let test1;

axios.interceptors.response.use(
    async (response) => {
      const date = new Date();
      console.log('res',date.toISOString());
      console.log('res', response);
      return response;
    },
    async (error) => {
      const{
        config,
        response : {status},
      } = error;
      const originalRequest = config;
      let newToken;
      const date = new Date();
      console.log('errr', date.toISOString());
      console.log(isTokenRefreshing);
      if(status === 401) {
        console.log('error!!!!!!!!!!!!!!!!!!!!');
        if(!isTokenRefreshing){
          isTokenRefreshing = true;
          test = () => {
            return new Promise((resolve,reject) => {
              test1 = {
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
          console.log(isTokenRefreshing);
          if(test1) test1.resolve(newToken);
          isTokenRefreshing = false;
        }else{
          console.log('wait!!!!')
          newToken = await test();
        }

        console.log(originalRequest);
        originalRequest.headers.Authorization = newToken;
        const res = await axios(originalRequest);
        console.log(res);
        return res;
        
        // console.log(newToken);
        // console.log(refreshSubscribers);
        // onTokenRefreshed(newToken);
      }
      return Promise.reject(error);
    }
);


export default axios;
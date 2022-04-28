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

let isTokenRefreshing = false;
let refreshSubscribers = [];

const onTokenRefreshed = (accessToken) => {
  refreshSubscribers.map(  (callback) => callback(accessToken))  ;
};

const addRefreshSubscriber = (callback) => {
  refreshSubscribers.push(callback);
};


axios.interceptors.response.use(
    async (response) => {
      return response;
    },
    async (error) => {
      const{
        config,
        response : {status},
      } = error;
      const originalRequest = config;
      if(status === 401) {
        if(!isTokenRefreshing){
          isTokenRefreshing = true;
          const refreshToken = localStorage.getItem('refreshToken');
          const accessToken = localStorage.getItem('accessToken');
          const tokenData = {
            refreshToken : refreshToken,
            accessToken : accessToken
          }
          const newToken = await store.dispatch('auth_refresh_token', tokenData);
          isTokenRefreshing = false;
          onTokenRefreshed(newToken);
          const retryOriginalRequest = new Promise((resolve) => {
            addRefreshSubscriber( () => {
              originalRequest.headers.Authorization = newToken;
              resolve(axios(originalRequest));
            });
          });
          return retryOriginalRequest;
        }
      }
      return Promise.reject(error);
    }
);


export default axios;
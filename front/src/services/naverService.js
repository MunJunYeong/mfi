import axios from "../lib/axios";
const { VUE_APP_BACKEND_HOST, VUE_APP_NAVER_CLIENT_ID, VUE_APP_NAVER_CALL_BACK_URL} = process.env;

const setNaverLogin = ()=> {
    const naver_id_login =  new window.naver_id_login(VUE_APP_NAVER_CLIENT_ID, VUE_APP_NAVER_CALL_BACK_URL);
    const state =  naver_id_login.getUniqState();
    naver_id_login.setButton("white", 2, 40); // 버튼 설정
    naver_id_login.setState(state);
    naver_id_login.init_naver_id_login();
}

const getNaverData = async ()=> {
    const naver_id_login = await new window.naver_id_login(VUE_APP_NAVER_CLIENT_ID, VUE_APP_NAVER_CALL_BACK_URL);
    let res;
    try{
        res = await axios.post(VUE_APP_BACKEND_HOST + '/signin/naver',{
            naverToken : naver_id_login.getAccessToken(),
        })
    }catch(err){
        console.log(err);
    }
    return naver_id_login;
}

export default {
    setNaverLogin, getNaverData
}


const preProcessing = {
    NOT_FOUND : {
        message : '일치하는 정보가 없습니다.',
        status : 200
    },
    NOT_CORRECT_AUTHNO : {
        message : '인증번호가 일치하지 않습니다!',
        status : 200
    }, 
    ISLOGIN : {
        message : 'isLogin',
        status : 200
    },
    EXIST_EMAIL : {
        message : '이미 존재하는 이메일입니다.',
        status : 200
    },
    FAIL_TO_SEND : {
        message : 'fail to send',
        status : 200
    },
    WRONG_PW : {
        message : '잘못된 비밀번호 입니다.',
        status : 200
    },
    WRONG_ID : {
        message : '잘못된 아이디 입니다.',
        status : 200
    },
    NOT_CORRECT_FORM : { //회웝가입 pw 6글자 -> block front
        message : '영어, 숫자, 특수기호를 모두 사용해주세요.',
        status : 406
    },
    WRONG_ACCESS : { // front에서 막아둔 부분인데 비정상적인 접근
        message : 'wrong access',
        status : 406
    },
    TRAFFIC : {
        message : '트래픽 문제로 잠시 후 다시 시도해주세요',
        status : 408
    },
}

const postProcessing = {
    UNABLE_USERCOUNT : 'Unable to get userCount',
    UNABLE_TODAY_VISITOR : 'Unable to get todayVisitor',
    UNABLE_TOTAL_VISITOR : 'Unable to get totalVisitor',
    UNABLE_NEWITEMS : 'Unable to get newsItem',
    UNABLE_SIGNUP :' Unable signup',
    UNABLE_SEND_MAIL : 'Unable sendEmail',
    UNABLE_CHECK_MAIL : 'Unable to checkEmail',
    UNABLE_FIND_ID_SEND_MAIL : 'Unable to findIdSendMail',
    UNABLE_FIND_PW_SEND_MAIL :' Unable to findPwSendMail',
    UNABLE_UPDATE_PW  : 'Unable to updatePw',
    UNABLE_SIGNIN : 'Unable to signIn',
    UNABLE_CHECKID : 'Unable to checkId',
    UNABLE_CHECKNICKNAME : 'Unable to checkNickName',
    UNABLE_USERROLE : 'Unable to updateUserRole',
    UNABLE_GET_USER : 'Unable to getUser(role:admin)',
    UNABLE_LOGOUT : 'Unable to logout',
    UNABLE_FORCE_SIGNIN : 'Unable to forcesignIn',
    UNABLE_FIND_ID_USER : 'Unable to findIdUser',
    UNABLE_CREATEIP : 'Unable to create Ip',
    //comment,
    UNABLE_POST_COMMENT : 'Unable to postComment',
    UNABLE_GET_COMMENT : 'Unable to getComment',
    //idea
    UNABLE_POST_IDEA : 'Unable to postIdea',
    UNABLE_DELETE_IDEA : 'Unable to deleteIdea',
    UNABLE_UPDATE_IDEA : 'Unable to updateIdea',
    UNABLE_SHOW_IDEA : 'Unable to showIdea',
    UNABLE_SHOW_MY_IDEA : 'Unable to showMyIdea',
    UNABLE_SHOW_ADMIN_IDEA : 'Unable to showAdminUserIdea',
    UNABLE_CLICK_IDEA : 'Unable to getClickIdea',
    UNABLE_IDEA_COUNT : 'Unable to getIdeaCout',
    UNABLE_UPDATE_USERTOKEN : 'Middleware refresh : unable to updateUserToken',
    //middleware

}

const dbError = {
    //anonymous
    DB_GET_USER_COUNT : {
        message : 'Unable to getUserCount[service]',
        status : 500
    },

    DB_FIND_ID_SEND_MAIL : {
        message : 'Unable to send findId [servcie]',
        status : 500
    },
    DB_FIND_USER_FOR_FINDID: {
        message : 'Unable to findUser for findIdSendMail[service]',
        status : 500
    },
    DB_CHECK_EMAIL: {
        message : 'Unable to checkEmail[service]',
        status : 500
    },
    DB_FIND_AUTH_NO: {
        message : 'Unable to findAuthNo for checkEmail[service]',
        status : 500
    },
    DB_SEND_EMAIL: {
        message : 'Unable to sendMail[service]',
        status : 500
    },
    DB_FIND_USER_PARA_EMAIL: {
        message : 'Unable to findUser(email) for sendMail[service]',
        status : 500
    },
    DB_FIND_USER_PARA_ID: {
        message : 'Unable to findUser(id) for sendMail[service]',
        status : 500
    },
    DB_SIGNUP : {
        message : 'Unable to signUp[service]',
        status : 500
    },
    DB_GET_NEWS_ITEM : {
        message : 'Unable to getNewsItem[service]',
        status : 500
    },
    DB_FIND_USER_PARA_IDPW : {
        message : 'Unable to findIdUser for forceSignIn[service]',
        status : 500
    },
    DB_HAVE_USER_TOKEN : {
        message : "Unable to haveUserToken[service]",
        status : 500
    },
    DB_SAVE_USER_TOKEN: {
        message : 'Unable to saveUserToken[service]',
        status : 500
    },
    DB_MAKE_USER_TOKEN: {
        message : 'Unable to makeUserToken[service]',
        status : 500
    },
    DB_DUPLICATE_NICKNAME: {
        message : 'Unable to duplicatedNickName[service]',
        status : 500
    },
    DB_DUPLICATE_ID: {
        message : 'Unable to duplicatedId[service]',
        status : 500
    },
    DB_SIGNIN: {
        message : 'Unable to signIn[service]',
        status : 500
    },
    DB_FIND_ID_SIGNIN: {
        message : 'Unable to findId for signIn[service]',
        status : 500
    },
    DB_UPDATE_PW : {
        message : 'Unable to updatePw[service]',
        status : 500
    },
    //comment
    DB_POST_COMMENT: {
        message : 'Unable to postComment[service]',
        status : 500
    },
    DB_GET_COMMENT: {
        message : 'Unable to getComment[service]',
        status : 500
    },
    //idea
    
     DB_GET_IDEA_COUNT: {
        message : 'Unable to getIdeaCount[service]',
        status : 500
    },
     DB_CREATE_IDEA: {
        message : 'Unable to createIdea[service]',
        status : 500
    },
     DB_GET_ALL_IDEA: {
        message : 'Unable to getAllIdea[service]',
        status : 500
    },
     DB_GET_MY_IDEA: {
     
        message : 'Unable to getMyIdea[service]',
        status : 500
    },
     
     DB_GET_ADMIN_USER_IDEA: {
        message : 'Unable to getAdminUserIdea[service]',
        status : 500
    },
     DB_GET_IDEA: {
        message : 'Unable to getIdea[service]',
        status : 500
    },
     DB_UPDATE_IDEA : {
        message : 'Unable to updateIdea[service]',
        status : 500
    },
     DB_DELETE_IDEA: {
        message : 'Unable to deleteIdea[service]',
        status : 500
    },
    //news
     DB_CREATE_NEWS: {
        message : 'Unable to createNews[service]',
        status : 500
    },
     DB_DELETE_NEWS: {
        message : 'Unable to  deleteNews[service]',
        status : 500
    },
    //visitor
     DB_FIND_IP: {
        message : 'Unable to findIp for createIp[service]',
        status : 500
    },
     DB_CREATE_IP: {
        message : 'Unable to createIp[service]',
        status : 500
    },
     DB_GET_TODAY_VISITOR: {
        message : 'Unable to getTodayVisitor[service]',
        status : 500
    },
     DB_GET_TOTAL_VISITOR: {
        message : 'Unable to getTotalVisitor[service]',
        status : 500
    },
     DB_UPDATE_TOTAL_VISITOR: {
        message : 'Unable to updateTotalVisitor[service]',
        status : 500
    },
    //user
     DB_UPDATE_ROLE: {
        message : 'Unable to updateRole[service]',
        status : 500
    },
     DB_GET_USER: {
        message :  'Unable to  getUser[service]',
        status : 500
    },
     DB_LOGOUT: {
        message : 'Unable to  logout[service]',
        status : 500
    },
     DB_FORCE_LOGOUT: {
        message : 'Unable to  forceLogout[service]',
        status : 500
    },
     DB_GET_USER_TOKEN: {
        message :  'Unable to getUserToken[service]',
        status : 500
    },
    DB_UPDATE_USERTOKEN: {
        message : 'Unable to updateUserToken[service]',
        status : 500
    },
      
    DB_GET_USER_DATA: {
        message : 'Unable to getUserData[service]',
        status : 500
    },
}




module.exports = {
    ...preProcessing,
    ...postProcessing,
    ...dbError
}


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
     UNABLE_USERCOUNT : {
        message : 'Unable to get userCount',
        status : 1
    },
     UNABLE_TODAY_VISITOR : {
        message : 'Unable to get todayVisitor',
        status : 1
    },
     UNABLE_TOTAL_VISITOR : {
        message : 'Unable to get totalVisitor',
        status : 1
    },
     UNABLE_NEWITEMS: {
        message : 'Unable to get newsItem',
        status : 1
    },
     UNABLE_SIGNUP: {
        message : 'Unable signup',
        status : 1
    },
     UNABLE_SEND_MAIL: {
        message : 'Unable sendEmail',
        status : 1
    },
     UNABLE_CHECK_MAIL: {
        message : 'Unable to checkEmail',
        status : 1
    },
     UNABLE_FIND_ID_SEND_MAIL: {
        message : 'Unable to findIdSendMail',
        status : 1
    },
     UNABLE_FIND_PW_SEND_MAIL: {
        message : 'Unable to findPwSendMail',
        status : 1
    },
      UNABLE_UPDATE_PW: {
        message : 'Unable to updatePw',
        status : 1
    },
     UNABLE_SIGNIN: {
        message : 'Unable to signIn',
        status : 1
    },
     UNABLE_CHECKID: {
        message : 'Unable to checkId',
        status : 1
    },
     UNABLE_CHECKNICKNAME: {
        message : 'Unable to checkNickName',
        status : 1
    },
     UNABLE_USERROLE: {
        message : 'Unable to updateUserRole',
        status : 1
    },
     UNABLE_GET_USER: {
        message : 'Unable to getUser(role:admin)',
        status : 1
    },
     UNABLE_LOGOUT: {
        message : 'Unable to logout',
        status : 1
    },
     UNABLE_FORCE_SIGNIN: {
        message : 'Unable to forcesignIn',
        status : 1
    },
     UNABLE_FIND_ID_USER: {
        message : 'Unable to findIdUser',
        status : 1
    },
     UNABLE_CREATEIP: {
        message : 'Unable to create Ip',
        status : 1
    },
    //comment,
     UNABLE_POST_COMMENT: {
        message : 'Unable to postComment',
        status : 1
    },
     UNABLE_GET_COMMENT: {
        message : 'Unable to getComment',
        status : 1
    },
    //idea
     UNABLE_POST_IDEA: {
        message : 'Unable to postIdea',
        status : 1
    },
     UNABLE_DELETE_IDEA: {
        message : 'Unable to deleteIdea',
        status : 1
    },
     UNABLE_UPDATE_IDEA: {
        message : 'Unable to updateIdea',
        status : 1
    },
     UNABLE_SHOW_IDEA: {
        message : 'Unable to showIdea',
        status : 1
    },
     UNABLE_SHOW_MY_IDEA: {
        message : 'Unable to showMyIdea',
        status : 1
    },
     UNABLE_SHOW_ADMIN_IDEA: {
        message : 'Unable to showAdminUserIdea',
        status : 1
    },
     UNABLE_CLICK_IDEA: {
        message : 'Unable to getClickIdea',
        status : 1
    },
     UNABLE_IDEA_COUNT: {
        message : 'Unable to getIdeaCout',
        status : 1
    },
     UNABLE_UPDATE_USERTOKEN: {
        message : 'Middleware refresh : unable to updateUserToken',
        status : 1
    },
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
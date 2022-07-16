const HTTP_CODE = {
    SUCCESS: 200,
    NOT_ACCESS : 406,
    FAIL_METHOD : 424,
    SERVER_ERROR : 500,
}



const preProcessing = {
    WRONG_ACCESS : { // front에서 막아둔 부분인데 비정상적인 접근
        message : 'wrong access',
        status : HTTP_CODE.NOT_ACCESS
    },
    NOT_FOUND : {
        message : '일치하는 정보가 없습니다.',
        status : HTTP_CODE.SUCCESS
    },
    NOT_CORRECT_AUTHNO : {
        message : 'wrong no',
        status : HTTP_CODE.SUCCESS
    }, 
    ISLOGIN : {
        message : 'isLogin',
        status : HTTP_CODE.SUCCESS
    },
    EXIST_EMAIL : {
        message : 'exist email',
        status : HTTP_CODE.SUCCESS
    },
    NOT_FOUND_EMAIL : {
        message : 'fail to send',
        status : HTTP_CODE.SUCCESS
    },
    WRONG_PW : {
        message : '잘못된 비밀번호 입니다.',
        status : HTTP_CODE.SUCCESS
    },
    WRONG_ID : {
        message : '잘못된 아이디 입니다.',
        status : HTTP_CODE.SUCCESS
    },
    NOT_CORRECT_FORM : { //회웝가입 pw 6글자 -> block front
        message : '영어, 숫자, 특수기호를 모두 사용해주세요.',
        status : HTTP_CODE.NOT_ACCESS
    },
}

const postProcessing = {
    UNABLE_USERCOUNT : {
        message : 'Unable to get userCount',
        status : HTTP_CODE.FAIL_METHOD
    },
    UNABLE_TODAY_VISITOR : {
        message : 'Unable to get todayVisitor',
        status : HTTP_CODE.FAIL_METHOD
    },
    UNABLE_TOTAL_VISITOR : {
        message : 'Unable to get totalVisitor',
        status : HTTP_CODE.FAIL_METHOD
    },
    UNABLE_NEWITEMS: {
        message : 'Unable to get newsItem',
        status : HTTP_CODE.FAIL_METHOD
    },
    UNABLE_SIGNUP: {
        message : 'Unable signup',
        status : HTTP_CODE.FAIL_METHOD
    },
     UNABLE_SEND_MAIL: {
        message : 'Unable sendEmail',
        status : HTTP_CODE.FAIL_METHOD
    },
     UNABLE_CHECK_MAIL: {
        message : 'Unable to checkEmail',
        status : HTTP_CODE.FAIL_METHOD
    },
     UNABLE_FIND_ID_SEND_MAIL: {
        message : 'Unable to findIdSendMail',
        status : HTTP_CODE.FAIL_METHOD
    },
     UNABLE_FIND_PW_SEND_MAIL: {
        message : 'Unable to findPwSendMail',
        status : HTTP_CODE.FAIL_METHOD
    },
      UNABLE_UPDATE_PW: {
        message : 'Unable to updatePw',
        status : HTTP_CODE.FAIL_METHOD
    },
     UNABLE_SIGNIN: {
        message : 'Unable to signIn',
        status : HTTP_CODE.FAIL_METHOD
    },
     UNABLE_CHECKID: {
        message : 'Unable to checkId',
        status : HTTP_CODE.FAIL_METHOD
    },
     UNABLE_CHECKNICKNAME: {
        message : 'Unable to checkNickName',
        status : HTTP_CODE.FAIL_METHOD
    },
     UNABLE_USERROLE: {
        message : 'Unable to updateUserRole',
        status : HTTP_CODE.FAIL_METHOD
    },
    UNABLE_GET_USER: {
        message : 'Unable to getUser(role:admin)',
        status : HTTP_CODE.FAIL_METHOD
    },
    UNABLE_GET_USER_DATA: {
        message : 'Unable to getUserData',
        status : HTTP_CODE.FAIL_METHOD
    },
     UNABLE_LOGOUT: {
        message : 'Unable to logout',
        status : HTTP_CODE.FAIL_METHOD
    },
     UNABLE_FORCE_SIGNIN: {
        message : 'Unable to forcesignIn',
        status : HTTP_CODE.FAIL_METHOD
    },
     UNABLE_FIND_ID_USER: {
        message : 'Unable to findIdUser',
        status : HTTP_CODE.FAIL_METHOD
    },
     UNABLE_CREATEIP: {
        message : 'Unable to create Ip',
        status : HTTP_CODE.FAIL_METHOD
    },
    //comment,
     UNABLE_POST_COMMENT: {
        message : 'Unable to postComment',
        status : HTTP_CODE.FAIL_METHOD
    },
     UNABLE_GET_COMMENT: {
        message : 'Unable to getComment',
        status : HTTP_CODE.FAIL_METHOD
    },
    //idea
     UNABLE_POST_IDEA: {
        message : 'Unable to postIdea',
        status : HTTP_CODE.FAIL_METHOD
    },
     UNABLE_DELETE_IDEA: {
        message : 'Unable to deleteIdea',
        status : HTTP_CODE.FAIL_METHOD
    },
     UNABLE_UPDATE_IDEA: {
        message : 'Unable to updateIdea',
        status : HTTP_CODE.FAIL_METHOD
    },
     UNABLE_SHOW_IDEA: {
        message : 'Unable to showIdea',
        status : HTTP_CODE.FAIL_METHOD
    },
     UNABLE_SHOW_MY_IDEA: {
        message : 'Unable to showMyIdea',
        status : HTTP_CODE.FAIL_METHOD
    },
     UNABLE_SHOW_ADMIN_IDEA: {
        message : 'Unable to showAdminUserIdea',
        status : HTTP_CODE.FAIL_METHOD
    },
     UNABLE_CLICK_IDEA: {
        message : 'Unable to getClickIdea',
        status : HTTP_CODE.FAIL_METHOD
    },
     UNABLE_IDEA_COUNT: {
        message : 'Unable to getIdeaCout',
        status : HTTP_CODE.FAIL_METHOD
    },
     UNABLE_UPDATE_USERTOKEN: {
        message : 'Middleware refresh : unable to updateUserToken',
        status : HTTP_CODE.FAIL_METHOD
    },
    //middleware

}

const controllerError = {
    CONTROLLER_SIGNUP : {
        message : 'Controller signUP Error',
        status : HTTP_CODE.SERVER_ERROR
    },
    CONTROLLER_SEND_EMAIL : {
        message : 'Controller sendEmail Error',
        status : HTTP_CODE.SERVER_ERROR
    },
    CONTROLLER_CHECK_EMAIL : {
        message : 'Controller checkEmail Error',
        status : HTTP_CODE.SERVER_ERROR
    },
    CONTROLLER_FIND_ID_SEND_EMAIL : {
        message : 'Controller findIdSendMail Error',
        status : HTTP_CODE.SERVER_ERROR
    },
    CONTROLLER_FIND_PW_SEND_EMAIL : {
        message : 'Controller findPwSendMail Error',
        status : HTTP_CODE.SERVER_ERROR
    },
    CONTROLLER_UPDATE_PW : {
        message : 'Controller updatePw Error',
        status : HTTP_CODE.SERVER_ERROR
    },
    CONTROLLER_SIGNIN : {
        message : 'Controller signIn Error',
        status : HTTP_CODE.SERVER_ERROR
    },
    CONTROLLER_FORCE_SIGNIN : {
        message : 'Controller forceSignIn Error',
        status : HTTP_CODE.SERVER_ERROR
    },
    CONTROLLER_LOGOUT : {
        message : 'Controller logout Error',
        status : HTTP_CODE.SERVER_ERROR
    },
    CONTROLLER_CHECK_ID : {
        message : 'Controller checkId Error',
        status : HTTP_CODE.SERVER_ERROR
    },
    CONTROLLER_CHECK_NICKNAME : {
        message : 'Controller checkNickName Error',
        status : HTTP_CODE.SERVER_ERROR
    },


/*
Controller  Error
*/


}

const serviceError ={
    //anonymous service
    SERVICE_VALIDATION_SIGNUP : {
        message : 'Service validation signUp Error',
        status : HTTP_CODE.SERVER_ERROR
    },
    SERVICE_SIGNUP : {
        message : 'Service signUp Error',
        status : HTTP_CODE.SERVER_ERROR
    },
    SERVICE_FIND_USER_BY_ID : {
        message : 'Service findUserById Error',
        status : HTTP_CODE.SERVER_ERROR
    },
    SERVICE_FIND_USER_BY_EMAIL : {
        message : 'Service findUserByEmail Error',
        status : HTTP_CODE.SERVER_ERROR
    },
    SERVICE_SIGNIN : {
        message : 'Service signIn Error',
        status : HTTP_CODE.SERVER_ERROR
    },
    SERVICE_SEND_EMAIL : {
        message : 'Service sendEmail Error',
        status : HTTP_CODE.SERVER_ERROR
    },
    SERVICE_FIND_AUTH_NO_BY_EMAIL : {
        message : 'Service findAuthNoByEmail Error',
        status : HTTP_CODE.SERVER_ERROR
    },
    SERVICE_CHECK_EMAIL : {
        message : 'Service checkEmail Error',
        status : HTTP_CODE.SERVER_ERROR
    },
    SERVICE_FIND_PW_SEND_EMAIL : {
        message : 'Service findPwSendMail Error',
        status : HTTP_CODE.SERVER_ERROR
    },
    SERVICE_UPDATE_PW : {
        message : 'Service updatePw Error',
        status : HTTP_CODE.SERVER_ERROR
    },
    SERVICE_FIND_USER_BY_ID_PW : {
        message : 'Service findUserByIdPw Error',
        status : HTTP_CODE.SERVER_ERROR
    },
    SERVICE_LOGOUT : {
        message : 'Service logout Error',
        status : HTTP_CODE.SERVER_ERROR
    },
    SERVICE_FORCE_SIGNIN : {
        message : 'Service forceSignIn Error',
        status : HTTP_CODE.SERVER_ERROR
    },
    // idea
    SERVICE_CREATE_IDEA : {
        message : 'Service createIdea Error',
        status : HTTP_CODE.SERVER_ERROR
    },
    SERVICE_GET_ALL_IDEA : {
        message : 'Service getAllIdea Error',
        status : HTTP_CODE.SERVER_ERROR
    },
    SERVICE_GET_MY_IDEA : {
        message : 'Service getMyIdea Error',
        status : HTTP_CODE.SERVER_ERROR
    },
    SERVICE_GET_ADMIN_USER_IDEA : {
        message : 'Service getAdminUserIdea Error',
        status : HTTP_CODE.SERVER_ERROR
    },
    SERVICE_GET_IDEA : {
        message : 'Service getIdea Error',
        status : HTTP_CODE.SERVER_ERROR
    },
    SERVICE_UPDATE_IDEA : {
        message : 'Service updateIdea Error',
        status : HTTP_CODE.SERVER_ERROR
    },
    SERVICE_DELETE_IDEA : {
        message : 'Service deleteIdea Error',
        status : HTTP_CODE.SERVER_ERROR
    },
    // statistics
    SERVICE_VALIDATION_FIND_IP : {
        message : 'Service Validation findIp Error',
        status : HTTP_CODE.SERVER_ERROR
    },
    SERVICE_CREATE_IP : {
        message : 'Service createIp Error',
        status : HTTP_CODE.SERVER_ERROR
    },
    SERVICE_GET_USER_COUNT : {
        message : 'Service getUserCount Error',
        status : HTTP_CODE.SERVER_ERROR
    },
    SERVICE_GET_TODAY_VISITOR : {
        message : 'Service getTodayVisitor Error',
        status : HTTP_CODE.SERVER_ERROR
    },
    SERVICE_GET_TOTAL_VISITOR : {
        message : 'Service getTotalVisitor Error',
        status : HTTP_CODE.SERVER_ERROR
    },
    SERVICE_UPDATE_TOTAL_VISITOR : {
        message : 'Service updateTotalVisitor Error',
        status : HTTP_CODE.SERVER_ERROR
    },
    SERVICE_GET_NEWS_ITEM : {
        message : 'Service getNewsItem Error',
        status : HTTP_CODE.SERVER_ERROR
    },
    SERVICE_CREATE_NEWS : {
        message : 'Service createNews Error',
        status : HTTP_CODE.SERVER_ERROR
    },
    SERVICE_DELETE_NEWS: {
        message : 'Service deleteNews Error',
        status : HTTP_CODE.SERVER_ERROR
    },
    SERVICE_GET_IDEA_COUNT : {
        message : 'Service getIdeaCount Error',
        status : HTTP_CODE.SERVER_ERROR
    },
    SERVICE_GET_USER_DATA : {
        message : 'Service getUserData Error',
        status : HTTP_CODE.SERVER_ERROR
    },
    SERVICE_UPDATE_ROLE : {
        message : 'Service updateRole Error',
        status : HTTP_CODE.SERVER_ERROR
    },
    SERVICE_UPDATE_USER_TOKEN : {
        message : 'Service updateUserToken Error',
        status : HTTP_CODE.SERVER_ERROR
    },
    SERVICE_GET_USER_TOKEN : {
        message : 'Service getUserToken Error',
        status : HTTP_CODE.SERVER_ERROR
    },
    SERVICE_LOGOUT : {
        message : 'Service logout Error',
        status : HTTP_CODE.SERVER_ERROR
    },
    SERVICE_FORCE_LOGOUT : {
        message : 'Service forceLogout Error',
        status : HTTP_CODE.SERVER_ERROR
    },
    SERVICE_GET_USER : {
        message : 'Service getUser Error',
        status : HTTP_CODE.SERVER_ERROR
    },
}

const repoError = {
    //anonymous repository
    DB_FIND_USER_BY_ID : {
        message : 'DB findUserById Error',
        status : HTTP_CODE.SERVER_ERROR
    },
    DB_FIND_USER_BY_NICKNAME : {
        message : 'DB findUserByNickName Error',
        status : HTTP_CODE.SERVER_ERROR
    },
    DB_FIND_USER_BY_EMAIL : {
        message : 'DB findUserByEmail Error',
        status : HTTP_CODE.SERVER_ERROR
    },
    DB_SIGNUP : {
        message : 'DB signUp Error',
        status : HTTP_CODE.SERVER_ERROR
    },
    DB_MAKE_USER_TOKE : {
        message : 'DB makeUserToken Error',
        status : HTTP_CODE.SERVER_ERROR
    },
    DB_HAVE_USER_TOKEN : {
        message : "DB haveUserToken Error",
        status : HTTP_CODE.SERVER_ERROR
    },
    DB_SAVE_USER_TOKEN: {
        message : 'DB saveUserToken Error',
        status : HTTP_CODE.SERVER_ERROR
    },
    DB_SAVE_EMAIL_AUTHENTICATION: {
        message : 'DB saveEmailAuthentication Error',
        status : HTTP_CODE.SERVER_ERROR
    },
    DB_FIND_AUTH_NO_BY_EMAIL: {
        message : 'DB findAuthNoByEmail Error',
        status : HTTP_CODE.SERVER_ERROR
    },
    DB_DELETE_AUTH_NO: {
        message : 'DB deleteAuthNo Error',
        status : HTTP_CODE.SERVER_ERROR
    },
    DB_UPDATE_PW : {
        message : 'DB updatePw Error',
        status : HTTP_CODE.SERVER_ERROR
    },
    DB_FIND_USER_BY_ID_PW : {
        message : 'DB findUserByIdPw Error',
        status : HTTP_CODE.SERVER_ERROR
    },
    //comment
    DB_POST_COMMENT : {
        message : 'DB postComment Error',
        status : HTTP_CODE.SERVER_ERROR
    },
    DB_GET_COMMENT : {
        message : 'DB getComment Error',
        status : HTTP_CODE.SERVER_ERROR
    },
    //Idea
    DB_CREATE_IDEA : {
        message : 'DB createIdea Error',
        status : HTTP_CODE.SERVER_ERROR
    },
    DB_GET_ALL_IDEA : {
        message : 'DB getAllIdea Error',
        status : HTTP_CODE.SERVER_ERROR
    },
    DB_GET_MY_IDEA : {
        message : 'DB getMyIdea Error',
        status : HTTP_CODE.SERVER_ERROR
    },
    DB_GET_ADMIN_USER_IDEA : {
        message : 'DB getAdminUserIdea Error',
        status : HTTP_CODE.SERVER_ERROR
    },
    DB_GET_IDEA : {
        message : 'DB getIdea Error',
        status : HTTP_CODE.SERVER_ERROR
    },
    DB_UPDATE_IDEA : {
        message : 'DB updateIdea Error',
        status : HTTP_CODE.SERVER_ERROR
    },
    DB_DELETE_IDEA : {
        message : 'DB deleteIdea Error',
        status : HTTP_CODE.SERVER_ERROR
    },
    // statistics
    DB_GET_USER_COUNT : {
        message : 'DB getUserCount Error',
        status : HTTP_CODE.SERVER_ERROR
    },
    DB_FIND_VISITOR_BY_IP : {
        message : 'DB findVisitorByIp Error',
        status : HTTP_CODE.SERVER_ERROR
    },
    DB_CREATE_IP : {
        message : 'DB createIp Error',
        status : HTTP_CODE.SERVER_ERROR
    },
    DB_GET_TODAY_VISITOR : {
        message : 'DB getTodayVisitor Error',
        status : HTTP_CODE.SERVER_ERROR
    },
    DB_GET_TOTAL_VISITOR : {
        message : 'DB getTotalVisitor Error',
        status : HTTP_CODE.SERVER_ERROR
    },
    DB_UPDATE_TOTAL_VISITOR : {
        message : 'DB updateTotalVisitor Error',
        status : HTTP_CODE.SERVER_ERROR
    },
    DB_DELETE_VISITOR : {
        message : 'DB deleteVisitor Error',
        status : HTTP_CODE.SERVER_ERROR
    },
    DB_GET_NEWS_ITEM : {
        message : 'DB getNewsItem Error',
        status : HTTP_CODE.SERVER_ERROR
    },
    DB_CREATE_NEWS : {
        message : 'DB createNews Error',
        status : HTTP_CODE.SERVER_ERROR
    },
    DB_DELETE_NEWS : {
        message : 'DB deleteNews Error',
        status : HTTP_CODE.SERVER_ERROR
    },
    DB_GET_IDEA_COUNT : {
        message : 'DB getIdeaCount Error',
        status : HTTP_CODE.SERVER_ERROR
    },
    //user
    DB_GET_USER_DATA : {
        message : 'DB getUserData Error',
        status : HTTP_CODE.SERVER_ERROR
    },
    DB_UPDATE_ROLE : {
        message : 'DB updateRole Error',
        status : HTTP_CODE.SERVER_ERROR
    },
    DB_UPDATE_USERTOKEN : {
        message : 'DB updateUserToken Error',
        status : HTTP_CODE.SERVER_ERROR
    },
    DB_GET_USER_TOKEN : {
        message : 'DB getUserToken Error',
        status : HTTP_CODE.SERVER_ERROR
    },
    DB_LOGOUT : {
        message : 'DB logout Error',
        status : HTTP_CODE.SERVER_ERROR
    },
    DB_FORCE_LOGOUT : {
        message : 'DB forceLogout Error',
        status : HTTP_CODE.SERVER_ERROR
    },
    DB_GET_USER : {
        message : 'DB getUser Error',
        status : HTTP_CODE.SERVER_ERROR
    },
}



module.exports = {
    ...preProcessing,
    ...postProcessing,
    ...controllerError,
    ...serviceError,
    ...repoError,
}
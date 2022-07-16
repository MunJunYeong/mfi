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

const controllerError = {
    //anonymous
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
    //comment
    CONTROLLER_POST_COMMENT : {
        message : 'Controller postComment Error',
        status : HTTP_CODE.SERVER_ERROR
    },
    CONTROLLER_GET_COMMENT : {
        message : 'Controller getComment Error',
        status : HTTP_CODE.SERVER_ERROR
    },
    //idea
    CONTROLLER_POST_IDEA : {
        message : 'Controller postIdea Error',
        status : HTTP_CODE.SERVER_ERROR
    },
    CONTROLLER_SHOW_IDEA : {
        message : 'Controller showIdea Error',
        status : HTTP_CODE.SERVER_ERROR
    },
    CONTROLLER_DELETE_IDEA : {
        message : 'Controller deleteIdea Error',
        status : HTTP_CODE.SERVER_ERROR
    },
    CONTROLLER_UPDATE_IDEA : {
        message : 'Controller updateIdea Error',
        status : HTTP_CODE.SERVER_ERROR
    },
    CONTROLLER_CLICK_IDEA : {
        message : 'Controller getClickIdea Error',
        status : HTTP_CODE.SERVER_ERROR
    },
    CONTROLLER_SHOW_MY_IDEA : {
        message : 'Controller showMyIdea Error',
        status : HTTP_CODE.SERVER_ERROR
    },
    CONTROLLER_SHOW_ADMIN_IDEA  : {
        message : 'Controller showAdminUserIdea Error',
        status : HTTP_CODE.SERVER_ERROR
    },
    CONTROLLER_CREATE_IP : {
        message : 'Controller createIp Error',
        status : HTTP_CODE.SERVER_ERROR
    },
    CONTROLLER_GET_USER_COUNT : {
        message : 'Controller getUserCount Error',
        status : HTTP_CODE.SERVER_ERROR
    },
    CONTROLLER_GET_TODAY_VISITOR : {
        message : 'Controller getTodayVisitor Error',
        status : HTTP_CODE.SERVER_ERROR
    },
    CONTROLLER_GET_TOTAL_VISITOR : {
        message : 'Controller getTotalVisitor Error',
        status : HTTP_CODE.SERVER_ERROR
    },
    CONTROLLER_GET_NEWS_ITEM : {
        message : 'Controller getNewsItem Error',
        status : HTTP_CODE.SERVER_ERROR
    },
    CONTROLLER_GET_IDEA_COUNT : {
        message : 'Controller getIdeaCount Error',
        status : HTTP_CODE.SERVER_ERROR
    },
    CONTROLLER_UPDATE_USER_ROLE : {
        message : 'Controller updateUserRole Error',
        status : HTTP_CODE.SERVER_ERROR
    },
    CONTROLLER_GET_USER_DATA : {
        message : 'Controller getuserData Error',
        status : HTTP_CODE.SERVER_ERROR
    },
    CONTROLLER_GET_USER : {
        message : 'Controller getUser Error',
        status : HTTP_CODE.SERVER_ERROR
    },
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
    ...controllerError,
    ...serviceError,
    ...repoError,
}
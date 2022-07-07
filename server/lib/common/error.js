const HTTP_CODE = {
    SUCCESS: 200,
    NOT_ACCESS : 406,
    FAIL_METHOD : 424,
    DB_SERVER : 500,
}

const preProcessing = {
    NOT_FOUND : {
        message : '일치하는 정보가 없습니다.',
        status : HTTP_CODE.SUCCESS
    },
    NOT_CORRECT_AUTHNO : {
        message : '인증번호가 일치하지 않습니다!',
        status : HTTP_CODE.SUCCESS
    }, 
    ISLOGIN : {
        message : 'isLogin',
        status : HTTP_CODE.SUCCESS
    },
    EXIST_EMAIL : {
        message : '이미 존재하는 이메일입니다.',
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
    WRONG_ACCESS : { // front에서 막아둔 부분인데 비정상적인 접근
        message : 'wrong access',
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

const dbError = {
    //anonymous
    DB_GET_USER_COUNT : {
        message : 'Unable to getUserCount[service]',
        status : HTTP_CODE.DB_SERVER
    },
    DB_FIND_ID_SEND_MAIL : {
        message : 'Unable to send findId [servcie]',
        status : HTTP_CODE.DB_SERVER
    },
    DB_FIND_USER_FOR_FINDID: {
        message : 'Unable to findUser for findIdSendMail[service]',
        status : HTTP_CODE.DB_SERVER
    },
    DB_FIND_PW_SEND_MAIL : {
        message : 'Unable to send findPw[service]',
        status : HTTP_CODE.DB_SERVER
    },
    DB_CHECK_EMAIL: {
        message : 'Unable to checkEmail[service]',
        status : HTTP_CODE.DB_SERVER
    },
    DB_FIND_AUTH_NO: {
        message : 'Unable to findAuthNo for checkEmail[service]',
        status : HTTP_CODE.DB_SERVER
    },
    DB_SEND_EMAIL: {
        message : 'Unable to sendMail[service]',
        status : HTTP_CODE.DB_SERVER
    },
    DB_MAKE_USER_TOKE : {
        message : 'Unable to makeUserToken[servcie]',
        status : HTTP_CODE.DB_SERVER
    },
    DB_SIGNUP : {
        message : 'Unable to signUp[service]',
        status : HTTP_CODE.DB_SERVER
    },
    DB_GET_NEWS_ITEM : {
        message : 'Unable to getNewsItem[service]',
        status : HTTP_CODE.DB_SERVER
    },
    DB_FIND_USER_PARA_IDPW : {
        message : 'Unable to findIdUser for forceSignIn[service]',
        status : HTTP_CODE.DB_SERVER
    },
    DB_HAVE_USER_TOKEN : {
        message : "Unable to haveUserToken[service]",
        status : HTTP_CODE.DB_SERVER
    },
    DB_SAVE_USER_TOKEN: {
        message : 'Unable to saveUserToken[service]',
        status : HTTP_CODE.DB_SERVER
    },
    DB_MAKE_USER_TOKEN: {
        message : 'Unable to makeUserToken[service]',
        status : HTTP_CODE.DB_SERVER
    },
    DB_DUPLICATE_NICKNAME: {
        message : 'Unable to duplicatedNickName[service]',
        status : HTTP_CODE.DB_SERVER
    },
    DB_DUPLICATE_ID: {
        message : 'Unable to duplicatedId[service]',
        status : HTTP_CODE.DB_SERVER
    },
    DB_SIGNIN: {
        message : 'Unable to signIn[service]',
        status : HTTP_CODE.DB_SERVER
    },
    DB_FIND_ID_SIGNIN: {
        message : 'Unable to findId for signIn[service]',
        status : HTTP_CODE.DB_SERVER
    },
    DB_UPDATE_PW : {
        message : 'Unable to updatePw[service]',
        status : HTTP_CODE.DB_SERVER
    },
    //comment
    DB_POST_COMMENT: {
        message : 'Unable to postComment[service]',
        status : HTTP_CODE.DB_SERVER
    },
    DB_GET_COMMENT: {
        message : 'Unable to getComment[service]',
        status : HTTP_CODE.DB_SERVER
    },
    //idea
    
     DB_GET_IDEA_COUNT: {
        message : 'Unable to getIdeaCount[service]',
        status : HTTP_CODE.DB_SERVER
    },
     DB_CREATE_IDEA: {
        message : 'Unable to createIdea[service]',
        status : HTTP_CODE.DB_SERVER
    },
     DB_GET_ALL_IDEA: {
        message : 'Unable to getAllIdea[service]',
        status : HTTP_CODE.DB_SERVER
    },
     DB_GET_MY_IDEA: {
        message : 'Unable to getMyIdea[service]',
        status : HTTP_CODE.DB_SERVER
    },
     DB_GET_ADMIN_USER_IDEA: {
        message : 'Unable to getAdminUserIdea[service]',
        status : HTTP_CODE.DB_SERVER
    },
     DB_GET_IDEA: {
        message : 'Unable to getIdea[service]',
        status : HTTP_CODE.DB_SERVER
    },
     DB_UPDATE_IDEA : {
        message : 'Unable to updateIdea[service]',
        status : HTTP_CODE.DB_SERVER
    },
     DB_DELETE_IDEA: {
        message : 'Unable to deleteIdea[service]',
        status : HTTP_CODE.DB_SERVER
    },
    //news
     DB_CREATE_NEWS: {
        message : 'Unable to createNews[service]',
        status : HTTP_CODE.DB_SERVER
    },
     DB_DELETE_NEWS: {
        message : 'Unable to  deleteNews[service]',
        status : HTTP_CODE.DB_SERVER
    },
    //visitor
     DB_FIND_IP: {
        message : 'Unable to findIp for createIp[service]',
        status : HTTP_CODE.DB_SERVER
    },
     DB_CREATE_IP: {
        message : 'Unable to createIp[service]',
        status : HTTP_CODE.DB_SERVER
    },
     DB_GET_TODAY_VISITOR: {
        message : 'Unable to getTodayVisitor[service]',
        status : HTTP_CODE.DB_SERVER
    },
     DB_GET_TOTAL_VISITOR: {
        message : 'Unable to getTotalVisitor[service]',
        status : HTTP_CODE.DB_SERVER
    },
     DB_UPDATE_TOTAL_VISITOR: {
        message : 'Unable to updateTotalVisitor[service]',
        status : HTTP_CODE.DB_SERVER
    },
    //user
    DB_NOT_FOUND_USER : {
        message : 'Unable to findUser for idx[service]',
        status : HTTP_CODE.DB_SERVER
    },
     DB_UPDATE_ROLE: {
        message : 'Unable to updateRole[service]',
        status : HTTP_CODE.DB_SERVER
    },
     DB_GET_USER: {
        message :  'Unable to  getUser[service]',
        status : HTTP_CODE.DB_SERVER
    },
    DB_GET_USER_DATA: {
        message :  'Unable to getUserData[service]',
        status : HTTP_CODE.DB_SERVER
    },
     DB_LOGOUT: {
        message : 'Unable to  logout[service]',
        status : HTTP_CODE.DB_SERVER
    },
     DB_FORCE_LOGOUT: {
        message : 'Unable to  forceLogout[service]',
        status : HTTP_CODE.DB_SERVER
    },
     DB_GET_USER_TOKEN: {
        message :  'Unable to getUserToken[service]',
        status : HTTP_CODE.DB_SERVER
    },
    DB_UPDATE_USERTOKEN: {
        message : 'Unable to updateUserToken[service]',
        status : HTTP_CODE.DB_SERVER
    },
    DB_GET_USER_DATA: {
        message : 'Unable to getUserData[service]',
        status : HTTP_CODE.DB_SERVER
    },
    //validation
    DB_HAVE_USER_TOKEN : {
        message : 'Unable to haveUserToken[service]',
        status : HTTP_CODE.DB_SERVER
    },
    DB_IS_DUPLICATED_EMAIL : {
        message : 'Unable to isDuplicatedEmail[servcie]',
        status : HTTP_CODE.DB_SERVER
    },
    DB_IS_DUPLICATED_NICKNAME : {
        message : 'Unable to isDuplicatedNickName[servcie]',
        status : HTTP_CODE.DB_SERVER
    },
    DB_IS_DUPLICATED_ID : {
        message : 'Unable to isDuplicatedId[servcie]',
        status : HTTP_CODE.DB_SERVER
    },
}




module.exports = {
    ...preProcessing,
    ...postProcessing,
    ...dbError
}
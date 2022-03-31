const preProcessing = {
    101 : '일치하는 정보가 없습니다.',
    102 : '최소 6글자 이상 만들어주세요.',
    103 : '영어, 숫자, 특수기호를 모두 사용해주세요.',
    104 : '이메일을 입력해주세요 !',
    105 : '올바른 이메일 형식을 입력해주세요 !',
    106 : '값을 입력해주세요.',
    107 : '인증 번호를 입력해주세요.',
    108 : '이메일을 입력해주세요 !',
    109 : 'wrong access',
    110 : 'ID를 입력해주세요.',
    111 : '영어와 숫자를 사용해주세요.',
    113 : '3글자 이상 입력해주세요',
    114 : 'no subject',
    115 : 'no content',
    116 : 'no ideaIdx',
    119 : '이미 존재하는 이메일입니다.',
    120 : 'fail to send',
    121 : '인증번호가 일치하지 않습니다!',
    122 : '잘못된 비밀번호 입니다.',
    123 : '잘못된 아이디 입니다.',
    124 : '‘트래픽 문제로 잠시 후 다시 시도해주세요(이미 존재하는 회원)’',
}

const postProcessing = {
    1 : 'Unable to get userCount',
    2 : 'Unable to get todayVisitor',
    3 : 'Unable to get totalVisitor',
    4 : 'Unable to get newsItem',
    5 :' Unable signup',
    6 : 'Unable sendEmail',
    7 : 'Unable to checkEmail',
    8 : 'Unable to findIdSendMail',
    9 :' Unable to findPwSendMail',
    10 : 'Unable to updatePw',
    11 : 'Unable to signIn',
    12 : 'Unable to checkId',
    13 : 'Unable to checkNickName',
    14 : 'Unable to updateUserRole',
    15 : 'Unable to getUser(role:admin)',
    //comment,
    16 : 'Unable to postComment',
    17 : 'Unable to getComment',
    //idea
    18 : 'Unable to postIdea',
    19 : 'Unable to deleteIdea',
    20 : 'Unable to updateIdea',
    21 : 'Unable to showIdea',
    22 : 'Unable to showMyIdea',
    23 : 'Unable to showAdminUserIdea',

}

const dbError = {
//anonymous
50 : 'Unable to getUserCount[service]',
51 : 'Unable to getNewsItem[service]',
52 : 'Unable to signUp[service]',
53 : 'Unable to findUser for sendMail[service]',
54 : 'Unable to sendMail[service]',
55 : 'Unable to findAuthNo for checkEmail[service]',
56 : 'Unable to checkEmail[service]',
57 : 'Unable to findUser for findIdSendMail[service]',
58 : 'Unable to send findId [servcie]',
59 : 'Unable to findUser for findPwSendMail[servcie]',
60 : 'Unable to send findPw[service]',
61 : 'Unable to updatePw[service]',
62 : 'Unable to findId for signIn[service]',
63 : 'Unable to signIn[service]',
64 : 'Unable to duplicatedId[service]',
65 : 'Unable to duplicatedNickName[service]',
84 : "Unable to makeUserToken[service]",
85 : "Unable to haveUserToken[service]",
86 : "Unable to saveUserToken[service]",
//comment
66 : 'Unable to postComment[service]',
67 : 'Unable to getComment[service]',
//idea
68 : 'Unable to getIdeaCount[service]',
69 : 'Unable to createIdea[service]',
70 : 'Unable to getAllIdea[service]',
71 : 'Unable to getMyIdea[service]',
72 : 'Unable to getAdminUserIdea[service]',
73 : 'Unable to getIdea[service]',
74 : 'Unable to updateIdea[service]',
75 : 'Unable to deleteIdea[service]',
//news
76 : 'Unable to createNews[service]',
77 : 'Unable to  deleteNews[service]',
//visitor
78 : 'Unable to createIp[service]',
79 : 'Unable to getTodayVisitor[service]',
80 : 'Unable to getTotalVisitor[service]',
81 : 'Unable to updateTotalVisitor[service]',
//user
82 : 'Unable to updateRole[service]',
83 : 'Unable to  getUser[service]',
}

module.exports = {
    preProcessing,
    postProcessing,
    dbError
}
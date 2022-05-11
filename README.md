
MFI (Metaphor for Investing)
==================
홈페이지 바로가기 (www.mfinvest.kr)


Created by
------------
* 기획자 : 조재훈
* 개발자 : [문준영](https://github.com/MunJunYeong)

Description
------------
 세상의 아름다움은 남들과 다르게 보는 것에서부터 시작한다고 생각하고, MFI의 메커니즘을 통해서, 다양한 아름다움을 발견할 수 있을거라 생각합니다. 
 ######
 MFI 매커니즘 : 주식 시장에서의 '정보 공유'에 초점을 맞춘 서비스입니다. 서비스에서 '공유'를 활발히 하기 위한 인센티브로 Winner 회원과 Normal 회원이 존재합니다. Winner 회원은 시간의 제약에 상관없이 모든 종목 분석 글을 확인할 수 있습니다. Normal 회원은 45일이 지난 종목 분석 글만 확인 가능합니다.
 

Skills
------------
- Front :
    - Vue.js
- Backend :
    - Node.js
    - Express, Sequelize
- DevOps :
    - AWS EC2, Route53, RDS
    - PostgreSQL
    - Docker
    - Git, sourcetree


Architecture
------------

```bash
├── front/src
│   ├── assets
│   ├── components
|   |     ├── Editor
|   |     |    ├── ModifyTextEditor.vue
|   |     |    ├── TextEditor.vue
|   |     |    ├── Viewer.vue
|   |     ├── CommentItem.vue
|   |     ├── CommentItemMobile.vue
|   |     ├── Footer.vue
|   |     ├── HeaderNav.vue
|   |     ├── IdeaItem.vue
|   |     ├── MyIdea.uve
|   |     ├── NewsItem.vue
|   |     ├── UserItem.vue
│   ├── lib
|   |     ├── axios.js
│   ├── plugins
|   |     ├── vuetify.js
│   ├── router
|   |     ├── index.js
│   ├── services
|   |     ├── anonymous.js
|   |     ├── auth.js
|   |     ├── idea.js
|   |     ├── index.js
│   ├── store
|   |     ├── anonymous.js
|   |     ├── auth.js
|   |     ├── idea.js
|   |     ├── index.js
│   └── views
|   |    ├── auth
|   |    |    ├── layout
|   |    |    |      ├── Index.vue
|   |    |    ├── FindId.vue
|   |    |    ├── FindPw.vue
|   |    |    ├── SignIn.vue
|   |    |    ├── SignUp.vue
|   |    ├── core
|   |    |    ├── layout
|   |    |    |      ├── Index.vue
|   |    |    ├── About.vue
|   |    |    ├── AddIdea.vue
|   |    |    ├── Admin.vue
|   |    |    ├── Home.vue
|   |    |    ├── Idea.vue
|   |    |    ├── IdeaClick.vue
|   |    |    ├── Info.vue
|   |    |    ├── News.vue
|   |    |    ├── Notice.vue
|   |    |    ├── UserIdea.vue
│   ├── .env
│   ├── dockerfile
│   ├── main.js
│   ├── App.vue
│   ├── package.json
|   |
├── Server
│   ├── controllers
|   |     ├── anonymous
|   |     ├── comment
|   |     ├── idea
|   |     ├── statistics
|   |     ├── user
│   ├── lib
|   |     ├── common
|   |     |    ├── index.js
|   |     |    ├── middleware.js
|   |     |    ├── pagination.js
|   |     |    ├── error.js
|   |     |    ├── jwt.js
|   |     |    ├── utils.js
|   |     |    ├── winston.js
|   |     ├── db
|   |     |    ├── config
|   |     |    |     |── index.js
|   |     |    ├── migrations
|   |     |    |     |── db model만큼 .js
|   |     |    ├── model
|   |     |    |     |── authentication.js
|   |     |    |     |── comment.js
|   |     |    |     |── idea.js
|   |     |    |     |── index.js
|   |     |    |     |── news.js
|   |     |    |     |── totalVisitor.js
|   |     |    |     |── user.js
|   |     |    |     |── userToken.js
|   |     |    |     |── visitor.js
|   |     |    ├── seeders
|   |     |    |     |── db model만큼.js
│   ├── logs
|   |     ├── error, warn 등 파일 저장
│   ├── router
|   |     ├── anonymous
|   |     ├── comment
|   |     ├── idea
|   |     ├── statistics
|   |     ├── user
|   |     ├── index.js
│   ├── schedule
|   |     ├── index.js
│   ├── service
|   |     ├── anonymous
|   |     ├── comment
|   |     ├── idea
|   |     ├── news
|   |     ├── user
|   |     ├── visitor
|   |     |
│   ├── index.js
│   ├── .env.js
│   ├── .sequelizerc.js
│   ├── dockerfile.js
│   ├── package.json
│   └── index.js
├── docker-compose.yaml

``` 

 
 Tutorial
 ------------
 데스크탑에 "mfi" 이름의 폴더로 프로젝트가 있다고 가정하고 local 환경에서의 튜토리얼 예제입니다.

 ### install dependency
      cd front
      npm install 
      cd ..
      cd server
      npm install
 
모듈을 설치했다면 front와 server 파일에 .env 파일을 생성해줍니다.

### setting front .env
      VUE_APP_BACKEND_HOST = 'http://localhost:8080'
      
### setting server .env
만약 Development도 추가하고 싶다면 LOCAL부분처럼 DEVELOPMENT로 추가 생성시 가능

      //PostgreSQL connection settings 
      LOCAL_USERNAME = '' 
      LOCAL_PASSWORD = '' 
      LOCAL_DATABASE = '' 
      LOCAL_HOST = ''
      
      //Email Authentication
      EMAIL_ID = ''
      EMAIL_PW = ''
      
      // JWT Secret key      
      SECRET = ''
      
### Starting Server
      cd server
      npx sequelize-cli db:migrate
      npx sequelize-cli db:seed:all
      npm run start:local // local env
      npm run start:dev //development env
  
  
### Starting Front
      cd front
      npm run serve
    
 

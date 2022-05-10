
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


 
 Tutorial
 ------------
 데스크탑에 "mfi" 이름의 폴더로 프로젝트가 있다고 가정한다.
 
 ### Starting Server
      cd server
      npm install
      npx sequelize-cli db:migrate
      npx sequelize-cli db:seed:all
      npm run start:local // local env
      npm run start:dev //development env
  
  
  ### Starting Front
      cd front
      npm install
      npm run serve
    
 
 

Sequelize-cli를 이용한 DB migration 및 seeder 작업 
dotenv를 통해 local 환경과 dev환경 구분(local : nodemon, dev : pm2)

AWS EC2 Route53을 이용하여 ubuntu에 git, docker .. 설치 후 이용하여 서비스 운용

Winston logging -> dev환경에서는 warn, error log level만 저장

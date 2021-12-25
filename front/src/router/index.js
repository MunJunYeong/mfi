import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '../views/core/Home.vue'
import Idea from '../views/core/Idea.vue'
import About from '../views/core/About.vue'
import AddIdea from '../views/core/AddIdea.vue'
import IdeaClick from '../views/core/IdeaClick.vue'
import Info from '../views/core/Info.vue'
import Admin from '../views/core/Admin.vue'
import UserIdea from '../views/core/UserIdea.vue'

import coreLayoutIndexVue from '../views/core/layout/Index.vue'
import authLayoutIndexVue from '../views/auth/layout/Index.vue'

import SignIn from '../views/auth/SignIn.vue'
import SignUp from '../views/auth/SignUp.vue'
import FindId from '../views/auth/FindId.vue'
import FindPw from '../views/auth/FindPw.vue'

import jwt_decode from 'jwt-decode'



Vue.use(VueRouter)

// router.beforeEach(function (to, from, next) {
//   // to : 이동할 url
//   // from : 현재 url
//   // next : to에서 지정한 url로 이동하기 위해 꼭 호출해야 하는 함수
  
// });


const routes = [ 
  {
    path: '/',
    redirect: '/home', // 초기 진입 페이지 설정
  },
  {
    path: '/auth',
    component : authLayoutIndexVue,
    children: [
      {
        path:'signIn',
        component: SignIn,
      },
      {
        path: 'signUp',
        component: SignUp,
      },
      {
        path: 'findId',
        component: FindId,
      },
      {
        path: 'findPw',
        component: FindPw,
      }
    ]
  },

  {
    path : '/',
    component : coreLayoutIndexVue,
    children: [
      {
        path : 'home',
        component : Home
      },
      {
        path : 'idea',
        component : Idea
      },
      {
        path : 'about',
        component : About
      },
      {
        path : 'add-idea',
        component : AddIdea
      },
      {
        path : 'idea/:ideaIdx',
        component : IdeaClick,
      },
      {
        path : 'info',
        component : Info
      },
      {
        path : 'admin',
        component : Admin
      },
      {
        path : 'user/:userIdx/idea',
        component : UserIdea,
      },
      {
        path : 'user/:userIdx/idea/:ideaIdx',
        component : IdeaClick,
        beforeEnter: function(to, from, next) {
          // 인증 값 검증 로직 추가
          let token = localStorage.getItem('accessToken');
          if(jwt_decode(token).role === 'admin'){
            next();
          }else {
            alert('관리자만 접근 가능한 페이지 주소입니다.');
          }
        }
        // meta: {authRequired: true},
        
      }
    ]
  },
]

const router = new VueRouter({
  routes
})

export default router

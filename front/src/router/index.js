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


Vue.use(VueRouter)

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
        children : [
          {
            path : '/:ideaIdx',
            component : IdeaClick
          }
          
        ]
      },
    ]
  },
]

const router = new VueRouter({
  routes
})

export default router

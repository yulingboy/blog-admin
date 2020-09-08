import Vue from 'vue'
import Router from 'vue-router'
import Login from '../components/Login.vue'
import Home from '../components/Home.vue'
import Welcome from '../components/Welocome.vue'
import Users from '../components/Users.vue'
import Articles from '../components/Articles.vue'
import Addarticle from '../components/Addarticle.vue'
import Classify from '../components/Classify.vue'
import Adduser from '../components/Adduser.vue'
import Friendly from '../components/Friendly.vue'
import Editarticle from '../components/Editarticle.vue'
import Comment from '../components/Comment.vue'

Vue.use(Router)

const router = new Router({
  mode: 'hash',
  routes: [{
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/home',
    component: Home,
    redirect: '/welcome',
    children: [{
      path: '/welcome',
      component: Welcome
    },
    {
      path: '/users',
      component: Users
    },
    {
      path: '/articles',
      component: Articles
    },
    {
      path: '/addarticle',
      component: Addarticle
    },
    {
      path: '/classify',
      component: Classify
    },
    {
      path: '/adduser',
      component: Adduser
    },
    {
      path: '/friendly',
      component: Friendly
    },
    {
      path: '/editarticle',
      component: Editarticle
    },
    {
      path: '/comment',
      component: Comment
    }]
  }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.path === '/login') {
    return next()
  }
  const str = window.sessionStorage.getItem('token')
  if (!str) {
    return next('/login')
  }
  next()
})

export default router

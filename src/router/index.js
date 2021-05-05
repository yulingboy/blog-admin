import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '@/store';

Vue.use(VueRouter);

const originalPush = VueRouter.prototype.push;

VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err);
};

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/Login'),
    meta: { title: '登录' }
  },
  {
    path: '/',
    component: () => import('@/views/Home.vue'),
    redirect: '/index',
    meta: { title: '首页' },
    children: [
      {
        path: '/index',
        name: 'index',
        component: () => import('@/views/Index'),
        meta: { title: '统计', icon: 'el-icon-s-home' }
      },
      {
        path: '/users',
        name: 'users',
        meta: { title: '用户管理', icon: 'el-icon-user-solid' },
        component: () => import('@/views/User')
      },
      {
        path: '/articles',
        name: 'articles',
        meta: { title: '文章管理', icon: 'el-icon-document' },
        component: () => import('@/views/Article'),
        redirect: '/articles/list',
        children: [
          {
            path: 'list',
            name: 'articleslist',
            meta: { title: '文章列表', icon: 'el-icon-document' },
            component: () => import('@/views/Article/list.vue')
          },
          {
            path: 'add',
            name: 'articleadd',
            meta: { title: '新增文章', icon: 'el-icon-document' },
            component: () => import('@/views/Article/article.vue')
          },
          {
            path: 'edit/:id',
            name: 'articleedit',
            meta: { title: '修改文章', icon: 'el-icon-document' },
            component: () => import('@/views/Article/article.vue')
          }
        ]
      },
      {
        path: '/comments',
        name: 'comments',
        meta: { title: '评论管理', icon: 'el-icon-chat-dot-round' },
        component: () => import('@/views/Comments')
      },
      {
        path: '/classify',
        name: 'classifyList',
        meta: { title: '分类管理', icon: 'el-icon-menu' },
        component: () => import('@/views/Classify')
      },
      {
        path: '/notice',
        name: 'notice',
        meta: { title: '通知管理', icon: 'el-icon-message-solid' },
        component: () => import('@/views/Notice'),
        redirect: '/notice/swiper',
        children: [
          {
            path: 'swiper',
            name: 'SwiperList',
            meta: { title: '轮播图管理', icon: 'el-icon-picture' },
            component: () => import('@/views/Notice/components/Swiper/index.vue')
          },
          {
            path: 'friend',
            name: 'FriendList',
            meta: { title: '友链管理', icon: 'el-icon-s-promotion' },
            component: () => import('@/views/Notice/components/Friend/index.vue')
          },
          {
            path: 'images',
            name: 'imagesList',
            meta: { title: '图片管理', icon: 'el-icon-picture' },
            component: () => import('@/views/Notice/components/ImgBed/index.vue')
          },
          {
            path: 'centences',
            name: 'centenceList',
            meta: { title: '佳句管理', icon: 'el-icon-s-comment' },
            component: () => import('@/views/Notice/components/Sentence/index.vue')
          }
        ]
      },
      {
        path: '/record',
        name: 'record',
        meta: { title: '日志管理', icon: 'el-icon-tickets' },
        component: () => import('@/views/Record')
      },
      {
        path: '/system',
        name: 'system',
        meta: { title: '系统设置', icon: 'el-icon-setting' },
        component: () => import('@/views/System')
      }
    ]
  }
  // {
  //   path: '/home',
  //   name: 'Home',
  //   redirect: '/home/index',
  //   component: () => import('@/views/Home.vue'),
  //   meta: {
  //     title: '首页'
  //   },
  //   children: [
  //     {
  //       path: '/index',
  //       name: 'Index',
  //       component: () => import('@/views/Index'),
  //       meta: {
  //         title: '统计'
  //       }
  //     }
  //   ]
  // },
  // {
  //   path: '/users',
  //   name: 'Users',
  //   component: () => import('@/views/Home.vue'),
  //   redirect: '/users/list',
  //   meta: {
  //     title: '用户管理'
  //   },
  //   children: [
  //     {
  //       path: '/users/list',
  //       name: 'List',
  //       meta: {
  //         title: '用户列表'
  //       },
  //       component: () => import('@/views/User')
  //     }
  //   ]
  // },
  // {
  //   path: '/articles',
  //   name: 'Articles',
  //   component: () => import('@/views/Home.vue'),
  //   redirect: '/articles/list',
  //   meta: {
  //     title: '文章管理'
  //   },
  //   children: [
  //     {
  //       path: '/articles/list',
  //       name: 'List',
  //       meta: {
  //         title: '文章列表'
  //       },
  //       component: () => import('@/views/Article')
  //     },
  //     {
  //       path: '/articles/add',
  //       name: 'AddArticle',
  //       meta: {
  //         title: '新增文章'
  //       },
  //       component: () => import('@/views/Article/add.vue')
  //     },
  //     {
  //       path: '/articles/edit/:id',
  //       name: 'EditArticle',
  //       meta: {
  //         title: '修改文章',
  //         hidden: true
  //       },
  //       component: () => import('@/views/Article/edit.vue')
  //     }
  //   ]
  // },
  // {
  //   path: '/classify',
  //   name: 'Classify',
  //   component: () => import('@/views/Home.vue'),
  //   redirect: '/clsssify/list',
  //   meta: {
  //     title: '分类管理'
  //   },
  //   children: [
  //     {
  //       path: '/classify/list',
  //       name: 'classifyList',
  //       meta: {
  //         title: '分类列表'
  //       },
  //       component: () => import('@/views/Classify')
  //     }
  //   ]
  // },
  // {
  //   path: '/swiper',
  //   name: 'Swiper',
  //   component: () => import('@/views/Home.vue'),
  //   redirect: '/swiper/list',
  //   meta: {
  //     title: '轮播图管理'
  //   },
  //   children: [
  //     {
  //       path: '/swiper/list',
  //       name: 'SwiperList',
  //       meta: {
  //         title: '轮播列表'
  //       },
  //       component: () => import('@/views/Swiper')
  //     }
  //   ]
  // },
  // {
  //   path: '/friend',
  //   name: 'Friend',
  //   component: () => import('@/views/Home.vue'),
  //   redirect: '/friend/list',
  //   meta: {
  //     title: '友链管理'
  //   },
  //   children: [
  //     {
  //       path: '/friend/list',
  //       name: 'FriendList',
  //       meta: {
  //         title: '友链列表'
  //       },
  //       component: () => import('@/views/Friend')
  //     }
  //   ]
  // },
  // {
  //   path: '/image',
  //   name: 'Image',
  //   component: () => import('@/views/Home.vue'),
  //   redirect: '/images/list',
  //   meta: {
  //     title: '图床管理'
  //   },
  //   children: [
  //     {
  //       path: '/images/list',
  //       name: 'imagesList',
  //       meta: {
  //         title: '图床列表'
  //       },
  //       component: () => import('@/views/ImgBed')
  //     }
  //   ]
  // },
  // {
  //   path: '/centence',
  //   name: 'Centence',
  //   component: () => import('@/views/Home.vue'),
  //   redirect: '/centences/list',
  //   meta: {
  //     title: '佳句管理'
  //   },
  //   children: [
  //     {
  //       path: '/centences/list',
  //       name: 'centenceList',
  //       meta: {
  //         title: '佳句列表'
  //       },
  //       component: () => import('@/views/Sentence')
  //     }
  //   ]
  // }
];

const router = new VueRouter({
  routes
});

router.beforeEach((to, from, next) => {
  if (to.path !== '/login') {
    if (
      store.state.user.role &&
      store.state.user.username &&
      store.state.user.email
    ) {
      next();
    } else {
      next('/login');
    }
  }
  next();
});

export default router;

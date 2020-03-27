import Vue from 'vue'
import Router from 'vue-router'
const Login = () => import('@/components/Login.vue')
const Home = () => import('@/views/home/Home.vue')

Vue.use(Router)

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/home',
    component: Home
  }
]

const router = new Router({
  routes,
  mode: 'history'
})

// 挂载路由导航守卫
// to 将要访问的路径
// from 从哪个路径跳转而来
// next 是一个函数 表示放行
// newx () newx ('/login')
router.beforeEach((to, from, next) => {
  if (to.path === '/login') return next()
  // 获取token
  const tokenStr = window.sessionStorage.getItem('token')
  if (!tokenStr) return next('/login')
  next()
})

export default router
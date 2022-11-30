import { createRouter, createWebHistory } from 'vue-router'
import routes from './routes'

const router = createRouter({
  history: createWebHistory(),
  routes: routes,
})

router.beforeEach((to, from, next) => {
  const publicPages = ['/']
  const authNotRequired = !publicPages.includes(to.path)
  const notLoggedIn = sessionStorage.getItem('token')
  if ((authNotRequired && notLoggedIn) || publicPages.includes(`/${to.path.split('/')[1]}`)) {
    next()
  } else {
    next('/')
  }
})

export default router

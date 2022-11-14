import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Login',
    component: () => import('../pages/Login.vue'),
    meta: { layout: 'login' },
  },
  {
    path: '/dashboard',
    name: 'Index',
    component: () => import('../pages/Home.vue'),
    meta: { layout: 'dashboard' },
  },
  {
    path: '/visits',
    name: 'visits',
    component: () => import('../pages/Visits.vue'),
    meta: { layout: 'dashboard' },
  },
  {
    path: '/patients',
    name: 'Patients',
    component: () => import('../pages/Patients.vue'),
    meta: { layout: 'dashboard' },
  },
  // {
  //   path: '/payment',
  //   name: 'Payment',
  //   component: () => import('../pages/Payments.vue'),
  //   meta: { layout: 'dashboard' },
  // },
  {
    path: '/payment-visit',
    name: 'PaymentVisit',
    component: () => import('../pages/PaymentVisit.vue'),
    meta: { layout: 'dashboard' },
  },
  {
    path: '/notfound',
    name: 'Not-Found',
    component: () => import('../components/NotFound.vue'),
  },
  {
    path: '/:pathMach(.*)*',
    name: 'NotFound',
    component: () => import('../components/NotFound.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes: routes,
})

export default router


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
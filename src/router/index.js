import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Login',
    component: () => import('../views/Login.vue'),
    meta: { layout: 'login' },
  },
  {
    path: '/dashboard',
    name: 'Index',
    component: () => import('../views/Home.vue'),
    meta: { layout: 'dashboard' },
  },
  {
    path: '/visits',
    name: 'visits',
    component: () => import('../views/Visits.vue'),
    meta: { layout: 'dashboard' },
  },
  {
    path: '/patients',
    name: 'Patients',
    component: () => import('../views/Patients.vue'),
    meta: { layout: 'dashboard' },
  },
  {
    path: '/services',
    name: 'services',
    component: () => import('../views/Services.vue'),
    meta: { layout: 'dashboard' },
  },
  {
    path: '/users',
    name: 'Users',
    component: () => import('../views/Users.vue'),
    meta: { layout: 'dashboard' },
  },
  // {
  //   path: '/payment',
  //   name: 'Payment',
  //   component: () => import('../views/Payments.vue'),
  //   meta: { layout: 'dashboard' },
  // },
  {
    path: '/patient-visit',
    name: 'PatientVisit',
    component: () => import('../views/PatientVisit.vue'),
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
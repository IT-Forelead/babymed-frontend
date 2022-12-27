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
    beforeEnter: navigationGuards(['admin', 'doctor', 'cashier', 'super_manager', 'tech_admin']),
  },
  {
    path: '/visits',
    name: 'visits',
    component: () => import('../views/Visits.vue'),
    meta: { layout: 'dashboard' },
    beforeEnter: navigationGuards(['admin', 'cashier', 'super_manager', 'tech_admin']),
  },
  {
    path: '/patients',
    name: 'Patients',
    component: () => import('../views/Patients.vue'),
    meta: { layout: 'dashboard' },
    beforeEnter: navigationGuards(['admin', 'super_manager', 'tech_admin']),
  },
  {
    path: '/services',
    name: 'services',
    component: () => import('../views/Services.vue'),
    meta: { layout: 'dashboard' },
    beforeEnter: navigationGuards(['super_manager', 'tech_admin']),
  },
  {
    path: '/service-types',
    name: 'service-types',
    component: () => import('../views/ServiceTypes.vue'),
    meta: { layout: 'dashboard' },
    beforeEnter: navigationGuards(['super_manager', 'tech_admin']),
  },
  {
    path: '/users',
    name: 'Users',
    component: () => import('../views/Users.vue'),
    meta: { layout: 'dashboard' },
    beforeEnter: navigationGuards(['super_manager', 'tech_admin']),
  },
  {
    path: '/patient-visit',
    name: 'PatientVisit',
    component: () => import('../views/PatientVisit.vue'),
    meta: { layout: 'dashboard' },
    beforeEnter: navigationGuards(['admin', 'super_manager', 'tech_admin']),
  },
  {
    path: '/operation-expenses',
    name: 'Operation Expenses',
    component: () => import('../views/OperationExpenses.vue'),
    meta: { layout: 'dashboard' },
    beforeEnter: navigationGuards(['cashier', 'super_manager', 'tech_admin']),
  },
  {
    path: '/checkup-expenses',
    name: 'Checkup Expenses',
    component: () => import('../views/CheckupExpenses.vue'),
    meta: { layout: 'dashboard' },
    beforeEnter: navigationGuards(['cashier', 'super_manager', 'tech_admin']),
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

router.beforeEach((to, from, next) => {
  const publicPages = ['/']
  const authNotRequired = !publicPages.includes(to.path)
  const notLoggedIn = localStorage.getItem('token')
  if ((authNotRequired && notLoggedIn) || publicPages.includes(`/${to.path.split('/')[1]}`)) {
    next()
  } else {
    next('/')
  }
})

function parseJwt(token) {
  var base64Url = token.split('.')[1]
  var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
  var jsonPayload = decodeURIComponent(
    window
      .atob(base64)
      .split('')
      .map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
      })
      .join('')
  )

  return JSON.parse(jsonPayload)
}

function navigationGuards(access) {
  let payload = {}
  if (localStorage.getItem('token')) {
    payload = parseJwt(localStorage.getItem('token'))
  }
  return () => {
    if (!access.includes(payload?.role)) {
      router.push('/notfound')
    }
    return access.includes(payload?.role)
  }
}

export default router

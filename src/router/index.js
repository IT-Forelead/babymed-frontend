import { createRouter, createWebHistory } from 'vue-router'
import { parseJwt } from '../mixins/utils.js'

const routes = [
  {
    path: '/',
    name: 'Login',
    component: () => import('../views/Login.vue'),
    meta: { layout: 'login' },
  },
  {
    path: '/forgot-password',
    name: 'Forgot password',
    component: () => import('../views/ForgotPassword.vue'),
    meta: { layout: 'login' },
  },
  {
    path: '/reset-password/:link',
    name: 'Reset password',
    component: () => import('../views/ResetPassword.vue'),
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
    name: 'Visits',
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
    name: 'Services',
    component: () => import('../views/Services.vue'),
    meta: { layout: 'dashboard' },
    beforeEnter: navigationGuards(['super_manager', 'tech_admin']),
  },
  {
    path: '/service-types',
    name: 'Service types',
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
    path: '/sms-messages',
    name: 'SMS messages',
    component: () => import('../views/SmsMessages.vue'),
    meta: { layout: 'dashboard' },
    beforeEnter: navigationGuards(['super_manager']),
  },
  {
    path: '/patient-visit',
    name: 'Patient visits',
    component: () => import('../views/PatientVisit.vue'),
    meta: { layout: 'dashboard' },
    beforeEnter: navigationGuards(['admin', 'super_manager', 'tech_admin']),
  },
  {
    path: '/operation-expenses',
    name: 'Operation expenses',
    meta: { layout: 'dashboard' },
    children: [
      {
        path: '',
        name: 'Operation Expenses',
        component: () => import('../components/OperationExpenseTabs/OperationExpenses.vue'),
      },
      {
        path: 'summary',
        name: 'Operation Expense Items Summary',
        component: () => import('../components/OperationExpenseTabs/OperationExpenseItemsSummary.vue'),
      },
      {
        path: 'add',
        name: 'Add Operation Expenses',
        component: () => import('../components/OperationExpenseTabs/AddOperationExpense.vue'),
      },
    ],
    beforeEnter: navigationGuards(['cashier', 'super_manager', 'tech_admin']),
  },
  {
    path: '/operations',
    name: 'Operations',
    meta: { layout: 'dashboard' },
    children: [
      {
        path: '',
        name: 'Operations',
        component: () => import('../components/OperationsTabs/Operations.vue'),
      },
      {
        path: 'services',
        name: 'Operation Services',
        component: () => import('../components/OperationsTabs/OperationServices.vue'),
      },
    ],
    beforeEnter: navigationGuards(['cashier', 'super_manager', 'tech_admin']),
  },
  {
    path: '/checkup-expenses',
    name: 'Checkup expenses',
    meta: { layout: 'dashboard' },
    children: [
      {
        path: '',
        name: 'Checkup expenses',
        component: () => import('../components/CheckupExpenseTabs/CheckupExpenses.vue'),
      },
      {
        path: 'summary',
        name: 'Checkup Expenses Summary',
        component: () => import('../components/CheckupExpenseTabs/CheckupExpensesSummary.vue'),
      },
      {
        path: 'doctor-shares',
        name: 'Doctor shares',
        component: () => import('../components/CheckupExpenseTabs/DoctorShares.vue'),
      },
    ],
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
  const publicPages = ['/', '/forgot-password', '/reset-password']
  const authNotRequired = !publicPages.includes(to.path)
  const notLoggedIn = localStorage.getItem('token')
  if ((authNotRequired && notLoggedIn) || publicPages.includes(`/${to.path.split('/')[1]}`)) {
    next()
  } else {
    next('/')
  }
})

function navigationGuards(access) {
  return () => {
    if (localStorage.getItem('token') && !access.includes(parseJwt()?.role)) {
      router.push('/notfound')
      console.log('Oops!')
    }
    return access.includes(parseJwt()?.role)
  }
}

export default router

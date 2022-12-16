export default [
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
    path: '/service-types',
    name: 'service-types',
    component: () => import('../views/ServiceTypes.vue'),
    meta: { layout: 'dashboard' },
  },
  {
    path: '/value1',
    name: 'value1',
    component: () => import('../views/value1.vue'),
    meta: { layout: 'dashboard' },
  },
  {
    path: '/value2',
    name: 'value2',
    component: () => import('../views/value2.vue'),
    meta: { layout: 'dashboard' },
  },
  {
    path: '/users',
    name: 'Users',
    component: () => import('../views/Users.vue'),
    meta: { layout: 'dashboard' },
  },
  {
    path: '/patient-visit',
    name: 'PatientVisit',
    component: () => import('../views/PatientVisit.vue'),
    meta: { layout: 'dashboard' },
  },
  {
    path: '/expenses',
    name: 'Expenses',
    component: () => import('../views/Expenses.vue'),
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
  {
    path: '/jkkkkj',
    name: 'jkkkkj',
    component: () => import('../components/ExpenseReportItem.vue'),
    meta: { layout: 'dashboard' },
  },
]

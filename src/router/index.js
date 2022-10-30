import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Index',
    component: () => import('../pages/Home.vue'),
    meta: { layout: 'dashboard' },
  },
  {
    path: '/test',
    name: 'Test',
    component: () => import('../pages/Test.vue'),
    meta: { layout: 'dashboard' },
  },
  // {
  //   path: '/notfound',
  //   name: 'Not-Found',
  //   component: () => import('../components/NotFound.vue'),
  // },
  // {
  //   path: '/:pathMach(.*)*',
  //   name: 'NotFound',
  //   component: () => import('../components/NotFound.vue'),
  // },
]

const router = createRouter({
  history: createWebHistory(),
  routes: routes,
})

export default router

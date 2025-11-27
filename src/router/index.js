import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: { title: 'Home' },
  },
  {
    path: '/miniatures',
    name: 'Miniatures',
    component: () => import('../views/Miniatures.vue'),
    meta: { title: 'Miniatures' },
  },
  {
    path: '/miniatures/themes/:id',
    name: 'MiniatureTheme',
    component: () => import('../views/MiniatureTheme.vue'),
    meta: { title: 'Miniature Theme' },
  },
  {
    path: '/miniatures/projects/:id',
    name: 'MiniatureProject',
    component: () => import('../views/MiniatureProject.vue'),
    meta: { title: 'Miniature Project' },
  },
  {
    path: '/contact',
    name: 'Contact',
    component: () => import('../views/Contact.vue'),
    meta: { title: 'Contact' },
  },
  {
    path: '/projects/:id',
    name: 'ProjectDetail',
    component: () => import('../views/ProjectDetail.vue'),
    meta: { title: 'Project Details' },
  },
  {
    path: '/forbidden',
    name: 'Forbidden',
    component: () => import('../errors/Forbidden.vue'),
    meta: { title: 'Access Denied' },
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('../errors/NotFound.vue'),
    meta: { title: 'Page Not Found' },
  },
]

const router = createRouter({
  history: createWebHistory(),
  scrollBehavior() {
    return { top: 0 }
  },
  routes,
})

router.afterEach((to) => {
  const title = to.meta.title
  document.title = title ? `${title} | Portfolio` : 'Portfolio'
})

export default router

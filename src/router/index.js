import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/gallery',
    name: 'Gallery',
    component: () => import('../views/Gallery.vue'),
  },
  {
    path: '/miniatures/:id',
    name: 'MiniatureDetail',
    component: () => import('../views/MiniatureDetail.vue'),
  },
  {
    path: '/contact',
    name: 'Contact',
    component: () => import('../views/Contact.vue'),
  },
  {
    path: '/projects/:id',
    name: 'ProjectDetail',
    component: () => import('../views/ProjectDetail.vue'),
  },
  {
    path: '/previous-work',
    name: 'PreviousWork',
    component: () => import('../views/PreviousWork.vue'),
  },
  {
    path: '/forbidden',
    name: 'Forbidden',
    component: () => import('../errors/Forbidden.vue'),
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('../errors/NotFound.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(),
  scrollBehavior(to, from) {
    return { top: 0, behavior: to === from ? 'smooth' : 'auto' }
  },
  routes,
})

export default router

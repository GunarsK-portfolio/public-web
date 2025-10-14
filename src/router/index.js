import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/experience',
    name: 'Experience',
    component: () => import('../views/Experience.vue'),
  },
  {
    path: '/gallery',
    name: 'Gallery',
    component: () => import('../views/Gallery.vue'),
  },
  {
    path: '/miniatures',
    name: 'Miniatures',
    component: () => import('../views/Miniatures.vue'),
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
    path: '/project',
    name: 'ProjectDetail',
    component: () => import('../views/ProjectDetail.vue'),
  },
  {
    path: '/previous-work',
    name: 'PreviousWork',
    component: () => import('../views/PreviousWork.vue'),
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

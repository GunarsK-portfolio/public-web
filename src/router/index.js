import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/experience',
    name: 'Experience',
    component: () => import('../views/Experience.vue')
  },
  {
    path: '/miniatures',
    name: 'Miniatures',
    component: () => import('../views/Miniatures.vue')
  },
  {
    path: '/miniatures/:id',
    name: 'MiniatureDetail',
    component: () => import('../views/MiniatureDetail.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router

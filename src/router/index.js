import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/miniatures',
    name: 'Miniatures',
    component: () => import('../views/Miniatures.vue'),
  },
  {
    path: '/miniatures/themes/:id',
    name: 'MiniatureTheme',
    component: () => import('../views/MiniatureTheme.vue'),
  },
  {
    path: '/miniatures/projects/:id',
    name: 'MiniatureProject',
    component: () => import('../views/MiniatureProject.vue'),
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
  scrollBehavior() {
    return { top: 0 }
  },
  routes,
})

export default router

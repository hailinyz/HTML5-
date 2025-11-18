import { createRouter, createWebHistory } from 'vue-router'
import Layout from '../components/Layout.vue'

const routes = [
  {
    path: '/',
    component: Layout,
    children: [
      {
        path: '',
        name: 'Home',
        component: () => import('../views/Home.vue')
      },
      {
        path: '/articles',
        name: 'Articles',
        component: () => import('../views/Articles.vue')
      },
      {
        path: '/article/:id',
        name: 'ArticleDetail',
        component: () => import('../views/ArticleDetail.vue')
      },
      {
        path: '/videos',
        name: 'Videos',
        component: () => import('../views/Videos.vue')
      },
      {
        path: '/about',
        name: 'About',
        component: () => import('../views/About.vue')
      },
      {
        path: '/contact',
        name: 'Contact',
        component: () => import('../views/Contact.vue')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router

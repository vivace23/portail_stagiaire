import {createRouter, createWebHashHistory} from 'vue-router'
import login from '../components/loginPage.vue'
import notFoundPage from '../components/notFoundPage.vue'
import dashboard from '../components/dashboardPage.vue'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [

    {
    path: '/login',
    name: 'login',
    component: login,
    },

    {
      path: '/dashboard',
      name: 'dashboard',
      component: dashboard,
      },

    {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: notFoundPage,
    },

    {
    path: '/',
    redirect: '/login',
    }
  ],
});


export default router;

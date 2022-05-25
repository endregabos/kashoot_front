import Vue from 'vue'
import VueRouter from 'vue-router'
import MainView from '../views/MainView.vue'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import RegisterView from '../views/RegisterView.vue'
import AdminView from '../views/AdminView.vue'
import AdminCategoryView from '../views/AdminCategoryView.vue'
import AdminQuestionView from '../views/AdminQuestionView.vue'
import GameView from '../views/GameView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'main',
    component: MainView
  },
  {
    path: '/home',
    name: 'home',
    component: HomeView
  },
  
  {
    path: '/login',
    name: 'login',
    component: LoginView
  },
  {
    path: '/register',
    name: 'register',
    component: RegisterView
  },
  {
    path: '/admin',
    name: 'AdminPanel',
    component: AdminView
  },
  {
    path: '/admin/category',
    name: 'AdminCategoryPanel',
    component: AdminCategoryView
  },
  {
    path: '/admin/question',
    name: 'AdminQuestionPanel',
    component: AdminQuestionView
  },
  {
    path: '/game',
    name: 'GamePanel',
    component: GameView
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router

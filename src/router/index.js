import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '../views/Home.vue'

import Dashboard from '../views/Dashboard/Dashboard'
import Overview from '../views/Dashboard/Overview'

import DefaultRouter from '../views/DefaultRouter'

import ItemList from '../views/Dashboard/Library/ItemList'
import ItemCreate from '../views/Dashboard/Library/ItemCreate'
import ItemInfo from '../views/Dashboard/Library/ItemInfo' 

import Authentication from '../views/Authentication/Authentication'
import Login from '../views/Authentication/Login'
import Register from '../views/Authentication/Register'
import UserService from '../services/UserService'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/dashboard/overview'
  },
  {
    path: '/authentication',
    component: Authentication,
    children: [
      {
        path: 'login',
        name: 'Login',
        component: Login
      },
      {
        path: 'register',
        name: 'Register',
        component: Register
      }
    ]
  },
  {
    path: '/dashboard',
    component: Dashboard,
    children: [
      {
        path: 'overview',
        name: 'Overview',
        component: Overview
      },
      {
        path: 'library',
        component: DefaultRouter,
        children: [
          {
            path: '',
            name: 'dashboard.library.list',
            component: ItemList
          },
          {
            path: 'create',
            name: 'dashboard.library.create',
            component: ItemCreate
          },
          {
            path: ':id',
            name: 'dashboard.library.info',
            component: ItemInfo
          }
        ]
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach(async (to, from, next) => {
  const isLogged = await UserService.isLogged()

  if (isLogged && to.path.indexOf('authentication') != -1) {
    next({
      name: 'Overview'
    })
    return
  }

  if (!isLogged && to.path.indexOf('authentication') == -1) {
    next({
      name: 'Login'
    })
    return
  }

  next()
})

export default router

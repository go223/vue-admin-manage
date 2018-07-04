import Vue from 'vue'
import Router from 'vue-router'
import Cookies from 'js-cookie'
import {getMenu} from '@/api/nav'

import {isUrl} from '@/utils/validate'
import store from '@/store'

const _import = require('./import-' + process.env.NODE_ENV)

Vue.use(Router)

/* 主路由 */
const routeMain = [
  {
    path: '/',
    name: 'Home',
    component: _import('views/home')
  },
  {
    path: '/login',
    name: 'Login',
    component: _import('views/login')
  },
  {
    path:'/404',
    name:'404',
    component: _import('views/404')
  }
]


const routeDynamic = []


const router = new Router({
  mode: 'hash',
  scrollBehavior: () => ({ y: 0 }),
  routes: routeDynamic.concat(routeMain),
  isGetRoutes:false
})

router.beforeEach((to, from, next) => {
  if (!Cookies.get('token') && to.path != '/login') {
    next({
      path:'/login'
    })
  } else {
    console.log(to)
    console.log(getRouteType(to));
    if (router.options.isGetRoutes || getRouteType(to) === 'main') {
      next()
    } else {
      getMenu().then(res => {
        console.log(res)
        const data = res.data;
        if (data && data.code === 0) {
          addRoute(data.menuList)
          router.options.isGetRoutes = true
          sessionStorage.setItem('menuList',JSON.stringify(data.menuList) || '[]')
          sessionStorage.setItem('permissions', JSON.stringify(data.permissions) || '[]')
          next({...to,replace:true})
        }  else {
          sessionStorage.setItem('menuList','[]')
          sessionStorage.setItem('permissions', '[]')
          next()
        }
      }).catch(err => {
        console.log(err)
      })
    }
  }
})

function getRouteType(route) {
  let children = [];
  for (let i = 0; i < routeMain.length; i++) {
    if (route.path === routeMain[i].path) {
      return 'main';
    } else if(routeMain[i].children && routeMain[i].children.length > 0) {
      children = children.concat(routeMain[i].children)
    }
  }
  return children.length > 0 ? getRouteType(children) : 'dynamic'
}

function addRoute(menuList = [], routes = []) {
  let tmp = [];
  for (let i = 0; i < menuList.length; i++) {
    if (menuList[i].list && menuList[i].list.length > 0) {
      tmp = tmp.concat(menuList[i].list)
    } else if (menuList[i].url && /\S/.test(menuList[i].url)) {
      
      let route = {
        path:'\/'+menuList[i].url,
        name:menuList[i].url.replace(/\//g,'-'),
        meta:{
          iframeUrl:''
        }
      }
      if (isUrl(menuList[i].url)) {
        route['meta']['iframeUrl'] = menuList[i].url
      } else {
        try {
          route['component'] = _import('views/' + menuList[i].url) || null
        } catch(e) {
          console.log(e)
        }
      }
      routes.push(route)
    }
  }
  if (tmp.length > 0) {
    addRoute(tmp,routes)
  } else {
    routes.push({
      path:'*',redirect:'/404'
    })
    router.addRoutes(routes)
    console.log(routes)
    console.log(JSON.stringify(routes))
    sessionStorage.setItem('routeDynamic', JSON.stringify(routes) || '[]')
  }
}
const aa = {
  aa:123
}
aa.aaa = 123456
console.log(aa)
export default router


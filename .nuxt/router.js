import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from '@nuxt/ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _bc21dcae = () => interopDefault(import('..\\pages\\app.vue' /* webpackChunkName: "pages/app" */))
const _a2b6ab00 = () => interopDefault(import('..\\pages\\chat.vue' /* webpackChunkName: "pages/chat" */))
const _618606f1 = () => interopDefault(import('..\\pages\\login.vue' /* webpackChunkName: "pages/login" */))
const _134ce531 = () => interopDefault(import('..\\pages\\profile.vue' /* webpackChunkName: "pages/profile" */))
const _ab9a3f6a = () => interopDefault(import('..\\pages\\register.vue' /* webpackChunkName: "pages/register" */))
const _d043384c = () => interopDefault(import('..\\pages\\index.vue' /* webpackChunkName: "pages/index" */))

// TODO: remove in Nuxt 3
const emptyFn = () => {}
const originalPush = Router.prototype.push
Router.prototype.push = function push (location, onComplete = emptyFn, onAbort) {
  return originalPush.call(this, location, onComplete, onAbort)
}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: '/',
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/app",
    component: _bc21dcae,
    name: "app"
  }, {
    path: "/chat",
    component: _a2b6ab00,
    name: "chat"
  }, {
    path: "/login",
    component: _618606f1,
    name: "login"
  }, {
    path: "/profile",
    component: _134ce531,
    name: "profile"
  }, {
    path: "/register",
    component: _ab9a3f6a,
    name: "register"
  }, {
    path: "/",
    component: _d043384c,
    name: "index"
  }],

  fallback: false
}

function decodeObj(obj) {
  for (const key in obj) {
    if (typeof obj[key] === 'string') {
      obj[key] = decode(obj[key])
    }
  }
}

export function createRouter () {
  const router = new Router(routerOptions)

  const resolve = router.resolve.bind(router)
  router.resolve = (to, current, append) => {
    if (typeof to === 'string') {
      to = normalizeURL(to)
    }
    const r = resolve(to, current, append)
    if (r && r.resolved && r.resolved.query) {
      decodeObj(r.resolved.query)
    }
    return r
  }

  return router
}

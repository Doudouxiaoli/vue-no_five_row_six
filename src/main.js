// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import qs from 'qs'
import Video from 'video.js'
import 'video.js/dist/video-js.css'

Vue.prototype.$video = Video;
Vue.prototype.$axios = axios;
Vue.prototype.$baseURL = process.env.API_ROOT;
Vue.prototype.$rootUrl = 'http://localhost:9090/'
Vue.config.productionTip = false;
Vue.use(qs)
import store from './store/index'
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: {App},
  template: '<App/>'
})
router.beforeEach((to, from, next) => {
  window.document.title = to.meta.title;
  const token = store.state.token
  console.log(token)
  if (to.meta.requireAuth) {// 判断该路由是否需要登录权限
    console.log(to.meta.requireAuth)
    if (token) {
      next()
    } else {
      console.log("需要登录")
      next({
        path: '/login'
      })
    }
  } else {
    next()
  }
})
export default router

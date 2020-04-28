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

new Vue({
  el: '#app',
  router,
  store,
  components: {App},
  template: '<App/>'
})
//添加请求拦截器，在请求头中加token
axios.interceptors.request.use(config => {
  if (localStorage.getItem('Authorization')) {
    config.headers.Authorization = localStorage.getItem('Authorization');
  }
  return config;

}, error => {
  return Promise.reject(error);
})

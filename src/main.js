// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router' //前三个导入自带vue
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
//app这个vue的实例会接管app这个dom里面的内容，会分析<div id='app'></div>这个dom里面所有内容，并显示出来
new Vue({
  el: '#app', //创建的vue实例负责处理的区域
  router,//路由处理vue的跳转，相当于路径导航
  store,
  components: {App},
  template: '<App/>'
  // render: h => h(App)  template:‘<app/>’,components:{App}配合使用与单独使用render:h=>h(App)会达到同样的效果
  // 前者识别<template>标签，后者直接解析template下的id为app的div(忽略template的存在)
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

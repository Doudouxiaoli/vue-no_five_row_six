<template>
  <div id="app">
    <div class="wrap">
      <div class="nav">
        <div class="topNav">
          <div class="topNav-left clearfix">
            <router-link to="/" class="topNav-left_logo a">
              <img class="logo_icon" src="../static/images/head-icon.jpg">
              <img class="logo_font" src="../static/images/head-font.png">
            </router-link>
          </div>
          <div class="topNav-right">
            <form action="/search" class="topNav-right_searchFrom">
              <input type="text" class="searchFrom_input" placeholder="请输入搜索内容" name="search">
              <button class="searchFrom_btn" type="submit">
              </button>
            </form>
            <router-link to="/openQrcode" class="topNav-right_code a">
            </router-link>
            <router-link to="/userCenter" class="topNav-right_user a">
            </router-link>
          </div>
        </div>
        <div class="content">
          <ul class="mainNav_ul">
            <li class="mainNav_li">
              <router-link to="/" class="a">主页</router-link>
            </li>
            <li class="mainNav_li">
              <router-link to="/Album" class="a">专辑</router-link>
            </li>
            <li class="mainNav_li">
              <router-link to="/concert" class="a">演唱会</router-link>
            </li>
            <li class="mainNav_li">
              <router-link to="/dance"class="a">舞蹈</router-link>
            </li>
            <li class="mainNav_li">
              <router-link to="/endorsement" class="a">代言</router-link>
            </li>
            <li class="mainNav_li">
              <router-link to="/molivideo" class="a">影视作品</router-link>
            </li>
          </ul>
          <router-view/>
        </div>
      </div>
      <footer class="footer">
        <p>{{ scriptContent}}{{title}}</p>
      </footer>
    </div>
  </div>
</template>
<!--行为逻辑-->
<script>
    export default {
        name: 'App',
        props: {
            title: {
                type: String
            }
        },
        data() {
            return {
                scriptContent: "This is about lay's journey"
            }
        },
        methods: {},
        component: {}
    }
</script>

<style scoped src="../static/css/app.css"/>

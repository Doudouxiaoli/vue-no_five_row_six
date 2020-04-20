<template>
  <div class="wrap">
    <div class="nav">
      <div class="topNav">
        <div class="topNav-left clearfix">
          <div class="topNav-left_logo a" exact>
            <img class="logo_icon" src="../../../static/images/head-icon.jpg">
            <img class="logo_font" src="../../../static/images/head-font.png">
          </div>
        </div>
        <div class="topNav-right">
          <form action="search" class="topNav-right_searchFrom">
            <input type="text" class="searchFrom_input" placeholder="请输入搜索内容" name="search">
            <button class="searchFrom_btn" type="submit">
            </button>
          </form>
          <router-link to="openQrcode" class="topNav-right_code a">
          </router-link>
          <router-link to="userCenter" class="topNav-right_user a">
          </router-link>
        </div>
      </div>
      <div class="content">
        <ul class="mainNav_ul">
          <li class="mainNav_li">
            <!--to属性的值必须和path中的路径对应-->
            <router-link to="/index" class="link" exact>主页</router-link>
          </li>
          <li class="mainNav_li">
            <router-link to="/album" class="link">专辑</router-link>
          </li>
          <li class="mainNav_li">
            <router-link to="/concert" class="link">演唱会</router-link>
          </li>
          <li class="mainNav_li">
            <router-link to="/dance" class="link">舞蹈</router-link>
          </li>
          <li class="mainNav_li">
            <router-link to="/endorsement" class="link">代言</router-link>
          </li>
          <li class="mainNav_li">
            <router-link to="/molivideo" class="link">影视作品</router-link>
          </li>
        </ul>
        <router-view :key="$route.fullPath"></router-view>
      </div>
    </div>
    <footer class="footer">
      <p>{{ scriptContent}}{{footType}}</p>
    </footer>
  </div>
</template>

<script>
    export default {
        name: "HeadNav",
        props: {
            footType: {
                type: String
            }
        },
        data() {
            return {
                scriptContent: "This is about lay's journey"
            }
        },
        watch: {
            $route(to, from) {
                // console.log(to.path, from.path);
            }
        }
    }
</script>
<style scoped src="../../../static/css/app.css"/>

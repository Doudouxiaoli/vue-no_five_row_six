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
          <router-link to="openQrcode" class="topNav-right_code a"></router-link>

          <div class="topNav-right_user a">
            <img v-if="haveToken" src="../../../static/images/userLogin.jpg">
            <img v-else src="../../../static/images/user.png" alt="未登录">
          </div>
          <div class="user-subMenu">
            <router-link class="user-subMenu_item" to="userUpload">头像</router-link>
            <router-link class="user-subMenu_item" to="userUpdate">编辑资料</router-link>
          </div>
        </div>
      </div>
      <div class="content">
        <ul class="mainNav_ul">
          <li class="mainNav_li">
            <!--to属性的值必须和path中的路径对应-->
            <router-link to="/" class="link" exact>主页</router-link>
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
        scriptContent: "This is about lay's journey",
        heardImg: '',
        haveToken: false
      }
    },
    created() {
      if (localStorage.getItem('Authorization') !== null) {
        this.$axios({
          method: "get",
          url: `${this.$baseURL}/userCenter/index`,
        })
          .then((response) => {
            this.haveToken = true;
            this.heardImg = response.data.data["0"];
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },
  }
</script>
<style scoped src="../../../static/css/app.css"/>
<style scoped>

  .topNav-right_user:hover .user-subMenu {
    display: block;
  }
</style>

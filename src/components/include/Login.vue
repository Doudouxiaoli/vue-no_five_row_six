<template>
  <div class="bodyBox">
    <div class="main-w3layouts wrapper">
      <h1>五排六号登录</h1>
      <div class="main-agileinfo">
        <div class="agileits-top">
          <form ref="loginForm" autocomplete="on" :model="loginForm" method="post">
            <input class="text" style="margin: 3em 0 0;" type="text" v-model="loginForm.username" placeholder="用户名" required="">
            <input class="text" style="margin: 3em 0 0;" type="password" v-model="loginForm.password" placeholder="密码" required="">
            <div class="wthree-text">
              <ul>
                <li>
                  <label class="anim">
                    <input type="checkbox" class="checkbox" required="">
                    <span>登录须知</span>
                  </label>
                </li>
                <li>
                  <router-link :to="{name:'forgetPassword'}">忘记密码 ?</router-link>
                </li>
              </ul>
              <div class="clear"></div>
            </div>
            <button type="button" @click="doLogin('loginForm')">登录</button>
          </form>
          <p>创建一个账号?
            <router-link :to="{name:'register'}"> 立即注册!</router-link>
          </p>
        </div>
      </div>
      <ul class="w3lsg-bubbles">
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
      </ul>
    </div>
  </div>
</template>

<script>
  import {mapMutations} from "vuex";

  export default {
    name: "Login",
    data() {
      return {
        loginForm: {
          username: '',
          password: ''
        },
      }
    },
    methods: {
      ...mapMutations(['changeLogin']),
      doLogin: function () {
        let _this = this;
        if (this.loginForm.username === "" || this.loginForm.password === "") {
          alert("账号密码不能为空")
        } else {
          this.$axios({
            method: "post",
            url: `${this.$baseURL}/user/login`,
            params: {
              name: this.loginForm.username,
              password: this.loginForm.password
            }
          }).then((response) => {
            if (response.data.success) {
              _this.userToken = response.headers.token;
              //将用户token存入到vuex中
              _this.changeLogin({Authorization: _this.userToken});
              //跳转到拦截页面
              _this.$router.go(-1);
            } else {
              alert("用户登录失败，请检查用户名或密码是否正确")
              _this.$router.push({path: "/login"});
            }
          })
            .catch((error) => {
              console.log(error);
            });
        }
      }
    }
  }
</script>
<style scoped src="../../../static/css/login.css"/>

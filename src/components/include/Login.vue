<template>
  <div class="bodyBox">
    <div class="main-w3layouts wrapper">
      <h1>五排六号登录</h1>
      <div class="main-agileinfo">
        <div class="agileits-top">
          <form ref="loginForm" autocomplete="on" :model="loginForm" method="post">
            <input class="text" style="margin: 3em 0 0;" type="text" v-model="loginForm.username" placeholder="用户名"
                   required="">
            <input class="text" style="margin: 3em 0 0;" type="password" v-model="loginForm.password"
                   placeholder="密码"
                   required="">
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
    export default {
        name: "Login",
        data() {
            return {
                loginForm: {
                    username: '',
                    password: ''
                }
            }
        },
        methods: {
            doLogin: function () {
                this.$axios({
                    method: "post",
                    url: `${this.$baseURL}/user/login`,
                    params: {
                        name: this.loginForm.username,
                        password: this.loginForm.password
                    }
                })
                    .then((response) => {
                        if (response.data.success) {
                            this.$store.commit('SET_TOKEN', response.data.token)
                            this.$store.commit('GET_USER', response.data.user)
                            this.$message({
                                message: '登陆成功',
                                type: 'success'
                            })
                            this.$router.replace({path: "/index"})
                        } else {
                            this.$router.push({path: "/login"})
                        }
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            }
        }
    }
</script>
<style scoped src="../../../static/css/login.css"/>

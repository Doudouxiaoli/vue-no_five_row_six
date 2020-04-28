<template>
  <div class="bodyBox">
    <div class="main-w3layouts wrapper">
      <h1>五排六号登录</h1>
      <div class="main-agileinfo">
        <div class="agileits-top">
          <form ref="forgetFrom" :model="forgetFrom" method="post">
            <input class="text" type="text" v-model="forgetFrom.fuPhone" id="fuPhone" placeholder="电话" required="">
            <input class="text" type="text" style="display: inline-block;width: 60%" v-model="forgetFrom.scCode"
                   placeholder="验证码"
                   required="" id="scCode">
            <button type="button" id="getCode" @click="getCode('forgetFrom')">获取验证码</button>
            <div class="wthree-text">
              <ul>
                <li>手机号已失效?
                  <router-link :to="{name:'register'}"> 立即注册!</router-link>
                </li>
              </ul>
              <div class="clear"></div>
            </div>
            <button type="button" id="loginBtn2" @click="doLogin('forgetFrom')">登录</button>
          </form>
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
    name: "ForgetPassword",
    data() {
      return {
        forgetFrom: {
          fuPhone: '',
          scCode: ''
        }
      }
    },
    methods: {
      doLogin: function () {
        this.$axios({
          method: "post",
          url: `${this.$baseURL}/user/forgetPassword`,
          params: {
            fuPhone: this.forgetFrom.fuPhone,
            scCode: this.forgetFrom.scCode
          }
        })
          .then((response) => {
            if (response.data.success) {
              this.$router.replace({path: "/index"})
            } else {
              this.$router.push({path: "/forgetPassword"})
            }
          })
          .catch((error) => {
            console.log(error);
          });
      },
      getCode: function () {
        this.$axios({
          method: "post",
          url: `${this.$baseURL}/common/sendCode`,
          params: {
            mobile: this.forgetFrom.fuPhone,
            type: "mobile_login"
          }
        })
          .then((response) => {
            var codeMsg = document.getElementById("#getCode");
            if (response.data.success) {
              alert("验证码发送成功,请注意查收");
              var time = 60;
              var set = setInterval(function () {
                codeMsg.html(--time + " s");
              }, 1000);
              setTimeout(function () {
                codeMsg.attr("disabled", false).html("重新获取");
                clearInterval(set);
              }, 60000);
            } else {
              alert(response.data.msg);
            }
          })
          .catch((error) => {
            console.log(error);
          });
      }
    }
  }
</script>
<style scoped src="../../../static/css/login.css?v=1"/>

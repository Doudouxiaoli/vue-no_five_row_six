<template>
  <div class="bodyBox">
    <div class="main-w3layouts wrapper">
      <h1>五排六号注册</h1>
      <div class="main-agileinfo">
        <div class="agileits-top">
          <form ref="registerForm" autocomplete="on" :model="registerForm" method="post">
            <input class="text" type="text" v-model="registerForm.fuName" placeholder="姓名" required="">
            <input class="text" type="text" v-model="registerForm.fuPassword" placeholder="密码" required="">
            <input class="text" type="text" v-model="registerForm.fuProvince" placeholder="省份" required="">
            <input class="text" type="text" v-model="registerForm.fuCity" placeholder="城市" required="">
            <input class="text" type="text" v-model="registerForm.fuRegion" placeholder="区县" required="">
            <input class="text" type="text" v-model="registerForm.fuPhone" id="fuPhone" placeholder="电话" required="">
            <input class="text" type="text" style="display: inline-block;width: 60%" v-model="registerForm.scCode"
                   placeholder="请输入6位验证码"
                   required="" @input="scCodePt()" id="codeValue">
            <button type="button" class="getCode" id="getCode" @click="getCode()">获取验证码</button>
            <button type="button" id="registerBtn" @click="doRegister('registerForm')" >注册</button>
          </form>
          <p>已有账号?
            <router-link :to="{name:'login'}"> 立即登录!</router-link>
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
    name: "Register",
    data() {
      return {
        registerForm: {
          fuName: '',
          fuPassword: '',
          fuProvince: '',
          fuCity: '',
          fuRegion: '',
          fuPhone: '',
          scCode: ''
        },
      }

    },
    methods: {
      doRegister: function () {
        if (this.registerForm.fuName !== '' && this.registerForm.fuPassword !== '' && this.registerForm.fuPhone !== '' && this.registerForm.scCode !== '') {
          this.$axios({
            method: "post",
            url: `${this.$baseURL}/user/register`,
            params: {
              fuName: this.registerForm.fuName,
              fuPassword: this.registerForm.fuPassword,
              fuProvince: this.registerForm.fuProvince,
              fuCity: this.registerForm.fuCity,
              fuRegion: this.registerForm.fuRegion,
              fuPhone: this.registerForm.fuPhone,
            }
          }).then((response) => {
            if (response.data.success) {
              this.$router.replace({path: "/login"})
            } else {
              this.$router.push({path: "/register"})
            }
          })
            .catch((error) => {
              console.log(error);
            });
        } else {
        }

      },
      getCode: function () {
        if ((/^1[3456789]\d{9}$/.test(this.registerForm.fuPhone))) {
          this.$axios({
            method: "post",
            url: `${this.$baseURL}/common/sendCode`,
            params: {
              mobile: this.registerForm.fuPhone,
              type: "mobile_register"
            }
          })
            .then((response) => {
              if (response.data.success) {
                alert("验证码发送成功");
              } else {
                alert(response.data.msg)
              }
            })
            .catch((error) => {
              console.log(error);
            });
        } else {
          alert("请输入11位正确的电话号码")
        }

      },
      scCodePt() {
        let o = document.getElementById("codeValue").value;
        if (o.length === 6) {
          this.$axios({
            url: `${this.$baseURL}/common/checkCode`,
            type: "post",
            cache: false,
            global: false,
            dataType: "json",
            params: {
              code: o,
              type: "mobile_register"
            },
            success: function (json) {
              if (json.success) {
                console.log(json)
              } else {
                alert(json.msg)
              }
            }
          })
        }
      }
    }
  }
</script>
<style scoped src="../../../static/css/login.css?v=2"/>

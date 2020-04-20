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
                   required="" @input="scCodePt">
            <button type="button" class="getCode" id="getCode" @click="getCode()">获取验证码</button>
            <input type="submit" value="注册" id="registerBtn" @click="doRegister('registerForm')">
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
    // import {notNull, isInteger, validatePhone, validateContacts, validateNumber} from "../../utils/validate";

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
                // rules: {
                //     fuName: [{required: true, message: '用户名不能为空', validator: notNull, trigger: 'blur'}],
                //     fuPassword: [{required: true, message: '密码不能为空', validator: validateNumber, trigger: 'blur'}],
                //     fuProvince: [{required: true, message: '省份不能为空', validator: validateContacts, trigger: 'blur'}],
                //     fuCity: [{required: true, message: '城市不能为空', validator: validateContacts, trigger: 'blur'}],
                //     fuRegion: [{required: true, message: '县区不能为空', validator: validateContacts, trigger: 'blur'}],
                //     fuPhone: [{required: true, message: '电话不能为空', validator: validatePhone, trigger: 'blur'}],
                //     scCode: [{required: true, message: '验证码不能为空', validator: isInteger, trigger: 'blur'}]
                // }
            }

        },
        methods: {
            doRegister: function () {
                if (this.registerForm.fuName !== '' && this.registerForm.fuPassword !== '' && this.registerForm.fuPhone !== '' && this.registerForm.scCode !== '') {
                    // let user = JSON.stringify(this.registerForm);
                    // console.log(user)
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
                            scCode: this.registerForm.scCode
                        }
                    })
                        .then((response) => {
                            if (response.data.success) {
                                this.$router.replace({path: "/login"})
                            } else {
                                this.$router.push({path: "/register"})
                            }
                        })
                        .catch((error) => {
                            console.log(error);
                        });
                }

            },
            getCode: function () {
                console.log(this.registerForm.fuPhone)
                if ((/^1[3456789]\d{9}$/.test(this.registerForm.fuPhone))) {
                    this.$axios({
                        method: "post",
                        url: `${this.$baseURL}/common/sendCode`,
                        params: {
                            mobile: this.registerForm.fuPhone,
                            type: "mobile_modify"
                        }
                    })
                        .then((response) => {
                            if (response.data.success) {
                                alert("验证码发送成功");
                                var time = 60;
                                var codeMsg = document.getElementById("#getCode");
                                var set = setInterval(function () {
                                    codeMsg.html(--time + " s");
                                }, 1000);
                                setTimeout(function () {
                                    codeMsg.attr("disabled", false).html("重新获取");
                                    clearInterval(set);
                                }, 60000);
                                console.log(response)
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
            scCodePt(e) {
                if (e.delegateTarget.value.length == 6) {
                    this.$axios({
                        url: `${this.$baseURL}/common/checkCode`,
                        type: "post",
                        cache: false,
                        global: false,
                        dataType: "json",
                        params: {
                            code: e.delegateTarget.value,
                        },
                        success: function (json) {
                            if (json.success) {
                                console.log(json)
                                document.getElementById('#registerBtn').removeAttr("disabled");
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
<style scoped src="../../../static/css/login.css"/>

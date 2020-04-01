<template>
  <div class="scrollCon">
    <div class="comm clear">
      <div class="informationWrapper flex">
        <div class="informationTitle" style="color: #4f4f4f">{{kindName}}列表</div>
        <div :key="index" v-for="(item,index) in list">
          <router-link :to="{name:'endorsementDetail',params:{id:item.feId}}" class="itemBox">
            <div class="item-img-box">
              <img :src="$rootUrl+item.feImg" alt="" class="item-img" style="margin-left: 0">
            </div>
            <div class="item-dec marginLeft" style="margin-left: 20px">
              <div class="itemInf-name">{{item.feName}}</div>
            </div>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
        name: "EndorsementList",
        data() {
            return {
                list: '',
                kindName: ''
            }
        },
        created() {
            this.$axios({
                method: "get",
                url: `${this.$baseURL}/endorsement/list`,
                params: {
                    type: this.$route.params.type,
                }
            })
                .then((response) => {
                    this.kindName = response.data.data["0"];
                    this.list = response.data.data['1'];
                })
                .catch((error) => {
                    console.log(error);
                });

        }
    }
</script>
<style scoped src="../../../static/css/comm.css"/>

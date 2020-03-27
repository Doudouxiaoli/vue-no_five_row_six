<template>
  <div class="scrollCon">
    <div class="comm clear">
      <div class="informationWrapper flex">
        <div class="informationTitle" style="color: #4f4f4f">{{kindName}}</div>
        <div :key="index" v-for="(item,index) in list">
          <router-link :to="{name:prefix+'Detail',params:{fmvId: item.fmvId,id:null}}" class="itemBox">
            <div class="item-img-box">
              <img :src="$rootUrl+item.fmvImg" alt="" class="item-img" style="margin-left: 0">
            </div>
            <div class="item-dec marginLeft" style="margin-left: 20px">
              <div class="itemInf-name">{{item.fmvName}}</div>
              <div class="itemInf-txt">{{item.fmvDirector}}</div>
            </div>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
        name: "MolivideoList",
        data() {
            return {
                prefix: '',
                list: '',
                kindName: ''
            }
        },
        created() {
            this.$axios({
                method: "get",
                url: `${this.$baseURL}/molivideo/list`,
                params: {
                    type: this.$route.params.type,
                }
            })
                .then((response) => {
                    this.list = response.data.data['0'];
                    this.prefix = response.data.data["1"];
                    this.kindName = response.data.data["2"];
                })
                .catch((error) => {
                    console.log(error);
                });

        }
    }
</script>
<style scoped src="../../../static/css/comm.css"/>

<template>
  <div class="scrollCon">
    <div class="comm clear">
      <div class="informationWrapper flex">
        <div class="informationTitle" style="color: #4f4f4f">{{kindName}}列表</div>
        <div :key="index" v-for="(item,index) in list">
          <router-link :to="{name:prefix+'Detail',params:{fmvId: item.znId,id:null}}" class="itemBox">
            <div class="item-img-box">
              <img v-if='item.znThumbnailPath!==""' :src="$rootUrl+item.znThumbnailPath" alt="" class="item-img" style="margin-left: 0">
              <img v-else src="../../../static/images/defaultImg.jpg" class="item-img" style="margin-left: 0">
            </div>
            <div class="item-dec marginLeft" style="margin-left: 20px">
              <div class="itemInf-name">{{item.znTitle}}</div>
              <div class="itemInf-txt">{{item.znTitleOne}}</div>
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
      this.kindName = this.$route.params.typeName;
      this.prefix = this.kindName = this.$route.params.url;
      this.$axios({
        method: "get",
        url: `${this.$baseURL}/news/index?moduleId=4`,
        params: {
          tagId: this.$route.params.type,
        }
      })
        .then((response) => {
          this.list = response.data.data.records;
        })
        .catch((error) => {
          console.log(error);
        });

    }
  }
</script>
<style scoped src="../../../static/css/comm.css"/>

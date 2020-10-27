<template>
  <div class="scrollCon">
    <div class="comm clear">
      <div class="informationWrapper flex">
        <div class="informationTitle" style="color: #4f4f4f">食物
          <button class="MoreBtn" @click="gotoList($event)" :id="0"><b style="color: floralwhite">更多=></b></button>
        </div>
        <div :key="index" v-for="(item,index) in foodList">
          <router-link :to="{name:'endorsementDetail',params:{id:item.znId}}" class="itemBox">
            <div class="item-img-box">
              <img v-if='item.znThumbnailPath!==""' :src="$rootUrl+item.znThumbnailPath" alt="" class="item-img" style="margin-left: 0">
              <img v-else src="../../../static/images/defaultImg.jpg" alt="" class="item-img" style="margin-left: 0">
            </div>
            <div class="item-dec marginLeft" style="margin-left: 20px">
              <div class="itemInf-name">{{item.znTitle}}</div>
            </div>
          </router-link>
        </div>
      </div>

      <div class="informationWrapper flex">
        <div class="informationTitle" style="color: #4f4f4f">美妆
          <button class="MoreBtn" @click="gotoList($event)" :id="1"><b style="color: floralwhite">更多=></b></button>
        </div>
        <div :key="index" v-for="(item,index) in makeupList">
          <router-link :to="{name:'endorsementDetail',params:{id:item.znId}}" class="itemBox">
            <div class="item-img-box">
              <img v-if='item.znThumbnailPath!==""' :src="$rootUrl+item.znThumbnailPath" alt="" class="item-img" style="margin-left: 0">
              <img v-else src="../../../static/images/defaultImg.jpg" class="item-img" style="margin-left: 0">
            </div>
            <div class="item-dec marginLeft" style="margin-left: 20px">
              <div class="itemInf-name">{{item.znTitle}}</div>
            </div>
          </router-link>
        </div>
      </div>

      <div class="informationWrapper flex">
        <div class="informationTitle" style="color: #4f4f4f">服饰
          <button class="MoreBtn" @click="gotoList($event)" :id="2"><b style="color: floralwhite">更多=></b></button>
        </div>
        <div :key="index" v-for="(item,index) in clothesList">
          <router-link :to="{name:'endorsementDetail',params:{id:item.znId}}" class="itemBox">
            <div class="item-img-box">
              <img v-if='item.znThumbnailPath!==""' :src="$rootUrl+item.znThumbnailPath" alt="" class="item-img" style="margin-left: 0">
              <img v-else src="../../../static/images/defaultImg.jpg" alt="" class="item-img" style="margin-left: 0">
            </div>
            <div class="item-dec marginLeft" style="margin-left: 20px">
              <div class="itemInf-name">{{item.znTitle}}</div>
            </div>
          </router-link>
        </div>
      </div>

      <div class="informationWrapper flex">
        <div class="informationTitle" style="color: #4f4f4f">轻奢
          <button class="MoreBtn" @click="gotoList($event)" :id="3"><b style="color: floralwhite">更多=></b></button>
        </div>
        <div :key="index" v-for="(item,index) in luxuryList">
          <router-link :to="{name:'endorsementDetail',params:{id:item.znId}}" class="itemBox">
            <div class="item-img-box">
              <img v-if='item.znThumbnailPath!==""' :src="$rootUrl+item.znThumbnailPath" alt="" class="item-img" style="margin-left: 0">
              <img v-else src="../../../static/images/defaultImg.jpg" class="item-img" style="margin-left: 0">
            </div>
            <div class="item-dec marginLeft" style="margin-left: 20px">
              <div class="itemInf-name">{{item.znTitle}}</div>
            </div>
          </router-link>
        </div>
      </div>

      <div class="informationWrapper flex">
        <div class="informationTitle" style="color: #4f4f4f">游戏
          <button class="MoreBtn" @click="gotoList($event)" :id="4"><b style="color: floralwhite">更多=></b></button>
        </div>
        <div :key="index" v-for="(item,index) in gameList">
          <router-link :to="{name:'endorsementDetail',params:{id:item.znId}}" class="itemBox">
            <div class="item-img-box">
              <img v-if='item.znThumbnailPath!==""' :src="$rootUrl+item.znThumbnailPath" alt="" class="item-img" style="margin-left: 0">
              <img v-else src="../../../static/images/defaultImg.jpg" class="item-img" style="margin-left: 0">
            </div>
            <div class="item-dec marginLeft" style="margin-left: 20px">
              <div class="itemInf-name">{{item.znTitle}}</div>
            </div>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  var endorsementNameMap = new Map([["0", "食物"], ["1", "美妆"], ["2", "服装"], ["3", "轻奢"], ["4", "游戏"]]);
  export default {
    name: "Endorsement",
    data() {
      return {
        foodList: '',
        makeupList: '',
        clothesList: '',
        luxuryList: '',
        gameList: ''
      }
    },
    methods: {
      gotoList(event) {
        this.$router.push({
          name: 'endorsementList',
          params: {type: event.currentTarget.id, typeName: endorsementNameMap.get(event.currentTarget.id)}
        })
      },
    },
    created() {
      this.$axios({
        method: "get",
        url: `${this.$baseURL}/news/index?moduleId=3&tagId=0&limit=3`,
      })
        .then((response) => {
          this.foodList = response.data.data.records;
        })
        .catch((error) => {
          console.log(error);
        });
      this.$axios({
        method: "get",
        url: `${this.$baseURL}/news/index?moduleId=3&tagId=1&limit=3`,
      })
        .then((response) => {
          this.makeupList = response.data.data.records;
        })
        .catch((error) => {
          console.log(error);
        });
      this.$axios({
        method: "get",
        url: `${this.$baseURL}/news/index?moduleId=3&tagId=2&limit=3`,
      })
        .then((response) => {
          this.clothesList = response.data.data.records;
        })
        .catch((error) => {
          console.log(error);
        });
      this.$axios({
        method: "get",
        url: `${this.$baseURL}/news/index?moduleId=3&tagId=3&limit=3`,
      }).then((response) => {
        this.luxuryList = response.data.data.records;
      })
        .catch((error) => {
          console.log(error);
        });
      this.$axios({
        method: "get",
        url: `${this.$baseURL}/news/index?moduleId=3&tagId=4&limit=3`,
      }).then((response) => {
        this.gameList = response.data.data.records;
      })
        .catch((error) => {
          console.log(error);
        });
    }
  }
</script>

<style scoped src="../../../static/css/comm.css"/>
<style scoped>
  .MoreBtn {
    margin-left: 1000px;
    height: 30px;
    background-color: transparent;
    /*vertical-align: top;*/
    border-radius: 10px;
    margin-top: -38px;
    border-top: 1px;
    border-bottom: 1px;
    border-left: 1px;
    border-right: 1px;
  }

  .MoreBtn:hover {
    background-color: #795e9f;
    color: white;
  }
</style>

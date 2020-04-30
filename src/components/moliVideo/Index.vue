<template>
  <div class="scrollCon">
    <div class="comm clear">
      <div class="informationWrapper flex">
        <div class="informationTitle" style="color: #4f4f4f">电影
          <button class="MoreBtn" @click="gotoList($event)" :id="1"><b style="color: floralwhite">更多=></b></button>
        </div>
        <div :key="index" v-for="(movie,index) in movieList">
          <router-link :to="{name:'movieDetail',params:{fmvId: movie.fmvId,id:null}}" class="itemBox">
            <div class="item-img-box">
              <img v-if='movie.fmvImg!==""' :src="$rootUrl+movie.fmvImg" alt="" class="item-img" style="margin-left: 0">
              <img v-else src="../../../static/images/defaultImg.jpg" alt="" class="item-img" style="margin-left: 0">
            </div>
            <div class="item-dec marginLeft" style="margin-left: 20px">
              <div class="itemInf-name">{{movie.fmvName}}</div>
            </div>
          </router-link>
        </div>
      </div>

      <div class="informationWrapper flex">
        <div class="informationTitle" style="color: #4f4f4f">电视剧
          <button class="MoreBtn" @click="gotoList($event)" :id="2"><b style="color: floralwhite">更多=></b></button>
        </div>
        <div :key="index" v-for="(tv,index) in tvList">
          <router-link :to="{name:'tvDetail',params:{fmvId: tv.fmvId,id:null}}" class="itemBox">
            <div class="item-img-box">
              <img v-if='tv.fmvImg!==""' :src="$rootUrl+tv.fmvImg" alt="" class="item-img" style="margin-left: 0">
              <img v-else src="../../../static/images/defaultImg.jpg" class="item-img" style="margin-left: 0">
            </div>
            <div class="item-dec marginLeft" style="margin-left: 20px">
              <div class="itemInf-name">{{tv.fmvName}}</div>
            </div>
          </router-link>
        </div>
      </div>

      <div class="informationWrapper flex">
        <div class="informationTitle" style="color: #4f4f4f">综艺
          <button class="MoreBtn" @click="gotoList($event)" :id="3"><b style="color: floralwhite">更多=></b></button>
        </div>
        <div :key="index" v-for="(variety,index) in varietyList">
          <router-link :to="{name:'varietyDetail',params:{fmvId: variety.fmvId,id:null}}" class="itemBox">
            <div class="item-img-box">
              <img v-if='variety.fmvImg!==""' :src="$rootUrl+variety.fmvImg" alt="" class="item-img" style="margin-left: 0">
              <img v-else src="../../../static/images/defaultImg.jpg" class="item-img" style="margin-left: 0">
            </div>
            <div class="item-dec marginLeft" style="margin-left: 20px">
              <div class="itemInf-name">{{variety.fmvName}}</div>
            </div>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
        name: "Molivideo",
        data() {
            return {
                movieList: '',
                tvList: '',
                varietyList: ''
            }
        },
        methods: {
            gotoList(event) {
                this.$router.push({name: 'molivideoList', params: {type: event.currentTarget.id}})
            },
        },
        created() {
            this.$axios({
                method: "get",
                url: `${this.$baseURL}/molivideo/index`,
            })
                .then((response) => {
                    this.movieList = response.data.data["1"];
                    this.tvList = response.data.data["2"];
                    this.varietyList = response.data.data["3"];
                })
                .catch((error) => {
                    console.log(error);
                });
        },
    }
</script>

<style scoped src="../../../static/css/comm.css"/>
<style scoped>
  .MoreBtn {
    margin-left: 1000px;
    height: 30px;
    background-color: transparent;
    vertical-align: top;
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

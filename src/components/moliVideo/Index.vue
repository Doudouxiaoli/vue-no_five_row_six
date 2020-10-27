<template>
  <div class="scrollCon">
    <div class="comm clear">
      <div class="informationWrapper flex">
        <div class="informationWrapper flex">
          <div class="informationTitle" style="color: #4f4f4f">电视剧
            <button class="MoreBtn" @click="gotoList($event)" :id="0"><b style="color: floralwhite">更多=></b></button>
          </div>
          <div :key="index" v-for="(tv,index) in tvList">
            <router-link :to="{name:'tvDetail',params:{fmvId: tv.znId,id:null}}" class="itemBox">
              <div class="item-img-box">
                <img v-if='tv.znThumbnailPath!==""' :src="$rootUrl+tv.znThumbnailPath" alt="" class="item-img" style="margin-left: 0">
                <img v-else src="../../../static/images/defaultImg.jpg" class="item-img" style="margin-left: 0">
              </div>
              <div class="item-dec marginLeft" style="margin-left: 20px">
                <div class="itemInf-name">{{tv.znTitle}}</div>
              </div>
            </router-link>
          </div>
        </div>

        <div class="informationTitle" style="color: #4f4f4f">电影
          <button class="MoreBtn" @click="gotoList($event)" :id="1"><b style="color: floralwhite">更多=></b></button>
        </div>
        <div :key="index" v-for="(movie,index) in movieList">
          <router-link :to="{name:'movieDetail',params:{fmvId: movie.znId,id:null}}" class="itemBox">
            <div class="item-img-box">
              <img v-if='movie.znThumbnailPath!==""' :src="$rootUrl+movie.znThumbnailPath" alt="" class="item-img" style="margin-left: 0">
              <img v-else src="../../../static/images/defaultImg.jpg" alt="" class="item-img" style="margin-left: 0">
            </div>
            <div class="item-dec marginLeft" style="margin-left: 20px">
              <div class="itemInf-name">{{movie.znTitle}}</div>
            </div>
          </router-link>
        </div>
      </div>

      <div class="informationWrapper flex">
        <div class="informationTitle" style="color: #4f4f4f">综艺
          <button class="MoreBtn" @click="gotoList($event)" :id="2"><b style="color: floralwhite">更多=></b></button>
        </div>
        <div :key="index" v-for="(variety,index) in varietyList">
          <router-link :to="{name:'varietyDetail',params:{fmvId: variety.znId,id:null}}" class="itemBox">
            <div class="item-img-box">
              <img v-if='variety.znThumbnailPath!==""' :src="$rootUrl+variety.znThumbnailPath" alt="" class="item-img"
                   style="margin-left: 0">
              <img v-else src="../../../static/images/defaultImg.jpg" class="item-img" style="margin-left: 0">
            </div>
            <div class="item-dec marginLeft" style="margin-left: 20px">
              <div class="itemInf-name">{{variety.znTitle}}</div>
            </div>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  var movliVideoNameMap = new Map([["0", "电视剧"], ["1", "电影"], ["2", "综艺"]]);
  var urlMap = new Map([["0", "tv"], ["1", "movie"], ["2", "variety"]]);
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
        var id = event.currentTarget.id;
        console.log(event.currentTarget.id)
        this.$router.push({name: 'molivideoList', params: {type: id, typeName: movliVideoNameMap.get(id), url: urlMap.get(id)}})
      },
    },
    created() {
      this.$axios({
        method: "get",
        url: `${this.$baseURL}/news/index?moduleId=4&tagId=0&limit=3`,
      })
        .then((response) => {
          this.tvList = response.data.data.records;
        })
        .catch((error) => {
          console.log(error);
        });
      this.$axios({
        method: "get",
        url: `${this.$baseURL}/news/index?moduleId=4&tagId=1&limit=3`,
      })
        .then((response) => {
          this.movieList = response.data.data.records;
        })
        .catch((error) => {
          console.log(error);
        });
      this.$axios({
        method: "get",
        url: `${this.$baseURL}/news/index?moduleId=4&tagId=2&limit=3`,
      })
        .then((response) => {
          this.varietyList = response.data.data.records;
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

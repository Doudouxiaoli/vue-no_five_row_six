<template>
  <div class="scrollCon">
    <div class="comm">
      <div class="informationWrapper open">
        <div class="mvBox inline-block">
          <div class="mv-text hidden-word">
            {{runningMv.znTile}}
          </div>
          <div id="player" style="margin-left:100px"></div>
          <div class="program-content itemInf-txt">
            <p v-html="concert.znContent"></p>
          </div>
        </div>
        <div class="recommendedBox inline-block">
          <div class="informationTitle">推荐视频:</div>
          <div :key="index" v-for="(program,index) in programList">
            <router-link :to="{name:'concertDetail',params:{concertId:null,runningId:program.znId}}" class="programBgBox">
              <img v-if='program.znThumbnailPath!==""' :src="$rootUrl+program.znThumbnailPath" class="mvImg inline-block">
              <img v-else src="../../../static/images/defaultImg.jpg" alt="" class="mvImg inline-block">
              <div class="recommended-txt hidden-word inline-block">{{program.znTitle}}</div>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>

  export default {
    name: "ConcertDetail",
    data() {
      return {
        concert: '',
        runningMv: '',
        programList: '',
      }
    },
    methods: {},
    beforeCreate() {
      const oScript = document.createElement('script');
      oScript.type = 'text/javascript';
      oScript.src = '//player.polyv.net/script/player.js';
      document.body.appendChild(oScript);
    },
    created() {
      this.$axios({
        method: "get",
        url: `${this.$baseURL}/news/detail`,
        params: {
          pk: this.$route.params.runningId,
          fromId: this.$route.params.concertId
        }
      }).then((response) => {
        //获取对应键值对的值
        this.concert = response.data.data["0"];
        this.runningMv = response.data.data["1"];
        this.programList = response.data.data["2"];
        var player = polyvPlayer({
          wrap: '#player',
          width: '600px',
          height: "400px",
          autoplay: true,
          vid: this.runningMv.znVideoPath
        });
      }).catch((error) => {
        console.log(error);
      });

    }
    ,
    watch: {
      $route(to, from) {
        if (to.path !== from.path) {
          // this.$router.go(0)
        }
      }
    }
  }
</script>

<style scoped src="../../../static/css/concert.css"/>
<style scoped src="../../../static/css/comm.css"/>

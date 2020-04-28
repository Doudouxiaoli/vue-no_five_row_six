<template>
  <div class="scrollCon">
    <div class="comm">
      <div class="informationWrapper open">
        <div class="mvBox inline-block">
          <div class="mv-text hidden-word">
            {{runningDance.fdTvName}}
          </div>
          <div id="player" style="margin-left:100px"></div>
        </div>
        <div class="recommendedBox inline-block">
          <div class="informationTitle">推荐视频:</div>
          <div :key="index" v-for="(dance,index) in waitingList">
            <router-link :to="{name:'danceDetail',params:{danceId: dance.fdId}}" class="programBgBox">
              <img v-if='program.fdImg!==""' :src="$rootUrl+program.fdImg" class="mvImg inline-block">
              <img v-else src="../../../static/images/defaultImg.jpg" alt="" class="item-img">
              <div class="recommended-txt hidden-word inline-block" >{{program.fdTvName}}</div>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>

  export default {
    name: "DanceDetail",
    data() {
      return {
        runningDance: '',
        waitingList: '',
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
        url: `${this.$baseURL}/dance/detail`,
        params: {
          id: this.$route.params.danceId,
        }
      }).then((response) => {
        //获取对应键值对的值
        this.runningDance = response.data.data["1"];
        this.waitingList = response.data.data["2"];
        var player = polyvPlayer({
          wrap: '#player',
          width: '600px',
          height: "400px",
          autoplay: true,
          vid: this.runningDance.fdVid
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

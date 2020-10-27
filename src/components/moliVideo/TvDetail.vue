<template>
  <div class="scrollCon">
    <div class="comm">
      <div class="informationWrapper open">
        <div class="mvBox inline-block">
          <div class="mv-text hidden-word" style="text-align: left">
            {{runningTv.znTitle}}
            <span style="font-family: fantasy">第{{runningTv.znPace}}集</span>
          </div>
          <div id="player" class="player"></div>
        </div>
        <div class="recommendedBox inline-block">
          <div class="informationTitle">正片:</div>
          <div :key="index" v-for="(item,index) in waitingList">
            <button class="playBtn" @click="goTvDetail($event)" :id="item.znId">{{item.znPace}}</button>

          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
        name: "TvDetail",
        data() {
            return {
                runningTv: '',
                waitingList: '',
            }
        },
        methods: {
            goTvDetail(event) {
                this.$router.push({name: 'tvDetail', params: {fmvId: null, id: event.currentTarget.id}})
            }
        },
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
                    fromId: this.$route.params.fmvId,
                    pk: this.$route.params.id
                }
            })
                .then((response) => {
                    this.runningTv = response.data.data["1"];
                    this.waitingList = response.data.data["2"];
                    var player = polyvPlayer({
                        wrap: '#player',
                        width: '800px',
                        height: "500px",
                        autoplay: true,
                        vid: this.runningTv.znVideoPath
                    });
                })
                .catch((error) => {
                    console.log(error);
                });

        }
    }
</script>
<style scoped src="../../../static/css/comm.css"/>
<style scoped>
  .playBtn {
    float: left;
    width: 50px;
    height: 35px;
    margin: 5px 6px;
  }
</style>

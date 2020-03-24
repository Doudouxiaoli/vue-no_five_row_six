<template>
  <div class="scrollCon">
    <div class="comm">
      <div class="informationWrapper open">
        <div class="mvBox inline-block">
          <div class="mv-text hidden-word">
            {{runningMv.fcpName}}
          </div>
          <div id="player"></div>
          <div class="program-content itemInf-txt">
            <p v-html="concert.fcContent"></p>
          </div>
        </div>
        <div class="recommendedBox inline-block">
          <div class="informationTitle">推荐视频:</div>
          <div :key="index" v-for="(program,index) in programList">
            <router-link :to="{name:'concertDetail',params:{concertId: concert.fcId,runningId: program.fcpId}}"
                         class="programBgBox">
              <img :src="$rootUrl+program.fcpImg" class="concertMvImg inline-block">
              <div class="recommended-txt hidden-word inline-block ">{{program.fcpName}}</div>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
    import {formatDate} from "../../utils/date";

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
                url: `${this.$baseURL}/concert/detail`,
                params: {
                    concertId: this.$route.params.concertId,
                    runningId: this.$route.params.runningId
                }
            }).then((response) => {
                //获取对应键值对的值
                this.concert = response.data.data["0"];
                this.runningMv = response.data.data["1"];
                this.programList = response.data.data["2"];
                var player = polyvPlayer({
                    wrap: '#player',
                    width: '450px',
                    height: "300px",
                    autoplay: true,
                    vid: this.runningMv.fcpVid
                });
            }).catch((error) => {
                console.log(error);
            });

        }
        ,
        filters: {
            dateFormat(time) {
                var date = new Date(time);
                return formatDate(date, "yyyy-MM-dd");
            }
        },
        watch: {
            $route(to, from) {
                if (to.path !== from.path) {
                    this.$router.go(0)
                }
            }
        }
    }
</script>

<style scoped src="../../../static/css/concert.css"/>
<style scoped src="../../../static/css/comm.css"/>

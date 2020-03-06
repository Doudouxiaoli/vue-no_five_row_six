<template>
  <div class="scrollCon">
    <div class="comm">
      <div class="informationWrapper open">
        <div class="mvBox inline-block">
          <div class="mv-text hidden-word" v-for="runningMv in runningMvAry">
            {{runningMv.fcpName}}
          </div>
          <div id="player"></div>
          <div class="program-content itemInf-txt" v-for="concert in concertAry">
            <p v-html="concert.content"></p>
          </div>
        </div>
        <div class="recommendedBox inline-block">
          <div class="informationTitle">推荐视频:</div>
          <router-link to="{name:'AlbumDetail',params:{concertId: concert.fcId,runningId=:program.fcpId)}}"
             class="programBgBox" :key="index" v-for="(program,index) in programList">
            <img :src="$rootUrl+program.fcpImg" class="concertMvImg inline-block">
            <div class="recommended-txt hidden-word inline-block ">{{program.fcpName}}</div>
          </router-link>
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
                concertAry: '',
                runningMvAry: '',
                programList: '',
                isShow: false,
                isTrue: false
            }
        },
        methods: {

        },
        created() {
            this.$axios({
                method: "get",
                url: `${this.$baseURL}/concert/detail`,
                params: {
                    concertId: this.$route.params.concertId,
                    // runningId:this.
                }
            }).then((response) => {
                //获取对应键值对的值
                this.concertAry = response.data.data["0"];
                this.runningMvAry = response.data.data["1"];
                this.programList = response.data.data["2"];

            })
                .catch((error) => {
                    console.log(error);
                });
        },
        filters: {
            dateFormat(time) {
                var date = new Date(time);
                return formatDate(date, "yyyy-MM-dd");
            }
        },
        //添加外部js
        mounted() {
            const oScript = document.createElement('script');
            oScript.type = 'text/javascript';
            oScript.src = '//player.polyv.net/script/player.js';
            document.body.appendChild(oScript);

            var player = polyvPlayer({
                wrap: '#player',
                width: '450px',
                height: "300px",
                autoplay: true,
                vid: 'runningMv.fcVid'
            });
        },
    }
</script>

<style scoped src="../../../static/css/album.css"/>
<style scoped src="../../../static/css/comm.css"/>

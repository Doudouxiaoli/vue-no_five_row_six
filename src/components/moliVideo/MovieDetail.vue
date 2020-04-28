<template>
  <div class="scrollCon">
    <div class="comm">
      <div class="informationWrapper open">
        <div class="mvBox inline-block">
          <div class="mv-text hidden-word" style="text-align: left">
            {{runningMovie.fmName}}
          </div>
          <div id="player" class="player"></div>
        </div>
        <div class="recommendedBox inline-block">
          <div class="informationTitle">推荐影片:</div>
          <div :key="index" v-for="(item,index) in waitingList">
            <router-link :to="{name:'movieDetail',params:{fmvId:null,id: item.fmId}}" class="programBgBox">
              <img v-if='item.fmImg!==""' :src="$rootUrl+item.fmImg" class="mvImg inline-block">
              <img v-else src="../../../static/images/defaultImg.jpg" alt="" class="mvImg inline-block">

              <div class="recommended-txt inline-block" style="text-align:left">
                <span class="">{{item.fmName}}</span>
                <br>
                <span>{{item.fmTime|dateFormat}}</span>
              </div>
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
        name: "MovieDetail",
        data() {
            return {
                runningMovie: '',
                waitingList: '',
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
                url: `${this.$baseURL}/molivideo/movieDetail`,
                params: {
                    fmvId: this.$route.params.fmvId,
                    id: this.$route.params.id
                }
            })
                .then((response) => {
                    this.runningMovie = response.data.data["1"];
                    this.waitingList = response.data.data["2"];
                    var player = polyvPlayer({
                        wrap: '#player',
                        width: '800px',
                        height: "500px",
                        autoplay: true,
                        vid: this.runningMovie.fmVid
                    });
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
    }
</script>
<style scoped src="../../../static/css/comm.css"/>

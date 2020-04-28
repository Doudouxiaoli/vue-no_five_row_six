<template>
  <div class="scrollCon">
    <div class="comm">
      <div class="informationWrapper open">
        <div class="mvBox inline-block">
          <div class="mv-text hidden-word" style="text-align: left">
            {{runningVariety.fvName}}
          </div>
          <div id="player" class="player"></div>
        </div>
        <div class="recommendedBox inline-block">
          <div class="informationTitle">正片:</div>
          <div :key="index" v-for="(item,index) in waitingList">
            <router-link :to="{name:'varietyDetail',params:{fmvId:null,id: item.fvId}}" class="programBgBox">
              <img v-if='item.fvImg!==""' :src="$rootUrl+item.fvImg" class="mvImg inline-block">
              <img v-else src="../../../static/images/defaultImg.jpg" alt="" class="mvImg inline-block">
              <div class="recommended-txt hidden-word inline-block">
                <span style="font-family: fantasy">第{{item.fvSort}}期:</span>
              </div>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
        name: "VarietyDetail",
        data() {
            return {
                runningVariety: '',
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
                url: `${this.$baseURL}/molivideo/varietyDetail`,
                params: {
                    fmvId: this.$route.params.fmvId,
                    id: this.$route.params.id
                }
            })
                .then((response) => {
                    this.runningVariety = response.data.data["1"];
                    this.waitingList = response.data.data["2"];
                    var player = polyvPlayer({
                        wrap: '#player',
                        width: '800px',
                        height: "500px",
                        autoplay: true,
                        vid: this.runningVariety.fvVid
                    });
                })
                .catch((error) => {
                    console.log(error);
                });

        }
    }
</script>
<style scoped src="../../../static/css/comm.css"/>

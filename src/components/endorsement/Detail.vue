<template>
  <div class="scrollCon">
    <div class="comm">
      <div class="informationWrapper open">
        <div class="mvBox inline-block">
          <div class="mv-text hidden-word" style="text-align: left">
            {{endorsement.znTitle}}
          </div>
          <div v-if="endorsement.znVideoPath">
            <div id="player" class="player"></div>
          </div>
          <div v-else>
            <img v-if='endorsement.znThumbnailPath!==""' :src="$rootUrl+endorsement.znThumbnailPath" class="mvImg inline-block">
            <img v-else src="../../../static/images/defaultImg.jpg" class="mvImg inline-block">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
        name: "EndorsementDetail",
        data() {
            return {
                havePlayer: false,
                endorsement: '',
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
                    fromId: this.$route.params.id
                }
            })
                .then((response) => {
                    this.endorsement = response.data.data["1"];
                })
                .catch((error) => {
                    console.log(error);
                });


        },
    }
</script>
<style scoped src="../../../static/css/comm.css"/>

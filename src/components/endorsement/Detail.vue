<template>
  <div class="scrollCon">
    <div class="comm">
      <div class="informationWrapper open">
        <div class="mvBox inline-block">
          <div class="mv-text hidden-word" style="text-align: left">
            {{endorsement.feName}}
          </div>
          <div v-if="endorsement.feVid">
            <div id="player" class="player"></div>
          </div>
          <div v-else>
            <img :src="$rootUrl+endorsement.feImg" class="mvImg inline-block">
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
                url: `${this.$baseURL}/endorsement/detail`,
                params: {
                    id: this.$route.params.id
                }
            })
                .then((response) => {
                    this.endorsement = response.data.data;
                    // var player = polyvPlayer({
                    //     wrap: '#player',
                    //     width: '800px',
                    //     height: "500px",
                    //     autoplay: true,
                    //     vid: response.data.data.feVid
                    // });
                })
                .catch((error) => {
                    console.log(error);
                });


        },
    }
</script>
<style scoped src="../../../static/css/comm.css"/>

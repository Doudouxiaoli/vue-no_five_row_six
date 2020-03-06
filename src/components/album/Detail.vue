<template>
    <div class="scrollCon" style="position: relative;">
      <div class="comm">
        <div class="informationWrapper open" v-for="album in albumAry">
          <div class="itemInf-name text-align-left">
            {{album.faName}}
          </div>
          <div class="itemInf-time text-align-left">{{album.faTime|dateFormat}}</div>
          <div class="itemInf-txt text-align-left"><p v-html="album.faContent"></p></div>

          <div class="edit-subTitle">
            歌曲列表
          </div>
          <table class="comm-width">
            <tr>
              <th>操作</th>
              <th>音乐标题</th>
              <th>歌手</th>
              <th>专辑</th>
              <th>时长</th>
            </tr>
            <tr v-for="song in songList">
              <td>
                <img src="../../../static/images/collectionInAction.png" class="inline-block img-small">
                <img src="../../../static/images/downInActive.png" class="inline-block img-small">
              </td>
              <td>
                <a v-if="song.fsLink" href="/api/album/songDetail?id=#(song.fsId)"> {{song.fsName}}</a>
                <a v-else href="/api/album/songDetail?id=#(song.fsId)" class="noCopyright">{{song.fsName}}</a>
                <img v-if='song.fsVid' src="../../../static/images/mvPlay.png"
                     class="inline-block img-small songMvIcon"
                     @click="playMv(song.fsVid)" />
              </td>
              <td>{{song.fsSinger}}</td>
              <td>{{album.faName}}</td>
              <td>{{song.fsLength}}</td>
            </tr>
          </table>
        </div>
      </div>

      <div class="maskBox" v-show="isShow">
        <div class="mask-cover">
          <div class="mask-close close1" @click="flu()"></div>
          <div id="player" v-show="isTrue"></div>
        </div>
      </div>
    </div>
</template>
<script>
    import {formatDate} from "../../utils/date";

    export default {

        name: "AlbumDetail",
        data() {
            return {
                albumAry: '',
                songList: '',
                isShow:false,
                isTrue:false
            }
        },
        methods: {
            playMv(t) {
                console.log(t)
                this.isShow = !this.isShow;
                this.isTrue =!this.isTrue;
                var player = polyvPlayer({
                    wrap: '#player',
                    width: '450px',
                    height: "300px",
                    autoplay: true,
                    vid: t
                });

            },
            flu(){
                this.isTrue=false;
                this.isShow=false;
                //刷新页面,解决保利关闭问题
                window.location.reload();
            }
        },
        created() {
            this.$axios({
                method: "get",
                url: `${this.$baseURL}/album/detail`,
                params: {
                    albumId: this.$route.params.albumId
                }
            }).then((response) => {
                    //获取对应键值对的值
                    this.albumAry = response.data.data["0"];
                    this.songList = response.data.data["1"];

                })
                .catch((error) => {
                    console.log(error);
                });
            // setInterval(this.playMv,1000);
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
        },
    }
</script>

<style scoped src="../../../static/css/album.css"/>
<style scoped src="../../../static/css/comm.css"/>

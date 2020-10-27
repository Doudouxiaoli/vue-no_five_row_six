<template>
  <div class="scrollCon" style="position: relative;">
    <div class="comm">
      <div class="informationWrapper open" v-for="album in albumAry">
        <div class="itemInf-name text-align-left" v-if="album.znTitle">
          {{album.znTitle}}
        </div>
        <div class="itemInf-time text-align-left">{{album.zhDate|dateFormat}}</div>
        <div class="itemInf-txt text-align-left"><p v-html="album.znContent"></p></div>

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
              <img v-if='song.znVideoPath' src="../../../static/images/mvPlay.png"
                   class="inline-block img-small songMvIcon"
                   @click="playMv(song.znVideoPath)"/>
            </td>
            <td>
                <span v-if="song.znAddress" style="vertical-align: text-bottom"> {{song.znTitle}}
                  <audio :src="song.znAddress" id="musicMp3" controls=""
                         style="height: 35px;vertical-align: sub"></audio></span>
              <span v-else class="noCopyright">{{song.znTitle}}
                <audio :src="song.znAddress" controls=""
                       style="height: 35px;vertical-align: sub"></audio>
              </span>

            </td>
            <td>{{song.znTitleOne}}</td>
            <td>{{album.znTitle}}</td>
            <td>{{song.znLength}}</td>
          </tr>
        </table>
      </div>
    </div>

    <div class="maskBox" v-show="isShowMv">
      <div class="mask-cover">
        <div class="mask-close close1" @click="flu()"></div>
        <div id="player" v-show="isPlayMv"></div>
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
                isShowMv: false,
                isPlayMv: false,
                progress: '0%'
            }
        },
        methods: {
            playMv(t) {
                this.isShowMv = !this.isShowMv;
                this.isPlayMv = !this.isPlayMv;
                var player = polyvPlayer({
                    wrap: '#player',
                    width: '450px',
                    height: "300px",
                    autoplay: true,
                    vid: t
                });
            },
            flu() {
                this.isTrue = false;
                this.isShow = false;
                //刷新页面,解决保利关闭问题
                window.location.reload();
            },
        },
        created() {
            this.$axios({
                method: "get",
                url: `${this.$baseURL}/news/list`,
                params: {
                    id: this.$route.params.pk
                }
            }).then((response) => {
                //获取对应键值对的值
              console.log(response.data.data["0"])
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
        mounted: function () {
            //添加外部js
            const oScript = document.createElement('script');
            oScript.type = 'text/javascript';
            oScript.src = '//player.polyv.net/script/player.js';
            document.body.appendChild(oScript);
        },
    }
</script>

<style scoped src="../../../static/css/album.css"/>
<style scoped src="../../../static/css/comm.css"/>

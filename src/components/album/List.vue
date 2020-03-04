<template>
  <div class="scrollCon">
    <div class="comm clear">
      <div class="informationWrapper flex">
        <div :key="index" v-for="(item,index) in list">
          <router-link :to="{name:'AlbumDetail',params:{albumId: item.faId}}"class="itemBgBox">
            <div class="item-img">
              <img :src="$rootUrl+item.faImg" alt="" class="albumImg">
              <img src="../../../static/images/stick.png" alt="" class="stickImg">
            </div>
            <div class="item-dec marginLeft">
              <div class="itemInf-name">{{item.faName}}</div>
              <!--时间戳-->
              <div class="itemInf-time">{{item.faTime|dateFormat}}</div>
            </div>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
    import {formatDate} from "../../utils/date";

    export default {
        name: "Album",
        data() {
            return {
                list: [],
                current: 1,
                display: 10
            }
        },
        watch:{
          $route(to,from){
              console.log(to);
          }
        },
        methods:{
            // seeShare(){
            //     let routeUrl = this.$router.resolve({
            //         path: "/AlbumDetail",
            //         query: {albumId:96}
            //     });
            //     window.open(routeUrl.href, '_blank');
            // }
        },
        created() {
            this.$axios({
                method: "get",
                url: `${this.$baseURL}/album/listAjax`,
            })
                .then((response) => {
                    console.log(response)
                    this.list = response.data.data.records;
                })
                .catch((error) => {
                    console.log(error);
                });
        },
        //添加外部js
        // mounted() {
        //     const oScript = document.createElement('script');
        //     oScript.type = 'text/javascript';
        //     oScript.src = '../utils/date.js';
        //     document.body.appendChild(oScript);
        // },

        filters: {
            dateFormat(time) {
                var date = new Date(time);
                return formatDate(date, "yyyy-MM-dd");
            }
        }

    }
</script>

<style scoped src="../../../static/css/album.css"/>

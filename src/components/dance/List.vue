<template>
  <div class="scrollCon">
    <div class="comm clear">
      <div class="informationWrapper flex">
        <div :key="index" v-for="(item,index) in list">
          <router-link :to="{name:'danceDetail',params:{danceId: item.fdId}}"class="itemBox itemBoxBg">
            <div class="item-img-box">
              <img v-if='item.fdIm!==""' :src="$rootUrl+item.fdImg" alt="" class="item-img">
              <img v-else src="../../../static/images/defaultImg.jpg" alt="" class="item-img">
              <img src="../../../static/images/stick.png" alt="" class="stickImg">
            </div>
            <div class="item-dec marginLeft">
              <div class="itemInf-name">{{item.fdTvName}}</div>
              <!--时间戳-->
              <div class="itemInf-time">{{item.fdTime|dateFormat}}</div>
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
        name: "Dance",
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
        created() {
            this.$axios({
                method: "get",
                url: `${this.$baseURL}/dance/list`,
            })
                .then((response) => {
                    this.list = response.data.data;
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
        }

    }
</script>

<style scoped src="../../../static/css/album.css"/>
<style scoped src="../../../static/css/comm.css"/>

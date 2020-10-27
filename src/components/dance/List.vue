<template>
  <div class="scrollCon">
    <div class="comm clear">
      <div class="informationWrapper flex">
        <div :key="index" v-for="(item,index) in list">
          <router-link :to="{name:'danceDetail',params:{danceId: item.znId}}" class="itemBox itemBoxBg">
            <div class="item-img-box">
              <img v-if='item.znThumbnailPath!==""' :src="$rootUrl+item.znThumbnailPath" alt="" class="item-img">
              <img v-else src="../../../static/images/defaultImg.jpg" alt="" class="item-img">
            </div>
            <div class="item-dec marginLeft">
              <div class="itemInf-name">{{item.znFrom}}</div>
              <!--时间戳-->
              <div class="itemInf-time">{{item.znDate|dateFormat}}</div>
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
    created() {
      this.$axios({
        method: "get",
        url: `${this.$baseURL}/news/index?moduleId=1`,
      })
        .then((response) => {
          this.list = response.data.data.records;
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

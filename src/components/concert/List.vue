<template>
  <div class="scrollCon">
    <div class="comm clear">
      <div class="informationWrapper flex padding-top-10" :key="index" v-for="(item,index) in list">
        <router-link :to="{name:'concertDetail',params:{concertId: item.fcId,runningId:null}}" class="concertBgBox">
          <img v-if='item.fcImg!==""' :src="$rootUrl+item.fcImg" class="concertImg">
          <img v-else src="../../../static/images/defaultImg.jpg" alt="" class="concertImg">
          <div class="concert-dec">
            <div class="itemInf-name padding-top-140">{{item.fcTitle}}</div>
            <div class="itemInf-txt concert-margin">{{item.fcAddress}}-{{item.fcVenue}}</div>
            <div class="itemInf-time">{{item.fcTime|dateFormat}}</div>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
    import {formatDate} from "../../utils/date";

    export default {
        name: "Concert",
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
                url: `${this.$baseURL}/concert/list`,
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

<style scoped src="../../../static/css/concert.css"/>
<style scoped src="../../../static/css/comm.css"/>

<template>
  <div class="">
    <input type="text" v-model="list">
  </div>
</template>
<script>
    export default {
        name: "AlbumDetail",
        data() {
            return {
                list: '',
            }
        },
        methods: {

        },
        created() {
            this.$axios({
                method: "get",
                url: `${this.$baseURL}/album/detail`,
               params:{
                    albumId:this.$route.params.albumId
               }
            })
                .then((response) => {
                    console.log(response)
                    // this.list = response.data.data.records;
                })
                .catch((error) => {
                    console.log(error);
                });
        },
        mounted() {
        },

    }
</script>

<style scoped src="../../../static/css/album.css"/>

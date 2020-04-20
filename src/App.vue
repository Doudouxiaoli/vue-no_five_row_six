<template>
  <div id="app">
    <div v-if="$route.meta.keepAlive">
      <head-nav></head-nav>
    </div>
    <router-view v-if="!$route.meta.keepAlive"></router-view>
  </div>
</template>
<script>
    import HeadNav from './components/include/HeadNav'

    export default {
        name: 'App',
        components: {
            HeadNav
        }
    }
</script>

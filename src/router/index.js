import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index => require(['../components/Index'], Index)
    },
    {
      path: "/Album",
      component: Album => require(['../components/album/List'], Album),
    },
    {
      path: "/AlbumDetail/:albumId",
      name: "AlbumDetail",
      component: AlbumDetail => require(['../components/album/Detail'], AlbumDetail)
    },
    {
      path: "/Concert",
      component: Concert => require(['../components/concert/List'], Concert),
    },
    {
      path: "/ConcertDetail/:concertId&:runningId",
      name: "ConcertDetail",
      component: ConcertDetail => require(['../components/concert/Detail'], ConcertDetail)
    }
  ]
})

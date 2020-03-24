import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: Index => require(['../components/Index'], Index)
    },
    {
      path: "/album",
      name: "album",
      component: Album => require(['../components/album/List'], Album),
    },
    {
      path: "/album/albumDetail/:albumId",
      name: "albumDetail",
      component: AlbumDetail => require(['../components/album/Detail'], AlbumDetail)
    },
    {
      path: "/concert",
      name: "concert",
      component: Concert => require(['../components/concert/List'], Concert),
    },
    {
      path: "/concert/concertDetail/:concertId?/:runningId?",
      name: "concertDetail",
      component: ConcertDetail => require(['../components/concert/Detail'], ConcertDetail)
    }
  ]
})

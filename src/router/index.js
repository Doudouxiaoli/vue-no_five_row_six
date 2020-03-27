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
    },
    {
      path: "/molivideo",
      name: "index",
      component: Molivideo => require(['../components/molivideo/Index'], Molivideo),
    },
    {
      path: "/molivideo/molivideoList/:type",
      name: "molivideoList",
      component: MolivideoList => require(['../components/molivideo/List'], MolivideoList),
    },
    {
      path: "/molivideo/tvDetail/:fmvId?/:id?",
      name: "tvDetail",
      component: TvDetail => require(['../components/molivideo/TvDetail'], TvDetail),
    },
    {
      path: "/molivideo/varietyDetail/:fmvId?/:id?",
      name: "varietyDetail",
      component: VarietyDetail => require(['../components/molivideo/VarietyDetail'], VarietyDetail),
    },
    {
      path: "/molivideo/movieDetail/:fmvId?/:id?",
      name: "movieDetail",
      component: MovieDetail => require(['../components/molivideo/MovieDetail'], MovieDetail),
    },
  ]
})

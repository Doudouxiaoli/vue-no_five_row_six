import Vue from 'vue'
import Router from 'vue-router'
import store from "../store";
//keepAlive是动态更改标题使用的
Vue.use(Router)
const router = new Router({
  mode: 'history',
  linkActiveClass: 'active',
  routes: [
    {
      path: '/',
      redirect: 'login'
    },
    {
      path: '/login',
      name: 'login',
      meta: {
        title: "登录",
        keepAlive: false,
      },
      component: Login => require(['../components/include/Login'], Login)
    },
    {
      path: '/register',
      name: 'register',
      meta: {
        title: "注册",
        keepAlive: false,
      },
      component: Register => require(['../components/include/Register'], Register)
    },
    {
      path: '/forgetPassword',
      name: 'forgetPassword',
      meta: {
        title: "登录",
        keepAlive: false
      },
      component: ForgetPassword => require(['../components/include/ForgetPassword'], ForgetPassword)
    },
    {
      path: '/index',
      name: 'index',
      meta: {
        title: '首页',
        keepAlive: true,
      },
      component: Index => require(['../components/Index'], Index)
    },
    {
      path: "/album",
      name: "album",
      meta: {
        title: '专辑',
        keepAlive: true,
      },
      component: Album => require(['../components/album/List'], Album),
    },
    {
      path: "/album/detail/:albumId",
      name: "albumDetail",
      meta: {
        title: '专辑详情',
        keepAlive: true,
      },
      component: AlbumDetail => require(['../components/album/Detail'], AlbumDetail)
    },
    {
      path: "/concert",
      name: "concert",
      meta: {
        title: '演唱会',
        keepAlive: true
      },
      component: Concert => require(['../components/concert/List'], Concert),
    },
    {
      path: "/concert/detail/:concertId?/:runningId?",
      name: "concertDetail",
      meta: {
        title: '演唱会详情',
        keepAlive: true,
      },
      component: ConcertDetail => require(['../components/concert/Detail'], ConcertDetail)
    },
    {
      path: "/molivideo",
      meta: {
        title: '影视作品',
        keepAlive: true
      },
      component: Molivideo => require(['../components/molivideo/Index'], Molivideo),
    },
    {
      path: "/molivideo/list/:type",
      name: "molivideoList",
      meta: {
        title: '影视作品列表',
        keepAlive: true
      },
      component: MolivideoList => require(['../components/molivideo/List'], MolivideoList),
    },
    {
      path: "/molivideo/tvDetail/:fmvId?/:id?",
      name: "tvDetail",
      meta: {
        title: '电视剧',
        keepAlive: true,
      },
      component: TvDetail => require(['../components/molivideo/TvDetail'], TvDetail),
    },
    {
      path: "/molivideo/varietyDetail/:fmvId?/:id?",
      name: "varietyDetail",
      meta: {
        title: '综艺',
        keepAlive: true,
      },
      component: VarietyDetail => require(['../components/molivideo/VarietyDetail'], VarietyDetail),
    },
    {
      path: "/molivideo/movieDetail/:fmvId?/:id?",
      name: "movieDetail",
      meta: {
        title: '电影',
        keepAlive: true,
      },
      component: MovieDetail => require(['../components/molivideo/MovieDetail'], MovieDetail),
    },
    {
      path: "/endorsement",
      meta: {
        title: '个人代言',
        keepAlive: true
      },
      component: Endorsement => require(['../components/endorsement/Index'], Endorsement),
    },
    {
      path: "/endorsement/list/:type",
      name: "endorsementList",
      meta: {
        title: '代言列表',
        keepAlive: true
      },
      component: EndorsementList => require(['../components/endorsement/List'], EndorsementList),
    },
    {
      path: "/endorsement/detail/:id",
      name: "endorsementDetail",
      meta: {
        title: '代言详情',
        keepAlive: true,
      },
      component: EndorsementDetail => require(['../components/endorsement/Detail'], EndorsementDetail),
    },
    {
      path: "/dance",
      meta: {
        title: '舞蹈列表',
        keepAlive: true
      },
      component: Dance => require(['../components/dance/List'], Dance),
    },
    {
      path: "/dance/detail/:danceId",
      name: "danceDetail",
      meta: {
        title: '舞蹈详情',
        keepAlive: true,
      },
      component: DanceDetail => require(['../components/dance/Detail'], DanceDetail),
    },
  ]
});
//导航守卫
//使用 router.beforeEach 注册一个全局前置守卫，判断用户是否登陆
router.beforeEach((to, from, next) => {
  window.document.title = to.meta.title;
  if(to.path==='/login'||to.path==='/register'||to.path==='/forgetPassword'){
    next();
  }else {
    let token = localStorage.getItem('Authorization');
    console.log(token)
    if(token===null||token===''){
      next('/login');
    }else {
      next();
    }
  }
})

const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

export default router;



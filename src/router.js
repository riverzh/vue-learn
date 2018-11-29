import VueRouter from 'vue-router';

import HomeContainer from './components/tabbar/HomeContainer.vue';
import MemberContainer from './components/tabbar/MemberContainer.vue';
import SearchContainer from './components/tabbar/SearchContainer.vue';
import ShopcarContainer from './components/tabbar/ShopcarContainer.vue';

// 3. 创建路由对象
var router = new VueRouter({
  routes: [{
      path: '/',
      redirect: '/home'
    },
    {
      path: '/home',
      component: HomeContainer
    },
    {
      path: '/member',
      component: MemberContainer
    },
    {
      path: '/search',
      component: SearchContainer
    },
    {
      path: '/shopcar',
      component: ShopcarContainer
    },
  ],
  linkActiveClass: "mui-active",
  //默认的linkActiveClass是router-link-active
  //高亮显示有两种方法，这种直接使用mui提供的mui-active,
  //直接定义router-link-active这个类需保证优先级能显示出来
});

// 把路由对象暴露出去
export default router
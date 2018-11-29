import Vue from 'vue';
import App from './App.vue';
import VueRouter from 'vue-router';
Vue.use(VueRouter);
import router from './router.js';

import VueResource from 'vue-resource';
Vue.use(VueResource);

import './lib/mui/css/mui.min.css';
import './lib/mui/css/icons-extra.css';
// 如果引入样式不能显示，看该样式在原来的地方是否还引入了其他的样式文件，
// 其他的样式文件是否又引入了其他的样式文件，要都引人进来才不会报错
// Module not found: Error: Can't resolve '../fonts/mui-icons-extra.ttf' in 
// 'F:\mywork2\vue基础\day08\vue-cms1\src\lib\mui\css'
//当引入icons-extra.css会报错，根据错误信息，在当前这个css上一层有个ttf文件还需引入

import {
    Header,
    Swipe,
    SwipeItem
} from 'mint-ui';
Vue.component(Header.name, Header);
Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);
import 'mint-ui/lib/style.css';

var vm = new Vue({
    el: '#app',
    render: c => c(App),
    router,
});
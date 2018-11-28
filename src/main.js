import Vue from 'vue';
import App from './App.vue';

import './lib/mui/css/mui.min.css';

import {
    Header
} from 'mint-ui';
Vue.component(Header.name, Header);
import 'mint-ui/lib/style.css';

var vm = new Vue({
    el: '#app',
    render: c => c(App),
});
import Vue from 'vue';
import App from './App.vue';
import VueRouter from 'vue-router';
Vue.use(VueRouter);
import router from './router.js';
import VueResource from 'vue-resource';
Vue.use(VueResource);
Vue.http.options.root = 'http://47.89.21.179:8080/api/';
import Vuex from 'vuex'
Vue.use(Vuex);

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
    SwipeItem,
    Button
} from 'mint-ui';
Vue.component(Header.name, Header);
Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);
Vue.component(Button.name, Button);
import 'mint-ui/lib/style.css';

import moment from 'moment';
Vue.filter("dataFormat", function (msg, pattern = "yyyy-MM-DD HH-mm-ss") {
    return moment(msg).format(pattern);
});

//实现本地缓存，
//刚进入网站，肯定会调用 main.js,在刚调用的时候，先从本地存储中，把 购物车的数据读出来，放到 store 中
// var shopCar = JSON.parse(localStorage.getItem("shopCar")) || [];
//每次点击加入购物车更新的时候，更新本地购物车缓存

var store = new Vuex.Store({
    state: {
        // shopCar: shopCar,
        shopCar: [],
        goodsCount: 0,
    },
    mutations: {
        addToCar(state, goods) {
            //在加入购物车的时候，先判断购物车存储里面是否有这个商品，
            //如果有，则只修改下面购物车的商品数量，如果没有，向购物车中添加该商品并更新购物车商品数量   
            var flag = false;
            state.shopCar.some((item) => {
                //理清思路，当点击加入购物车时，对传过来的商品进行判断，如果购物车数组中有这个商品，
                //将传过来的商品的数量值累加到购物车中该商品的数量值，这样，某商品数量改变，
                //购物车中的数据发生变化，就会触发getters中的getAllCount方法,
                //更新最下面的购物车商品数量;如果购物车中没有该商品，则执行向购物车中添加该商品，
                //也会触发getAllCount方法更新最下面的购物车数量值
                if (item.id == goods.id) {
                    // state.goodsCount += parseInt(goods.count);
                    // console.log(goods.count);
                    // console.log(state.goodsCount);

                    // item.count += parseInt(goods.count);
                    // 问题出在这里！！注意 item.count是字符串
                    item.count = parseInt(item.count) + parseInt(goods.count);
                    flag = true;
                    return true;
                }
            });
            //vuex的shopCar中没有该商品
            if (!flag) {
                state.shopCar.push(goods);
            }
            localStorage.setItem("shopCar", JSON.stringify(state.shopCar));
        },
        updateCar(state, countInfo) {
            state.shopCar.some(
                (item) => {
                    // console.log("item", item.id);
                    // console.log("countInfo", countInfo.id);
                    if (item.id == countInfo.id) {
                        item.count = countInfo.count;
                        return true;
                    }
                }
            );
            localStorage.setItem("shopCar", JSON.stringify(state.shopCar));
        },
        delFromCar(state, id) {
            state.shopCar.some((item, index) => {
                if (item.id == id) {
                    state.shopCar.splice(index, 1);
                    return true;
                }
            });
            localStorage.setItem("shopCar", JSON.stringify(state.shopCar));
        },
        updateSelectedInfo(state, obj) {
            state.shopCar.some((item) => {
                if (item.id == obj.id) {
                    item.selected = obj.isSelected;
                    return true;
                }
            });
            localStorage.setItem("shopCar", JSON.stringify(state.shopCar));
        }
    },
    getters: {
        //getters相当于filter computed，动态计算
        //思考一个问题，getters中的getAllCount这个方法什么时候触发？
        //因为getters中的方法是动态计算的，当getAllCount中用到的具体的变量发生变化时就会触发
        //如，当点击加入购物车，遍历改变购物车中item.count时，
        //打印"c"/item，state.shopCar中的item.count变化不会触发，而打印item.count会触发
        getAllCount(state) {
            var c = 0;
            state.shopCar.forEach((item) => {
                c += parseInt(item.count);
                // console.log("执行getters中的方法");
                // console.log(item);
                // console.log(parseInt(item.count));
            });
            return c;
        },
        getSelectedInfo(state) {
            var o = {};
            state.shopCar.forEach((item) => {
                o[item.id] = item.selected;
            });
            return o;
        },
        getBalanceInfo(state) {
            var o = {
                sumCount: 0,
                sumPrice: 0
            };
            state.shopCar.forEach((item) => {
                if (item.selected) {
                    o["sumCount"] += parseInt(item.count);
                    o["sumPrice"] += parseFloat(item.price) * parseInt(item.count);
                }
            });
            return o;
        }
    }
});

var vm = new Vue({
    el: '#app',
    render: c => c(App),
    // render: function (c) {
    //     c(App);
    // },
    router,
    store
});
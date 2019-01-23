<template>
  <div class="app-container">
    <mt-header fixed title="vue项目 ">
      <span slot="left" @click="goBack" v-show="flag">
        <mt-button icon="back">返回</mt-button>
      </span>
    </mt-header>
    <transition>
      <router-view></router-view>
    </transition>
    <nav class="mui-bar mui-bar-tab">
      <router-link class="mui-tab-item" to="/home">
        <span class="mui-icon mui-icon-home"></span>
        <span class="mui-tab-label">首页</span>
      </router-link>
      <router-link class="mui-tab-item" to="/member">
        <span class="mui-icon mui-icon-contact"></span>
        <span class="mui-tab-label">会员</span>
      </router-link>
      <router-link class="mui-tab-item" to="/shopcar">
        <span class="mui-icon mui-icon-extra mui-icon-extra-cart">
          <span class="mui-badge" id="badge">{{$store.getters.getAllCount}}</span>
        </span>
        <span class="mui-tab-label">购物车</span>
      </router-link>
      <router-link class="mui-tab-item" to="/search">
        <span class="mui-icon mui-icon-search"></span>
        <span class="mui-tab-label">搜索</span>
      </router-link>
    </nav>
  </div>
</template>
<script>
export default {
  data() {
    return {
      flag: false
    };
  },
  created() {
    //由于第一次进入无法使用watch监听变化，所以在根组件App.vue使用created钩子函数进行判断是否显示 返回 ，根组件的watch可以监听到组件中所有的路径变化
    if (this.$route.path == "/home") {
      this.flag = false;
    } else {
      this.flag = true;
    }
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    }
  },
  watch: {
    "$route.path": function(newVal) {
      //console.log(newVal);  根组件的watch可以监听到组件中所有的路径变化
      if (newVal == "/home") {
        this.flag = false;
      } else {
        this.flag = true;
      }
    }
  }
};
</script>
<style scope lang="scss">
.app-container {
  // 因为顶部引入的组件应该是绝对定位，所以给容器设置padding-top
  padding-top: 40px;
  padding-bottom: 40px;
  // 解决动画过程中滚动条的问题，点击，因为设了动画，右边产生组件，会使宽度变宽，
  // 产生滚动条，设置水平方向的溢出隐藏
  overflow-x: hidden;
}
.v-enter {
  transform: translateX(100%);
}
.v-leave-to {
  transform: translateX(-100%);
  // 解决动画过程中，内容从下面上来的问题
  position: absolute;
}
.v-enter-active,
.v-leave-active {
  transition: all 1s ease;
}
</style>
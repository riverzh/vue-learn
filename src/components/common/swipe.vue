<template>
  <div>
    <mt-swipe :auto="4000">
      <mt-swipe-item v-for="item in lunboList" :key="item.url">
        <img :src="item.img" alt :class="{'full':isFull}" :style="styleObj">
      </mt-swipe-item>
    </mt-swipe>
  </div>
</template>
<script>
import { Toast } from "mint-ui";
export default {
  data() {
    return {
      lunboList: [],
      styleObj: {
        width: this.imgWidth
      },
      imgW: "100%"
    };
  },
  // 在使用轮播图组件的时候自定义图片是否铺满屏幕,但是经过修改，这样更方便：
  // 默认情况下图片铺满屏幕，当使用组件时传入imgWidth属性可自定义图片宽度

  created() {
    this.getLunbotu();
    if (this.imgWidth) {
      this.imgW = this.imgWidth;
    }
  },
  props: ["isFull", "imgWidth"],
  methods: {
    getLunbotu() {
      this.$http.get("getLunbo").then(
        result => {
          if (result.body.status === 0) {
            this.lunboList = result.body.message;
            console.log(this.lunboList);
          } else {
            Toast("加载失败");
            console.log("44");
          }
        },
        function(error) {
          Toast("失败了");
          console.log("error" + error);
        }
      );
    }
  }
};
</script>
<style lang="scss">
.mint-swipe {
  height: 200px;
  text-align: center;
  // .mint-swipe-item:nth-child(1) {
  //   background-color: red;
  // }
  // .mint-swipe-item:nth-child(2) {
  //   background-color: blue;
  // }
  // .mint-swipe-item:nth-child(3) {
  //   background-color: cyan;
  // }
  //另一种写法，suss写法，可以嵌套              注意取交集
  .mint-swipe-item {
    &:nth-child(1) {
      // background-color: red;
    }
    &:nth-child(2) {
      // background-color: pink;
    }
    &:nth-child(3) {
      // background-color: yellow;
    }
  }
}
img {
  // width: 100%;
  height: 100%;
}
.full {
  width: 100%;
}
</style>

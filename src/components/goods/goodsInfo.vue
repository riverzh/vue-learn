<template>
  <div class="goods-container">
    <transition @before-enter="beforeEnter" @enter="enter" @after-enter="afterEnter">
      <div class="ball" ref="ball" v-show="this.ballFlag"></div>
    </transition>
    <!-- <div class="mui-card">
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <swipe :isFull="false" :imgWidth="imgWidth"></swipe>
        </div>
      </div>
    </div>-->
    <div class="mui-card">
      <div class="mui-card-header">{{goodsItem.title}}</div>
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <p>市场价: {{goodsItem.market_price}}</p>
          <p style="color: #333;">购买数量：
            <numBox :max="maxCount" @countChanged="countChange"></numBox>
          </p>
          <div class="mui-btn mui-btn-primary">立即购买</div>
          <button type="button" class="mui-btn mui-btn-danger" @click="addToShopCar">加入购物车</button>
        </div>
      </div>
    </div>
    <div class="mui-card">
      <div class="mui-card-header">商品参数</div>
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <p>商品货号</p>
          <p style="color: #333;">商品库存</p>
          <p style="color: #333;">上架情况</p>
        </div>
      </div>
      <div class="mui-card-footer">
        <a class="mui-card-link">Like</a>
        <a class="mui-card-link">Read more</a>
      </div>
    </div>
    <button @click="changed">点击</button>
    <test :testCount="sonTest"></test>
  </div>
</template>
<script>
import swipe from "../common/swipe.vue";
import numBox from "../common/numberBox.vue";
import test from "../common/test.vue";
export default {
  created() {
    this.initGoodsInfo();
    setTimeout(() => {
      this.maxCount = 60;
    }, 0);
    setTimeout(() => {
      this.sonTest = 1;
    }, 1000);
  },
  data() {
    return {
      ballFlag: false,
      imgWidth: "200px",
      maxCount: 1,
      currentCount: 1,
      testValue: 0,
      sonTest: 0,
      goodsItem: {},
      shopItem: {},
      goodsList: [
        {
          id: 87,
          title: "小米7 ;青春版 4GB+64GB 潮流镜面渐变色，2400万自拍旗舰",
          sell_price: 1499,
          market_price: 997,
          stock_quantity: 70,
          selected: true
        },
        {
          id: 88,
          title: "小米8 青春版 4GB+64GB 潮流镜面渐变色，2400万自拍旗舰",
          sell_price: 1599,
          market_price: 998,
          stock_quantity: 80,
          selected: true
        },
        {
          id: 89,
          title: "小米9 青春版 4GB+64GB 潮流镜面渐变色，2400万自拍旗舰",
          sell_price: 1699,
          market_price: 999,
          stock_quantity: 90,
          selected: false
        }
      ]
    };
  },
  methods: {
    initGoodsInfo() {
      this.goodsList.some(item => {
        if (item.id === this.$route.params.id) {
          // console.log("params.id", typeof this.$route.params.id);
          // console.log("item.id", typeof item.id);
          this.goodsItem = item;
        }
      });
    },
    changed() {
      this.sonTest += 5;
    },
    addToShopCar() {
      this.ballFlag = !this.ballFlag;
      this.shopItem = {
        id: this.goodsItem.id,
        title: this.goodsItem.title,
        count: this.currentCount,
        price: this.goodsItem.market_price,
        selected: this.goodsItem.selected
      };
      this.$store.commit("addToCar", this.shopItem);
    },
    beforeEnter(el) {
      el.style.transform = "translate(0,0)";
    },
    enter(el, done) {
      el.offsetWidth;
      // dom.getBoundingClientRect()可以获取DOM元素到浏览器可视范围的距离（不包含文档卷起的部分）。
      //返回一个对象，该对象有6个属性top,lef,right,bottom,width,height；
      const ballPosition = this.$refs.ball.getBoundingClientRect();
      // const ballPosition = el.getBoundingClientRect(); 可以的，用el表示小球也可以
      const badgePosition = document
        .getElementById("badge")
        .getBoundingClientRect();
      const xDist = badgePosition.left - ballPosition.left;
      const yDist = badgePosition.top - ballPosition.top;
      el.style.transform = `translate(${xDist}px,${yDist}px)`;
      el.style.transition = "all 0.5s cubic-bezier(.4,-0.3,1,.68)";
      done();
    },
    afterEnter(el) {
      // 下面两种写法都可以，都是让小球显示出来之后 半场动画结束之后消失
      this.ballFlag = false;
      // this.ballFlag = !this.ballFlag;
    },
    countChange(count) {
      this.currentCount = count;
    }
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.initGoodsInfo();
      // console.log("vm.goodsItem", vm.goodsItem);
    });
  },
  components: {
    swipe,
    numBox,
    test
  }
};
</script>
<style scoped>
.goods-container {
  background-color: #eee;
  /* 不懂，设置溢出隐藏后goods-container容器顶部的白边就没有了 */
  overflow: hidden;
}
.ball {
  width: 15px;
  height: 15px;
  background-color: #f00;
  position: absolute;
  top: 413px;
  left: 150px;
  z-index: 99;
  border-radius: 50%;
}
</style>

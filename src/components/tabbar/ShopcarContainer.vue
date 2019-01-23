<template>
  <div class="shopcar-container">
    <!-- 购物车商品列表 -->
    <div class="mui-card" v-for="item in shopCarList" :key="item.id">
      <div class="mui-card-content">
        <div class="mui-card-content-inner goods-info">
          <!-- <mt-switch
            v-model="$store.getters.getSelectedInfo[item.id]"
            @change="selectedChanged(item.id,$store.getters.getSelectedInfo[item.id])"
          ></mt-switch>-->
          <mt-switch v-model="item.selected" @change="selectedChanged(item.id,item.selected)"></mt-switch>
          <img src="https://i1.mifile.cn/a1/pms_1537323963.1278763!220x220.jpg" class="img-info">
          <div>
            <h5>{{item.title}}</h5>
            <p class="goods-info-detail">
              <span class="price">￥{{item.price}}</span>
              <numbox :initCount="item.count" :goodsId="item.id" @countChanged="countChanged"></numbox>
              <!-- 问题：如何从购物车中获取商品的数量呢 -->
              <!-- 1. 我们可以先创建一个 空对象，然后循环购物车中所有商品的数据， 把 当前循环这条商品的 Id， 作为 对象 的 属性名，count值作为 对象的 属性值，这样，当把所有的商品循环一遍，就会得到一个对象： { 88: 2, 89: 1, 90: 4 } -->
              <a href="#" @click.prevent="delGoodsItem(item.id)">删除</a>
            </p>
            <!-- <div>{{item.id}}{{item.selected}}</div> -->
            <!-- <div>{{$store.getters.getSelectedInfo}} 直接使用$store而不用item，$store更方便吧</div> -->
          </div>
        </div>
      </div>
    </div>
    <!-- 购物车结算区域 -->
    <div class="mui-card sum balance">
      <div class="balance-info">
        <p>总计（不含运费）</p>
        <p>
          已勾选商品
          <span>{{$store.getters.getBalanceInfo.sumCount}}</span>件 总价
          <span>{{$store.getters.getBalanceInfo.sumPrice}}</span>元
        </p>
      </div>
      <button type="button" class="mui-btn mui-btn-danger" @click="goodsBalance">结算</button>
    </div>
  </div>
</template>
<script>
import numbox from "../common/shopNumBox.vue";
import { Switch } from "mint-ui";
export default {
  data() {
    return {
      shopCarList: []
    };
  },
  created() {
    this.getShopCarList();
    // console.log(this.shopCarList);
  },
  methods: {
    getShopCarList() {
      this.shopCarList = this.$store.state.shopCar;
    },
    countChanged(count, id) {
      //修改数量需考虑修改哪件商品的数量，需将修改商品的id和商品的数量联系起来
      const countInfo = {
        count,
        id
      };
      this.$store.commit("updateCar", countInfo);
    },
    delGoodsItem(id) {
      this.$store.commit("delFromCar", id);
      this.getShopCarList();
    },
    selectedChanged(id, val) {
      this.$store.commit("updateSelectedInfo", { id, isSelected: val });
    }
  },
  components: {
    numbox,
    "mt-switch": Switch
  }
};
</script>
<style lang="">
.goods-info {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.goods-info-detail {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.img-info {
  width: 60px;
}
.balance {
  padding: 0 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.balance span {
  color: red;
  font-size: 20px;
  font-weight: 700;
  padding: 0 10px;
}
</style>
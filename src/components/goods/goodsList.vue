<template>
  <div class="goods-wrapper">
    <!-- <router-link
      class="goods-item"
      v-for="item in goodsList"
      :to="'/home/goodsInfo/'+item.id"
      :key="item.id"
    >
      注意在router-link中这样写是不对的，在编程式导航中可以:to="{name:'goodsInfo',params:item.id}"
      <img src="https://i1.mifile.cn/a1/pms_1537323963.1278763!220x220.jpg" alt>
      <h3 class="title">{{item.title}}</h3>
      <div class="info">
        <p class="goods-price">
          <span class="price-new">{{item.sell_price}}</span>
          <span class="price-old">{{item.market_price}}</span>
        </p>
        <p class="goods-sale">
          <span>热卖中</span>
          <span>剩{{item.stock_quantity}}件</span>
        </p>
      </div>
    </router-link>-->
    <div class="goods-item" v-for="item in goodsList" :key="item.id" @click="goDetail(item.id)">
      <img src="https://i1.mifile.cn/a1/pms_1537323963.1278763!220x220.jpg" alt>
      <h3 class="title">{{item.title}}</h3>
      <div class="info">
        <!-- style="position:absolute;bottom:0;width:100%;" -->
        <p class="goods-price">
          <span class="price-new">{{item.sell_price}}</span>
          <span class="price-old">{{item.market_price}}</span>
        </p>
        <p class="goods-sale">
          <span>热卖中</span>
          <span>剩{{item.stock_quantity}}件</span>
        </p>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      goodsList: [
        {
          id: 87,
          title:
            "小米7&nbsp;&nbsp;青春版&nbsp;4GB+64GB&nbsp;潮流镜面渐变色，2400万自拍旗舰",
          sell_price: 1499,
          market_price: 997,
          stock_quantity: 70,
          selected: true
        },
        {
          id: 88,
          title:
            "小米8&nbsp;&nbsp;青春版&nbsp;4GB+64GB&nbsp;潮流镜面渐变色，2400万自拍旗舰",
          sell_price: 1599,
          market_price: 998,
          stock_quantity: 80,
          selected: true
        },
        {
          id: 89,
          title:
            "小米9&nbsp;&nbsp;青春版&nbsp;4GB+64GB&nbsp;潮流镜面渐变色，2400万自拍旗舰",
          sell_price: 1699,
          market_price: 999,
          stock_quantity: 90,
          selected: false
        }
      ]
    };
  },
  methods: {
    goDetail(id) {
      this.$router.push({ name: "goodsInfo", params: { id } });
    }
  }
  // watch: {
  //   $route(to, from) {}
  // }
};
</script>
<style lang="scss">
.goods-wrapper {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  //   background-color: rgb(243, 243, 243);
  padding: 0 2px;
  .goods-item {
    width: 49%;
    // min-height: 269px;
    border: 1px solid #ccc;
    box-shadow: 0 0 8px #ccc;
    padding: 0 2px;
    margin: 2px 0;
    //解决flex布局中同一行的两个item项高度不一致，引起其中一个底部空着的问题
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    img {
      width: 100%;
    }
    .title {
      font-size: 12px;
    }
    .info {
      padding: 2px;
      background-color: #eee;
      p {
        margin: 0px;
      }
      .goods-price {
        // display: flex;
        // justify-content: space-between;
        .price-old {
          text-decoration: line-through;
        }
        .price-new {
          color: red;
          font-size: 14px;
        }
      }
      .goods-sale {
        display: flex;
        justify-content: space-between;
        font-size: 12px;
      }
    }
  }
}
</style>

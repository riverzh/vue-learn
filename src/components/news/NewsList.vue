<template>
  <div>
    <ul class="mui-table-view">
      <li class="mui-table-view-cell mui-media">
        <a href="javascript:;">
          <img class="mui-media-object mui-pull-left" src="../../images/menu1.png">
          <div class="mui-media-body">
            <h1>幸福</h1>
            <p class="mui-ellipsis">
              <span>发表时间：2015-3-3 23:01:09</span>
              <span>点击0次</span>
            </p>
          </div>
        </a>
      </li>
      <!-- 请求不成功，获取不到数据， 循环展示展示不了-->
      <!-- <li class="mui-table-view-cell mui-media" v-for="item in newslist" :key="item.id">
        <router-link :to="'/home/newsInfo/'+item.id">
          <img class="mui-media-object mui-pull-left" src="../../images/menu1.png">
          <div class="mui-media-body">
            <h1>{{item.title}}</h1>
            <p class="mui-ellipsis">
              <span>发表时间：{{item.add_time | dataFormat("yyyy-mm-dd")}}</span>
              <span>点击{{item.click}}次</span>
            </p>
          </div>
        </router-link>
      </li>-->
    </ul>
  </div>
</template>
<script>
import { Toast } from "mint-ui";
export default {
  data() {
    return {
      newslist: []
    };
  },
  created() {
    this.getNewslist();
  },
  methods: {
    getNewslist() {
      this.$http.get("getnewslist").then(
        result => {
          if (result.body.status === 0) {
            this.newslist = result.body.message;
          } else {
            Toast("获取新闻列表失败");
          }
        },
        result => {
          console.log("请求失败");
          console.log(result);
        }
      );
    }
  }
};
</script>
<style scope lang="scss">
.mui-table-view {
  li {
    h1 {
      font-size: 14px;
    }
    .mui-ellipsis {
      font-size: 14px;
      color: #226aff;
      display: flex;
      justify-content: space-between;
    }
  }
}
</style>

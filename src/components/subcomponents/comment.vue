<template>
  <div class="cmt-container">
    <h3>发表评论</h3>
    <hr>
    <textarea placeholder="请输入评论内容" maxlength="120"></textarea>
    <mt-button type="primary" size="large">发表评论</mt-button>
    <div class="cmt-list">
      <div class="cmt-itm">
        <div class="cmt-title">第1楼&nbsp;&nbsp;用户:匿名用户&nbsp;&nbsp;发表时间:2012-12-12 12:12</div>
        <div class="cmt-body">这是一个评论</div>
      </div>
      <div class="cmt-itm" v-for="(item,i) in commentlist" :key="item.add_time">
        <div
          class="cmt-title"
        >第{{i+1}}楼&nbsp;&nbsp;用户:{{item.user_name}}&nbsp;&nbsp;发表时间:{{item.add_time}}</div>
        <div class="cmt-body">{{item.content === "undefined"?"用户很懒,啥都没说":item.content}}</div>
      </div>
    </div>
    <mt-button type="danger" size="large" plain :click="getmore">加载更多</mt-button>
  </div>
</template>
<script>
import Toast from "mint-ui";
export default {
  data() {
    pageIndex: 1;
    commentlist: [];
  },
  created() {
    this.getcomments();
  },
  methods: {
    getcomments() {
      this.$http
        .get("api/getcomments/" + this.id + "?pageIndex=" + this.pageIndex)
        .then(result => {
          if (result.body.status === "0") {
            //第一次加载，是空数组拼接上请求获得的数组，当点击加载更多时，
            //是当前数组拼接上请求的数组，只有3页数据，当页码超过3页时，
            //请求返回的数组为空数组，当前的数组拼接上空数组，页面没有影响
            this.commentlist = this.commentlist.concat(result.body.message);
          } else {
            Toast("加载评论失败");
          }
        });
    },
    getmore() {
      this.pageIndex++;
      this.getcomments();
    }
  },
  props: ["id"]
};
</script>
<style lang="scss">
.cmt-container {
  h3 {
    font-size: 18px;
  }
  textarea {
    font-size: 14px;
    height: 85px;
    margin: 0;
  }
  .cmt-list {
    .cmt-item {
      font-size: 13px;
      .cmt-title {
        line-height: 30px;
        background-color: #ccc;
      }
      .cmt-body {
        line-height: 35px;
        text-indent: 2em;
      }
    }
  }
}
</style>

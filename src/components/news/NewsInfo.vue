<template>
  <div class="newsinfo-container">
    <h1 class="title">新闻标题{{newsInfo.title}}</h1>
    <p class="subtitle">
      <span>发表时间：{{newsInfo.time}}</span>
      <span>点击:{{newsInfo.click}}</span>
    </p>
    <div class="content" v-html="newsInfo.content"></div>
    <commentBox :id="id"></commentBox>
  </div>
</template>
<script>
import Toast from "mint-ui";
import commentBox from "../subcomponents/comment.vue";
export default {
  data() {
    return {
      id: this.$route.params.id,
      newsInfo: {}
    };
  },
  created() {
    this.getNewsInfo();
  },
  methods: {
    getNewsInfo() {
      this.$http.get("api/getnew/" + this.id).then(result => {
        if (result.body.status === 0) {
          this.newsInfo = result.body.message[0];
        } else {
          Toast("获取新闻失败");
        }
      });
    },
    componets: {
      commentBox: commentBox
    }
  }
};
</script>
<style lang="scss">
.newsinfo-container {
  padding: 0 4px;
  .title {
    font-size: 16px;
    text-align: center;
    margin: 15px 0;
    color: red;
  }
  .subtitle {
    display: flex;
    justify-content: space-between;
  }
  .content {
    // 把scope去掉，可以实现图片显示完整
    // 不会产生全局污染，因为在newsinfo-container类下的，没有重名
    img {
      width: 100%;
    }
  }
}
</style>

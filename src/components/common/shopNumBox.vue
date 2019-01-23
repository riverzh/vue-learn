<template>
  <div>
    <div class="mui-numbox" data-numbox-min="1">
      <button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
      <input
        id="test"
        @change="countChanged"
        ref="inputValue"
        class="mui-input-numbox"
        type="number"
        :value="initCount"
      >
      <button class="mui-btn mui-btn-numbox-plus" type="button">+</button>
    </div>
  </div>
</template>
<script>
import mui from "../../lib/mui/js/mui.min.js";
export default {
  mounted() {
    // 初始化数字选择框组件
    mui(".mui-numbox").numbox();
  },
  methods: {
    countChanged() {
      this.$emit("countChanged", this.$refs.inputValue.value, this.goodsId);
    }
  },
  props: ["initCount", "goodsId"]
};
</script>
<style>
</style>

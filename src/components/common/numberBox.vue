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
        value="1"
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
      this.$emit("countChanged", this.$refs.inputValue.value);
    }
  },
  props: ["max"],
  watch: {
    max(newValue, oldValue) {
      mui(".mui-numbox")
        .numbox()
        .setOption("max", newValue);
      console.log(newValue);
    }
  }
};
</script>
<style>
</style>

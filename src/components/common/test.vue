<template>
  <div>
    hello,test component,sonTest:{{testCount}} {{testValue}}
    <br>
    <br>
  </div>
</template>
<script>
export default {
  data() {
    return {
      testValue: 100
    };
  },
  props: ["testCount"],
  created() {
    console.log(this.testCount);
  },
  methods: {
    // changed() {
    //   this.sonTest += 5;
    // }
  }
};
</script>
<style>
</style>

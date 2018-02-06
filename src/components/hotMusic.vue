<template>
  <div>
    <mt-header fixed title="music"></mt-header>
    <mt-loadmore :top-method="loadTop" ref="loadmore">
    hot
    </mt-loadmore>
    <mt-header fixed title="footer" class="footer"></mt-header>
  </div>
</template>
<script>
export default {
  data () {
    return {
    }
  },
  methods: {
    init () {

    }
  },
  components: {
  },
  mounted () {
    this.init();
  }
}
</script>
<style scoped>
  .footer{
    top: auto;
    bottom: 0;
  }
</style>

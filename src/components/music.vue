<template>
  <div>
    <mt-header fixed title="music"></mt-header>
    <mt-loadmore :top-method="loadTop" ref="loadmore">
      <div class="tablist">
        <div class="item" v-for="item in typeList" :key="item.key" @click="handleDetail(item.key)">{{item.title}}</div>
      </div>
    </mt-loadmore>
    <mt-header fixed title="footer" class="footer"></mt-header>
  </div>
</template>
<script>
import { Header, Loadmore } from 'mint-ui';
export default {
  data () {
    return {
      typeList: [{
        'key': 'hot',
        'title': '热歌榜'
      }, {
        'key': 'new',
        'title': '新歌榜'
      }, {
        'key': 'search',
        'title': '搜索'
      }]
    }
  },
  methods: {
    loadTop () {
      console.log('load111111');
      setTimeout(()=>{
        this.$refs.loadmore.onTopLoaded();
      },1000)
    },
    handleDetail (key) {
      this.$router.push('/' + key);
    }
  },
  components: {
    [Header.name]: Header,
    [Loadmore.name]: Loadmore
  }
}
</script>
<style scoped>
  .footer{
    top: auto;
    bottom: 0;
  }
  .tablist{
    padding: 25px;
  }
  .item{
    line-height: 100px;
    margin-top: 20px;
    font-size: 30px;
    border: 1px solid #ccc;
  }
</style>

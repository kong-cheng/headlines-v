<template>
  <div class="layout-contatiner">
    <router-view />

    <!-- 标签栏 -->
    <van-tabbar class="layout-tabbar" route>
      <van-tabbar-item to='/'>
        <i slot="icon" class="iconfont iconshouye"></i>
        <span class="text">首页</span>
      </van-tabbar-item>
      <van-tabbar-item to='/video'>
        <i slot="icon" class="iconfont iconshipin"></i>
        <span class="text">视频</span>
      </van-tabbar-item>
      <van-tabbar-item to='/qa'>
        <i slot="icon" class="iconfont iconwenda"></i>
        <span class="text">问答</span>
      </van-tabbar-item>
      <van-tabbar-item to='/my'>
        <i slot="icon" class="iconfont iconwode"></i>
        <span class="text">{{$store.state.token ? '我的' : '未登录'}}</span>
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  name: 'layoutIndex',
  components: {},
  props: {},
  data () {
    return {
    }
  }
}
</script>

<style scoped lang="less">
.layout-tabbar {
  i.iconfont {
    font-size: 40px;
  }
  span.text {
    font-size: 20px;
  }
}
</style>

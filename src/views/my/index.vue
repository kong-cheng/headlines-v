<template>
  <div class="my-container">

    <!-- 登录头部 -->
    <div v-if="token">
      <div class="header user-info">
        <div class="base-info">
          <div class="left">
            <van-image round fit='cover' class="avatar" :src="userList.photo" />
            <span class="name">{{userList.name}}</span>
          </div>
          <div class="rigth">
            <van-button round size="mini">编辑资料</van-button>
          </div>
        </div>
        <div class="data-stats">
          <div class="data-item">
            <span class="count">{{userList.art_count}}</span>
            <span class="text">头条</span>
          </div>
          <div class="data-item">
            <span class="count">{{userList.follow_count}}</span>
            <span class="text">关注</span>
          </div>
          <div class="data-item">
            <span class="count">{{userList.fans_count}}</span>
            <span class="text">粉丝</span>
          </div>
          <div class="data-item">
            <span class="count">{{userList.like_count}}</span>
            <span class="text">获赞</span>
          </div>
        </div>
      </div>
      <van-grid class="grid-nav mb-9" clickable :column-num="2">
        <van-grid-item class="grid-item">
          <i slot="icon" class="iconfont iconshoucang"></i>
          <span slot="text" class="text">收藏</span>
        </van-grid-item>
        <van-grid-item class='grid-item'>
          <i slot="icon" class="iconfont iconlishi"></i>
          <span slot="text" class="text">历史</span>
        </van-grid-item>
      </van-grid>
    </div>

    <!-- 未登录头部 -->
    <div v-else class="header not-login">
      <div class="login-btn" @click="$router.push('/login')">
        <img class="mobile-img" src="~@/assets/mobile.png" alt="">
        <span class="text">登录 / 注册</span>
      </div>
    </div>

    <div class="topWide">
      <van-cell title="消息通知" is-link />
      <van-cell title="小智同学" is-link />
    </div>
    <van-cell v-if="token" class="logout-cell" clickable title="退出登录"
      @click="onLogout" />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { getUserInfo } from '@/api/user.js'
export default {
  // 组件名称
  name: 'myPage',
  // 局部注册的组件
  components: {},
  // 组件参数 接收来自父组件的数据
  props: {},
  // 组件状态值
  data () {
    return {
      userList: {}
    }
  },
  computed: {
    ...mapState(['token'])
  },
  // 侦听器
  watch: {},
  created () {
    if (this.token) {
      this.getLoadUser()
    }
  },
  mounted () { },
  // 组件方法
  methods: {
    // 退出登录
    onLogout () {
      this.$dialog.confirm({
        title: '退出提示',
        message: '是否退出登录'
      })
        .then(() => {
          // on confirm
          this.$store.commit('setUser', null)
        })
        .catch(() => {
          // on cancel
        })
    },
    // 获取用户信息
    async getLoadUser () {
      try {
        const { data: res } = await getUserInfo()
        this.userList = res.data
        console.log(res)
      } catch (err) {
        console.log(err)
        this.$toast('获取数据失败')
      }
    }
  }
}
</script>

<style scoped lang="less">
.header {
  height: 361px;
  background-image: url("~@/assets/banner.png");
  background-size: cover;
}
.not-login {
  display: flex;
  justify-content: center;
  align-items: center;
  .login-btn {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .mobile-img {
      width: 132px;
      height: 132px;
      margin-bottom: 15px;
    }
    .text {
      font-size: 28px;
      color: #fff;
    }
  }
}
.user-info {
  .base-info {
    height: 231px;
    padding: 76px 32px 23px;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .left {
      display: flex;
      align-items: center;
      .avatar {
        width: 132px;
        height: 132px;
        border: 4px solid #fff;
        margin-right: 23px;
      }
      .name {
        font-size: 30px;
        color: #fff;
      }
    }
  }
  .data-stats {
    display: flex;
    .data-item {
      height: 130px;
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      color: #fff;
      .count {
        font-size: 36px;
      }
      .text {
        font-size: 23px;
      }
    }
  }
}
.grid-nav {
  .grid-item {
    height: 141px;
    .iconfont {
      font-size: 45px;
    }
    .iconshoucang {
      color: #eb5253;
    }
    .iconlishi {
      color: #ff9d1d;
    }
    span.text {
      font-size: 28px;
    }
  }
}
.topWide {
  margin: 10px 0;
}
.logout-cell {
  color: #d86262;
  text-align: center;
}
</style>

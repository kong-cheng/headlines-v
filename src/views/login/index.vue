<template>
  <div class="login-container">
    <van-nav-bar title="欢迎登录">
      <van-icon slot="left" name="cross" @click="$router.back()" />
    </van-nav-bar>
    <van-form @submit="onSubmit" ref="loginForm">
      <van-field v-model="user.mobile" name="mobile" placeholder="请输入手机号"
        type='number' clearable :rules='userFormRules.mobile' maxlength='11'>
        <i slot="left-icon" class="iconfont iconshouji"></i>
      </van-field>
      <van-field v-model="user.code" name="code" placeholder='请输入验证码'
        type="number" :rules='userFormRules.code' maxlength='6'>
        <i slot="left-icon" class="iconfont iconyanzhengma"></i>
        <template #button>

          <!-- 倒计时 -->
          <van-count-down v-if="isCountDownShow" @finish='isCountDownShow=false'
            :time="1000*60" format="ss 秒" />

          <van-button v-else size="small" type="primary" round
            class="send-sms-btn" @click="onSendSms" native-type="button">
            发送验证码</van-button>
        </template>
      </van-field>
      <div class="login-btn-wrap">
        <van-button round block type="info" native-type="submit">
          登录
        </van-button>
      </div>
    </van-form>
    <van-divider class="line-divider">
      万能验证码 246810
    </van-divider>
  </div>
</template>

<script>
import { login, sendSms } from '@/api/user.js'
export default {
  // 组件名称
  name: 'LoginIndex',
  // 局部注册的组件
  components: {},
  // 组件参数 接收来自父组件的数据
  props: {},
  // 组件状态值
  data () {
    return {
      user: {
        mobile: '13911111111',
        code: '246810'
      },
      userFormRules: {
        mobile: [{
          required: true,
          message: '手机号不能为空'
        }, {
          pattern: /^1[3|4|7|8]\d{9}$/,
          message: '手机号格式错误'
        }
        ],
        code: [{
          required: true,
          message: '验证码不能为空'
        }, {
          pattern: /^\d{6}$/,
          message: '验证码格式错误'
        }
        ]
      },
      isCountDownShow: false
    }
  },
  methods: {
    // 点击登录
    async onSubmit () {
      this.$toast.loading({
        message: '登录中...',
        duration: 0
      })
      try {
        const res = await login(this.user)
        this.$toast.success('登录成功')
        this.$store.commit('setUser', res.data.data)
        this.$router.back()
        console.log(res)
      } catch (err) {
        if (err.request.status === 400) {
          this.$toast.fail('手机号或验证码错误')
        } else {
          this.$toast.fail('登录失败，请稍后再试')
        }
      }
    },
    // 点击发送验证码
    async onSendSms () {
      try {
        await this.$refs.loginForm.validate('mobile')
        console.log(123)
      } catch (err) {
        return this.$toast.fail('手机号错误')
      }
      // 显示倒计时
      this.isCountDownShow = true
      try {
        await sendSms(this.user.mobile)
        this.$toast('发送成功')
      } catch (err) {
        if (err.response.status === 429) {
          this.$toast('发送太频繁了，请稍后重试')
        } else {
          this.$toast('手机号错误')
        }
      }
    }
  }
}
</script>

<style scoped lang="less">
.iconfont {
  font-size: 37px;
}
.login-container {
  height: 100%;
  background: #083137;
}
.van-nav-bar,
.van-field {
  background: transparent;
  color: #fff;
}
.van-form {
  width: 100%;
  position: absolute;
  top: 300px;
}
.send-sms-btn {
  width: 152px;
  height: 46px;
  line-height: 46px;
  background-color: #ededed;
  font-size: 22px;
  color: #666;
  border: none;
}
.login-btn-wrap {
  margin: 100px 20px;
}
.line-divider {
  width: 100%;
  color: #666;
  position: absolute;
  bottom: 100px;
}
.van-count-down {
  color: #ededed;
}
</style>

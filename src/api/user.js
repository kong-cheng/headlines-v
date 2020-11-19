
// 导入根地址模块
import request from '@/utils/request.js'
import store from '@/store'

// 验证登录接口
export const login = data => {
  return request({
    method: 'POST',
    url: '/app/v1_0/authorizations',
    data
  })
}

// 发送验证码接口
export const sendSms = moblie => {
  return request({
    method: 'GET',
    url: '/app/v1_0/sms/codes/' + moblie
  })
}

// 获取用户自己的信息
export const getUserInfo = () => {
  return request({
    method: 'GET',
    url: 'http://ttapi.research.itcast.cn/app/v1_0/user',
    headers: {
      Authorization: `Bearer ${store.state.token.token}`
    }
  })
}

import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './styles/index.less'
// 载入 vant 核心组件库
import vant from 'vant'

// 移动端 rem 适配
import 'amfe-flexible'

// 加载 vant 全局样式
import 'vant/lib/index.css'

// 注册使用 vant 组件库
Vue.use(vant)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

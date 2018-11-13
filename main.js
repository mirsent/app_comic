import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false

Vue.prototype.$requestUrl = 'https://wx.ineinv.com/index.php/Home/Comic/'
Vue.prototype.$imgUrl = 'https://wx.ineinv.com/'

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()

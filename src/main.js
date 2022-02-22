import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import 'amfe-flexible/index.js' //适配移动端

import { Image, Toast, Swipe, SwipeItem, Empty , List, Icon } from 'vant';
// 修改页面Title
import VueWechatTitle from 'vue-wechat-title'

const app = createApp(App)

app.use(VueWechatTitle)
app.use(Image).use(Toast).use(Swipe).use(SwipeItem).use(List).use(Icon).use(Empty);

app.use(router)
app.mount('#app')

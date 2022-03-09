import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 样式初始化
import '@/assets/index'
// 引入自定义插件
import tools from '@/plugin/tools'

const app = createApp(App)

// 安装并使用插件
app.use(tools)

app.use(store).use(router).mount('#app')

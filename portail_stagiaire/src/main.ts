import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import './style.css';
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

console.log(import.meta.env.VITE_SERVER_PORT);

const app = createApp(App)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component as any)
}

app.use(ElementPlus);
app.use(router)
app.mount('#app')

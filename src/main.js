import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import * as HeroIcons from '@heroicons/vue/24/solid'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import './assets/main.css'
import 'maplibre-gl/dist/maplibre-gl.css'

const app = createApp(App)

for (const [key, component] of Object.entries(HeroIcons)) {
    app.component(key, component)
}

app.use(createPinia())
app.use(ElementPlus)
app.use(router)

app.mount('#app')

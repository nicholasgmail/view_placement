import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import * as HeroIcons from '@heroicons/vue/24/solid'
import 'element-plus/dist/index.css'
import './assets/main.css'
import 'maplibre-gl/dist/maplibre-gl.css'

const app = createApp(App)

for (const [key, component] of Object.entries(HeroIcons)) {
    app.component(key, component)
}

app.use(createPinia())
app.use(router)

app.mount('#app')

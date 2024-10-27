import './assets/main.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import { piniaPersistPlugin } from './plugins/piniaPersistence'

const app = createApp(App)
const pinia = createPinia()
pinia.use(piniaPersistPlugin)

app.use(pinia)
app.use(router)

app.mount('#app')

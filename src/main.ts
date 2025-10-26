import { createApp } from 'vue'
import { createPinia } from 'pinia'
import './style.css'
import App from './App.vue'
import router from './router'

const app = createApp(App)
const pinia = createPinia()

// Install Pinia first
app.use(pinia)

// Then install router
app.use(router)

// Finally mount the app
app.mount('#app')

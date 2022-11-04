import { createApp } from 'vue'
import { createPinia } from 'pinia'
import './style.css'
import 'flowbite'
import router from './router'
import DashboardLayout from './layout/DashboardLayout.vue'
import LoginLayout from './layout/LoginLayout.vue'
import App from './App.vue'
import VueTheMask from 'vue-the-mask'

const pinia = createPinia()
const app = createApp(App)

app.use(pinia)
app.use(router)
app.use(VueTheMask)
app.component('dashboard-layout', DashboardLayout)
app.component('login-layout', LoginLayout)
app.mount('#app')

import { createApp } from 'vue'
import './style.css'
import 'bootstrap'
import router from './router'
import 'bootstrap/dist/css/bootstrap.min.css'
import App from './App.vue'

const app = createApp(App)
app.use(router)
app.mount('#app')

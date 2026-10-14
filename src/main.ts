import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createVfm } from 'vue-final-modal'
import 'virtual:svg-icons-register'
import '@/assets/scss/common.scss'

const app = createApp(App)
const vfm = createVfm()

app.use(router).use(vfm).mount('#app')

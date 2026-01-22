import { createApp } from 'vue'
import { createHead } from '@unhead/vue/client'
import router from './router'
import App from './App.vue'

// Import global styles
import './assets/styles.css'

const app = createApp(App)
const head = createHead()

app.use(head)
app.use(router)

app.mount('#app')

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { registerComponents } from './components'
import { wavesDirective } from './directive'
import './icons'
// import './assets/css/global.scss'

const app = createApp(App);
registerComponents(app)
wavesDirective(app)
app.use(store).use(router).mount('#app')

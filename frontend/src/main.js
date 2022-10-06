import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// axios 추가
import axios from 'axios'
import { Quasar } from 'quasar'
import quasarUserOptions from './quasar-user-options'
// axios를 root 전역으로 사용하기 위하여 추가로 component 안에서 axios를 this.$axios로 사용할 수 있습니다.
const app = createApp(App).use(Quasar, quasarUserOptions)
app.config.globalProperties.$http = axios
createApp(App).use(store).use(router).mount('#app')

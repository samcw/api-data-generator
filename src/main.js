import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import { ipcRenderer } from 'electron'

Vue.config.productionTip = false;
Vue.prototype.$ipcRenderer = ipcRenderer;

new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')

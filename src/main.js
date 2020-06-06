import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import { remote } from 'electron'

Vue.config.productionTip = false;
Vue.prototype.remote = remote;

new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')

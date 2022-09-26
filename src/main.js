// import vue dependecies
import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store/index';


// import vuetify plugin
import vuetify from './plugins/vuetify';


// import styles dependencies
import './scss/fonts.scss';
import './scss/index.scss';



// import mdi icons
import "@mdi/font/css/materialdesignicons.min.css";


Vue.config.productionTip = false

new Vue({
  router,
  vuetify,
  store,
  render: h => h(App)
}).$mount('#app')

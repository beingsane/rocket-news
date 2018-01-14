// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import 'babel-polyfill';
import { MdApp, MdDrawer, MdIcon, MdList, MdCard, MdRipple, MdDivider, MdToolbar, MdButton, MdContent, MdTabs } from 'vue-material/dist/components';
import 'vue-material/dist/vue-material.min.css';
import App from './App';
import router from './router';

Vue.use(MdApp);
Vue.use(MdRipple);
Vue.use(MdButton);
Vue.use(MdCard);
Vue.use(MdToolbar);
Vue.use(MdList);
Vue.use(MdDivider);
Vue.use(MdIcon);
Vue.use(MdDrawer);
Vue.use(MdContent);
Vue.use(MdTabs);


Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App },
});

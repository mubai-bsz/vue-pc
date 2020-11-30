import Vue from "vue";
import App from "./App.vue";

import router from "./router";
import store from "./store";
// 引入公共资源
import "./style/reset.css";
Vue.config.productionTip = false;

new Vue({
	render: (h) => h(App),
	router,
	store,
}).$mount("#app");

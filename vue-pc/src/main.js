import Vue from "vue";
import App from "./App.vue";

import router from "./router";
import store from "./store";
// 引入公共资源
import "./style/reset.css";
// 引入mock，加载mockServer
import "./mock/mockServer";
Vue.config.productionTip = false;

new Vue({
	beforeCreate() {
		Vue.prototype.$bus = this;
	},
	render: (h) => h(App),
	router,
	store,
}).$mount("#app");

import Vue from "vue";
import App from "./App.vue";

import router from "./router";
import store from "./store";
// 引入mock，加载mockServer
import "./mock/mockServer";

// 引入公共资源
import "./style/reset.css";
import "./style/iconfont.css";
import "./plugins/element.js";
import "swiper/swiper-bundle.min.css";
Vue.config.productionTip = false;

new Vue({
	beforeCreate() {
		Vue.prototype.$bus = this;
	},
	render: (h) => h(App),
	router,
	store,
}).$mount("#app");

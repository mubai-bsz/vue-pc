import Vue from "vue";
import VueRouter from "vue-router";

import Home from "../views/Home";
import Login from "../views/Login";
import Register from "../views/Register";
import Search from "../views/Search";

// 应用插件
Vue.use(VueRouter);

export default new VueRouter({
	routes: [
		{
			path: "/",
			component: Home,
		},
		{
			path: "/login",
			component: Login,
			meta: {
				isFooterShow: true,
			},
		},
		{
			path: "/register",
      component: Register,
      meta: {
				isFooterShow: true,
			},
		},
		{
			name: "search",
			path: "/search/:searchText?",
			component: Search,
		},
	],
});

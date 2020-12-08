import Vue from "vue";
import VueRouter from "vue-router";
import "../store";

import Home from "../views/Home";
import Login from "../views/Login";
import Register from "../views/Register";
import Search from "../views/Search";
import Detail from "@views/Detail";
import AddCartSuccess from "@views/AddCartSuccess";
import ShopCart from "@views/ShopCart";
import Center from "@views/Center";
import Pay from "@views/Pay";
import PaySuccess from "@views/PaySuccess";
import Trade from "@views/Trade";
import store from "../store";

// 多次点击搜索按钮时会出现错误，根本原因是使用编程式导航触发了router中的promise方法，第一次点击触发返回then方法，第二次会触发catch方法
// 解决方法：重新书写VueRouter实例上面的router中的push和replace方法
// 把push拿出来避免下面的函数陷入死循环
const push = VueRouter.prototype.push;
const replace = VueRouter.prototype.replace;

// 内部函数不用call改变this指向的话，this指向push方法，而不是指向VueRouter的实例，会出现问题的
// 重新构建push
VueRouter.prototype.push = function(location, onComplete, onAbort) {
	// 如果用户想要处理失败的话
	if (onComplete && onAbort) {
		return push.call(this, location, onComplete, onAbort);
	}
	// 不处理失败，直接给默认值，失败函数为空
	return push.call(this, location, onComplete, () => {});
};
// 重新构建replace
VueRouter.prototype.replace = function(location, onComplete, onAbort) {
	// 如果用户想要处理失败的话
	if (onComplete && onAbort) {
		return replace.call(this, location, onComplete, onAbort);
	}
	// 不处理失败，直接给默认值，失败函数为空
	return replace.call(this, location, onComplete, () => {});
};

// 应用插件
Vue.use(VueRouter);

const router = new VueRouter({
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
		{
			name: "detail",
			path: "/detail/:id",
			component: Detail,
		},

		{
			name: "addcartsuccess",
			path: "/addcartsuccess",
			component: AddCartSuccess,
		},
		{
			name: "shopcart",
			path: "/shopcart",
			component: ShopCart,
		},
		{
			name: "trade",
			path: "/trade",
			component: Trade,
		},
		{
			name: "pay",
			path: "/pay",
			component: Pay,
		},
		{
			name: "paysuccess",
			path: "/paysuccess",
			component: PaySuccess,
		},
		{
			name: "center",
			path: "/center",
			component: Center,
		},
	],
	// 每次切换路由页面滚动条的位置
	scrollBehavior() {
		return { x: 0, y: 0 };
	},
});

// 使用一个数组来定义路径
const promiseRoute = ["/trade", "/pay", "/center"];
router.beforeEach((to, from, next) => {
	// 判断是否登录及去哪个页面,如果不登录，不允许去支付、订单等页面
	// 是否登录可以依据token来判断，
	// 先判断用户去哪个页面，如果是去需要权限的页面，那么就判断是否登录了，登录了就直接跳转到相关页面，如果没有登录就跳到登录页面
	// 如果用户去的不是需要权限的页面，那么直接去即可
	// if (promiseRoute.indexOf(to.path) > -1) {
	// 	if (store.state.users.token) {
	// 		next();
	// 	} else {
	// 		next("/login");
	// 	}
	// } else {
	// 	next();
	// }

	// 上面代码优化
	if (promiseRoute.indexOf(to.path) > -1 && !store.state.users.token) {
		return next("/login");
	}
	next();
});

export default router;

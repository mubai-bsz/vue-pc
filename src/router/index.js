import Vue from "vue";
import VueRouter from "vue-router";

import Home from "../views/Home";
import Login from "../views/Login";
import Register from "../views/Register";
import Search from "../views/Search";

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

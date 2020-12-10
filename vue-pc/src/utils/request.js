/* 
  封装axios拦截器
*/
import axios from "axios";
import getUserTempId from "@utils/getUserTempId";
// 这里的store既是vuex中的store，又是this.$store
import store from "../store";
// 引入进度条插件与进度条样式
import NProgress from "nprogress";
import "nprogress/nprogress";

// 使用UUID生成id
const userTempId = getUserTempId();
// console.log(process.env.NODE_ENV)  development   production
const prefix_url =
	process.env.NODE_ENV === "development" ? "/" : "http://182.92.128.115/";
const instence = axios.create({
	// 公共的基础路径
	// baseURL: "/api",
	baseURL: `${prefix_url}api`,
	// /
});

// 设置请求拦截器
instence.interceptors.request.use(
	// 成功的回调
	(config) => {
		// config 配置对象，将来发送请求（请求地址、请求方式、请求参数等）都会在这里书写

		// 使用进度条插件,在请求开始前发送
		NProgress.start();

		// 修改config，添加公共的请求参数token,同时发送到后台，后台就会自动把userTempId转换成token，当用户请求时，在发送回去，是为了使用户在未登录时保存的数据可以同步到登录后用户id中，不至于丢失临时数据，这就是token的意义
		const token = store.state.users.token;
		if (token) {
			config.headers.token = token;
		}

		// 在请求头上添加一个id
		config.headers.userTempId = userTempId;
		return config;
	}
	// 失败的回调
	// 一般不会被触发，第一次promise.resolve（）会返回默认成功的promise对象
	// () => {}
);

// 设置响应拦截器
instence.interceptors.response.use(
	// 成功的回调
	(response) => {
		/* 
      响应成功并不代表功能成功，只是表示有响应结果
      功能是否成功还需要看接口文档中的code
        成功：200
        失败：201

      返回的是一个具体的结果
        成功：成功的数据
        失败：失败的原因
        
    */
		// 进度条结束
		NProgress.done();

		//  判断响应的code是否是200
		if (response.data.code === 200) {
			// 返回成功的数据
			return response.data.data;
		}
		// 功能失败，返回失败的promise
		return Promise.reject(response.data.message);
	},
	// 响应失败的回调
	(error) => {
		// 进度条结束
		NProgress.done();
		const message = error.message || "网络错误";
		return Promise.reject(message);
	}
);

export default instence;

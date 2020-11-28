/* 
  封装axios拦截器
*/
import axios from "axios";

const instence = axios.create({
	// 公共的基础路径
	baseURL: "/api",
	headers: {
		// 书写公共参数
	},
});

// 设置请求拦截器
instence.interceptors.request.use(
	// 成功的回调
	(config) => {
		// config 配置对象，将来发送请求（请求地址、请求方式、请求参数等）都会在这里书写
		return config;
	},
	// 失败的回调
	// 一般不会被触发，第一次promise.resolve（）会返回默认成功的promise对象
	() => {}
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
		const message = error.message || "网络错误";
		return Promise.reject(message);
	}
);

export default instence;

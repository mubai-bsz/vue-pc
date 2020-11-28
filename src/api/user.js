// 书写接口
import request from "@utils/request";

// 封装一个发送请求的功能函数
// 把所需要的参数写写下来，
export const reqLogin = (phone, password) => {
	// 把request的结果返回出去，外面会接收到这个
	// 并且会依据promise的返回值去判断成功还是失败
	return request({
		method: "POST",
		url: "/src/views/Login",
		data: {
      // 简写形式
			phone,
			password,
		},
	});
};

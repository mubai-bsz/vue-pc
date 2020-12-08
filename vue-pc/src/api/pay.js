import request from "@utils/request";

// 获取订单交易页信息
export const reqGetTrade = () => {
	return request({
		method: "GET",
		url: "/order/auth/trade",
	});
};

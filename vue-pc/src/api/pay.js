import request from "@utils/request";

// 获取订单交易页信息
export const reqGetTrade = () => {
	return request({
		method: "GET",
		url: "/order/auth/trade",
	});
};
// 提交订单
export const reqSubmitOrder = ({
	tradeNo,
	consignee,
	consigneeTel,
	deliveryAddress,
	paymentWay,
	orderComment,
	orderDetailList,
}) => {
	return request({
		method: "POST",
		url: "/order/auth/submitOrder",
		params: {
			tradeNo,
		},
		data: {
			// body参数
			consignee,
			consigneeTel,
			deliveryAddress,
			paymentWay,
			orderComment,
			orderDetailList,
		},
	});
};
// 二维码支付
export const reqGetQRCode = (orderId) => {
	return request({
		method: "GET",
		url: `/payment/weixin/createNative/${orderId}`,
	});
};

// 查看我的订单
export const reqGetMyOrder = (page, limit) => {
	return request({
		method: "GET",
		url: `/order/auth/${page}/${limit}`,
	});
};

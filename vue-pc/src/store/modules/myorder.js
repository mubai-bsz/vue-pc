import { reqGetMyOrder } from "@api/pay";

export default {
	state: {
		// 初始化数据
		myOrder: [],
	},
	getters: {
    // 默认计算订单列表
    
	},
	actions: {
		async getMyOrder({ commit }, { page, limit }) {
			const myOrder = await reqGetMyOrder(page, limit);
			commit("GET_MY_ORDER", myOrder);
		},
	},
	mutations: {
		GET_MY_ORDER(state, myOrder) {
			state.myOrder = myOrder;
		},
	},
};

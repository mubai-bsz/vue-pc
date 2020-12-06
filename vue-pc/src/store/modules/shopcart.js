import {
	reqGetCartList,
	reqUpdateCartCheck,
	reqUpdateCartCount,
	// reqDelCart,
} from "@api/shopcart";

export default {
	state: {
		// 获取购物车所有数据，名字自己定义，数组是api文档中书写的
		cartList: [],
	},
	getters: {},
	actions: {
		async getCartList({ commit }) {
			const cartList = await reqGetCartList();
			commit("GET_CART_LIST", cartList);
		},
		// 发送请求更新服务器数据，发送请求即可，没有返回结果
		async updateCartCount({ commit }, { skuId, skuNum }) {
			await reqUpdateCartCount(skuId, skuNum);
			console.log(commit);
		},

		async updateCartCheck({ commit }, { skuId, isChecked }) {
			// 发送请求，用来更新服务器数据
			const updateCartCheck = await reqUpdateCartCheck(skuId, isChecked);
			commit("UPDATE_CART_CHECK", updateCartCheck);

			// 更新数据的方法：
			// 1、手动更新veux的数据，页面重新渲染，发的请求少一点
			// 2、重新请求购物车的数据，发的请求多一些
		},
	},
	mutations: {
		GET_CART_LIST(state, cartList) {
			state.cartList = cartList;
		},
	},
};

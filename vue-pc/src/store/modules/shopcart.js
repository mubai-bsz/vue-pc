import {
	reqGetCartList,
	reqUpdateCartCheck,
	reqUpdateCartCount,
	reqDelCart,
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
			commit("UPDATE_CART_COUNT", { skuId, skuNum });
		},

		async updateCartCheck({ commit }, { skuId, isChecked }) {
			// 发送请求，用来更新服务器数据
			await reqUpdateCartCheck(skuId, isChecked);
			console.log(commit);

			// 更新数据的方法：
			// 1、手动更新veux的数据，页面重新渲染，发的请求少一点
			// 2、重新请求购物车的数据，发的请求多一些
		},

		async delCart({ commit }, skuId) {
			await reqDelCart(skuId);
			commit("DEL_CART", skuId);
		},
	},
	mutations: {
		GET_CART_LIST(state, cartList) {
			state.cartList = cartList;
		},
		// 自动更新
		UPDATE_CART_COUNT(state, { skuId, skuNum }) {
			state.cartList = state.cartList.map((cart) => {
				if (cart.skuId === skuId) {
					cart.skuNum += skuNum;
				}
				return cart;
			});
		},
		DEL_CART(state, skuId) {
      state.cartList = state.cartList.filter((cart) => cart.skuId !== skuId)
		},
	},
};

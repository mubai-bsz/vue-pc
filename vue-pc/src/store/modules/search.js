import { reqGetProductList } from "@api/search";
export default {
	state: {
		// 初始化数据
		productList: {},
	},
	getters: {
		// 获取只读的属性
		// 方便使用数据
		// 商品列表
		trademarkList(state) {
			return state.productList.trademarkList;
		},
		// 品牌属性数据
		attrsList(state) {
			return state.productList.attrsList;
		},
		// 商品数据
		goodsList(state) {
			return state.productList.goodsList;
		},
	},
	actions: {
		// 请求数据
		async getProductList({ commit }, data = {}) {
			const productList = await reqGetProductList(data);
			console.log(productList);
			commit("GET_PRODUCT_LIST", productList);
		},
	},
	mutations: {
		GET_PRODUCT_LIST(state, productList) {
			state.productList = productList;
		},
	},
};

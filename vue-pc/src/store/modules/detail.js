import { reqGetProductDetail } from "@api/detail";
export default {
	state: {
		// 把productDetail，定义成一个对象，里面是其数据内容
		productDetail: {
			categoryView: {},
			skuInfo: {},
			spuSaleAttrList: [],
		},
	},
	getters: {
		categoryView(state) {
			return state.productDetail.categoryView;
		},
		skuInfo(state) {
			return state.productDetail.skuInfo;
		},
		spuSaleAttrList(state) {
			return state.productDetail.spuSaleAttrList;
		},
	},
	actions: {
		async getProductDetail({ commit }, id) {
			const productDetail = await reqGetProductDetail(id);
			commit("GET_PRODUCT_DETAIL", productDetail);
		},
	},
	mutations: {
		GET_PRODUCT_DETAIL(state, productDetail) {
			state.productDetail = productDetail;
		},
	},
};

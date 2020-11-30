import { reqGetBaseCategoryList, reqGetBanners, reqGetFloors } from "@api/home";
export default {
	state: {
		// 初始化响应式数据
		categoryList: [],
		banners: [],  //首页轮播图
		floors: [],
	},
	getters: {},
	actions: {
		// 请求数据，因为拿到的是promise对象，所以使用await方法获取值
		async getCategoryList({ commit }) {
			// 获取值的方法
			const categoryList = await reqGetBaseCategoryList();
			// 使用commit触发mutations函数
			commit("GET_CATEGORY_LIST", categoryList);
		},
		// banner
		async getBanners({ commit }) {
			const banners = await reqGetBanners();
			commit("GET_BANNERS", banners);
		},
		// floors
		async getFloors({ commit }) {
			const floors = await reqGetFloors();
			commit("REQ_GET_FLOORS", floors);
		},
	},
	mutations: {
		// 直接操作数据，传值，1、所有状态值，2、自己所要操作的值
		GET_CATEGORY_LIST(state, categoryList) {
			state.categoryList = categoryList;
		},
		GET_BANNERS(state, banners) {
			state.banners = banners;
		},
		REQ_GET_FLOORS(state, floors) {
			state.floors = floors;
		},
	},
};

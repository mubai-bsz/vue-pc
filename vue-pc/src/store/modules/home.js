import { reqGetBaseCategoryList } from "@api/home";
export default {
	state: {
		// 初始化响应式数据
		categoryList: [],
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
	},
	mutations: {
		// 直接操作数据，传值，1、所有状态值，2、自己所要操作的值
		GET_CATEGORY_LIST(state, categoryList) {
			state.categoryList = categoryList;
		},
	},
};

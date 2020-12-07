import { reqRegister, reqLogin } from "@api/user";
export default {
	state: {
		// 在登录时需要name与token这两个值，保存在本地是为了做记用户名与密码和token，方便自动登录
		name: localStorage.getItem("name") || "",
		token: localStorage.getItem("token") || "",
	},
	getters: {},
	actions: {
		// 注册
		async register({ commit }, { phone, password, code }) {
			await reqRegister({ phone, password, code });
			console.log(commit);
		},
		// 登录
		async login({ commit }, { phone, password }) {
			const user = await reqLogin( phone, password );
			commit("REQ_LOGIN", user);
		},
	},
	mutations: {
		REQ_LOGIN(state, user) {
			state.name = user.name;
			state.token = user.token;
		},
	},
};

import Vue from "vue";
import Vuex from "vuex";

import modules from "./modules";

Vue.use(Vuex);

// 存储数据的容器
const state = {};
// 存储只读的计算属性
const getters = {};
// 间接操作数据的n个函数对象
const actions = {};
// 存储直接操作数据的n个函数对象
const mutations = {};

export default new Vuex.Store({
	state,
	getters,
	actions,
	mutations,
	modules,
});

import Mock from "mockjs";
import banners from "./rbanners.json";
import floors from "./rfloors.json";

// 相当于服务器
// 一旦运行就会拦截匹配的地址的get请求，请求地址为/mock/banners
// 最后的结果作为参数响应回去
Mock.mock("/mock/banners", "get", {
	code: 200,
	"data|4": banners,
});

Mock.mock("/mock/floors", "get", {
	code: 200,
	"data|3-5": floors,
});

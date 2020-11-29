// 配置路径别名
const path = require("path");

module.exports = {
	// 表示当前路径会和webpack路径合并
	configureWebpack: {
		resolve: {
			alias: {
				// 配置了路径别名之后可以简写路径
        "@views": path.resolve(__dirname, "src/views"),
        "@assets": path.resolve(__dirname, "src/assets"),
        "@comps": path.resolve(__dirname, "src/components"),
        "@store": path.resolve(__dirname, "src/store"),
        "@utils": path.resolve(__dirname, "src/utils"),
        "@api": path.resolve(__dirname, "src/api"),
			},
		},
	},

	// 配置代理，解决跨域问题
	devServer: {
		proxy: {
			"/api": {
				target: "http://182.92.128.115",
				changeOrigin: true, //允许跨域
			},
		},
	},
};

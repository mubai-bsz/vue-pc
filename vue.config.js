// 配置路径别名
const path = require("path");

module.exports = {
	// 表示当前路径会和webpack路径合并
	configureWebpack: {
		resolve: {
			alias: {
				// 配置了路径别名之后可以简写路径
				"@views": path.resolve(__dirname, "src/views"),
				"@assets": path.resolve(__dirname, "./src/assets"),
				"@components": path.resolve(__dirname, "./src/components"),
				"@router": path.resolve(__dirname, "./src/router"),
				"@api": path.resolve(__dirname, "./src/api"),
				"@utils": path.resolve(__dirname, "./src/utils"),
			},
		},
	},
};

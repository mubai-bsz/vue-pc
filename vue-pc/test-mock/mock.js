// 使用 Mock
var Mock = require("mockjs");
Mock.Random.ctitle();
Mock.Random.cname();
Mock.Random.image();

var data = Mock.mock({
	// 属性 list 的值是一个数组，其中含有 1 到 10 个元素
	// "list|1-10": [
	// 	{
	// 		// 属性 id 是一个自增数，起始值为 1，每次增 1
	// 		"id|+1": 1,
	//   },
	//   Random.image('200x100', '#894FC4', '#FFF', 'png', '!')
	// ],
	// 随机的中文标题：5个字，使用之前应先引入
	title: "@ctitle(5)",
	// 随机的中文名字，不需要参数
	name: "@cname",
	"caroucelList|4": ["@image('200x100','@color','png','@cname')"],
});

// 输出结果
console.log(JSON.stringify(data));

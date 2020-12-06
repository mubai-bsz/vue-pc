import { v4 as uuidv4 } from "uuid";
/*
  整体流程：
		- 先读取本地localStorage数据，看是否有userTempId
		- 如果有，直接使用
		- 如果没有，需要创建userTempId，同时保存在localStorage中
*/
// 定义一个读取id的方法
function getUserTempId() {
	let userTempId = localStorage.getItem("userTempId");
	if (userTempId) {
		return userTempId;
	}
	// 有，使用直接调用UUID的方法，生成id名
  userTempId = uuidv4();
	//返回之前先保存一份
	localStorage.setItem("userTempId", userTempId);
	return userTempId;
}

export default getUserTempId;


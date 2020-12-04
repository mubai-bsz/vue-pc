import request from "@utils/request";
export const reqGetProductDetail = (data) => {
	return request({
		method: "GET",
		url: "/item",
	});
};

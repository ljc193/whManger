import {baseUrl } from "@/utils/baseUrl";

export function imgUrlchange(imgUrldata) {
	if(imgUrldata) {
		console.log(imgUrldata)
		try{
			imgUrldata = imgUrldata.split(",")
		}catch(e){
			//TODO handle the exception
		}
			
		let urlDatas = [];
		for(var i = 0; i < imgUrldata.length; i++) {
		console.log(imgUrldata[i])
			urlDatas.push({
				url: baseUrl + imgUrldata[i]
			})
		}
		return urlDatas;
	}
	return [];
}
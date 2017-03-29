//找到url中匹配的字符串
function findInUrl(str){
	url = location.href;
	return url.indexOf(str) == -1 ? false : true;
}
//获取url参数
function queryString(key){
    return (document.location.search.match(new RegExp("(?:^\\?|&)"+key+"=(.*?)(?=&|$)"))||['',null])[1];
}

//产生指定范围的随机数
function randomNumb(minNumb,maxNumb){
	var rn=Math.round(Math.random()*(maxNumb-minNumb)+minNumb);
	return rn;
	}
	
var tmallLink="https://carters.m.tmall.com/";
$(function(){
	var ua=navigator.userAgent.toLowerCase();
	if(ua.match(/micromessenger/i) == 'micromessenger'){
		var tmallApi=api.tbToken();
			if(tmallApi.flag==1){
				$('.tmallTxt').text(tmallApi.content.tb_token);
				}
		}
		else{
			window.location.href=tmallLink;
			}
	})
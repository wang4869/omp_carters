var appId,timestamp,nonceStr,signature;
var domain="http://h5.cartersonline.cn/";
//var domain="http://carters.ompchina.net/";

$(function(){
	var url=window.location.href;
	var shareApi=api.share(url);
	
	if(shareApi.flag==1){
		appId=shareApi.appId;
		timestamp=shareApi.timestamp;
		nonceStr=shareApi.nonceStr;
		signature=shareApi.signature;
		
		wx.config({
			  debug: false,
			  appId: appId,
			  timestamp: timestamp,
			  nonceStr: nonceStr,
			  signature: signature,
			  jsApiList: [
				'onMenuShareTimeline',
				'onMenuShareAppMessage',
				'hideMenuItems',
				'showMenuItems',
				'hideAllNonBaseMenuItem',
				'showAllNonBaseMenuItem'
			  ]
		  });
		  
		  wx.ready(function () {
			  var title="Carter's 小百科 常见问题为你来解惑";
			  var desc="从这里开始了解Carter's";
			  var link=domain+"qa";
			  var imgUrl=domain+"qa/images/share.jpg";
			  shareTxt(title,desc,link,imgUrl);
			  })
		
		}
		else{
			console.log('share api request fail:'+shareApi.errMsg);
			}
	})
	
function shareTxt(title,desc,link,imgUrl){
	wx.onMenuShareAppMessage({
      title: title,
      desc: desc,
      link: link,
      imgUrl: imgUrl,
      trigger: function (res) {
      },
      success: function (res) {
      },
      cancel: function (res) {
      },
      fail: function (res) {
      }
    });
	
	wx.onMenuShareTimeline({
      title: title,
      link: link,
      imgUrl: imgUrl,
      trigger: function (res) {
      },
      success: function (res) {
      },
      cancel: function (res) {
      },
      fail: function (res) {
      }
    });
	}
var appId,timestamp,nonceStr,signature;
//var domain="http://www.cartersonline.cn/";
var domain="http://carters.ompchina.net/";

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
			  var title="海量上新商品，尽在天猫旗舰店！";
			  var desc="打开链接，访问Carter's天猫旗舰店。";
			  var link=domain+"tmall";
			  var imgUrl=domain+"tmall/images/share.jpg";
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
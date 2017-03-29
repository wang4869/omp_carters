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
			  var title="Carter's 粉丝专享福利，萌宝贴心好礼享不停";
			  var desc="Carter's关注有礼，无门槛，粉丝福利免费送。";
			  var link=domain+"game";
			  var imgUrl=domain+"game/public/images/share.jpg";
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
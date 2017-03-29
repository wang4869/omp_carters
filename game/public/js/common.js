//找到url中匹配的字符串

function findInUrl(str) {

    url = location.href;

    return url.indexOf(str) == -1 ? false : true;

}

//获取url参数

function queryString(key) {

    return (document.location.search.match(new RegExp("(?:^\\?|&)" + key + "=(.*?)(?=&|$)")) || ['', null])[1];

}



//产生指定范围的随机数

function randomNumb(minNumb, maxNumb) {

    var rn = Math.round(Math.random() * (maxNumb - minNumb) + minNumb);

    return rn;

}



$(function(){

	pageInit();

	})



function pageInit(){//页面初始化请求
	for(var i=0;i<=3;i++){
		$('.prizeImgBlock img').eq(i).attr('src',$('.indexProductInit').eq(i).find('img').attr('src'));
		}
if(Isgame==0){//0没有 1可以抽奖
	//维护中
	$('.pageError').show();
	return false;
	}
	else if(IsSaveInfo==1&&Isgame==1){
		if(parseInt(LotteryCount)==0){
			$('.prizeNumb').text(3);//绑定次数
			//$('.pageLottery').show();
			$('.pageIndex').show();
			}
			else{
				//$('.pageCantLottery').show();
				$('.pageIndex').show();
				}
		}
		else{
			//可以抽奖
			$('.pageIndex').show();
			}
	}



function goStep2(){
	if(IsSaveInfo==1&&Isgame==1){
		if(parseInt(LotteryCount)==0){
			//已绑定
			 $('.pageIndex').hide();
			 $('.pageLottery').show();
			 return false;
			}
			else{
				//已绑定没抽奖机会
				 $('.pageIndex').hide();
				 $('.pageCantLottery').show();
				 return false;
				}
		}
		else if(Isgame==1){
			//未绑定
			$('.pageIndex').hide();
			$('.pageInfo').show();
			return false;
			}
			else{
				$('.pageIndex').hide();
				$('.pageError').show();
				}
}



function showRule(){

    $('.pageRule').show();

}

function closeRule(){

    $('.pageRule').hide();

}



function changeSelSex(e) {

    var selIndex = $('.selSex').index($(e));

    $('.selSex').removeClass('selSexOn').eq(selIndex).addClass('selSexOn');

}



var canGetSms = true;

var smsColdTime = 60;

function getSms() {

    var iTel = $.trim($('.infoTxt3').val());

    var pattern = /^1[3456789]\d{9}$/;



    if (iTel == '' || !pattern.test(iTel)) {

        alert('请输入正确的手机号码');

        return false;

    }

    else if (!canGetSms) {

        alert('请稍后再获取');

        return false;

    }

    else {

        //请求短信接口 成功
		var sms=api.sendMsg(iTel);
		if(sms.flag==1){
			canGetSms = false;

			$('.infoTxt3').attr('disabled', 'disabled');
	
			$('.smsBtn').addClass('smsBtnIng').text('（' + smsColdTime + '）');
	
			smsRunTime = setInterval(function () {
	
				smsTime()
	
			}, 1000);
			alert(sms.errMsg);
			}
			else{
				alert(sms.errMsg);
				}
    }
}

var smsRunTime;

function smsTime() {

    smsColdTime--;

    if (smsColdTime < 0) {

        clearInterval(smsRunTime);

        canGetSms = true;

        $('.smsBtn').removeClass('smsBtnIng').html('获取<br>验证码');

        smsColdTime = 60;

        $('.infoTxt3').removeAttr('disabled');

        return;

    }

    $('.smsBtn').text('（' + smsColdTime + '）');

}



var canSubmitInfo=true;

function submitInfo() {

    var iSex = $('.selSex').index($('.selSexOn'));//0女 1男

    var iName = $.trim($('.infoTxt1').val());

    var iAge = $.trim($('.infoTxt2').val());

    var iTel = $.trim($('.infoTxt3').val());

    var iSms = $.trim($('.infoTxt4').val());

    var iEmail = $.trim($('.infoTxt5').val());

    var iAddress = $.trim($('.infoTxt6').val());

    var pattern = /^1[3456789]\d{9}$/;

	var patternEmail = /^(\w)+(\.\w+)*@(\w)+((\.\w+)+)$/;



    if (iSex < 0) {

        alert('请选择称谓');

        return false;

    }

    else if (iName=='') {

        alert('请输入真实姓名');

        return false;

    }

    else if (iAge=='') {

        alert('请输入宝贝年龄');

        return false;

    }

    else if (iTel == '' || !pattern.test(iTel)) {

        alert('请输入正确的手机号码');

        return false;

    }

	else if (iEmail != ''&& !patternEmail.test(iEmail)) {

        alert('请输入正确的电子邮箱');

        return false;

    }

	else if (iAddress == '') {

        alert('请输入联系地址');

        return false;

    }

    else if(canSubmitInfo){

        //提交信息
		canSubmitInfo=false;//加锁，请求失败要解锁
		if(iSex==0){//男1 女0 转 男1 女2
			iSex=2;
			}
			else{
				iSex=1;
				}
		var submitInfo=api.postUserInfo(iName,iSex,iAge,iTel,iSms,iEmail,iAddress);

		if(submitInfo.flag==1){
			//请求成功
			$('.pageInfo').hide();
			$('.pageInfoSucceed').show();
			}
			else if(submitInfo.flag==2){
				$('.pageInfo').hide();
				$('.prizeNumb').text(3);//绑定次数
				$('.pageLottery').show();
				}
				else{
					alert(submitInfo.errMsg);
					canSubmitInfo=true;
					}

    }

}



function goLottery(){

    //有抽奖机会

    $('.prizeNumb').text('3');//绑定次数

    $('.pageInfoSucceed').hide();

    $('.pageLottery').show();



    //没有抽奖机会

    // $('.pageCantLottery').show();

}



var canLottery=true;

function lottery(){

    var prizeNumb=parseInt($('.prizeNumb').text());

    if(prizeNumb==0){

        canLottery=false;

        $('.pageLottery').hide();

        $('.pageCantLottery').show();

    }

    else if(canLottery){
		//抽奖请求
		canLottery=false;//请求失败需要解锁
		var lotteryGame=api.game();
		lotteryTime=setInterval(function(){lotteryIng();},300);//请求失败clearinterval掉lotteryTime
		//请求成功
		if(lotteryGame.flag==2){
			//中奖

			setTimeout(function(){
				var prizeName=lotteryGame.product.name;
				$('.awardName span').text(prizeName);
				$('.prizeNumb').text(prizeNumb-1);
				$('.prizeImgBlock img').attr('src',lotteryGame.product.pic);
	
				clearInterval(lotteryTime);
	
				lotteyStep=0;
	
				$('.pageAward').show();
	
				},2000);
		}
		else if(lotteryGame.flag==1){
			//没机会

			setTimeout(function(){
	
				$('.prizeNumb').text(0);
	
				clearInterval(lotteryTime);
	
				lotteyStep=0;
	
				$('.pageCantLottery').show();
	
				},2000);
			}
			else{
				//不中奖

				setTimeout(function(){
		
					$('.prizeNumb').text(prizeNumb-1);
		
					clearInterval(lotteryTime);
		
					lotteyStep=0;
		
					$('.pageNoAward').show();
		
					},2000);
				}
    }

}



function backLottery(){

    var prizeNumb=parseInt($('.prizeNumb').text());

	if(prizeNumb==0){

        canLottery=false;
		
		$('.pageAward').hide();

        $('.pageNoAward').hide();

        $('.pageCantLottery').show();

    }

    else{
		for(var i=0;i<=3;i++){
			$('.prizeImgBlock img').eq(i).attr('src',$('.indexProductInit').eq(i).find('img').attr('src'));
			}

		canLottery=true;
		
		$('.pageAward').hide();

		$('.pageNoAward').hide();

        $('.pageLottery').show();

    }

}



var lotteryTime;

var lotteyStep=0;

function lotteryIng(){

	lotteyStep++;

	if(lotteyStep>3){

		lotteyStep=0;

		}

	$('.prizeImgBlock img').hide();

	$('.prizeImgBlock img').eq(lotteyStep).show();

	}
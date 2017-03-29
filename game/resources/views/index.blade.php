<!DOCTYPE html>



<html>



<head>



    <meta charset="utf-8">



    <meta name="format-detection" content="telephone=no"/>



    <meta name="apple-mobile-web-app-capable" content="yes"/>



    <title>粉丝福利</title>



    <link rel="stylesheet" href="{{URL::asset('public/css/common.css')}}">



    <script src="{{URL::asset('public/js/jquery-1.9.1.min.js')}}"></script>

    

    <script src="http://h5.cartersonline.cn/js/project.js"></script>
    
    <script src="https://res.wx.qq.com/open/js/jweixin-1.0.0.js"></script>
    <script src="{{URL::asset('public/js/share.js')}}"></script>
    <script src="{{URL::asset('public/js/common.js')}}"></script>

    <!--移动端版本兼容 -->



    <script type="text/javascript">



        var phoneWidth = parseInt(window.screen.width);



        var phoneScale = phoneWidth / 640;



        var ua = navigator.userAgent;



        if (/Android (\d+\.\d+)/.test(ua)) {



            var version = parseFloat(RegExp.$1);



            if (version > 2.3) {



                document.write('<meta name="viewport" content="width=640, user-scalable=no, target-densitydpi=device-dpi">');



            } else {



                document.write('<meta name="viewport" content="width=640, target-densitydpi=device-dpi">');



            }



        } else {



            document.write('<meta name="viewport" content="width=640, user-scalable=no, target-densitydpi=device-dpi">');



        }



    </script>



    <!--移动端版本兼容 end -->







    <!---程序返回IsSaveInfo：0,1是否保存过信息\LotteryCount:0,3本周抽奖次数,Isgame 0,1 是否有抽奖在线-->



    <script type="text/javascript">



        var IsSaveInfo={{$isSaveInfo}};



        var LotteryCount={{$lotteryCount}};



        var Isgame={{$isGame}};



    </script>



    <!--程序返回 end -->



</head>







<body>







<div class="wrapper">



    <div class="page pageIndex" style="display: none;">



        <div class="innerDiv">



            <img src="{{URL::asset('public/images/pageIndex.jpg')}}" class="bgImg">







            <div class="indexProduct">



               @if($game)



                    @foreach($game as $list)



                        <div class="indexProductInit">



                            <img src="{{URL::asset($list['pic'])}}" class="abs productImg">



                            <div class="ipiTip">



                                <span class="ipitName">{{$list['name']}}</span>



                                <span class="ipitPrice">￥<font>{{$list['money']}}</font></span>



                            </div>



                        </div>



                    @endforeach



                @else



                    活动尚未开始敬请期待



                   @endif







            </div>







            <a href="javascript:void(0);" class="abs indexBtn1" onclick="goStep2();"><img src="{{URL::asset('public/images/indexBtn1.png')}}"></a>



            <a href="javascript:void(0);" class="abs indexBtn2" onclick="showRule();"><img src="{{URL::asset('public/images/indexBtn2.png')}}"></a>



        </div>



    </div>







    <div class="page pageRule" style="display: none;">



        <div class="innerDiv">



            <img src="{{URL::asset('public/images/pageRule.jpg')}}" class="bgImg">



            <a href="javascript:void(0);" class="abs closeBtn" onclick="closeRule();"><img src="{{URL::asset('public/images/closeBtn.png')}}"></a>



        </div>



    </div>







    <div class="page pageInfo" style="display: none;">



        <div class="innerDiv">



            <img src="{{URL::asset('public/images/pageInfo.jpg')}}" class="bgImg">



            <div class="selSex selSex1 selSexOn" ontouchend="changeSelSex(this);"></div>



            <div class="selSex selSex2" ontouchend="changeSelSex(this);"></div>



            <input type="text" maxlength="20" class="infoTxt infoTxt1">



            <input type="text" maxlength="2" class="infoTxt infoTxt2">



            <input type="tel" maxlength="11" class="infoTxt infoTxt3">



            <a href="javascript:void(0);" class="abs smsBtn" onclick="getSms();">获取<br>验证码</a>



            <input type="text" maxlength="6" class="infoTxt infoTxt4">



            <input type="text" maxlength="40" class="infoTxt infoTxt5">



            <input type="text" maxlength="40" class="infoTxt infoTxt6">



            <a href="javascript:void(0);" class="abs pageInfoBtn1" onclick="submitInfo();"><img src="{{URL::asset('public/images/pageInfoBtn1.png')}}"></a>



        </div>



    </div>







    <div class="page pageInfoSucceed" style="display: none;">



        <div class="innerDiv">



            <img src="{{URL::asset('public/images/pageInfoSucceed.jpg')}}" class="bgImg">



            <a href="javascript:void(0);" class="abs pageInfoBtn2" onclick="goLottery();"><img src="{{URL::asset('public/images/pageInfoBtn2.png')}}"></a>



        </div>



    </div>







    <div class="page pageLottery" style="display: none;">



        <div class="innerDiv">



            <img src="{{URL::asset('public/images/pageLottery.jpg')}}" class="bgImg">



            <div class="abs prizeImgBlock">



                <img src="">



                <img src="" style="display: none;">



                <img src="" style="display: none;">



                <img src="" style="display: none;">



            </div>



            <div class="abs prizeNumb"></div>



            <a href="javascript:void(0);" class="abs pageLotteryBtn1" onclick="lottery();">



                <img src="{{URL::asset('public/images/pageLotteryBtn1.png')}}"></a>



        </div>



    </div>







    <div class="page pageCantLottery" style="display: none;">



        <div class="innerDiv">



            <img src="{{URL::asset('public/images/pageCantLottery.jpg')}}" class="bgImg">



        </div>



    </div>







    <div class="page pageNoAward" style="display: none;">



        <div class="innerDiv">



            <img src="{{URL::asset('public/images/pageNoAward.jpg')}}" class="bgImg">



            <a href="javascript:void(0);" class="abs pageLotteryBtn2" onclick="backLottery();">



                <img src="{{URL::asset('public/images/pageLotteryBtn2.png')}}"></a>



        </div>



    </div>



    



    <div class="page pageAward" style="display: none;">



        <div class="innerDiv">



            <img src="{{URL::asset('public/images/pageAward.jpg')}}" class="bgImg">



            <div class="awardName">



                <img src="{{URL::asset('public/images/pageAwardImg1.png')}}"><span></span>



                <img src="{{URL::asset('public/images/pageAwardImg2.png')}}"></div>
                
                
            <a href="javascript:void(0);" class="abs pageLotteryBtn3" onclick="backLottery();">



                <img src="{{URL::asset('public/images/pageLotteryBtn2.png')}}"></a>



        </div>



    </div>



    



    <div class="page pageError" style="display: none;">



        <div class="innerDiv">



            <img src="{{URL::asset('public/images/pageError.jpg')}}" class="bgImg">



        </div>



    </div>







    </div>



</div>







</body>



</html>




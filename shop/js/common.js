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
	
var map,lng,lat,myCompOverlay;
function initialize() {
  var point = new BMap.Point(lng,lat);  // 创建点坐标  
  map.centerAndZoom(point, 12);
  map.enableScrollWheelZoom();
  
  var bottom_left_navigation = new BMap.NavigationControl({anchor: BMAP_ANCHOR_BOTTOM_LEFT, type: BMAP_NAVIGATION_CONTROL_ZOOM});
  bottom_left_navigation.setOffset(new BMap.Size(10,80));
  map.addControl(bottom_left_navigation);
  
  var geolocationControl = new BMap.GeolocationControl();
  geolocationControl.addEventListener("locationSuccess", function(e){
    // 定位成功事件
    var address = '';
    address += e.addressComponent.province;
    address += e.addressComponent.city;
    address += e.addressComponent.district;
    address += e.addressComponent.street;
    address += e.addressComponent.streetNumber;
    //alert("当前定位地址为：" + address);
  });
  geolocationControl.addEventListener("locationError",function(e){
    // 定位失败事件
    alert(e.message);
  });
  map.addControl(geolocationControl);
  
  var shop=api.shop();
  var listArry=[];
  for(x in shop.list){
	  var markerPoint = new BMap.Point(shop.list[x].longitude,shop.list[x].latitude); 
	  var title='{"name":"'+shop.list[x].name+'","address":"'+shop.list[x].address+'","mobile":"'+shop.list[x].mobile+'"}';
	  addMarker(markerPoint,x,title);
	  var md=(map.getDistance(markerPoint,new BMap.Point(lng,lat))/1000).toFixed(2);
	  function shopMd(md,id){
		  this.md=md;
		  this.id=id;
		  }
		listArry.push(new shopMd(md,shop.list[x].id));
	  }
		listArry.sort(compare('md'));
		$('.listPop').html('');
		for(x in listArry){
			 for(y in shop.list){
				 if(listArry[x].id==shop.list[y].id){
					 //console.log(searchRes.list[y].name);
					 var listHtml='<div class="listLine"><table><tr>';
					 listHtml+='<td class="dn"><font>'+shop.list[y].name+'</font><br>'+shop.list[y].address+'</td>';
					 listHtml+='<td class="dd">'+listArry[x].md+'公里</td>';
					 listHtml+='<td class="da"><a href="javascript:void(0);" onClick="goPanto(\''+shop.list[y].longitude+'\',\''+shop.list[y].latitude+'\');"><img src="images/point.png" width="65"></a></td>';
					 listHtml+='</tr></table></div>';
					 $('.listPop').append(listHtml);
					 }
				 }
			 }
}  
   
function loadScript() {
  var script = document.createElement("script");  
  script.src = "http://api.map.baidu.com/api?v=2.0&ak=0sLouPnWmMcr5bEEyrlOOpCpqElU14jd&callback=getLocation";//此为v2.0版本的引用方式  
  // http://api.map.baidu.com/api?v=1.4&ak=您的密钥&callback=initialize"; //此为v1.4版本及以前版本的引用方式  
  document.body.appendChild(script);  
} 

function getLocation(){
	map = new BMap.Map('map', {enableMapClick:false});
	
	var geolocation = new BMap.Geolocation();
	geolocation.getCurrentPosition(function(r){
		if(this.getStatus() == BMAP_STATUS_SUCCESS){
			var mk = new BMap.Marker(r.point);
			lng=r.point.lng;
			lat=r.point.lat;
			map.addOverlay(mk);
			initialize();
		}
		else {
			function myFun(result){
				var cityName = result.name;
				lng=result.center.lng;
				lat=result.center.lat;
				map.setCenter(cityName);
				initialize();
			}
			var myCity = new BMap.LocalCity();
			myCity.get(myFun);
		}        
	},{enableHighAccuracy: true})
  }

  
function addMarker(point, index, title){  // 创建图标对象   
var myIcon = new BMap.Icon("http://carters.ompchina.net/shop/images/point.png", new BMap.Size(119, 186), {    
// 指定定位位置。   
// 当标注显示在地图上时，其所指向的地理位置距离图标左上    
// 角各偏移10像素和25像素。您可以看到在本例中该位置即是   
   // 图标中央下端的尖角位置。    
   anchor: new BMap.Size(60, 186),    
   // 设置图片偏移。   
   // 当您需要从一幅较大的图片中截取某部分作为标注图标时，您   
   // 需要指定大图的偏移位置，此做法与css sprites技术类似。    
   imageOffset: new BMap.Size(0, 0)   // 设置图片偏移    
 });      
// 创建标注对象并添加到地图   
 var marker = new BMap.Marker(point, {icon: myIcon});
 var markLabel=new BMap.Label(title);
 markLabel.setStyle({display: "none"});
 marker.setLabel(markLabel);
 marker.addEventListener("click", function(e){    
	var p = e.target;
	map.removeOverlay(myCompOverlay);
	
	function ComplexCustomOverlay(point, text, mouseoverText){
      this._point = point;
      this._text = text;
      this._overText = mouseoverText;
    }
    ComplexCustomOverlay.prototype = new BMap.Overlay();
    ComplexCustomOverlay.prototype.initialize = function(map){
      this._map = map;
      var div = this._div = document.createElement("div");
      div.style.position = "absolute";
      div.style.zIndex = BMap.Overlay.getZIndex(this._point.lat);
      div.style.background = "url(http://carters.ompchina.net/shop/images/pop.png) no-repeat";
      div.style.color = "white";
	  div.style.width = "391px";
      div.style.height = "163px";
      div.style.padding = "10px 30px";
      div.style.lineHeight = "28px";
      div.style.MozUserSelect = "none";
      div.style.fontSize = "16px"
      var innerDiv = this._indiv = document.createElement("div");
      div.appendChild(innerDiv);
	  innerDiv.id="innerDiv";  
      var that = this;

      var arrow = this._arrow = document.createElement("div");
      arrow.style.background = "url(http://carters.ompchina.net/shop/images/arrow.png) no-repeat";
      arrow.style.position = "absolute";
      arrow.style.width = "65px";
      arrow.style.height = "32px";
      arrow.style.top = "183px";
      arrow.style.left = "193px";
      arrow.style.overflow = "hidden";
      div.appendChild(arrow);

      map.getPanes().labelPane.appendChild(div);
      
      return div;
    }
	
    ComplexCustomOverlay.prototype.draw = function(){
      var map = this._map;
      var pixel = map.pointToOverlayPixel(this._point);
      this._div.style.left = pixel.x - 225+"px";
      this._div.style.top  = pixel.y - 400 + "px";
    }
        
    myCompOverlay = new ComplexCustomOverlay(new BMap.Point(p.getPosition().lng,p.getPosition().lat));

    map.addOverlay(myCompOverlay);
	map.setZoom(19);
	var mapZoom=map.getZoom();
	map.panTo(new BMap.Point(p.getPosition().lng,p.getPosition().lat+0.002*(15/mapZoom)/2));
	var inLabel=$.parseJSON(p.getLabel().content);
	var inHmtl="<font style='font-size:20px;'>"+inLabel.name+"</font><br>地址："+inLabel.address+"<div style='margin-top:10px;border-top:1px solid #fff; padding-top:15px;'><a href='javascript:void(0);' onclick='showList();' style='display:inline-block; padding:2px 5px; background:#FFF; border-radius:10px; color:#24b9df;'>查看更多</a></div>";
	$('#innerDiv').html(inHmtl).on('touchend',function(){showList();});
	});
 map.addOverlay(marker);    
}

function showList(){
	$('.listPop').show().scrollTop(0);
	}
	
var listArry=[];
function compare(property){
    return function(a,b){
        var value1 = a[property];
        var value2 = b[property];
        return value1 - value2;
    }
}
function searchShop(){
	var province= ($.trim($('.sel1').text()) == '选择省' ? '' : $.trim($('.sel1').text()));
	var city= ($.trim($('.sel2').text()) == '选择市' ? '' : $.trim($('.sel2').text()));
	var district= ($.trim($('.sel3').text()) == '选择区' ? '' : $.trim($('.sel3').text()));
	var searchTxt=$.trim($('.formTxt').val());
	var searchRes=api.shop(province,city,district,searchTxt);
	if(searchRes.flag==1&&searchRes.list.length>=1){
		map.removeOverlay(myCompOverlay);
		//map.clearOverlays();
		listArry=[];
		for(x in searchRes.list){
		  var markerPoint = new BMap.Point(searchRes.list[x].longitude,searchRes.list[x].latitude); 
		  var title='{"name":"'+searchRes.list[x].name+'","address":"'+searchRes.list[x].address+'","mobile":"'+searchRes.list[x].mobile+'"}';
		  addMarker(markerPoint,x,title);
		  var md=(map.getDistance(markerPoint,new BMap.Point(lng,lat))/1000).toFixed(2);
		  function shopMd(md,id){
			  this.md=md;
			  this.id=id;
			  }
		  listArry.push(new shopMd(md,searchRes.list[x].id));
		  }
		 listArry.sort(compare('md'));
		 for(y in searchRes.list){
			 if(listArry[0].id==searchRes.list[y].id){
				 //console.log(searchRes.list[y].longitude+' - '+searchRes.list[y].latitude);
				 $('.listPop').hide();
				 map.setZoom(11);
				 map.panTo(new BMap.Point(searchRes.list[y].longitude,searchRes.list[y].latitude));
				 }
			 }
		 /*$('.listPop').html('');
		 for(x in listArry){
			 for(y in searchRes.list){
				 if(listArry[x].id==searchRes.list[y].id){
					 //console.log(searchRes.list[y].name);
					 var listHtml='<div class="listLine"><table><tr>';
					 listHtml+='<td class="dn"><font>'+searchRes.list[y].name+'</font><br>'+searchRes.list[y].address+'</td>';
					 listHtml+='<td class="dd">'+listArry[x].md+'公里</td>';
					 listHtml+='<td class="da"><a href="javascript:void(0);" onClick="goPanto(\''+searchRes.list[y].longitude+'\',\''+searchRes.list[y].latitude+'\');"><img src="images/point.png" width="65"></a></td>';
					 listHtml+='</tr></table></div>';
					 $('.listPop').append(listHtml);
					 }
				 }
			 }*/
		//showList();
		}
		else{
			$('.noShop').show();
			//alert('未找到你要查询的门店');
			}
	}
	
function goPanto(longitude,latitude){
	$('.listPop').hide();
	map.setZoom(19);
	map.panTo(new BMap.Point(longitude,latitude));
	}

$(function(){
	$('.listPop').height($(window).height()-75);
	$('.map').height($(window).height());
	loadScript();
	}) 
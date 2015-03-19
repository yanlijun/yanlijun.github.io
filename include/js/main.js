// JavaScript Document
(function($){
	/**
	 * Email Complete
	 * @version: 1.0 - (2012/10/20)
	 * @requires jQuery v1.7.2 or later
	 * @author Kevin Yan
	**/
	$.fn.mailComplete=function(options){
		var defaults={
				m:['sina.com','vip.sina.com','qq.com','gmail.com','163.com','126.com','hotmail.com','sohu.com','yahoo.cn'],
				c:{mc:'mailCompleteCss',p:'mailComplete',f:'focus',d:'mailList',i:'item',v:'valid',e:'even',c:'cur'}
			},
			opts=$.extend(true,{},defaults,options);
		return this.each(function(){
			var $th=$(this),$droper,zindex=1,width=$th.outerWidth()-2,height=$th.outerHeight(),
				styler='\
<style id="'+opts.c.mc+'" type="text/css">\
.'+opts.c.p+'{display:inline-block;position:relative}\
.'+opts.c.p+' input{color:#999}\
.'+opts.c.p+' input.'+opts.c.f+'{color:#333}\
.'+opts.c.d+'{display:none;position:absolute;top:'+height+'px;left:0;z-index:'+zindex+';min-width:'+width+'px;_width:'+width+'px;margin:0;padding:0;border-radius:0 0 4px 4px;border:1px solid #ccc;background:#fff;background:rgba(255,255,255,.86);_background:#fff}\
.'+opts.c.d+' li{height:20px;padding:2px 5px;font:12px/20px Arial;white-space:nowrap;list-style:none;color:#888}\
.'+opts.c.d+' li.'+opts.c.i+'{display:none;cursor:pointer}\
.'+opts.c.d+' li.'+opts.c.v+'{display:list-item}\
.'+opts.c.d+' li.'+opts.c.e+'{background:#f8f8f8;background:rgba(248,248,248,.86);_background:#f8f8f8}\
.'+opts.c.d+' li.'+opts.c.c+'{background:#dff2ff;background:rgba(223,242,255,.86);_background:#dff2ff;color:#555}\
</style>',
				parent='<div class="'+opts.c.p+'"></div>',mailList='<ul class="'+opts.c.d+'"></ul>',
			    mailListLi='<li title="请选择邮箱类型">请选择邮箱类型</li>';
			if($.isArray(opts.m))
				$.each(opts.m,function(i){
					var even='';if(!(i%2))even=' '+opts.c.e;
					mailListLi+='<li class="'+opts.c.i+' '+opts.c.v+even+'" title="@'+opts.m[i]+'" data-email="'+opts.m[i]+'">@'+opts.m[i]+'</li>';
				});
			if($('#'+opts.c.mc).size()===0)$('head').append(styler);					//add CSS to the page
			$th.wrap(parent).after($(mailList).append(mailListLi)),$droper=$th.next();	//product html dom
			//Mouse Event with the account input
			$th.focusin(function(){$th.addClass(opts.c.f).parents('.'+opts.c.p).css('z-index',zindex),$droper.show()})
			.keyup(function(e){
				/* BackSpace 8 ||| Enter 13 ||| Spacebar 32 ||| Up 38 ||| Down 40 ||| Delete 46 ||| 0->9(b) 48~57
				||| a->z 65~90 ||| 0->9(s) 96~105 ||| *->/(s) 106~111 ||| ;:->`~ 186~192 ||| [{->'" 219~222 */
				var u=e.keyCode||e.which,s=e.shiftKey,str=$.trim($th.val()),chk,valids=[],curIndex;
				$droper.children('.'+opts.c.v).each(function(){valids.push($(this))});	//get the Display list
				$.each(valids,function(i){if($(this).hasClass(opts.c.c))curIndex=i});	//get the Current index
				if(u===38&&curIndex>-1){var prevIndex=curIndex-1;if(curIndex==0)prevIndex=valids.length-1;valids[prevIndex].mouseover()}
				if(u===40&&curIndex>-1){var nextIndex=curIndex+1;if(curIndex==valids.length-1)nextIndex=0;valids[nextIndex].mouseover()}
				if(u===13&&curIndex>-1)$th.val($droper.children('.'+opts.c.c).text()).blur(),$droper.hide();
				if(u===8||u===32||u===46||(u>=48&&u<=57)||(u>=65&&u<=90)||(u>=96&&u<=111)||(u>=186&&u<=192)||(u>=219&&u<=222)){
					if(/@/.test(str))chk=str.replace(/.*@/,''),str=str.replace(/@.*/,'');
					//Given the value to all of the items
					$droper.children('.'+opts.c.i).each(function(){var value=str+'@'+$(this).attr('data-email');$(this).attr('title',value).text(value)});
					if(chk)
						//Display the match items
						$droper.children('.'+opts.c.i).each(function(){
							var reg=new RegExp(chk);//return a regular
							if(reg.test($(this).attr('data-email')))$(this).addClass(opts.c.v);
							else $(this).removeClass(opts.c.v);
						});
					else $droper.children('.'+opts.c.i).addClass(opts.c.v);
					$droper.children('.'+opts.c.i).removeClass(opts.c.e),$droper.children('.'+opts.c.v+':even').addClass(opts.c.e);
					if(!$droper.children('.'+opts.c.v).hasClass(opts.c.c))
						$droper.children('.'+opts.c.v+':first').addClass(opts.c.c).siblings().removeClass(opts.c.c);
				}
			})
			.focusout(function(){$th.removeClass(opts.c.f).parents('.'+opts.c.p).css('z-index',''),$droper.hide()});
			//Mouse Event with the MailList
			$droper.children('.'+opts.c.i).mouseover(function(){$(this).addClass(opts.c.c).siblings().removeClass(opts.c.c)})
			.mousedown(function(){$th.val($(this).text())});
		});
	};
	
	/**
	 * Place Holder
	 * @version: 2.0 - (2013/7/25)
	 * @requires jQuery v1.7.2 or later
	 * @author Kevin Yan
	 * @For all browsers
	**/
	$.fn.placeholder=function(options){
		var defaults={
				wrapper:'<span style="position:relative;display:block;"></span>',
				placeholderCSS:{'position':'absolute','cursor':'text'}
			},
			opts=$.extend({},defaults,options);
		return this.each(function(){
			var $th=$(this),value=$.trim($th.val()),
				/*left=$th.css('left')?$th.css('left'):0,top=$th.css('top')?$th.css('top'):0,*/width=$th.width(),height=$th.height(),
				padding=$th.is('input')?'0 12px':'4px 12px',fontSize=$th.is('input')?$th.css('font-size'):16,lineHeight='36px',color=$th.css('color'),
				//padding=$th.is('input')?$th.css('padding'):'0 12px',  $th.css('padding'),IE9+ can't get the padding value
				//lineHeight=$th.is('input')?$th.css('line-height'):36,  $th.css('line-height') can't get in moz and digital 36 is not effective
				addCSS={
					/*'left':left,'top':top,*/'width':width,'height':height,'padding':padding,'font-size':fontSize,'line-height':lineHeight,'color':color
				},
				placeholderText=$th.attr('holder'),placeholderTitle=$th.attr('title'),
				id=this.id?this.id:'holder-'+Math.floor(Math.random()*1123456789),
				placeholder=$('<label for="'+id+'" title="'+placeholderTitle+'">'+placeholderText+'</label>');
			placeholder.css(opts.placeholderCSS).css(addCSS);
			$th.wrap(opts.wrapper);
			$th.attr('id',id).after(placeholder);
			if(value)placeholder.hide();
			//$th.focus(function(){if(!$.trim($th.val()))placeholder.hide()});
			//$th.blur(function(){if(!$.trim($th.val()))placeholder.show(),$th.val('')});
		});
	};
	
	$.fn.loading=function(opts){
		return this.each(function(){
			var $this=$(this),data=$this.data();
			if(data.spinner){
				data.spinner.stop();
				delete data.spinner;
			}
			if(opts!==false){
				data.spinner=new Spinner($.extend({color:$this.css('color')},opts)).spin(this);
			}
		});
	};
	
	$.fn.loadContent=function(){
		return this.each(function(){
			var $this=$(this),index=$this.index(),lastcont=$this.is(':last-child'),$loader=$('<div class="unitLoader"><p>Loading...</p></div>');
			//var requestHtmlUrl=$this.attr('href');
			$this.waypoint('remove');
			$this.children('.tagsYear').remove();
			$this.append($loader);
			//if(lastcont)$('#SuggestionBox').data('autoScroll',false);
			$.get('contents.html',function(data){
				var $data=$(data).find('article:eq('+index+')');
				$this.data('received',true);
				$loader.remove();//detach()
				$this.append($data.html());
				$this.children('.unit').each(function(){
                    var $unit=$(this),lastunit=$unit.is(':last-child'),$viewIntro=$unit.find('.viewIntro'),
						$show=$unit.find('.show'),$media=$unit.find('.media'),$itemLoader=$show.children('.itemLoader');
					$unit.waypoint(function(e,direction){
						var unitIndex=$(this).index()-1,subIndex=direction==='up'?unitIndex-1<0?0:unitIndex-1:unitIndex;//the first child is '.timeYear'
						$('aside>ul>li:eq('+index+')>ol>li').eq(subIndex).addClass('hover').siblings().removeClass('hover');
						e.stopPropagation();
					});
					if($show.length){
						$itemLoader.fadeIn().loading({color:'#888888',sd_fir_color:'#cccccc',sd_sec_color:'#aaaaaa'});
						$show.imagesLoaded(function(){
							$itemLoader.loading(false);
							$show.children('.item').show();
							$show.isotope({itemSelector:'.item'},function($items){
								$this.waypoint();
								//if(lastcont&&lastunit)$('#SuggestionBox').data('autoScroll',true);
								$items.each(function(){
									var $item=$(this),$thImg=$item.children('.img'),$thTxt=$item.children('.txt');
									if(csstransform3d)$item.hover(function(){$item.addClass('flip')},function(){$item.removeClass('flip')});
									else if(!csstransform2d)
										$item.hover(
											function(){$thTxt.stop().animate({top:0},'fast')},
											function(){$thTxt.stop().animate({top:'101%'},'fast')}
										);
									else
										$thTxt.css('top',0),
										$item.hover(
											function(){$thImg.addClass('bright'),$thTxt.stop().animate({opacity:1},400)},
											function(){$thImg.removeClass('bright'),$thTxt.stop().animate({opacity:0},400)}
										);
								});
							});
						});
					}else{
						$this.waypoint();
						//if(lastcont&&lastunit)$('#SuggestionBox').data('autoScroll',true);
						if($media.length){
							var $video=$media.children('video'),$flash=$media.children('.flash');
							if($video.length){
								var videoid='video_'+Math.floor(Math.random()*100000);
								$video.attr('id',videoid),_V_(videoid);
							}
							if($flash.length){
								var source=$flash.data('source'),flashid='flash_'+Math.floor(Math.random()*100000);
								$flash.append('<div id="'+flashid+'"></div>');
								swfobject.embedSWF(
									'media/flash/loader.swf',flashid,252,252,10,'media/flash/expressInstall.swf',{src:source},{wmode:'transparent'}
								);
							}
						}
					}
					if($viewIntro.length){
						$viewIntro.hover(function(){$viewIntro.addClass('flip')},function(){$viewIntro.removeClass('flip')});
						//if(!csstransform3d){
							var $thMask=$viewIntro.prev('.date'),$thIntro=$viewIntro.children('.introduction'),
								downVal=$thMask.height(),upVal=downVal-$thIntro.height();
							$thIntro.css('top',upVal);
							$viewIntro.hover(function(){$thIntro.stop().animate({top:downVal},300)},function(){$thIntro.stop().animate({top:upVal},300)});
						//}
					}
                });
			});
		});
	};
})(jQuery);

var tipTimeout,tipOutttime=8000,csstransform2d=Modernizr.csstransforms,csstransform3d=Modernizr.csstransforms3d,
regwebkit=/webkit/i,regie6=/msie 6/i,
getBrowser=function(rw){
	var ua=navigator.userAgent.toLowerCase(),matcher=rw.test(ua);
	return matcher;
},
scroller=getBrowser(regwebkit)?'body':'html',
isie6=getBrowser(regie6),
initialFunction=function(){
	var startTime=new Date(Date.parse($.cookie('counttime'))),currentTime=new Date(),intervalTime=currentTime-startTime,
		tipInfoHeight=$('.toolOther>.tipsInfo').height(),tipHandleHeight=$('.toolOther>.tipsHandle').height(),fixTime=7200000;
	$('.toolOther>.tipsInfo').css({'top':-tipInfoHeight,'display':'block'});
	$('.toolOther>.tipsHandle').css('top',-tipHandleHeight);
	if(!startTime.valueOf()||intervalTime>fixTime)//first load or 2 hours later.
		$.cookie('counttime',currentTime,{expires:1}),
		$('.toolOther>.tipsInfo').animate({top:0},1000,'easeOutCubic',function(){
			if(!userExist)
				$('.loginArea>.loginTips').delay(tipOutttime+1000).fadeIn('fast',function(){
					$('.loginArea>.loginTips').addClass('loginTipsAnimation'),$('.loginArea>.loginIcon').addClass('loginIconAnimation');
				});
			tipTimeout=setTimeout(tipTimeFun(tipInfoHeight), tipOutttime);
			$('section>article:first').loadContent();
		});
	else $('.toolOther>.tipsHandle').animate({opacity:1,top:-100},'fast','easeOutBack',function(){$('section>article:first').loadContent();});
	
	$('.toolOther>.tipsHandle>.tipsHandleCard').click(function(){
		clearTimeout(tipTimeout);
		$(this).parent('.tipsHandle').stop().animate({opacity:0,top:-tipHandleHeight},'fast','easeInBack',function(){
			$('.toolOther>.tipsInfo').animate({top:0},1000,'easeOutCubic',function(){
				tipTimeout=setTimeout(tipTimeFun(tipInfoHeight), tipOutttime);
			});
		});
	});
	//attach the methods of waypoint to the main module
	$('#Container').waypoint(function(e,direction){
		$('#Wrapper').toggleClass('asideFixed',direction==='down');
		$('.toolUpper').toggleClass('upperHide',direction==='down');
		/*偶尔现象：当下面2句执行时在webkit里当滚动到#Container版块时，左边菜单和loginIcon鼠标移过，border-color 不改变，并且transition 失效*/
		if(direction==='down')heardToolLower();
		else heardToolUpper();
		e.stopPropagation();
	});
	
	$('section>article').waypoint(function(e,direction){
		var $th=$(this),i=$th.index(),j=direction==='up'?i-1:i,k=j<0?0:j,$naver=$('aside>ul>li').eq(k),
			$naverSubChildren=$naver.children('ol').children(),hasHover=$naverSubChildren.hasClass('hover'),
			loadState=$th.data('loadState'),received=$th.data('received');
		//console.log('index:'+index+',loadState:'+loadState+',received:'+received);
			//if(i==1)alert(1);
			//if(i==2)alert(2);
		if(loadState){
			if(!received)$th.loadContent();
			//else bgSwitch(direction,j);
			//if(i==1)alert(11);
			//if(i==2)alert(22);
		}
		$naver.addClass('hover').siblings().removeClass('hover');
		if(!hasHover)$naverSubChildren.eq(0).addClass('hover');
		e.stopPropagation();
	});
	
	$('#SuggestionBox').waypoint(function(e,direction){
		//var $this=$(this),scrollVal=$this.offset().top,autoScroll=$this.data('autoScroll');
		$('#Wrapper').toggleClass('asideFixed');
		//if(autoScroll&&direction==='down')$(scroller).stop().animate({scrollTop:scrollVal},500);
		e.stopPropagation();
	},{offset:0});//,{offset:$('aside').height()}
	
	$('#Footer>.weixin').waypoint(function(e,direction) {
		if(direction==='down')$(this).children('.wx').stop().fadeTo(1000,.9);
		else $(this).children('.wx').stop().fadeTo(1000,0);
		e.stopPropagation();
	},{offset:'100%'});
	
	$('input[complete="email"]').mailComplete();
	$('*[holder]').placeholder();
	loginRegister();
	suggestion();
},
tipTimeFun=function(val){
	return function(){
		$('.toolOther>.tipsInfo').animate({top:-val},1000,'easeOutCubic',function(){
			$('.toolOther>.tipsHandle').animate({opacity:1,top:-100},'fast','easeOutBack');
		});
	}
},
heardToolLower=function(){
	$('header').addClass('lower');
	if(isie6)DD_belatedPNG.fix('.toolLower .browsers a img');
	//$('.toolLower>.menuBar').stop().animate({height:34},200,'easeOutCubic');
	$('.toolUpper>.logoArea>.logo>.englishName').stop(true,true).animate({marginTop:80},10);//.css('margin-top',80);
	//$('.toolOther>.loginRegister').stop().animate({top:54},200,'easeOutCubic');
},
heardToolUpper=function(){
	$('header').removeClass('lower');
	//$('.toolLower>.menuBar').stop().animate({height:40},200,'easeInCubic');
	$('.toolUpper>.logoArea>.logo>.englishName').stop().animate({marginTop:0},200,'easeOutCubic');
	//$('.toolOther>.loginRegister').stop().animate({top:60},200,'easeInCubic');
},
logoMouseover=function(fName){
	if(csstransform3d&&!$('.toolUpper').hasClass('upperHide')){
		var i=0,maskInterval,maskValue,eName=fName.next().children('span'),
			webkitGradient='-webkit-gradient(radial,50% 50%,%s,50% 50%,%s,from(rgba(0,0,0,1)),color-stop(0.5,rgba(0,0,0,.2)),to(rgba(0,0,0,.6)))';
		fName.unbind();
		maskInterval=setInterval(function(){
			if(i>59)clearInterval(maskInterval),eName.removeClass('slipWord'),fName.mouseover(function(){logoMouseover(fName)});
			maskValue=digitalReplace(webkitGradient,i,i+15);
			fName.css('-webkit-mask',maskValue);
			eName.eq(i).addClass('slipWord');
			i++;
		},28);
	}
},
digitalReplace=function(parameter){
	for(var i=1;i<arguments.length;i++){
		var digital=String(arguments[i]).replace(/\$/g,"$$$$");
		parameter=parameter.replace(/\%s/,digital);
	}
	return parameter;
},
loginRegister=function(){
	$('.loginRegister>.switch>a').each(function(i){
		var $this=$(this);
        $this.click(function(){
			if(!isie6)$('.switchBody').css('overflow','hidden');
			if(i){
				$('.switchItems>.login').next().show();
				$('.switchItems>.login').animate({'margin-left':-216},400,function(){$(this).hide()});
				$this.animate({'left':220},400,function(){
					$this.css({'display':'none','left':-130}),
					$this.prev().show().animate({'right':0},400,function(){if(!isie6)$('.switchBody').css('overflow','visible')})
				});
			}else{
				$('.switchItems>.login').show().animate({'margin-left':0},400,function(){$(this).next().hide()});
				$this.animate({'right':220},400,function(){
					$this.css({'display':'none','right':-130}),
					$this.next().show().animate({'left':0},400,function(){if(!isie6)$('.switchBody').css('overflow','visible')})
				});
			}
		});
    });
	//Change Verification Code
	$('.validate').each(function(i){
		$(this).click(function(){
			var $this=$(this),$img=$this.children('img'),$codeInputer=$this.parents('li').find('input'),$codeInputHolder=$codeInputer.next(),
				src=$img.attr('src'),arr=src.split('&'),info=$codeInputer.data('error').split('|'),codeInputValue=$.trim($codeInputer.val());
			$img.attr('src',arr[0]+'&ran='+Math.random(1));
			if(codeInputValue)
				$.get('verification.php',{t:i,value:codeInputValue.toLowerCase()},function(data){
					if(data)errorEffect($codeInputer,info[1]);
					else $codeInputHolder.hide(),$codeInputer.addClass('ok');
				});
		});
    });
	//verify focusout
	$('.switchItems>.login,.switchItems>.register').each(function(i){
		$(this).find('input').each(function(j){
			var $this=$(this),errorInfo=$this.data('error').split('|');
			$this.focusin(function(){$this.next().hide()})
			.focusout(function(){
				var val=$.trim($this.val());
				verifyFunction(val,i,j,$this,errorInfo,true);
			});
		});
	});
	//verify submit
	$('.usersubmit').each(function(i){
		var $this=$(this),$thUl=$this.parents('ul'),$thInput=$thUl.find('input'),$thValidater=$thUl.find('.validate');
		$this.click(function(){
			var $validater,allok=true,vals={t:i},valskey=['uname','pword'];
			$thInput.each(function(j){
				var $th=$(this),val=$.trim($th.val()),errorInfo=$th.data('error').split('|');
				if(i&&j==2)$validater=$th;
				if(j<2)vals[valskey[j]]=val;
				if(!verifyFunction(val,i,j,$th,errorInfo))allok=false;
			});
			if(allok)
				$.get('mbrajax.php',vals,function(data){
					if(data)
						if(i){
							$('.successInfo').text('注册成功').fadeIn('fast',function(){$('.loginRegister>.switch>a:eq(0)').click()})
							.delay(500).fadeOut('slow',function(){$thInput.removeClass('ok'),$validater.val(''),$thValidater.click()});
						}else{
							$('.successInfo').text('登录成功').fadeIn('fast',function(){
								loginFunction(vals,valskey);
								$('.loginArea>.loginInfo>h6>a,.login>ol>li>a.loginout').click(function(e){logoutFunction(e)});
							}).delay(500).fadeOut('slow',function(){$('.switchItems>.login>ol').fadeIn('fast').siblings().hide()});
						}
				});
		});
	});
},
verifyFunction=function(inputValue,actNo,inputNo,$input,info,bluring){
	//actNo   : 0 -> Login, 1 -> Register.
	//inputNo : 0 -> account, 1 -> password, 2 -> verification code.
	//bluring : true -> focusout, false/undefined -> button event for Login or Register.
	var isok=true;
	if(!inputValue)isok=errorEffect($input,info[0]),$input.val('');
	else{
		if(inputNo==0){
			if(actNo==0){
				if(bluring)
					var $passwder=$input.parents('li').next().find('input'),$passwdHolder=$passwder.next(),
						infor=$passwder.data('error').split('|'),passwdValue=$.trim($passwder.val());
				$.get('mbrajax.php',{t:actNo,value:inputValue},function(data){
					if(data){
						isok=errorEffect($input,info[1]);
						if(passwdValue)if($passwder.is('.ok'))errorEffect($passwder,infor[2]);
					}else{
						$input.addClass('ok');
						if(passwdValue)
							$.get('mbrajax.php',{t:actNo,value:passwdValue,mvalue:inputValue},function(data){
								if(data)errorEffect($passwder,infor[1]);
								else $passwdHolder.hide(),$passwder.addClass('ok');
							});
					}
				});
			}
			if(actNo==1){
				var reg=/^.{2,24}$/;
				if(reg.test(inputValue))
					$.get('mbrajax.php',{t:actNo,value:inputValue},function(data){
						if(data)isok=errorEffect($input,info[1]);
						else $input.addClass('ok');
					});
				else isok=errorEffect($input,info[2]);
			}
		}
		if(inputNo==1){
			if(actNo==0){
				var accountValue=$.trim($input.parents('li').prev().find('input').val());
				if(accountValue)
					$.get('mbrajax.php',{t:actNo,value:inputValue,mvalue:accountValue},function(data){
						if(data==1)isok=errorEffect($input,info[1]);
						else if(data==2)errorEffect($input,info[2]);
						else $input.addClass('ok');
					});
				else errorEffect($input,info[2]);
			}
			if(actNo==1){
				var reg=/^([a-zA-Z0-9]){6,20}$/;
				if(!reg.test(inputValue))isok=errorEffect($input,info[1]);
				else $input.addClass('ok');
			}
		}
		if(inputNo==2)
			$.get('verification.php',{t:actNo,value:inputValue.toLowerCase()},function(data){
				if(data)isok=errorEffect($input,info[1]);
				else $input.addClass('ok');
			});
	}
	return isok;
},
suggestion=function(){
	$('.suggestion input,.suggestion textarea').each(function(i){
        var $this=$(this),errorInfo=$this.data('error').split('|');
		$this.focusin(function(){$this.next().hide()})
		.focusout(function(){
			var val=$.trim($this.val());
			verifySuggestion(i,val,$this,errorInfo);
		});
    });
	$('.suggsubmit').click(function(){
		var $inputer=$('.suggestion input,.suggestion textarea'),$nameer,allok=true,vals={},valskey=['suggname','suggcontent'],tips;
		$inputer.each(function(i){
			var $this=$(this),val=$.trim($this.val()),errorInfo=$this.data('error').split('|');
			if(i==0)$nameer=$this;
			if(i==0&&$this.is('.preSubmit'))$this.addClass('runSubmit').removeClass('preSubmit');
			vals[valskey[i]]=val;
			if(!verifySuggestion(i,val,$this,errorInfo))allok=false;
			if(i==0&&$this.is('.runSubmit'))$this.removeClass('runSubmit');
		});
		if(allok)
			$.get('mbrajax.php',vals,function(data){
				if(data){
					if(data==1)tips='提交成功';
					if(data==2)tips='甭淘气啊';
					$('.suggSubmitInfo').text(tips).fadeIn('fast').delay(500).fadeOut('slow',function(){
						$inputer.removeClass('ok'),$nameer.addClass('preSubmit'),$nameer.next().hide();
					});
				}
			});
	});
},
verifySuggestion=function(No,value,$input,info){
	var isok=true;
	if(No==0){
		if(!value){
			if($input.is('.preSubmit'))isok=errorEffect($input,info[0]);
			if($input.is('.runSubmit'))isok=errorEffect($input,info[2]);
			$input.val('');
		}else{
			var reg=/^.{2,24}$/;
			if(!reg.test(value))isok=errorEffect($input,info[1]);
			else $input.addClass('ok');
		}
	}
	if(No==1){
		if(!value)isok=errorEffect($input,info[0]),$input.val('');
		else $input.addClass('ok');
	}
	return isok;
},
errorEffect=function($inputer,message){
	var $holder=$inputer.next();
	$inputer.removeClass('ok');
	$holder.text(message).css('color','#fff').addClass('error').show()
	.delay(300).queue(function(){$holder.addClass('flicker'),$holder.dequeue()})
	.delay(300).queue(function(){$holder.removeClass('flicker'),$holder.dequeue()});
	return false;
},
loginFunction=function(arr,key){
	var username=arr[key[0]];//,usernameshow=subStr(username,18);
	$('.loginArea>.loginInfo>p').attr('title',username).text(username),$('.loginArea>.loginInfo').fadeIn('slow');
	$('.loginRegister>.switch>a:eq(0)>span').text('查看账号');
	$('.switchItems>.login>ol>li>span').each(function(i){$(this).attr('title',arr[key[i]]).text(arr[key[i]])});
},
logoutFunction=function(e){
	$('.loginArea>.loginInfo>h6>a,.login>ol>li>a.loginout').unbind('click');
	$('.switchItems>.login>ul input').each(function(i){
		if($(this).is('.ok'))$(this).removeClass('ok');
		if(i==2&&$(this).val())$(this).val(''),$(this).parents('li').find('.validate').click();
	});
	$.get('mbrajax.php',{logout:1},function(data){
		if(data)
			$('.loginArea>.loginInfo').fadeOut('fast',function(){$(this).children('p').attr('title','').text('')}),
			$('.loginRegister>.switch>a:eq(0)>span').text('去登录'),
			$('.switchItems>.login>ul').fadeIn('fast').siblings().hide(),
			$('.switchItems>.login>ol>li>span').each(function(){$(this).attr('title','').text('')});
	});
	e.stopPropagation();
},
subStr=function(str,len){
    var newstr='',l=0,char;
    if(str.replace(/[^\x00-\xff]/g,'xx').length<=len)return str;
    for(var i=0;char=str.charAt(i);i++){
        newstr+=char,l+=(char.match(/[^\x00-\xff]/)!=null?2:1);
		if(l>=len)break;
    }
	return newstr+'...';
},
bodyResize=function(resize){
	var width=$(window).width(),height=$(window).height(),vScrollbarWidth=hScrollbarHeight=0,scale;
	if(!resize&&width<1024)hScrollbarHeight=17;
	if(!resize&&height<768)vScrollbarWidth=17;
	scale=(width-vScrollbarWidth)/(height-hScrollbarHeight);
	bgResize(scale);
	if(width<1024)width=1024;else width='100%';
	if(height<666)height=666;
	$('#Wrapper').width(width),$('#SuggestionBox').height(height);
},
bgResize=function(bodyscale){
	$('#BackGround>.bgGroup').children().each(function(i){
		var $this=$(this),imgscale=$this.width()/$this.height();
        if(bodyscale&&bodyscale>imgscale)$this.width('100%').height('');
		else $this.width('').height('100%');
    });
},
bgSwitch=function(dir,i){
	var $curr=$('#BackGround>.bgGroup>.current'),currIndex=$curr.index(),$next,topval;
	if(i!=currIndex){
		if(dir=='up')topval='100%';else topval=-$curr.height();
		if(i<0)$next=$('#BackGround>.bgGroup>img:last');else $next=$('#BackGround>.bgGroup>:eq('+i+')');
		$next.addClass('current').stop().animate({top:0},1000);
		$curr.removeClass('current').stop().animate({top:topval},2000);
	}
},
shareToSN=function(title,url,pic){
	var _u='http://service.weibo.com/share/share.php',//http://v.t.sina.com.cn/share/share.php
		_title=encodeURI(title),_url=encodeURIComponent(url),_pic=encodeURI(pic),_appkey=encodeURI('2971223105'),_ralateUid=encodeURI('2375836632');
	_u+='?title='+_title+'&url='+_url+'&pic='+_pic+'&appkey='+_appkey+'&ralateUid='+_ralateUid+'&language=zh_cn';
	window.open(_u,'分享到新浪微博','height=480,width=608,top=100,left=200,toolbar=no,menubar=no,resizable=yes,location=yes,status=no');
},
shareToTT=function(title,url,pic){
	var _u='http://share.v.t.qq.com/index.php',//http://v.t.qq.com/share/share.php
		_title=encodeURI(title),_url=encodeURIComponent(url),_pic=encodeURI(pic),_appkey=encodeURI('801389739'),_site='http://yanlijun.com';
	_u+='?title='+_title+'&url='+_url+'&pic='+_pic+'&appkey='+_appkey+'&site='+_site;
	window.open(_u,'分享到腾讯微博','height=480,width=608,top=100,left=200,toolbar=no,menubar=no,resizable=yes,location=yes,status=no');
},
shareToQZ=function(title,summary,desc,url,pic){
	var _u='http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey',
		_title=encodeURI(title),_summary=encodeURIComponent(summary),_desc=encodeURIComponent(desc),_url=encodeURIComponent(url),_pic=encodeURI(pic),_site='http://yanlijun.com';
	_u+='?title='+_title+'&summary='+_summary+'&desc='+_desc+'&url='+_url+'&pics='+_pic+'&site='+_site;
	window.open(_u,'分享到QQ空间和朋友网','height=480,width=608,top=100,left=200,toolbar=no,menubar=no,resizable=yes,location=yes,status=no');
},
shareToQQ=function(title,summary,desc,url,pic){
	var _u='http://connect.qq.com/widget/shareqq/index.html',
		_title=encodeURI(title),_summary=encodeURIComponent(summary),_desc=encodeURIComponent(desc),_url=encodeURIComponent(url),_pic=encodeURI(pic),_site='http://yanlijun.com';
	_u+='?title='+_title+'&summary='+_summary+'&desc='+_desc+'&url='+_url+'&pics='+_pic+'&site='+_site;
	window.open(_u,'分享到QQ好友或群或讨论组','height=600,width=760,top=100,left=200,toolbar=no,menubar=no,resizable=yes,location=yes,status=no');
};

$(function(){
	$.ajaxSetup({async:false,cache:false});
	$.fn.waypoint.defaults.offset=34;
	$.waypoints.settings.scrollThrottle=30;
	//document.getElementById().previousSibling.offsetHeight.offsetHeight;documentElement.parentNode.offsetHeight; //css js test for ie6
	
	$('.toolUpper').hover(function(){if($(this).is('.upperHide'))heardToolUpper()},function(){if($(this).is('.upperHide'))heardToolLower()});
	$('.toolUpper>.logoArea>.logo>.firstName').mouseover(function(){logoMouseover($(this))});
	$('.loginArea>.loginIcon').mouseover(function(){
		if($('.loginTipsAnimation').length)$('.loginArea>.loginTips').removeClass('loginTipsAnimation').fadeOut('slow');
		if($('.loginIconAnimation').length)$('.loginArea>.loginIcon').removeClass('loginIconAnimation');
		$('.loginArea>.loginIcon').addClass('loginIconHover'),$('.loginRegister').fadeIn();
		$('.loginArea>.loginIcon,.loginRegister,.tipsHandleCard').click(function(e){e.stopPropagation()});
		$(document).click(function(){$(this).unbind('click'),$('.loginArea>.loginIcon').removeClass('loginIconHover'),$('.loginRegister').fadeOut()});
	});
	$('aside>ul>li>p').click(function(){
		var $th=$(this),index=$th.parent().index(),$currenter=$('section>article').eq(index),
			currentTopVal=$(window).scrollTop(),scrollTopVal=$currenter.offset().top-34;
		$('section>article').data('loadState',false);
		$(scroller).stop().animate({scrollTop:scrollTopVal},1000,function(){
			$('section>article').data('loadState',true);
			if(currentTopVal>scrollTopVal){
				if(!$currenter.data('received'))$currenter.loadContent();
				//else bgSwitch('up',index);
			}
		});
	});
	$('aside>ul>li>ol>li').click(function(){
		var $th=$(this),parIndex=$th.parent().parent().index(),index=$th.index(),
			scrollTopVal=$('section>article').eq(parIndex).children('.unit').eq(index).offset().top-34;
		$(scroller).stop().animate({scrollTop:scrollTopVal},1000);
	});
	$.each([$('.toTop'),$('.toSug'),$('.toBtm')],function(i){
		$(this).click(function(){
			var scrollTopVal=i?i==1?$('#SuggestionBox').offset().top:$(document).height()-$(window).height():0;
			$('section>article').data('loadState',false);
			//if(i==2)$('#SuggestionBox').data('autoScroll',false);
			$(scroller).stop().animate({scrollTop:scrollTopVal},1000,function(){
				$('section>article').data('loadState',true);
				//$('section>article').delay(100).queue(function(){$(this).data('loadState',true),$(this).dequeue()});
				//if(i==2)$('#SuggestionBox').delay(100).queue(function(){$(this).data('autoScroll',true),$(this).dequeue()});
			});
		});
	});
	$(window).resize(bodyResize).scroll(function(){if($(this).scrollTop()>200)$('#TopAndBtm').fadeIn();else $('#TopAndBtm').fadeOut()});
	//&&$(this).scrollTop()<($(document).height()-$(window).height()-100)
	//console.log();
	
	//initial loading the page
	$('#BackGround').jpreLoader({
		splashFunction:function(){
			$('#jpreContent>.fName').mouseover(function(){logoMouseover($(this))});
			$('#BackGround>.bgGroup>img:last').css({'top':0,'z-index':-9}).addClass('current');
			$('section>article').data({'loadState':true,'received':false});
			//$('#SuggestionBox').data('autoScroll',false);
			$('header a').attr('tabindex',-1);
			if(userExist)
				$('.loginArea>.loginTips').hide(),$('.loginArea>.loginInfo').show(),
				$('.switchItems>.login>ol').show().siblings().hide(),$('.loginRegister>.switch>a:eq(0)>span').text('查看账号'),
				$('.loginArea>.loginInfo>h6>a,.login>ol>li>a.loginout').click(function(e){logoutFunction(e)});
		}
	},function(){
		bodyResize(false);
		$('#jpreBar').css('float','right').delay(200).animate({width:0},300,'linear',function(){
			$('#jpreOverlay').fadeOut(800,function(){
				var $this=$(this),halfFeight=$this.height()/2;
				$this.remove();
				//if(csstransform3d)$('#EnterEffect').addClass('open');
				//else
					$('#EnterEffect>.above').animate({top:-halfFeight},800),
					$('#EnterEffect>.below').animate({bottom:-halfFeight},800),
					$('#EnterEffect>.above,#EnterEffect>.below').promise().done(function(){
						$(this).remove(),$('#EnterEffect').css('z-index',-9);
						$('#Wrapper').fadeIn(function(){initialFunction()});
					});
			});
		});
	});
});

/*
$.extend({
	includeStates:{},
	include:function(url,callback,dependency){
		if(typeof callback!='function'&&!dependency)dependency=callback,callback=null;
		url=url.replace('\n','');
		var expand=(url.substring(url.lastIndexOf('.')+1)).toLowerCase();
		
		$.includeStates[url]=false;
		if(expand=='css'){
			var element = 'link';
			var elemtype = 'text/css';
		}
		if(expand=='js'){
			var element = 'script';
			var elemtype = 'text/javascript';
		}
		var files=document.createElement(element);
		files.type=elemtype;
		if(expand=='css') files.rel='stylesheet';
		if(expand=='js') files.charset='utf-8';
		files.onload=function(){
			$.includeStates[url]=true;
			if(callback)callback.call(files)
		};
		files.onreadystatechange=function(){
			if(this.readyState!="complete"&&this.readyState!="loaded")return;
			$.includeStates[url]=true;
			if(callback)callback.call(files)
		};
		if(expand=='css') files.href=url;
		if(expand=='js') files.src=url;
		if(dependency){
			if(dependency.constructor!=Array)dependency=[dependency];
			setTimeout(
				function(){
					var valid=true;
					$.each(dependency,function(k,v){if(!v()){valid=false;return false}});
					if(valid)document.getElementsByTagName('head')[0].appendChild(files);
					else setTimeout(arguments.callee,10)
				},
				10
			)
		}
		else document.getElementsByTagName('head')[0].appendChild(files);
		return function(){return $.includeStates[url]}
	},
	readyOld:$.ready,
	ready:function(){
		if($.isReady) return;imReady=true;$.each($.includeStates,function(url,state){if(!state)return imReady=false});
		if(imReady) $.readyOld.apply($,arguments);
		else setTimeout(arguments.callee,10);
	}
});
$.include('include/js/jpreloader.js');
$.include('include/js/jquery.waypoints.min.js');
$.include('include/js/jquery.isotope.min.js');
$.include('include/js/jquery.easing.1.3.min.js');
$.include('include/js/jquery.cookie.js');
$.include('include/js/spin.js');
heardToolLower=function(){
	$('.toolUpper>.logoArea>.logo>.englishName').stop(true,true).animate({marginTop:80},100,'easeInCubic');
	$('.toolUpper>.logoArea>.logo').stop().animate({width:120,height:54,marginLeft:-60},200,'easeOutCubic');
	$('.menuBar>.menu').addClass('menuShake');
	$('.toolLower>.menuBar').stop().animate({height:34},200,'easeOutCubic');
	$('.toolUpper>.menuBar>.menu').stop().animate({marginTop:-100},100,'easeInCubic');
	$('.toolLower>.menuBar>.menu').stop().animate({marginTop:0},100,'easeOutCubic',function(){
		$('.menuBar>.menu').removeClass('menuShake');
	});
	$('.toolOther>.loginRegister').stop().animate({top:54},200,'easeOutCubic');
},
heardToolUpper=function(){
	$('.toolUpper>.logoArea>.logo').stop().animate({width:100,height:72,marginLeft:-50},200,'easeOutCubic');
	$('.toolUpper>.logoArea>.logo>.englishName').stop().delay(200).animate({marginTop:0},100,'easeOutCubic');
	$('.menuBar>.menu').addClass('menuShake');
	$('.toolLower>.menuBar').stop().animate({height:40},200,'easeInCubic');
	$('.toolLower>.menuBar>.menu').stop().animate({marginTop:100},100,'easeInCubic');
	$('.toolUpper>.menuBar>.menu').stop().animate({marginTop:0},100,'easeOutCubic',function(){
		$('.menuBar>.menu').removeClass('menuShake');
	});
	$('.toolOther>.loginRegister').stop().animate({top:60},200,'easeInCubic');
}
*/
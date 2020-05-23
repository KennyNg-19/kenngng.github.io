(function($){var defaults={url:false,icon:true,callback:false,target:false,duration:120,on:'mouseover'};$.fn.zoom=function(options){return this.each(function(){var
settings=$.extend({},defaults,options||{}),target=settings.target||this,$target=$(target),source=this,$source=$(source),img=new Image(),$img=$(img),$icon,position=$target.css('position'),mousemove='mousemove',clicked=false;$target.css({position:/(absolute|fixed)/.test(position)?position:'relative',overflow:'hidden'});if(!settings.url){settings.url=$source.find('img').attr('src');if(!settings.url){return;}}
if(settings.icon){$icon=$('<div class="zoomIcon"/>').appendTo($source);}
img.onload=function(){var
outerWidth,outerHeight,xRatio,yRatio,left,top,offset=$source.offset();function ratio(){outerWidth=$target.outerWidth();outerHeight=$target.outerHeight();xRatio=(img.width-outerWidth)/$source.outerWidth();yRatio=(img.height-outerHeight)/$source.outerHeight();}
function move(e){left=(e.pageX-offset.left);top=(e.pageY-offset.top);if(left>outerWidth){left=outerWidth;}else if(left<0){left=0;}
if(top>outerHeight){top=outerHeight;}else if(top<0){top=0;}
img.style.left=(left*-xRatio)+'px';img.style.top=(top*-yRatio)+'px';e.preventDefault();}
function start(e){offset=$source.offset();ratio();move(e);$img.stop().fadeTo($.support.opacity?settings.duration:0,1);}
function stop(){$img.stop().fadeTo(settings.duration,0);}
$img.addClass('zoomImg').css({position:'absolute',top:0,left:0,opacity:0,width:img.width,height:img.height,border:'none',maxWidth:'none'}).appendTo($target);if(settings.on==='grab'){$source.mousedown(function(e){offset=$source.offset();$(document).one('mouseup',function(){stop();$(document).unbind(mousemove,move);});start(e);$(document)[mousemove](move);e.preventDefault();});}else if(settings.on==='click'){$source.click(function(e){if(clicked){return;}else{clicked=true;start(e);$(document)[mousemove](move);$(document).one('click',function(){stop();clicked=false;$(document).unbind(mousemove,move);});return false;}});}else{ratio();$source.hover(start,stop)[mousemove](move);}
if($.isFunction(settings.callback)){settings.callback.call(img);}};img.src=settings.url;});};$.fn.zoom.defaults=defaults;}(window.jQuery));
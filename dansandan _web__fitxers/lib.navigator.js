var navigatorJS=new function(){var t=this;t.base='/js/';t.main='main';t.hideMain=false;t.sectors={'main':'main.js'};t.hash=true;t.loaded={};t.loadingParams={};t.actual={sec:false,params:false};t.history=false;t.delay=false;t.events={};t.init=function(){jQuery(t.initLoaded);}
t.initLoaded=function(){if(jQuery.browser.msie&&jQuery.browser.version<=7){t.history=jQuery('<iframe/>').attr({id:'mia_ajax_nav_hist',src:'about:blank'}).hide().appendTo('body');}
t.hash=t.getHash();t.click(t.hash);if(("onhashchange"in window)&&(document.documentMode===undefined||document.documentMode>7)){jQuery(window).bind('hashchange',function(e){t.checkLocation();});}else{setInterval(t.checkLocation,200);}}
t.current=function(){return t.loaded[t.actual['sec']];}
t.checkLocation=function(){var mHash=t.getHash();if(t.hash!=mHash){t.hash=mHash;t.click(t.hash);}}
t.click=function(where){if(typeof(where)=='undefined'||where==''){where='#!'+this.main;}
var wParams=t.parseHash(where);if(typeof(t.sectors[wParams['sec']])=='undefined'){t.click('#!'+t.main);}else{t.goTo(wParams);}}
t.makeHistory=function(){if(t.history){var hist=t.history.unbind('load').get(0).contentWindow.document;hist.open();hist.write("<html><head><title>"+jQuery('<div/>').text(document.title).html()+"</title></head><body>"+jQuery('<div/>').text(t.hash).html()+"</body></html>");hist.close();t.history.load(function(){var hash=jQuery.trim(jQuery(this.contentWindow.document).text());if(hash!=''&&t.hash!=hash){t.goTo(t.parseHash(hash),false);}});}}
t.loadScript=function(url,wParams){t.loaded[wParams['sec']]=true;t.loadingParams[wParams['sec']]=jQuery.extend(true,{},wParams);jQuery.getScript(url);}
t.loadSec=function(sec,response){response.name=sec;t.loaded[sec]=jQuery.extend(true,{},sectorsJS,response);t.goTo(t.loadingParams[sec]);t.stopLoading();}
t.goTo=function(wParams,history){if(typeof(history)=='undefined'||history!==false)history=true;if(typeof(t.loaded[wParams['sec']])=='undefined'){if(typeof(t.sectors[wParams['sec']])=='object'){t.loaded[wParams['sec']]=jQuery.extend(true,{},sectorsJS,t.sectors[wParams['sec']]);t.loaded[wParams['sec']].name=wParams['sec'];t.goTo(wParams,history);}else{t.showLoading();t.loadScript(t.sectors[wParams['sec']],wParams);}}else if(t.loaded[wParams['sec']]!==true){if(t.actual['sec']!=wParams['sec']){if(t.actual['sec']){if(t.loaded[t.actual['sec']].stop()!==false){t.loaded[t.actual['sec']].active=false;}else{return;}}
t.loaded[wParams['sec']].start();t.loaded[wParams['sec']].active=true;}
t.actual=wParams;if(t.loaded[wParams['sec']].refresh(wParams['params'])!==false){var newHash=t.doHash(wParams['sec'],wParams['params']);if(t.getHash()!=newHash){t.setHash(newHash);}else{t.hash=newHash;}
if(history){t.makeHistory();}}}}
t.getHash=function(){var pos,ret='';if((pos=location.href.indexOf('#'))!==-1){ret=location.href.substr(pos);}
return ret;}
t.setHash=function(nHash){location.hash=nHash.substring(1);t.hash=location.hash;}
t.parseHash=function(chain){var res,x,tmp,pos,amp;chain=chain.substring(2);pos=chain.search(/^[^=]+&/);amp=chain.indexOf('&');if(amp!==-1){return{sec:(pos===-1?t.main:chain.substring(0,amp)),params:jQuery.toQueryParams((pos===-1?chain:chain.substring(amp+1)))}}else{pos=chain.indexOf('=');if(pos!==-1){return{sec:t.main,params:jQuery.toQueryParams(chain)}}else{return{sec:(chain==''?t.main:chain),params:{}}}}}
t.doHash=function(sec,params){var x,res,p;res='#!'+(sec==t.main&&t.hideMain?'':sec);if(typeof(params)=='object'){p=jQuery.param(params,true);if(p!=''){res+=(sec!=t.main||!t.hideMain?'&':'')+p;}}
return res;}
t.showLoading=function(doIt){if(typeof(doId)=='undefined'||doIt!==true){clearTimeout(t.delay);t.delay=setTimeout(function(){t.showLoading(true)},0.5);}else{}}
t.stopLoading=function(){clearTimeout(t.delay);t.delay=false;}
t.prepareContent=function(content,sec){if(content.indexOf('<tr')===0){content=jQuery('<table><tbody id="container">'+content+'</tbody></table>');}else if(content.indexOf('<tbody')===0){content=jQuery('<table id="container">'+content+'</table>').append(content);}else{content=jQuery('<div/>').attr('id','container').append(content);}
t.prepareObjs(content,sec);return content.find('#container').children().get();}
t.prepareObjs=function(obj,sec){obj=jQuery.identify(obj);obj.find('a[href*=#]').click(function(e){var o=jQuery(this);e.preventDefault()
e.stopPropagation();t.click(o.attr('href').substring(o.attr('href').indexOf('#')));return false;});obj.find('[rel^=#]').click(function(e){var o=jQuery(this);e.preventDefault()
e.stopPropagation();t.click(o.attr('rel'));return false;});obj.find('form').each(function(){t.prepareForm(this,sec);});}
t.prepareForm=function(f,sec){jQuery.identify(f).submit(function(){t.launchForm(f,sec,false);});}
t.launchForm=function(f,sec,doSubmit){f=jQuery.identify(f);var id=f.identify();jQuery('<iframe/>').attr({id:'dataExchange_'+id,name:'dataExchange_'+id,src:'about:blank'}).css({position:'absolute',top:'-1000px',left:'-1000px'}).appendTo('body').load(function(){if(this.contentWindow.document.body.firstChild&&jQuery.parseJSON(this.contentWindow.document.body.firstChild.innerHTML)){sec.response(jQuery.parseJSON(this.contentWindow.document.body.firstChild.innerHTML),id);}else{sec.response({error:true,debug:this.contentWindow.document.body.innerHTML},id);}
setTimeout(function(){jQuery('#dataExchange_'+id).remove()},200);});f.attr('target','dataExchange_'+id);if(typeof(doSubmit)=='undefined'||doSubmit!==false){f.submit();}}
t.listUpdater=function(container,newList,newFunc,modFunc,prefix,iterator,sec){var cont=0,last=false,foo,prefixChars;if(!jQuery.isFunction(modFunc)){modFunc=function(){};}
if(!jQuery.isFunction(iterator)){iterator=function(){};}
var foo=jQuery('#'+container+' > tbody');if(foo.length==0){container=jQuery('#'+container);}else{container=foo;}
if(typeof(prefix)=='undefined'){prefix='';prefixChars=0;}else{prefixChars=prefix.length;}
container.children().each(function(){var e=jQuery(this);if(jQuery.inArray(e.identify().substring(prefixChars),newList)===-1){e.remove();}});jQuery.each(newList,function(i,e){var obj=jQuery('#'+prefix+e);if(obj.length>0){modFunc(obj.get(0),cont);}else{obj=t.prepareContent(newFunc(e,cont),sec);}
if(last){last.after(obj);}else{container.prepend(obj);}
last=jQuery('#'+prefix+e);iterator(e);cont++;});}}
var sectorsJS={name:false,active:false,main:navigatorJS,start:function(){},stop:function(){},refresh:function(){},goTo:function(params,sec){this.main.click(this.href(params,sec));},goBack:function(){history.back();},href:function(params,sec){if(typeof(sec)=='undefined'||sec==''){sec=this.name;}
return this.main.doHash(sec,params);},put:function(where,content){$(where).update(content);this.main.prepareObjs($(where),this);},add:function(where,content){var t=this;if(typeof(content)=='string'){content={'bottom':content}}
Object.keys(content).each(function(e){var foo=t.main.prepareContent(content[e],t);if(e=='before'||e=='top'){foo.reverse();}
foo.each(function(ele){var obj;eval('obj = {'+e+':ele}');$(where).insert(obj);});});},replace:function(where,content){$(where).hide();this.insert(where,{after:content});$(where).remove();},showLoading:function(){this.main.showLoading();},stopLoading:function(){this.main.stopLoading();},response:function(res,from){res.start();Form.enable($(from));},jsCall:function(func,params,sec){if(typeof(sec)=='undefined'){sec=this.name;}
return'navigatorJS.loaded[\''+sec+'\'].'+func+'('+params+')';},listUpdater:function(container,newList,newFunc,modFunc,prefix,iterator){this.main.listUpdater(container,newList,newFunc,modFunc,prefix,iterator,this);},prepareForm:function(f){this.main.prepareForm(f,this);},launchForm:function(f,doSubmit){this.main.launchForm(f,this,doSubmit);}}
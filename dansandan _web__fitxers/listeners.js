var Listen=new function(){var t=this;t.listeners={};t.add=function(name,fn,element){name=name.toLowerCase();if(!t.listeners[name]){t.listeners[name]=[];}
if(typeof(element)=='undefined'){element=false;}else{element=jQuery.identify(element).identify();}
this.listeners[name].push({fn:fn,to:element});}
t.remove=function(name,fn,element){name=name.toLowerCase();if(typeof(element)=='undefined'){element=false;}else{element=jQuery.identify(element).identify();}
if(t.listeners[name]){t.listeners[name]=jQuery.grep(t.listeners[name],function(acc){if(acc.fn==fn&&acc.to==element){return false;}else{return true;}});if(t.listeners[name].length==0){delete t.listeners[name];}}}
t.clean=function(name,element){name=name.toLowerCase();if(typeof(element)=='undefined'){element=false;}else{element=jQuery.identify(element).identify();}
if(t.listeners[name]){t.listeners[name]=jQuery.grep(t.listeners[name],function(acc){if(element==false||acc.to==element){return false;}else{return true;}});if(t.listeners[name].length==0){delete t.listeners[name];}}
if(element!==false){var objs='#'+element;}else{var objs='[listen'+name+']';}
jQuery(objs).removeAttr('listen'+name);}
t.fire=function(name,wait){if(typeof(wait)=='undefined'||wait!==true){setTimeout(function(){t.fire(name,true)},0);return true;}
name=name.toLowerCase();var exec={'__DIRECT_LISTENER__':[]};jQuery('[listen'+name+']').each(function(){var obj=jQuery(this);var id=obj.identify();if(!exec[id]){exec[id]=[];}
eval('exec[id].push(jQuery.proxy(function() {'+obj.attr('listen'+name)+'},obj));');});if(t.listeners[name]){t.listeners[name]=jQuery.grep(t.listeners[name],function(acc){if(acc.to!==false){var toObj=jQuery.identify(acc.to);if(toObj.length==1){exec[acc.to].push(jQuery.proxy(acc.fn,toObj));}else{return false;}}else{exec['__DIRECT_LISTENER__'].push(acc.fn);}
return true;});}
jQuery.each(exec,function(key,v){setTimeout(function(){jQuery.each(exec[key],function(i,fn){fn();});},0);});}}
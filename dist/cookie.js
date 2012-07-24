define("#cookie/1.0.2/cookie",[],function(require,exports){function parseCookieString(text,shouldDecode){var cookies={};if(isString(text)&&text.length>0){var decodeValue=shouldDecode?decode:same,cookieParts=text.split(/;\s/g),cookieName,cookieValue,cookieNameValue;for(var i=0,len=cookieParts.length;i<len;i++){cookieNameValue=cookieParts[i].match(/([^=]+)=/i);if(cookieNameValue instanceof Array)try{cookieName=decode(cookieNameValue[1]),cookieValue=decodeValue(cookieParts[i].substring(cookieNameValue[1].length+1))}catch(ex){}else cookieName=decode(cookieParts[i]),cookieValue="";cookieName&&(cookies[cookieName]=cookieValue)}}return cookies}function isString(o){return typeof o=="string"}function isNonEmptyString(s){return isString(s)&&s!==""}function validateCookieName(name){if(!isNonEmptyString(name))throw new TypeError("Cookie name must be a non-empty string")}function same(s){return s}var Cookie=exports,decode=decodeURIComponent,encode=encodeURIComponent;Cookie.get=function(name,options){validateCookieName(name),typeof options=="function"?options={converter:options}:options=options||{};var cookies=parseCookieString(document.cookie,!options.raw);return(options.converter||same)(cookies[name])},Cookie.set=function(name,value,options){validateCookieName(name),options=options||{};var expires=options.expires,domain=options.domain,path=options.path;options.raw||(value=encode(String(value)));var text=name+"="+value,date=expires;return typeof date=="number"&&(date=new Date,date.setDate(date.getDate()+expires)),date instanceof Date&&(text+="; expires="+date.toUTCString()),isNonEmptyString(domain)&&(text+="; domain="+domain),isNonEmptyString(path)&&(text+="; path="+path),options.secure&&(text+="; secure"),document.cookie=text,text},Cookie.remove=function(name,options){return options=options||{},options.expires=new Date(0),this.set(name,"",options)}});
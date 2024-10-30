/*! cackle 11-06-2016 */
angular.module("cackle-admin.settings-module",["cackle-admin.settings-module.controllers","cackle-admin.settings-module.services"]);var pushObject;pushObject=function(a,b,c,d,e){if(0==a.hasOwnProperty(b)){a[b]={};var f=a[b];if(0==c.hasOwnProperty("id"));else{c.id}}else var f=a[b];var g=Object.keys(f);if(g.length>0){var h=Math.max.apply(Math,g)+1,i=f[Object.keys(f)[Object.keys(f).length-1]];1==d?c.id=c.id:c.id=h}else{if(0==c.hasOwnProperty("id"))var j=1;else var j=c.id;c.id=j;var i={};i.id=j-1}1==d?(f[c.id]=c,e&&e()):("undefined"==typeof h&&(h=1),f[h]=c,e&&e())};var obj_key=function(a){return angular.isObject(a)?Object.keys(a):!1},object_keys=function(a){return Object.keys(a)};angular.module("cackle-admin.settings-module.controllers",["ngSanitize"]),function(){"use strict";function a(a,b,c,d){a.messages={},a.initData=cackle_admin.settings,a.status=cackle_admin.status,a.locale=cackle_locale;a.object_keys=function(a){return Object.keys(a)};var e=function(){a.initData.curl_exist_error&&(a.messages.curl_exist_error={status:!0,text:a.locale.curl_exist_error,"class":"md-warn",header:a.locale.Warning}),a.initData.php_error&&(a.messages.php_error={status:!0,text:a.locale.php_error,"class":"md-warn",header:a.locale.Warning})};a.$watch("initData",function(){e()},!0),a.activate=function(){c.activate(a.initData).then(function(b){a.status=b.data[0],a.messages.hasOwnProperty("activated")?"":a.messages.activated={},a.status.hasOwnProperty("correctKey")&&1==a.status.correctKey?a.messages.activated={status:!0,text:a.locale["Plugin was successfully activated!"],"class":"md-success",header:a.locale.Success}:a.messages.activated={status:!1,text:a.locale["The entered keys are wrong. Please check it again. Plugin was not activated"],"class":"md-warn",header:a.locale.Warning}},function(a){})};var f=function(b,c){var d,e,b="manual_"+b;switch(a.initData[b].hasOwnProperty("finish")&&1!=a.initData[b].finish?(d=a.initData[b].last_post_id,"manual_export"==b&&(e=a.initData[b].hasOwnProperty("last_offset")?a.initData[b].last_offset:0)):(d=0,e=0),c){case"post_id":return d;case"offset":return e}},g=function(){f("export","post_id")&&(a.hasOwnProperty("transfer")?"":a.transfer={},a.transfer["export"]={messages:[]},a.transfer["export"].messages.push(a.locale["Last successfull exported comments was for post_id = "]+f("export","post_id"))),f("sync","post_id")&&(a.hasOwnProperty("transfer")?"":a.transfer={},a.transfer.sync={messages:[]},a.transfer.sync.messages.push(a.locale["Last successfull synced comments was for post_id = "]+f("sync","post_id")))};g();var h=function(a,b){return h.hasOwnProperty("instance")&&"object"==typeof h.instance[a]?("continue"!=b&&(h.instance[a].post_id=0),h.instance[a]):(this.name=a,this.mode=b,this.status=!1,this.post_id="continue"==this.mode?f(a,"post_id"):0,this.offset=f(a,"offset"),this.hasOwnProperty("message")||(this.messages=[]),h.hasOwnProperty("instance")||(h.instance={}),void(h.instance[a]=this))};h.prototype.transfer_start=function(){a.transfer.hasOwnProperty(this.name)||(a.transfer[this.name]={}),a.transfer[this.name].status=!0;var b=this;a.transfer[b.name].spinner=!0,d(function(){c.transfer(b.name,a.transfer[b.name].post_id,a.transfer[b.name].offset).then(function(c){if(console.log(c.data),a.transfer[b.name].spinner=!0,c.hasOwnProperty("data")&&c.data.hasOwnProperty("post_id")){if("fail"!=c.data.result&&"sync"==b.name&&(a.transfer[b.name].post_id=c.data.post_id),"fail"!=c.data.result&&"export"==b.name&&(a.transfer[b.name].offset=a.transfer[b.name].offset+100),"fail"!=c.data.result&&"export"==b.name&&"complete"==c.data.comments_pack_status&&(a.transfer[b.name].post_id=c.data.post_id,a.transfer[b.name].offset=0),c.data.hasOwnProperty("post_id")&&null==c.data.post_id&&(a.transfer[b.name].post_id=0),c.data.hasOwnProperty("result")&&"fail"==c.data.result&&null!=c.data.post_id&&(a.transfer[b.name].messages.push(a.locale[[b.name]+"_Processed comments for post_id = "]+c.data.post_id+a.locale["with specified error: "]+(c.data.hasOwnProperty("fail_response")&&null!=c.data.fail_response&&c.data.fail_response.hasOwnProperty("responseApi")?c.data.fail_response.responseApi.error:a.locale["Unable to connect with Cackle"])),a.transfer[b.name].status=!1),c.data.hasOwnProperty("status")&&"partial"==c.data.status&&("success"==c.data.result&&c.data.hasOwnProperty("fail_response")&&null!=c.data.post_id&&a.transfer[b.name].messages.push('<span class="success">'+a.locale[[b.name]+"_Processed comments for post_id = "]+c.data.post_id+" "+(0!=a.transfer[b.name].offset?c.data.comments_prepared+a.locale["(comments)"]:"")+"</span>"),1==a.transfer[b.name].status?b.transfer_start():(a.transfer[b.name].messages.push('<span class="warn">'+a.locale[[b.name]+"_Processed comments was stopped for post_id = "]+c.data.post_id+"</span>"),a.transfer[b.name].spinner=!1)),c.data.hasOwnProperty("status")&&"complete"==c.data.status&&"success"==c.data.result){"manual_"+b.name;a.transfer[b.name].messages.push(a.locale[[b.name]+"_Processed comments for post_id = "]+c.data.post_id+" "+(0!=a.transfer[b.name].offset?c.data.comments_prepared+a.locale["(comments)"]:"")),a.transfer[b.name].messages.push(a.locale[[b.name]+"_All comments were transfer successfully to Cackle!"]),a.transfer[b.name].spinner=!1,a.transfer[b.name].status=!1}c.data.hasOwnProperty("status")||a.transfer[b.name].messages.push(a.locale[[b.name]+"_Processed comments for post_id = "]+c.data.post_id+a.locale["with specified error: "]+a.locale["Error 500. Unable to connect server. Check server or internet"])}},function(a){})},5e3)},a.transferStart=function(b,c){a.hasOwnProperty("transfer")?"":a.transfer={},a.transfer[b]=new h(b,c),a.transfer[b].transfer_start()},a.transferStop=function(b){a.transfer[b].status=!1};var i=0;a.initCommentsPrepare=function(){a.commentLoading=!0;var b=100;c.commentsPrepare("import_prepare").then(function(e){"partial"==e.data.status&&(c.offset=c.offset+b,i+=e.data.channels_prepared,a.comments_prepared_counter=i,d(function(){a.initCommentsPrepare()},5e3)),"complete"==e.data.status&&(console.log("ready for syncing comments"),c.offset=0,console.log(e),a.transferStart("sync","continue"))})}}var b="settings.ctrl";angular.module("cackle-admin.settings-module.controllers").controller(b,["$scope","$rootScope","cackleApi","$timeout",a])}(),angular.module("cackle-admin.settings-module.services",[]),function(){"use strict";function a(a){var b=function(b){return a({method:"POST",url:cackle_admin.url,data:{data:JSON.stringify({cackleApi:"checkKeys",value:b})}})},c=function(a){return b(a)},d=function(b,c){return a({method:"POST",url:cackle_admin.url,data:{data:JSON.stringify({cackleApi:"export",post_id:c,action:b})}})};this.offset=0;var e=function(b){var c={data:JSON.stringify({cackleApi:b,offset:this.offset})};return a({method:"POST",url:cackle_admin.url,data:c})},f=function(b,c,d){"sync"==b&&(b="import");var e=b+"_start";return a({method:"POST",url:cackle_admin.url,data:{data:JSON.stringify({cackleApi:b,post_id:c,action:e,offset:d})}})};return{activate:c,_export:d,transfer:f,commentsPrepare:e,offset:this.offset}}var b="cackleApi";angular.module("cackle-admin.settings-module.services").factory(b,["$http",a])}(),angular.module("cackle-admin.Angular",["cackle-admin.settings-module","ngMaterial","ngMessages"]).config(["$mdThemingProvider","$httpProvider",function(a,b){a.theme("default").primaryPalette("blue").accentPalette("orange"),b.defaults.useXDomain=!0,delete b.defaults.headers.common["X-Requested-With"],b.defaults.transformRequest.push(function(a){var b;if(a){a=JSON.parse(a);for(var c in a)b?b+="&"+c+"="+a[c]:b=c+"="+a[c]}return b}),b.defaults.headers.post["Content-Type"]="application/x-www-form-urlencoded"}]).filter("objToArray",function(){return function(a,b){for(objectKey in a)objectKey!=b&&"lang"!=objectKey&&(a[objectKey]=1==a[objectKey]?!0:!1);return a}}).directive("errorMessage",function(){return{template:angular.element(document.querySelector("#scopeTemplate")).html(),scope:{error:"=error",errorClass:"=errorclass",header:"=header"}}}).directive("spinner",function(){return{template:'<svg viewBox="0 0 64 64"><g><circle cx="16" cy="32" stroke-width="0" r="5.19334"><animate attributeName="fill-opacity" dur="750ms" values=".5;.6;.8;1;.8;.6;.5;.5" repeatCount="indefinite"></animate><animate attributeName="r" dur="750ms" values="3;3;4;5;6;5;4;3" repeatCount="indefinite"></animate></circle><circle cx="32" cy="32" stroke-width="0" r="4.19334"><animate attributeName="fill-opacity" dur="750ms" values=".5;.5;.6;.8;1;.8;.6;.5" repeatCount="indefinite"></animate><animate attributeName="r" dur="750ms" values="4;3;3;4;5;6;5;4" repeatCount="indefinite"></animate></circle><circle cx="48" cy="32" stroke-width="0" r="3.19334"><animate attributeName="fill-opacity" dur="750ms" values=".6;.5;.5;.6;.8;1;.8;.6" repeatCount="indefinite"></animate><animate attributeName="r" dur="750ms" values="5;4;3;3;4;5;6;5" repeatCount="indefinite"></animate></circle></g></svg>'}});
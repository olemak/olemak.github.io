/*

JSON-stat Javascript Utilities Suite v. 2.2.4 (requires JJT 0.10+)
http://json-stat.com
https://github.com/badosa/JSON-stat/tree/master/utils

Copyright 2016 Xavier Badosa (http://xavierbadosa.com)

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

	http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express
or implied. See the License for the specific language governing
permissions and limitations under the License.

*/
var JSONstatUtils=function(){"use strict";function e(e,t,n){function l(e){void 0!==t?t.innerHTML=v[e]:window.alert(v[e])}function r(e,t,n){var l={filter:{}};return n.forEach(function(e){"rows"===e.name||"cols"===e.name?l[e.name]=e.value:l.filter[e.name]=e.value}),"rowscols"===t&&e.id.forEach(function(t,n){t!==l.rows&&t!==l.cols?void 0===l.filter[t]&&(l.filter[t]=e.Dimension(n).id[0]):delete l.filter[t]}),l}function a(e,t){var n,l,r={},i=[],a=e.id;if(t){var o="bigger"===t?function(e,t){return e.len<t.len?1:-1}:function(e,t){return e.len>t.len?1:-1};e.Dimension().forEach(function(e,t){i.push({id:a[t],len:e.length})}),i.sort(o),n=i[0].id,l=i[1].id}else n=a[0],l=a[1];return e.Dimension(n).length<e.Dimension(l).length&&(n=l+(l=n,"")),a.forEach(function(t){t!==n&&t!==l&&(r[t]=e.Dimension(t).id[0])}),{rows:n,cols:l,filter:r}}function u(e){var t=[],n=[].slice.call(e.querySelectorAll("select, input"));return n.forEach(function(e){t.push({name:e.name,value:e.value})}),t}function c(e,t,n){var l=function(e,t){return e&&"metric"===e.role&&t.unit&&t.unit.hasOwnProperty("label")?" ("+t.unit.label+")":""},r=t.label||n;return r.capitalize()+l(e,t)}function f(e,t,n){var l,r='<select name="'+t+'">',i=[];if(null!==n[1]){if(l=e.id,i=e.Dimension(),2===l.length)return(e.Dimension(n[0]).label||n[0]).capitalize()}else{var a=e.Dimension(t);if(l=a.id,i=a.Category(),1===l.length)return}return l.forEach(function(e,t){var l=e!==n[0]?"":'selected="selected" ';(null===n[1]||e!==n[1])&&(r+="<option "+l+'value="'+e+'">'+c(a,i[t],e)+"</option>")}),r+="</select>"}function d(e,t,n,l){var i="",a="",o="",s="",b=n.rows,p=t.Dimension(b),y=p.id,w=n.cols,E=t.Dimension(w),O=E.id,D=t.role&&t.role.metric?t.role.metric[0]:null,N=null!==D?t.Dimension(D):null,x=function(e){return e.hasOwnProperty("unit")&&e.unit&&e.unit.hasOwnProperty("decimals")?e.unit.decimals:null},z=n.filter,j=JSON.parse(JSON.stringify(z)),C=[],A="",J="",L=t.source?v.source+": "+t.source:"",R=null!==t.label?'<span class="label">'+t.label.capitalize()+"</span>":"";m&&S.length&&(R='<span class="label">'+S.join(". ")+"</span>"),""!==L&&"."!==L.slice(-1)&&(L+="."),o+="<caption>"+R+"<form>";for(var T in z){var q=t.Dimension(T),P=q.label?q.label.capitalize():T.capitalize();q.length>1?A+="<p>"+f(t,T,[z[T],null])+" <strong>"+P+"</strong></p>":C.push({label:P,value:c(q,q.Category(0)),name:T,id:q.id[0]})}""!==A&&(A='<fieldset id="filters"><legend>'+v.filters+"</legend>"+A+"</fieldset>"),C.forEach(function(e){J+="<p>"+e.value+" <strong>"+e.label+'</strong></p><input type="hidden" name="'+e.name+'" value="'+e.id+'" />'}),""!==J&&(J='<fieldset id="constants"><legend>'+v.constants+"</legend>"+J+"</fieldset>"),o+=J+A+'<fieldset id="rowscols"><legend>'+v.rc+"</legend>"+f(t,"rows",[b,w])+" <a>&#x2194;</a> "+f(t,"cols",[w,b])+"</fieldset></form></caption>",s+="<tbody>";var U=Number.toLocaleString?function(e,t){return null===t?e.toLocaleString(h):e.toLocaleString(h,{minimumFractionDigits:t,maximumFractionDigits:t})}:function(e,t){return null===t?e:e.toFixed(t)};return y.forEach(function(e){j[b]=e;var n=t.Data(j),l=function(e,t){var n,l=w!==D?null===N?null:x(N.Category(j[D])):x(E.Category(t));null!==e.value?(n=U(e.value,l),g&&null!==e.status&&(n+=" ("+e.status+")")):n=e.status||v.na,s+="<td>"+n+"</td>"};return null===n?void(s="ERROR"):(s+='<tr><th scope="row">'+c(p,p.Category(e))+"</th>","[object Array]"===Object.prototype.toString.call(n)?n.forEach(function(e,t){l(e,t)}):l(n,0),void(s+="</tr>"))}),"ERROR"===s?v.dataerror:(s+="</tbody>",i+="<thead><tr><th></th>",O.forEach(function(e){i+='<th scope="col">'+c(E,E.Category(e))+"</th>"}),i+="</tr></thead>",""!==L&&(a='<tfoot><tr><td colspan="'+(O.length+1)+'">'+L+"</td></tr></tfoot>"),e.innerHTML='<table class="'+l+'">'+o+i+a+s+"</table>",[].slice.call(e.querySelectorAll("select")).forEach(function(n){n.addEventListener("change",function(n){d(e,t,r(t,n.target.parentElement.getAttribute("id"),u(e)),l)},!1)}),void e.querySelector("a").addEventListener("click",function(){n.cols=b,n.rows=w,d(e,t,n,l)},!1))}if(void 0===e)return void l("urierror");if(void 0===t)return void l("selerror");void 0===n&&(n={});var v=void 0===n.i18n||void 0===n.i18n.msgs?{urierror:"tbrowser: A valid JSON-stat input must be specified.",selerror:"tbrowser: A valid selector must be specified.",jsonerror:"The request did not return a valid JSON-stat dataset.",dimerror:"Only one dimension was found in the dataset. At least two are required.",dataerror:"Selection returned no data!",source:"Source",filters:"Filters",constants:"Constants",rc:"Rows &amp; Columns",na:"n/a"}:n.i18n.msgs,h=void 0===n.i18n||void 0===n.i18n.locale?"en-US":n.i18n.locale,b=n.dsid||0,g=n.status||!1,p=n.tblclass||"",m=n.nonconst||!1,y=o(e,b);if(!i(y))return void l("jsonerror");if(m)var S=s(y);return 1===y.length?void l("dimerror"):void d(t,y,a(y,n.preset),p)}function t(e,t){if(void 0===e)return null;void 0===t&&(t={});var n="",l="",r=0,a=t.na||"n/a",s=t.dsid||0,u=t.vlabel||null,c=t.slabel||null,f=t.counter||!1,d=t.tblclass||"",v=t.numclass||"",h=t.valclass||"",b=t.status||!1,g=t.locale||"en-US",p=t.source||"Source",m=o(e,s),y=Number.toLocaleString?function(e){return e.toLocaleString(g)}:function(e){return e},S=f?function(e,t){n+=t?'<tr><td class="'+v+'">'+t+"</td>":'<tr><th class="'+v+'">#</th>',e.forEach(function(e,l){var r=E===l?' class="'+v+" "+h+'"':"",i=null===e?a:y(e);n+=t?"<td"+r+">"+i+"</td>":"<th"+r+">"+i+"</th>"}),n+="</tr>"}:function(e,t){n+="<tr>",e.forEach(function(e,l){var r=E===l?' class="'+v+" "+h+'"':"",i=null===e?a:y(e);n+=t?"<td"+r+">"+i+"</td>":"<th"+r+">"+i+"</th>"}),n+="</tr>"};if(!i(m))return null;var w=m.toTable({status:b,vlabel:u,slabel:c}),E=w[0].length-1;return w.forEach(function(e,t){S(e,t)}),m.source&&(r=m.length+1,f&&r++,b&&r++,p+=": "+m.source,"."!==p.slice(-1)&&(p+="."),l='<tfoot><td colspan="'+r+'">'+p+"</td></tfoot>"),'<table class="'+d+'"><caption>'+(t.caption||m.label||"")+"</caption>"+l+"<tbody>"+n+"</tbody></table>"}function n(e,t){if(void 0===e)return null;void 0===t&&(t={});var n=t.vlabel||"Value",l=t.slabel||"Status",r=t.type||"array",i=t.label||"",a=[],o=[],s=[],u=[],c={},f={},d=function(e,t){for(var n=1,l=0,r=0;m>r;r++)n*=r>0?t[m-r]:1,l+=n*e[m-r-1];return l},v=function(){var t=e[y][n];s[d(S,o)]=isNaN(t)?null:t};switch(r){case"array":e=function(e){for(var t=e[0],n=e.slice(1),l=[],r=0,i=n.length;i>r;r++){for(var a=0,o=t.length,s={};o>a;a++)s[t[a]]=n[r][a];l.push(s)}return l}(e);break;case"object":e=function(e){for(var t=e.cols.map(function(e){return e.id}),n=e.rows,l=[],r=0,i=n.length;i>r;r++){for(var a=0,o=t.length,s={};o>a;a++)s[t[a]]=n[r].c[a].v;l.push(s)}return l}(e)}var h=e.length;for(var b in e[0])if(b!==n)if(b!==l){a.push(b),c[b]=[];for(var g=0;h>g;g++){var p=e[g][b];-1===c[b].indexOf(p)&&c[b].push(p)}o.push(c[b].length),f[b]={label:b,category:{index:c[b]}}}else v=function(){var t=e[y][n];s[d(S,o)]=isNaN(t)?null:t,u[d(S,o)]=e[y][l]};for(var m=a.length,y=0;h>y;y++){for(var S=[],w=0;m>w;w++){var E=a[w];S.push(c[E].indexOf(e[y][E]))}v()}return{version:"2.0","class":"dataset",label:i,value:s,status:u,dimension:f,id:a,size:o}}function l(e,t){if(void 0===e)return null;void 0===t&&(t={});var n=[],l=t.vlabel||"Value",r=t.slabel||"Status",a=t.status||!1,s=t.na||"n/a",u=t.delimiter||",",c=";"===u?t.decimal||",":t.decimal||".",f=t.dsid||0,d=o(e,f);if(!i(d))return null;for(var v=d.toTable({vlabel:l,slabel:r,status:a,type:"array"}),h=v[0].indexOf(l),b=1,g=v.length;g>b;b++)null===v[b][h]?v[b][h]=s:"."!==c&&(v[b][h]=(v[b][h]+"").replace(".",c));return v.forEach(function(e){n+=e.join(u)+"\n"}),n}function r(e,t){if(void 0===e)return null;void 0===t&&(t={});var l=null,r=t.delimiter||",",i=t.vlabel,o=";"===r?t.decimal||",":t.decimal||".",s=a(e.trim(),r),u=s.length,c=s[0].length;if(void 0!==i){for(;c--;)if(s[0][c]===i){l=c;break}if(null===l)return null}else l=c-1,i=s[0][l];if(","===o)for(c=1;u>c;c++)s[c][l]=+s[c][l].replace(",",".");else for(c=1;u>c;c++)s[c][l]=+s[c][l];return n(s,{vlabel:i,slabel:t.slabel||"Status",type:"array",label:t.label||""})}function i(e){if(null===e||0===e.length||"dataset"!==e["class"])return!1;for(var t=e.length,n=1;t--;)n*=e.Dimension(t).length;return n!==e.n?!1:!0}function a(e,t){t=t||",";for(var n,l,r=RegExp("(\\"+t+'|\\r?\\n|\\r|^)(?:"([^"]*(?:""[^"]*)*)"|([^"\\'+t+"\\r\\n]*))","gi"),i=[[]],a=null;a=r.exec(e);)l=a[1],l.length&&l!=t&&i.push([]),n=a[2]?a[2].replace(RegExp('""',"g"),'"'):a[3],i[i.length-1].push(n);return i}function o(e,t){return void 0===e?null:(("string"==typeof e||void 0===e.length)&&(e=JSONstat(e)),0===e.length||"dataset"!==e["class"]&&"collection"!==e["class"]&&"bundle"!==e["class"]?null:"dataset"===e["class"]?e:e.Dataset(t))}function s(e){var t=0,n=e.size.slice(0),l=[];return n.forEach(function(n,r){var i=r-t,a=e.Dimension(i);1===n&&(delete e.__tree__.dimension[e.id[i]],e.size.splice(i,1),e.id.splice(i,1),e.length--,t++,l.push(a.label.capitalize()+": "+a.Category(0).label.capitalize()))}),l}function u(e,t){if(void 0===e||"[object Array]"!==Object.prototype.toString.call(e))return null;var n=JSON.parse(JSON.stringify(e)),l=n[0];if(!l.hasOwnProperty("version")||!l.hasOwnProperty("class")||"dataset"!==l["class"])return null;void 0===t&&(t={});var r=void 0===t.label?null:t.label,i=void 0===t.by?null:t.by,a=[];if(null===i){for(var o=1,s=n.length;s>o;o++)a=a.concat(n[o].value);return l.value=a,null!==r&&(l.label=r),l}var u,c,f,d=function(e,t,n){if("[object Array]"===Object.prototype.toString.call(e))e=e.concat(t);else for(var l in t)e[l]=0===t[l]?n:t[l];return e};n.forEach(function(e,t){var n=JSONstat(e).toTable({status:!0}),l=e.dimension[i].category;0===t?(a=[n[0]],u=l.index,c=l.label,f=l.unit):(u=d(u,l.index,t),c=d(c,l.label,t),f=d(f,l.unit,t)),a=a.concat(n.slice(1))});var v=JSONstatUtils.fromTable(a);return l.value=v.value,l.size=v.size,l.status=v.status||null,l.label=r||"",l.href=null,l.dimension[i].category.index=u||null,l.dimension[i].category.label=c||null,l.dimension[i].category.unit=f||null,l}return String.prototype.capitalize=function(){return this.charAt(0).toUpperCase()+this.slice(1)},{tbrowser:e,datalist:t,fromTable:n,fromCSV:r,toCSV:l,join:u,version:"2.2.4"}}();
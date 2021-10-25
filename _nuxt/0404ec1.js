(window.webpackJsonp=window.webpackJsonp||[]).push([[38],{742:function(e,t,r){"use strict";r.r(t);r(90),r(43),r(22),r(29),r(48),r(37),r(9),r(51),r(54),r(41);var n=r(24),o=r(28),c=r(42),l=r(47),f=r(45),d=r(32),v=r(17),h=(r(78),r(14),r(38),r(184),r(91));function m(e,t){var r="undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(!r){if(Array.isArray(e)||(r=function(e,t){if(!e)return;if("string"==typeof e)return y(e,t);var r=Object.prototype.toString.call(e).slice(8,-1);"Object"===r&&e.constructor&&(r=e.constructor.name);if("Map"===r||"Set"===r)return Array.from(e);if("Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r))return y(e,t)}(e))||t&&e&&"number"==typeof e.length){r&&(e=r);var i=0,n=function(){};return{s:n,n:function(){return i>=e.length?{done:!0}:{done:!1,value:e[i++]}},e:function(e){throw e},f:n}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var o,c=!0,l=!1;return{s:function(){r=r.call(e)},n:function(){var e=r.next();return c=e.done,e},e:function(e){l=!0,o=e},f:function(){try{c||null==r.return||r.return()}finally{if(l)throw o}}}}function y(e,t){(null==t||t>e.length)&&(t=e.length);for(var i=0,r=new Array(t);i<t;i++)r[i]=e[i];return r}function k(e){var t=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}();return function(){var r,n=Object(d.a)(e);if(t){var o=Object(d.a)(this).constructor;r=Reflect.construct(n,arguments,o)}else r=n.apply(this,arguments);return Object(f.a)(this,r)}}var w=function(e,t,r,desc){var n,o=arguments.length,c=o<3?t:null===desc?desc=Object.getOwnPropertyDescriptor(t,r):desc;if("object"===("undefined"==typeof Reflect?"undefined":Object(v.a)(Reflect))&&"function"==typeof Reflect.decorate)c=Reflect.decorate(e,t,r,desc);else for(var i=e.length-1;i>=0;i--)(n=e[i])&&(c=(o<3?n(c):o>3?n(t,r,c):n(t,r))||c);return o>3&&c&&Object.defineProperty(t,r,c),c},x=r(626).Network,j=function(e){Object(l.a)(f,e);var t,r=k(f);function f(){var e;return Object(o.a)(this,f),(e=r.apply(this,arguments)).title="ネットワーク",e.search="",e.nodes=[],e.edges=[],e.options={layout:{randomSeed:2}},e.items2=[],e.headers=[{text:"sent",value:"sent"},{text:"received",value:"received"},{text:"count",value:"count"}],e.baseUrl="https://hi-ut.github.io/iriki",e}return Object(c.a)(f,[{key:"asyncData",value:(t=Object(n.a)(regeneratorRuntime.mark((function e(t){var r,n,o,c,l;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(r=t.payload,n=t.app,o=t.$axios,!r){e.next=5;break}return e.abrupt("return",{item:r});case 5:return n.context.params.id,e.next=8,o.$get("https://hi-ut.github.io/iriki/data/index.json");case 8:return c=e.sent,l=c,e.abrupt("return",{items:l});case 11:case"end":return e.stop()}}),e)}))),function(e){return t.apply(this,arguments)})},{key:"created",value:function(){var e,map={},t=m(this.items);try{for(t.s();!(e=t.n()).done;){var r=e.value,n=r.sent,o=r.received;if(n&&o){n=n[0],o=o[0],map[n]||(map[n]={});var c=map[n];c[o]||(c[o]=0),c[o]+=1}}}catch(e){t.e(e)}finally{t.f()}var l={},f=[],d=[];for(var v in map)for(var h in map[v]){var y={sent:v,received:h,count:map[v][h]};d.push(y),l[v]||(l[v]={id:v,label:v}),l[h]||(l[h]={id:h,label:h}),f.push({from:v,to:h,value:y.count,arrows:"to"})}var k=[];for(var w in l)k.push(l[w]);this.nodes=k,this.edges=f,this.items2=d}}]),f}(h.Vue),O=j=w([Object(h.Component)({components:{Network:x}})],j),R=r(97),_=r(111),S=r.n(_),C=r(575),A=r(722),P=r(566),component=Object(R.a)(O,(function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",[r("v-container",{staticClass:"my-5"},[r("h3",{staticClass:"mb-5"},[e._v(e._s(e.title))]),e._v(" "),r("div",{ref:"full",staticStyle:{height:"500px"}},[r("network",{ref:"network",staticStyle:{height:"100%","background-color":"#f5f5f5"},attrs:{id:"mynetwork",nodes:e.nodes,edges:e.edges,options:e.options}})],1),e._v(" "),r("v-data-table",{staticClass:"mt-10",attrs:{headers:e.headers,items:e.items2,search:e.search},scopedSlots:e._u([{key:"top",fn:function(){return[r("v-text-field",{staticClass:"mb-5",attrs:{rounded:"",filled:"","append-icon":"mdi-magnify",clearable:!0,dense:"","hide-details":""},model:{value:e.search,callback:function(t){e.search=t},expression:"search"}})]},proxy:!0},{key:"item.sent",fn:function(t){var n=t.item;return[r("nuxt-link",{attrs:{to:e.localePath({name:"people-id",params:{id:n.sent}})}},[e._v("\n          "+e._s(n.sent)+"\n        ")])]}},{key:"item.received",fn:function(t){var n=t.item;return[r("nuxt-link",{attrs:{to:e.localePath({name:"people-id",params:{id:n.received}})}},[e._v("\n          "+e._s(n.received)+"\n        ")])]}}])})],1)],1)}),[],!1,null,null,null);t.default=component.exports;S()(component,{VContainer:C.a,VDataTable:A.a,VTextField:P.a})}}]);
(window.webpackJsonp=window.webpackJsonp||[]).push([[41],{740:function(e,t,n){"use strict";n.r(t);n(90);var r=n(24),o=n(28),c=n(42),l=n(47),f=n(45),d=n(32),m=n(17),h=(n(78),n(14),n(91));function v(e){var t=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}();return function(){var n,r=Object(d.a)(e);if(t){var o=Object(d.a)(this).constructor;n=Reflect.construct(r,arguments,o)}else n=r.apply(this,arguments);return Object(f.a)(this,n)}}var y=function(e,t,n,desc){var r,o=arguments.length,c=o<3?t:null===desc?desc=Object.getOwnPropertyDescriptor(t,n):desc;if("object"===("undefined"==typeof Reflect?"undefined":Object(m.a)(Reflect))&&"function"==typeof Reflect.decorate)c=Reflect.decorate(e,t,n,desc);else for(var i=e.length-1;i>=0;i--)(r=e[i])&&(c=(o<3?r(c):o>3?r(t,n,c):r(t,n))||c);return o>3&&c&&Object.defineProperty(t,n,c),c},k=n(625).Network,j=function(e){Object(l.a)(f,e);var t,n=v(f);function f(){var e;return Object(o.a)(this,f),(e=n.apply(this,arguments)).nodes=[],e.edges=[],e.options={layout:{randomSeed:2}},e.headers=[{text:"image",value:"image"},{text:"label",value:"label"},{text:"description",value:"description",width:"60%"},{text:"url",value:"url"}],e.baseUrl="https://hi-ut.github.io/iriki",e}return Object(c.a)(f,[{key:"asyncData",value:(t=Object(r.a)(regeneratorRuntime.mark((function e(t){var n,r,o,c;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(n=t.payload,t.app,r=t.$axios,!n){e.next=5;break}return e.abrupt("return",{item:n});case 5:return e.next=7,r.$get("https://hi-ut.github.io/iriki/data/people.json");case 7:return o=e.sent,c=o,e.abrupt("return",{items:c});case 10:case"end":return e.stop()}}),e)}))),function(e){return t.apply(this,arguments)})}]),f}(h.Vue),O=j=y([Object(h.Component)({components:{Network:k}})],j),w=n(97),x=n(111),R=n.n(x),_=n(575),P=n(720),V=n(178),component=Object(w.a)(O,(function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[n("v-container",[n("v-data-table",{staticClass:"mt-10",attrs:{headers:e.headers,items:e.items},scopedSlots:e._u([{key:"item.image",fn:function(t){var r=t.item;return[n("nuxt-link",{attrs:{to:e.localePath({name:"people-id",params:{id:r.label}})}},[n("v-img",{attrs:{src:r.image,contain:"",width:"90px"}})],1)]}},{key:"item.label",fn:function(t){var r=t.item;return[n("nuxt-link",{attrs:{to:e.localePath({name:"people-id",params:{id:r.label}})}},[e._v("\n    "+e._s(r.label)+"\n    ")])]}},{key:"item.url",fn:function(t){var r=t.item;return[n("a",{attrs:{target:"_blank",href:r.url}},[e._v("\n    リンク\n    ")])]}}])})],1)],1)}),[],!1,null,null,null);t.default=component.exports;R()(component,{VContainer:_.a,VDataTable:P.a,VImg:V.a})}}]);
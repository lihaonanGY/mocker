!function(t){function e(e){for(var n,i,r=e[0],o=e[1],s=0,l=[];s<r.length;s++)i=r[s],a[i]&&l.push(a[i][0]),a[i]=0;for(n in o)Object.prototype.hasOwnProperty.call(o,n)&&(t[n]=o[n]);for(c&&c(e);l.length;)l.shift()()}var n={},a={5:0};function i(e){if(n[e])return n[e].exports;var a=n[e]={i:e,l:!1,exports:{}};return t[e].call(a.exports,a,a.exports,i),a.l=!0,a.exports}i.e=function(t){var e=[],n=a[t];if(0!==n)if(n)e.push(n[2]);else{var r=new Promise(function(e,i){n=a[t]=[e,i]});e.push(n[2]=r);var o=document.getElementsByTagName("head")[0],s=document.createElement("script");s.charset="utf-8",s.timeout=120,i.nc&&s.setAttribute("nonce",i.nc),s.src=i.p+"js/chunk/"+({}[t]||t)+"."+{0:"b913cf52"}[t]+".js";var c=setTimeout(function(){l({type:"timeout",target:s})},12e4);function l(e){s.onerror=s.onload=null,clearTimeout(c);var n=a[t];if(0!==n){if(n){var i=e&&("load"===e.type?"missing":e.type),r=e&&e.target&&e.target.src,o=new Error("Loading chunk "+t+" failed.\n("+i+": "+r+")");o.type=i,o.request=r,n[1](o)}a[t]=void 0}}s.onerror=s.onload=l,o.appendChild(s)}return Promise.all(e)},i.m=t,i.c=n,i.d=function(t,e,n){i.o(t,e)||Object.defineProperty(t,e,{configurable:!1,enumerable:!0,get:n})},i.r=function(t){Object.defineProperty(t,"__esModule",{value:!0})},i.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return i.d(e,"a",e),e},i.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},i.p="/public/",i.oe=function(t){throw t};var r=window.webpackJsonp=window.webpackJsonp||[],o=r.push.bind(r);r.push=e,r=r.slice();for(var s=0;s<r.length;s++)e(r[s]);var c=o;i(i.s="1Q8R")}({"+VV4":function(t,e){},"1Q8R":function(t,e,n){"use strict";n.r(e);var a=n("xHOL"),i=n("ukxx"),r=n.n(i),o=n("Mb3Q"),s=n("L2JU"),c=n("vDqi"),l=n.n(c);r.a.use(s.default);var u,p={FETCH_ARTICLE_LIST:function(t){var e=t.commit;t.dispatch;return t.state.articleList.length?Promise.resolve():l.a.get("http://localhost:7001/app/api/article/list").then(function(t){var n=t.data.list;return e("SET_ARTICLE_LIST",n),n})},FETCH_ARTICLE_DETAIL:function(t,e){var n=t.commit,a=(t.dispatch,t.state),i=e.id;return a.article.id!=i?l.a.get("http://localhost:7001/app/api/article/"+i).then(function(t){var e=t.data;n("SET_ARTICLE_DETAIL",e)}):Promise.resolve()}},d={};function v(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}var f=(v(u={},"SET_ARTICLE_LIST",function(t,e){t.articleList=e}),v(u,"SET_ARTICLE_DETAIL",function(t,e){t.article=e}),u);r.a.use(s.default);var _=new s.default.Store({state:{articleList:[],article:{}},actions:p,getters:d,mutations:f}),h=n("jE9Z"),m={computed:{isLoading:function(){return!1},articleList:function(){return this.$store.state.articleList}},preFetch:function(t){t.state;var e=t.dispatch;t.commit;return Promise.all([e("FETCH_ARTICLE_LIST")])},beforeMount:function(){return Promise.all([this.$store.dispatch("FETCH_ARTICLE_LIST")])}},w=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticStyle:{"font-size":"24px","text-align":"center"}},[a("div",{staticClass:"container smart-container"},[a("div",{staticClass:"row row-offcanvas row-offcanvas-right"},[a("div",{staticClass:"col-xs-12 col-sm-9"},[a("ul",{staticClass:"smart-artiles",attrs:{id:"articleList"}},t._l(t.articleList,function(e){return a("li",[a("div",{staticClass:"point"},[t._v("+"+t._s(e.hits))]),t._v(" "),a("div",{staticClass:"card"},[a("h2",[a("router-link",{staticClass:"nav-item-a",attrs:{to:"/detail/"+e.id}},[t._v(t._s(e.title))])],1),t._v(" "),a("div",[a("ul",{staticClass:"actions"},[a("li",[a("time",{staticClass:"timeago"},[t._v(t._s(e.moduleName))])]),t._v(" "),t._m(0,!0),t._v(" "),a("li",[a("a",{attrs:{href:e.url,target:"_blank"}},[t._v("原文")])]),t._v(" "),a("li",[a("span",{staticClass:"timeago"},[t._v(t._s(e.summary))])]),t._v(" "),t._m(1,!0)])])])])})),t._v(" "),t.isLoading?a("div",{staticClass:"smart-pager",attrs:{id:"pagerBottom"}},[a("img",{attrs:{src:n("WLa1")}})]):t._e()])])])])};w._withStripped=!0;var C=n("JFUb"),b=!1;var g=function(t){b||n("Ymd7")},y=Object(C.a)(m,w,[function(){var t=this.$createElement,e=this._self._c||t;return e("li",{staticClass:"tauthor"},[e("a",{staticClass:"get",attrs:{href:"#",target:"_blank"}},[this._v("Sky")])])},function(){var t=this.$createElement,e=this._self._c||t;return e("li",[e("span",{staticClass:"timeago"})])}],!1,g,null,null);y.options.__file="app/web/page/app/component/list.vue";var L=y.exports;r.a.use(h.default);var E=new h.default({mode:"history",base:"/app",routes:[{path:"/",component:L},{path:"/list",component:L},{path:"/detail/:id",component:function(){return n.e(0).then(n.bind(null,"6mNS"))}}]}),T={data:function(){return{selectedMenu:"/app"}},computed:{},mounted:function(){this.selectedMenu=window.location.pathname.toLowerCase().replace(/\/$/,"")}},x=function(){var t=this.$createElement,e=this._self._c||t;return e("header",{staticClass:"header"},[e("div",{staticClass:"container"},[this._m(0),this._v(" "),e("ul",{staticClass:"nav"},[e("li",{staticClass:"nav-item"},[e("a",{class:{active:"/app"===this.selectedMenu},attrs:{href:"/app"}},[this._v("aaaaaaaaaaa")])]),this._v(" "),e("li",{staticClass:"nav-item"},[e("a",{class:{active:"/"===this.selectedMenu},attrs:{href:"/"}},[this._v("bbbbbb")])])])])])};x._withStripped=!0;var S=!1;var j=function(t){S||n("l6dC")},O=Object(C.a)(T,x,[function(){var t=this.$createElement,e=this._self._c||t;return e("h1",[e("a",{staticClass:"router-link-active",attrs:{href:""}},[this._v("Mocker模仿者")])])}],!1,j,null,null);O.options.__file="app/web/component/layout/app/header/header.vue";var $=O.exports,I=function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"main"},[e("div",{staticClass:"page-container page-component"},[this._t("content")],2)])};I._withStripped=!0;var k=!1;var M=function(t){k||n("+VV4")},A=Object(C.a)({name:"v-content",data:function(){return{}},components:{},mounted:function(){}},I,[],!1,M,null,null);A.options.__file="app/web/component/layout/app/content/content.vue";var R={components:{LayoutHeader:$,LayoutContent:A.exports}},P=function(){var t=this.$createElement,e=this._self._c||t;return e("div",[e("LayoutHeader"),this._v(" "),e("LayoutContent",[e("div",{attrs:{slot:"content"},slot:"content"},[this._t("main")],2)])],1)};P._withStripped=!0;var H=!1;var J=function(t){H||n("Kt4m")},D=Object(C.a)(R,P,[],!1,J,null,null);D.options.__file="app/web/component/layout/app/main.vue";D.exports;Object(o.sync)(_,E);var F={router:E,store:_,computed:{},mounted:function(){}},N=function(){var t=this.$createElement,e=this._self._c||t;return e("layout",[e("transition",{attrs:{name:"fade",mode:"out-in"}},[e("router-view")],1)],1)};N._withStripped=!0;var U=Object(C.a)(F,N,[],!1,null,null,null);U.options.__file="app/web/page/app/app.vue";var V=U.exports,q=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var a in n)Object.prototype.hasOwnProperty.call(n,a)&&(t[a]=n[a])}return t};e.default=Object(a.a)(q({},V))},"8wy/":function(t,e){t.exports=vendor},JFUb:function(t,e,n){"use strict";function a(t,e,n,a,i,r,o,s){var c=typeof(t=t||{}).default;"object"!==c&&"function"!==c||(t=t.default);var l,u="function"==typeof t?t.options:t;if(e&&(u.render=e,u.staticRenderFns=n,u._compiled=!0),a&&(u.functional=!0),r&&(u._scopeId=r),o?(l=function(t){(t=t||this.$vnode&&this.$vnode.ssrContext||this.parent&&this.parent.$vnode&&this.parent.$vnode.ssrContext)||"undefined"==typeof __VUE_SSR_CONTEXT__||(t=__VUE_SSR_CONTEXT__),i&&i.call(this,t),t&&t._registeredComponents&&t._registeredComponents.add(o)},u._ssrRegister=l):i&&(l=s?function(){i.call(this,this.$root.$options.shadowRoot)}:i),l)if(u.functional){u._injectStyles=l;var p=u.render;u.render=function(t,e){return l.call(e),p(t,e)}}else{var d=u.beforeCreate;u.beforeCreate=d?[].concat(d,l):[l]}return{exports:t,options:u}}n.d(e,"a",function(){return a})},Kt4m:function(t,e){},L2JU:function(t,e,n){t.exports=n("8wy/")("L2JU")},Mb3Q:function(t,e,n){t.exports=n("8wy/")("Mb3Q")},TlJg:function(t,e){},WLa1:function(t,e,n){t.exports=n.p+"img/loading.0c81ad12.gif"},Ymd7:function(t,e){},fij5:function(t,e){},jE9Z:function(t,e,n){t.exports=n("8wy/")("jE9Z")},l6dC:function(t,e){},snwd:function(t,e){},uXrG:function(t,e){},ukxx:function(t,e,n){t.exports=n("8wy/")("ukxx")},vDqi:function(t,e,n){t.exports=n("8wy/")("vDqi")},xHOL:function(t,e,n){"use strict";var a=n("ukxx"),i=n.n(a);i.a.filter("removeHtml",function(t){return t&&t.replace(/<(?:.|\n)*?>/gm,"").replace(/(&rdquo;)/g,'"').replace(/&ldquo;/g,'"').replace(/&mdash;/g,"-").replace(/&nbsp;/g,"").replace(/&gt;/g,">").replace(/&lt;/g,"<").replace(/<[\w\s"':=\/]*/,"")});n("TlJg");var r={data:function(){return{selectedMenu:"/"}},computed:{},mounted:function(){this.selectedMenu=window.location.pathname.toLowerCase()}},o=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("header",{staticClass:"header"},[n("div",{staticClass:"container"},[t._m(0),t._v(" "),n("ul",{staticClass:"nav"},[n("li",{staticClass:"nav-item"},[n("a",{class:{active:"/"===t.selectedMenu},attrs:{href:"/"}},[t._v("Server-Render")])]),t._v(" "),n("li",{staticClass:"nav-item"},[n("a",{class:{active:"/client"===t.selectedMenu},attrs:{href:"/client"}},[t._v("Client-Render")])]),t._v(" "),n("li",{staticClass:"nav-item"},[n("a",{class:{active:"/dynamic"===t.selectedMenu},attrs:{href:"/dynamic"}},[t._v("Vue-Component-Dynamic")])])])])])};o._withStripped=!0;var s=n("JFUb"),c=!1;var l=function(t){c||n("snwd")},u=Object(s.a)(r,o,[function(){var t=this.$createElement,e=this._self._c||t;return e("h1",[e("a",{staticClass:"router-link-active",attrs:{href:"/"}},[this._v("Mocker模仿者")])])}],!1,l,null,null);u.options.__file="app/web/component/layout/standard/header/header.vue";var p=u.exports,d=function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"main"},[e("div",{staticClass:"page-container page-component"},[this._t("content")],2)])};d._withStripped=!0;var v=!1;var f=function(t){v||n("fij5")},_=Object(s.a)({name:"v-content",data:function(){return{}},components:{},mounted:function(){}},d,[],!1,f,null,null);_.options.__file="app/web/component/layout/standard/content/content.vue";var h={components:{LayoutHeader:p,LayoutContent:_.exports}},m=function(){var t=this.$createElement,e=this._self._c||t;return e("div",[e("LayoutHeader"),this._v(" "),e("LayoutContent",[e("div",{attrs:{slot:"content"},slot:"content"},[this._t("main")],2)])],1)};m._withStripped=!0;var w=!1;var C=function(t){w||n("uXrG")},b=Object(s.a)(h,m,[],!1,C,null,null);b.options.__file="app/web/component/layout/standard/main.vue";var g='<div id="app"><MainLayout><div slot="main"><slot></slot></div></MainLayout></div>',y={name:"Layout",props:["title","description","keywords"],components:{MainLayout:b.exports},computed:{vTitle:function(){return this.$root.title||this.title||"Egg + Vue"},vKeywords:function(){return this.$root.keywords||this.keywords||"egg, vue, webpack, server side render"},vDescription:function(){return this.$root.description||this.description||"egg-vue-webpack server side render"},baseClass:function(){return this.$root.baseClass}},template:g};i.a.component(y.name,y);var L=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var a in n)Object.prototype.hasOwnProperty.call(n,a)&&(t[a]=n[a])}return t};e.a=function(t){i.a.prototype.$http=n("vDqi"),t.store?t.store.replaceState(L({},window.__INITIAL_STATE__,t.store.state)):window.__INITIAL_STATE__&&(t.data=L(window.__INITIAL_STATE__,t.data&&t.data())),new i.a(t).$mount("#app")}}});
require("../../common/manifest.js");
require("../../common/vendor.js");
global.webpackJsonp([7],{23:function(t,e,i){"use strict";var o=a(i(0)),n=a(i(24));function a(t){return t&&t.__esModule?t:{default:t}}new o.default(n.default).$mount()},24:function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=i(26),n=i.n(o),a=i(27),c=!1;var s=function(t){c||i(25)},r=i(1)(n.a,a.a,s,null,null);r.options.__file="..\\..\\..\\..\\Project\\Comic\\pages\\comic-detail\\comic-detail.vue",r.esModule&&Object.keys(r.esModule).some(function(t){return"default"!==t&&"__"!==t.substr(0,2)})&&console.error("named exports are not supported in *.vue files."),r.options.functional&&console.error("[vue-loader] comic-detail.vue: functional components are not supported with templates, they should use render functions."),e.default=r.exports},25:function(t,e){},26:function(t,e,i){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default={data:function(){return{imgPrefix:"",comic:{},imgs:[]}},onShareAppMessage:function(){return{title:this.comic.title,path:"/pages/comic-detail/comic-detail?detailData="+JSON.stringify(this.comic)}},onLoad:function(e){t.showLoading(),this.imgPrefix=this.$imgUrl,this.comic=JSON.parse(e.detailData),this.getDetail(),t.setNavigationBarTitle({title:this.comic.title})},methods:{getDetail:function(){var e=this;t.request({url:this.$requestUrl+"reading",method:"GET",data:{comic_id:this.comic.comic_id,chapter:this.comic.chapter,openid:t.getStorageSync("openid")},success:function(t){var i=t.data;1==i.status&&(e.imgs=i.data)},fail:function(){console.log("fail")},complete:function(){t.hideLoading()}})}}}}).call(e,i(2).default)},27:function(t,e,i){"use strict";var o=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("view",{staticClass:"page"},[i("view",{staticClass:"article-content"},t._l(t.imgs,function(e,o){return i("image",{key:o,attrs:{"lazy-load":"",src:t.imgPrefix+e,mode:"widthFix"}})}))])};o._withStripped=!0;var n={render:o,staticRenderFns:[]};e.a=n}},[23]);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/comic-detail/comic-detail.js.map
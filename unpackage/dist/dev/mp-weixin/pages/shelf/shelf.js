require("../../common/manifest.js");
require("../../common/vendor.js");
global.webpackJsonp([2],{28:function(t,e,s){"use strict";var i=o(s(0)),n=o(s(29));function o(t){return t&&t.__esModule?t:{default:t}}new i.default(n.default).$mount()},29:function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=s(31),n=s.n(i),o=s(32),a=!1;var u=function(t){a||s(30)},l=s(1)(n.a,o.a,u,null,null);l.options.__file="..\\..\\..\\..\\Project\\Comic\\pages\\shelf\\shelf.vue",l.esModule&&Object.keys(l.esModule).some(function(t){return"default"!==t&&"__"!==t.substr(0,2)})&&console.error("named exports are not supported in *.vue files."),l.options.functional&&console.error("[vue-loader] shelf.vue: functional components are not supported with templates, they should use render functions."),e.default=l.exports},30:function(t,e){},31:function(t,e,s){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default={data:function(){return{productList:[]}},onLoad:function(){t.showLoading(),this.getList()},methods:{getList:function(){var e=this,s={type:arguments.length>0&&void 0!==arguments[0]?arguments[0]:"-1"};t.request({url:this.$requestUrl+"get_comic_list",data:s,success:function(t){var s=t.data;if(1==s.status){var i=s.data;e.productList=e.reload?i:e.productList.concat(i),e.reload=!1}},fail:function(t,e){console.log("fail"+JSON.stringify(t))},complete:function(){t.hideLoading()}})}}}}).call(e,s(2).default)},32:function(t,e,s){"use strict";var i=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("view",{staticClass:"uni-list"},[t._l(t.productList,function(e,i){return s("view",{key:i,staticClass:"uni-list-cell",attrs:{eventid:"ZAj-0-"+i},on:{tap:function(s){t.goDetail(e)}}},[s("view",{staticClass:"uni-media-list"},[s("image",{staticClass:"uni-media-list-logo",attrs:{src:e.cover,mode:"aspectFill"}}),s("view",{staticClass:"uni-media-list-body"},[s("view",{staticClass:"uni-media-list-text-top"},[t._v(t._s(e.title))]),s("view",{staticClass:"uni-media-list-text-bottom"},[s("text",[t._v(t._s(e.release_type_name))]),s("text",[t._v(t._s(e.created_at))])])])])])}),0==t.productList.length?s("view",{staticClass:"none"}):t._e()],2)};i._withStripped=!0;var n={render:i,staticRenderFns:[]};e.a=n}},[28]);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/shelf/shelf.js.map
require("../../common/manifest.js");
require("../../common/vendor.js");
global.webpackJsonp([5],[,,,,,,,,,,function(t,e,i){"use strict";var a=s(i(0)),n=s(i(11));function s(t){return t&&t.__esModule?t:{default:t}}new a.default(n.default).$mount()},function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=i(13),n=i.n(a),s=i(14),r=!1;var o=function(t){r||i(12)},c=i(1)(n.a,s.a,o,null,null);c.options.__file="F:\\project\\Comic\\pages\\index\\index.vue",c.esModule&&Object.keys(c.esModule).some(function(t){return"default"!==t&&"__"!==t.substr(0,2)})&&console.error("named exports are not supported in *.vue files."),c.options.functional&&console.error("[vue-loader] index.vue: functional components are not supported with templates, they should use render functions."),e.default=c.exports},function(t,e){},function(t,e,i){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default={data:function(){return{indicatorDots:!0,indicatorColor:"#007aff",autoplay:!0,interval:5e3,duration:500,bannerData:[],navData:[{img:"../../static/image/women.png",title:"女生榜"},{img:"../../static/image/man.png",title:"男生榜"},{img:"../../static/image/popular.png",title:"人气榜"},{img:"../../static/image/new.png",title:"新作榜"},{img:"../../static/image/rank.png",title:"追更榜"}],productData:[]}},onLoad:function(){t.showLoading(),this.getBanner(),this.getProduct()},methods:{getBanner:function(){var e=this;t.request({url:this.$requestUrl+"get_comic_banner",method:"GET",success:function(t){e.bannerData=t.data.data},fail:function(){},complete:function(){}})},getProduct:function(){var e=this;t.request({url:this.$requestUrl+"get_comic_by_release",method:"GET",success:function(t){e.productData=t.data.data},fail:function(){},complete:function(){t.hideLoading()}})},goList:function(e){var i={release_type_id:e.release_type_id,release_type_name:e.release_type_name};t.navigateTo({url:"../release/release?detailData="+JSON.stringify(i)})},goInfo:function(e){var i={comic_id:e.id,title:e.title};t.navigateTo({url:"../comic-info/comic-info?detailData="+JSON.stringify(i)})}},onShareAppMessage:function(){return{title:"漫画",path:"/pages/index/index"}}}}).call(e,i(2).default)},function(t,e,i){"use strict";var a=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("view",{staticClass:"container"},[i("swiper",{attrs:{"indicator-dots":t.indicatorDots,"indicator-active-color":t.indicatorColor,autoplay:t.autoplay,interval:t.interval,duration:t.duration}},t._l(t.bannerData,function(t,e){return i("swiper-item",{key:e,attrs:{mpcomid:"4uT-0-"+e}},[i("view",{staticClass:"swiper-item"},[i("image",{attrs:{src:t.banner_url}})])])})),i("view",{staticClass:"nav"},t._l(t.navData,function(e,a){return i("view",{key:a,staticClass:"nav-item"},[i("image",{staticClass:"img",attrs:{src:e.img}}),i("text",{staticClass:"title"},[t._v(t._s(e.title))])])})),t._m(0),t._l(t.productData,function(e,a){return i("view",{key:a,staticClass:"list"},[i("view",{staticClass:"list-header"},[t._v("\n\t\t\t\t"+t._s(e.release_type_name)+"\n\t\t\t\t"),i("view",{staticClass:"more",attrs:{eventid:"Ejb-0-"+a},on:{tap:function(i){t.goList(e)}}},[i("image",{staticClass:"more-icon",attrs:{src:"../../static/image/right.png"}})])]),i("view",{staticClass:"list-body"},t._l(e.products,function(e,n){return i("view",{key:n,staticClass:"product",attrs:{eventid:"vek-1-"+a+"-"+n},on:{tap:function(i){t.goInfo(e)}}},[i("image",{staticClass:"product-img",attrs:{src:e.cover,mode:"scaleToFill"}}),i("view",{staticClass:"product-title uni-ellipsis"},[t._v("\n\t\t\t\t\t\t"+t._s(e.title)+"\n\t\t\t\t\t")]),i("view",{staticClass:"product-brief uni-ellipsis"},[t._v("\n\t\t\t\t\t\t"+t._s(e.brief)+"\n\t\t\t\t\t")])])}))])})],2)};a._withStripped=!0;var n={render:a,staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("view",{staticClass:"line"},[e("text")])}]};e.a=n}],[10]);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/index/index.js.map
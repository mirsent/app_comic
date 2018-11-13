require("../../common/manifest.js");
require("../../common/vendor.js");
global.webpackJsonp([1],[,,,,,,,,,,,,,,function(t,e,i){"use strict";var a=s(i(0)),n=s(i(15));function s(t){return t&&t.__esModule?t:{default:t}}new a.default(n.default).$mount()},function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=i(17),n=i.n(a),s=i(19),r=!1;var o=function(t){r||i(16)},l=i(1)(n.a,s.a,o,null,null);l.options.__file="F:\\project\\Comic\\pages\\comic\\comic.vue",l.esModule&&Object.keys(l.esModule).some(function(t){return"default"!==t&&"__"!==t.substr(0,2)})&&console.error("named exports are not supported in *.vue files."),l.options.functional&&console.error("[vue-loader] comic.vue: functional components are not supported with templates, they should use render functions."),e.default=l.exports},function(t,e){},function(t,e,i){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0});i(18).dateUtils;e.default={data:function(){return{bannerData:[],listData:[],reload:!1}},onLoad:function(){t.showLoading(),this.getBanner(),this.getList()},onPullDownRefresh:function(){this.reload=!0,this.last_id="",this.getBanner(),this.getList()},onReachBottom:function(){this.getList()},methods:{getBanner:function(){var e=this;t.request({url:this.$requestUrl+"get_comic_banner",success:function(i){t.stopPullDownRefresh();var a=i.data;1==a.status&&(e.bannerData=a.data)},fail:function(t,e){console.log("fail"+JSON.stringify(t))}})},getList:function(){var e=this;t.request({url:this.$requestUrl+"get_comic_list",data:{},success:function(t){var i=t.data;if(1==i.status){var a=i.data;e.listData=e.reload?a:e.listData.concat(a),e.reload=!1}},fail:function(t,e){console.log("fail"+JSON.stringify(t))},complete:function(){t.hideLoading()}})},goDetail:function(e){var i={id:e.id,name:e.name,cover:e.cover,release_type_name:e.release_type_name,created_at:e.created_at};t.navigateTo({url:"../comic-detail/comic-detail?detailData="+JSON.stringify(i)})}}}}).call(e,i(2).default)},function(t,e,i){"use strict";var a={UNITS:{"年":315576e5,"月":26298e5,"天":864e5,"小时":36e5,"分钟":6e4,"秒":1e3},humanize:function(t){var e="";for(var i in this.UNITS)if(t>=this.UNITS[i]){e=Math.floor(t/this.UNITS[i])+i+"前";break}return e||"刚刚"},format:function(t){var e=this.parse(t),i=Date.now()-e.getTime();if(i<this.UNITS["天"])return this.humanize(i);var a=function(t){return t<10?"0"+t:t};return e.getFullYear()+"/"+a(e.getMonth()+1)+"/"+a(e.getDay())+"-"+a(e.getHours())+":"+a(e.getMinutes())},parse:function(t){var e=t.split(/[^0-9]/);return new Date(e[0],e[1]-1,e[2],e[3],e[4],e[5])}};t.exports={formatTime:function(t){if("number"!=typeof t||t<0)return t;var e=parseInt(t/3600);return t%=3600,[e,parseInt(t/60),t%=60].map(function(t){return(t=t.toString())[1]?t:"0"+t}).join(":")},formatLocation:function(t,e){return"string"==typeof t&&"string"==typeof e&&(t=parseFloat(t),e=parseFloat(e)),t=t.toFixed(2),e=e.toFixed(2),{longitude:t.toString().split("."),latitude:e.toString().split(".")}},dateUtils:a}},function(t,e,i){"use strict";var a=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("view",{staticClass:"page"},[i("view",{staticClass:"banner"},[i("swiper",{attrs:{"indicator-dots":!0,autoplay:!0,interval:3e3,duration:1e3}},t._l(t.bannerData,function(t,e){return i("swiper-item",{key:e,attrs:{mpcomid:"lN7-0-"+e}},[i("view",{staticClass:"swiper-item"},[i("image",{staticClass:"banner-img",attrs:{src:t.banner_url,mode:"scaleToFill"}})])])}))],1),i("view",{staticClass:"uni-list"},t._l(t.listData,function(e,a){return i("view",{key:a,staticClass:"uni-list-cell",attrs:{"hover-class":"uni-list-cell-hover",eventid:"lBW-0-"+a},on:{click:function(i){t.goDetail(e)}}},[i("view",{staticClass:"uni-media-list"},[i("image",{staticClass:"uni-media-list-logo",attrs:{src:e.cover,mode:"aspectFill"}}),i("view",{staticClass:"uni-media-list-body"},[i("view",{staticClass:"uni-media-list-text-top"},[t._v(t._s(e.title))]),i("view",{staticClass:"uni-media-list-text-bottom"},[i("text",[t._v(t._s(e.release_type_name))]),i("text",[t._v(t._s(e.created_at))])])])])])}))])};a._withStripped=!0;var n={render:a,staticRenderFns:[]};e.a=n}],[14]);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/comic/comic.js.map
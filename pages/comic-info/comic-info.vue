<template>
	<view>
		<view class="banner">
			<image class="banner-img" :src="comic.cover" mode="scaleToFill"></image>
			<view class="banner-title">{{comic.title}}</view>
            <view class="banner-info">
            	<view class="banner-type">
            		<view class="type-item" v-for="(type,index) in comic.types" :key="index">{{type}}</view>
            	</view>
                <view class="banner-status">{{comic.s_serial_name}}/更新至{{comic.total_chapter}}话</view>
            </view>
		</view>
        
        <view class="func">
        	<view class="func-item">
                <view class="label" @tap="cancelCollect" v-if="comic.is_collect == 1">
                	<image src="../../static/image/collect_on.png" class="icon"></image>
                	<view class="title">已收藏</view>
                </view>
        		<view class="label" @tap="collect" v-else>
        			<image src="../../static/image/collect.png" class="icon"></image>
                    <view class="title">收藏</view>
        		</view>
                <view class="label" @tap="cancelLike" v-if="comic.is_like == 1">
                	<image src="../../static/image/like_on.png" class="icon"></image>
                	<view class="title">已点赞</view>
                </view>
        		<view class="label" @tap="like" v-else>
        			<image src="../../static/image/like.png" class="icon"></image>
                    <view class="title">点赞</view>
        		</view>
        	</view>
            <view class="func-item">
            	<view class="btn" @tap="reading">
            		<image src="../../static/image/book.png" class="icon"></image>
                    <view class="title">开始阅读</view>
            	</view>
            </view>
        </view>
        
        <view class="tabbar">
        	<view class="tabbar-item" :class="{on:isDetail}" @tap="showDetail">详情</view>
        	<view class="tabbar-item" :class="{on:isChapter}" @tap="showChapter">选集</view>
        </view>
        
        <view class="body" v-if="isDetail">
        	<view class="info">
                <text>简介：</text>
                {{comic.brief}}
            </view>
            <view class="status">
            	<view class="status-item">
            		<image src="../../static/image/see_on.png" class="icon icon-see"></image>
                    <view class="title">总浏览{{comic.popularity}}</view>
            	</view>
            	<view class="status-item">
            		<image src="../../static/image/like_on.png" class="icon"></image>
                    <view class="title">{{comic.heat}}人点赞</view>
            	</view>
            </view>
        </view>
        
        <view class="body" v-if="isChapter">
            <view class="uni-list">
            	<view class="uni-list-cell" hover-class="uni-list-cell-hover" v-for="(item,index) in chapterData" :key="index"
                    @tap="readingChoose(item)">
            		<view class="uni-media-list">
            			<image class="uni-media-list-logo" :src="item.chapter_cover" v-if="item.chapter_cover" mode="aspectFill"></image>
            			<image class="uni-media-list-logo" src="../../static/image/place.png" mode="scaleToFill" v-else></image>
            			<view class="uni-media-list-body">
            				<view class="uni-media-list-text-top">
                                <view>{{item.catalog_name}}</view>
                                <image v-if="item.is_fee" src="../../static/image/fee.png"></image>
                            </view>
            				<view class="uni-media-list-text-bottom uni-ellipsis">
            					<view>{{item.create_at}}</view>
            					<view class="popular">
            						<image src="../../static/image/see.png"></image>
            						<view>{{item.popularity}}</view>
            					</view>
            				</view>
            			</view>
            		</view>
            	</view>
            </view>
            
            <view class="go-top" v-show="isToUp" @tap="goTop">
            	<image src="../../static/image/top.png"></image>
            </view>
        </view>
        
        <modalShare @close="closeModal" @note="noteShare">
            
        </modalShare>
	</view>
</template>

<script>
    import service from '../../service.js';
    import modalShare from '../../components/modal-share.vue';
    
	export default {
        components: {
        	modalShare
        },
		data() {
			return {
                // modal
                titleText: '',
                contentText: '',
                cancelText: '取消',
                confirmText: '确定',
                modalShow: false,
                noteShow: true,
                
                // 分享章节封面
                shareChapter: '',
                shareCover: '',
                needShare: '',
                
                openid: '',
                isDetail: true,
                isChapter: false,
                comic: {},
                isChapterLoad: false,
                isToUp: true,
                chapterData: []
			};
		},
        onLoad(e) {
            uni.showLoading();
            
            let readerInfo = service.getUsers();
            this.openid = readerInfo.openid;
            
        	let info = JSON.parse(e.detailData);
        	uni.setNavigationBarTitle({
        		title: info.title
        	})
            
            this.getComicInfo(info.comic_id);
        },
        onShow() {
            if (this.needShare == 1) {
                // 达成分享条件
            	this.modalShow = false;
            } else {
                // 改变条件显示
                this.needShare = this.needShare-1;
                this.contentText = '转发'+this.needShare+'名好友即可阅读';
            }
        },
        onHide() {
        	if (this.modalShow) {
        		this.noteShare();
        	}
        },
        methods: {
            noteShare(){
                // 记录分享次数
                this.noteShow = false;
                uni.request({
                	url: this.$requestUrl+'share_help',
                	method: 'GET',
                	data: {
                        comic_id: this.comic.comic_id,
                        chapter: this.shareChapter,
                        openid: this.openid
                    },
                	success: res => {
                        console.log(res);
                    }
                });
            },
            getComicInfo(comicId){
                uni.request({
                	url: this.$requestUrl+'get_comic_info',
                	method: 'POST',
                    header: {
                        'content-type': 'application/x-www-form-urlencoded'
                    },
                	data: {
                		comic_id: comicId
                	},
                	success: res => {
                		this.comic = res.data.data;
                	},
                	fail: () => {},
                	complete: () => {
                		uni.hideLoading();
                	}
                });
            },
            showDetail() {
                this.isDetail = true;
                this.isChapter = false;
            },
            showChapter() {
                this.isDetail = false;
                this.isChapter = true;
                if (!this.isChapterLoad) {
                    uni.showLoading();
                	uni.request({
                		url: this.$requestUrl+'get_comic_chapter',
                		method: 'GET',
                		data: {
                            comic_id: this.comic.comic_id
                        },
                		success: res => {
                            this.isChapterLoad = true;
                            this.chapterData = res.data.data;
                        },
                		fail: () => {},
                		complete: () => {
                            uni.hideLoading();
                        }
                	});
                }
            },
            reading() {
                let _this = this;
                wx.getSetting({
                	success (res){
                		if (res.authSetting['scope.userInfo']) {
                            uni.request({
                            	url: _this.$requestUrl+'get_reading_chapter',
                            	method: 'GET',
                            	data: {
                            		comic_id: _this.comic.comic_id,
                            		openid: _this.openid
                            	},
                            	success: res => {
                            		let detail = {
                            			comic_id: _this.comic.comic_id,
                            			title: _this.comic.title,
                                        cover: _this.comic.cover,
                            			chapter: res.data.data
                            		}
                            		uni.navigateTo({
                            			url: "../comic-detail/comic-detail?detailData=" + JSON.stringify(detail)
                            		})
                            	},
                            	fail: () => {},
                            	complete: () => {}
                            });
                		} else {
                            uni.showModal({
                                title: '提醒',
                                content: '请先登录',
                                success: function (res) {
                                    if (res.confirm) {
                                        uni.reLaunch({
                                        	url: '../my/my'
                                        });
                                    }
                                }
                            });
                        }
                	}
                })
            },
            readingChoose(e) {
                let _this = this;
                wx.getSetting({
                	success (res){
                		if (res.authSetting['scope.userInfo']) {
                            uni.showLoading();
                            uni.request({
                            	url: _this.$requestUrl+'check_auth',
                            	method: 'GET',
                            	data: {
                                    comic_id: _this.comic.comic_id,
                                    chapter: e.catalog,
                                    openid: _this.openid
                                },
                            	success: res => {
                                    if (res.data.status == '-1') {
                                        // 限制阅读
                                        let comicInfo = res.data.data;
                                        _this.needShare = comicInfo.need_share;
                                        _this.titleText = '精彩章节订阅';
                                        _this.contentText = '转发'+_this.needShare+'名好友即可阅读';
                                        _this.shareCover = comicInfo.chapter_cover; // 章节封面
                                        _this.shareChapter = e.catalog; // 需要解除限制的章节
                                    	_this.modalShow = true;
                                    } else {
                                        let detail = {
                                        	comic_id: _this.comic.comic_id,
                                        	title: _this.comic.title,
                                            cover: _this.comic.cover,
                                        	chapter: e.catalog, // 选择章节
                                        }
                                        uni.navigateTo({
                                        	url: "../comic-detail/comic-detail?detailData=" + JSON.stringify(detail)
                                        })
                                    }
                                },
                            	fail: () => {},
                            	complete: () => {
                                    uni.hideLoading();
                                }
                            });
                		} else {
                			uni.showModal({
                				title: '提醒',
                				content: '请先登录',
                				success: function (res) {
                					if (res.confirm) {
                						uni.reLaunch({
                							url: '../my/my'
                						});
                					}
                				}
                			});
                		}
                	}
                })
            },
            like() {
                uni.request({
                	url: this.$requestUrl+'like',
                	method: 'GET',
                	data: {
                        comic_id: this.comic.comic_id,
                        openid: this.openid,
                        channel: 2
                    },
                	success: res => {
                        if (res.data.status == 1) {
                            this.comic.is_like = 1;
                        	uni.showToast({
                                icon: 'none',
                                title: '点赞成功'
                        	});
                        } else {
                            uni.showToast({
                                icon: 'none',
                            	title: '点赞失败'
                            });
                        }
                    },
                	fail: () => {},
                	complete: () => {}
                });
            },
            cancelLike() {
            	uni.request({
            		url: this.$requestUrl+'cancel_like',
            		method: 'GET',
            		data: {
            			comic_id: this.comic.comic_id,
            			openid: this.openid,
            		},
            		success: res => {
            			if (res.data.status == 1) {
                            this.comic.is_like = 0;
            				uni.showToast({
                                icon: 'none',
            					title: '取消点赞'
            				});
            			} else {
            				uni.showToast({
                                icon: 'none',
            					title: '取消点赞失败'
            				});
            			}
            		},
            		fail: () => {},
            		complete: () => {}
            	});
            },
            collect() {
                uni.request({
                	url: this.$requestUrl+'collect',
                	method: 'GET',
                	data: {
                		comic_id: this.comic.comic_id,
                		openid: this.openid,
                        channel: 2
                	},
                	success: res => {
                		if (res.data.status == 1) {
                            this.comic.is_collect = 1;
                			uni.showToast({
                                icon: 'none',
                				title: '收藏成功'
                			});
                		} else {
                			uni.showToast({
                                icon: 'none',
                				title: '收藏失败'
                			});
                		}
                	},
                	fail: () => {},
                	complete: () => {}
                });
            },
            cancelCollect() {
                uni.request({
                	url: this.$requestUrl+'cancel_collect',
                	method: 'GET',
                	data: {
                		comic_id: this.comic.comic_id,
                		openid: this.openid,
                	},
                	success: res => {
                		if (res.data.status == 1) {
                            this.comic.is_collect = 0;
                			uni.showToast({
                                icon: 'none',
                				title: '取消收藏'
                			});
                		} else {
                			uni.showToast({
                                icon: 'none',
                				title: '取消收藏失败'
                			});
                		}
                	},
                	fail: () => {},
                	complete: () => {}
                });
            },
            goTop() {
                uni.pageScrollTo({
                	scrollTop: 0,
                })
            },
            closeModal() {
            	this.modalShow = false;
            }
        },
        onShareAppMessage(res) {
            let title = this.comic.title;
            let imageUrl = this.comic.cover;
            
            let detail = {
            	openid: this.openid,
                comic_id: this.comic.comic_id,
                title: title
            }
            
        	if (res.from === 'button') {
                // 限制阅读分享
                detail.share_chapter = this.shareChapter; // 开通章节
                detail.help = 1;
                imageUrl = this.shareCover;
        	}
            console.log(JSON.stringify(detail));
            return {
            	title: title,
            	imageUrl: imageUrl,
            	path: '/pages/comic-info/comic-info?detailData=' + JSON.stringify(detail),
            }
        }
	}
</script>

<style>
    page{
        background-color: #FFF
    }
    
	.banner {
		height: 450upx;
		overflow: hidden;
		position: relative;
		background-color: #ccc;
	}
    .banner:after{
        content: '';
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        background: rgba(0, 0, 0, .4);
    }

	.banner-img {
		width: 100%;
	}

    .banner-title,
    .banner-info{
        position: absolute;
        left: 30upx;
        z-index: 9;
        color: #FFF;
    }
	.banner-title {
		bottom: 80upx;
		width: 90%;
		font-size: 42upx;
		font-weight: bold;
		line-height: 42upx;
	}
    .banner-info{
        width: calc(100% - 60upx);
        bottom: 20upx;
        font-size: 28upx;
        display: flex;
        justify-content: space-between;
    }
    
    .banner-info .banner-type{
        display: flex;
    }
    .type-item{
        height: 32upx;
        line-height: 32upx;
        border: 1px solid #FFF;
        border-radius: 2px;
        padding: 0 3px;
        margin-right: 5px;
    }
    
    
    .func{
        height: 120upx;
        display: flex;
    }
    .func-item{
        font-style: 32upx;
        width: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .func-item .label,
    .func-item .btn{
        display: flex;
        align-items: center;
    }
    .func-item .label{
        width: 50%;
        height: 40upx;
        display: flex;
        justify-content: center;
    }
    .func-item .label + .label{
        border-left: 1px solid #e1e1e1;
    }
    
    .func-item .btn{
        width: 100%;
        height: 76upx;
        color: #FFF;
        background-color: #fd7d49;
        border-radius: 76upx;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    
    
    .func-item .icon{
    	width: 36upx;
    	height: 36upx;
        margin-right: 8px;
    }
    
    .tabbar{
        border-bottom: 1px solid #e1e1e1;
        display: flex;
        justify-content: space-around;
        align-items: center;
    }
    .tabbar-item{
        width: 220upx;
        height: 100upx;
        line-height: 100upx;
        color: #919191;
        text-align: center;
    }
    .tabbar-item.on{
        color: #fd7d49;
        border-bottom: 2px solid #fd7d49;
    }
    
    .body{
        padding: 20px 15px;
    }
    .info{
        font-size: 32upx;
        line-height: 1.5em;
        margin-bottom: 20px;
    }
    .info text{
        color: #919191;
    }
    .status{
        color: #919191;
        display: flex;
    }
    .status-item{
        display: flex;
        align-items: center;
        margin-right: 20px;
    }
    .status-item .icon{
        width: 30upx;
        height: 30upx;
        margin-right: 5px;
    }
    .status-item .icon-see{
        height: 20upx;
    }
    
    .uni-media-list{
        padding: 3px 0;
    }
    .uni-media-list-logo{
        width: 200upx;
        height: 130upx;
    }
    .uni-media-list-body{
        height: 120upx;
        justify-content: space-between;
    }
    .uni-media-list-text-top{
        font-size: 32upx;
        color: #333;
        display: flex;
        justify-content: space-between;
    }
    .uni-media-list-text-top image{
        width: 50upx;
        height: 50upx;
    }
    .uni-media-list-text-bottom{
        font-size: 26upx;
        display: flex;
    }
    .popular{
        display: flex;
        align-items: center;
        margin-left: 20px;
    }
    .popular image{
        width: 30upx;
        height: 20upx;
        margin-right: 5px;
    }
    
    .uni-list:before,
    .uni-list:after,
    .uni-list-cell:after {
    	height: 0upx;
    }
    
    .go-top{
        position: fixed;
        right: 50upx;
        bottom: 50upx;
    }
    .go-top image{
        width: 60upx;
        height: 60upx;
    }
</style>

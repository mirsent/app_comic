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
        		<view class="label" @tap="collect">
        			<image src="../../static/image/collect.png" class="icon"></image>
                    <view class="title">收藏</view>
        		</view>
        		<view class="label" @tap="like">
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
            	<view class="uni-list-cell" hover-class="uni-list-cell-hover" v-for="(item,index) in chapterData" :key="index">
            		<view class="uni-media-list">
            			<image class="uni-media-list-logo" :src="item.chapter_cover" v-if="item.chapter_cover" mode="aspectFill"></image>
            			<image class="uni-media-list-logo" src="../../static/image/place.png" mode="scaleToFill" v-else></image>
            			<view class="uni-media-list-body">
            				<view class="uni-media-list-text-top">{{item.catalog_name}} {{item.chapter_title}}</view>
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
	</view>
</template>

<script>
	export default {
		data() {
			return {
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
            let openid = uni.getStorageSync('openid');
        	let info = JSON.parse(e.detailData);
        	uni.setNavigationBarTitle({
        		title: info.title
        	})
            uni.request({
            	url: this.$requestUrl+'get_comic_info',
            	method: 'GET',
            	data: {
                    comic_id: info.comic_id
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
        methods: {
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
                            comic_id: this.comic.id
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
                let detail = {
                	comic_id: this.comic.id,
                	title: this.comic.title,
                    chapter: ''
                }
                uni.navigateTo({
                	url: "../comic-detail/comic-detail?detailData=" + JSON.stringify(detail)
                })
            },
            like() {
                // 点赞
                uni.request({
                	url: this.$requestUrl+'like',
                	method: 'GET',
                	data: {
                        comic_id: this.comic.id,
                        openid: openid
                    },
                	success: res => {
                        if (res.data.status == 1) {
                        	uni.showToast({
                                icon: 'success'
                        	});
                        } else {
                            uni.showToast({
                            	title: '点赞失败'
                            });
                        }
                    },
                	fail: () => {},
                	complete: () => {}
                });
            },
            collect() {
                // 收藏
                uni.request({
                	url: this.$requestUrl+'collect',
                	method: 'GET',
                	data: {
                		comic_id: this.comic.id,
                		openid: openid
                	},
                	success: res => {
                		if (res.data.status == 1) {
                			uni.showToast({
                				icon: 'success'
                			});
                		} else {
                			uni.showToast({
                				title: '收藏失败'
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

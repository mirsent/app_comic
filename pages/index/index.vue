<template>
	<view class="container">
		<swiper :indicator-dots="indicatorDots" :indicator-active-color="indicatorColor" :autoplay="autoplay" :interval="interval"
		 :duration="duration">
			<swiper-item v-for="(banner, index) in bannerData" :key="index">
				<view class="swiper-item">
					<image :src="banner.banner_url"></image>
				</view>
			</swiper-item>
		</swiper>
        
		<view class="nav">
			<view class="nav-item" v-for="(nav, index) in navData" :key="index">
				<image :src="nav.img" class="img"></image>
				<text class="title">{{nav.title}}</text>
			</view>
		</view>

		<view class="line">
			<text></text>
		</view>

		<view class="list" v-for="(type, i) in comicData" :key="i">
			<view class="list-header">
				{{type.release_type_name}}
				<view class="more" @tap="goList(type)">
					<image src="../../static/image/right.png" class="more-icon"></image>
				</view>
			</view>
			<view class="list-body">
				<view class="product" v-for="(comic,index) in type.comics" :key="index" @tap="goInfo(comic)">
					<image :src="comic.cover" mode="scaleToFill" class="product-img"></image>
					<view class="product-title uni-ellipsis">
						{{comic.title}}
					</view>
					<view class="product-brief uni-ellipsis">
						{{comic.brief}}
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
    import service from '../../service.js';
	export default {
		data() {
			return {
				indicatorDots: true,
				indicatorColor: '#007aff',
				autoplay: true,
				interval: 5000,
				duration: 500,
				bannerData: [],
				navData: [
                    {
						img: '../../static/image/women.png',
						title: '女生榜'
					},
					{
						img: '../../static/image/man.png',
						title: '男生榜'
					},
					{
						img: '../../static/image/popular.png',
						title: '人气榜'
					},
					{
						img: '../../static/image/new.png',
						title: '新作榜'
					},
					{
						img: '../../static/image/rank.png',
						title: '追更榜'
					}
				],
				comicData: []
			};
		},
		onLoad() {
			uni.showLoading();
            this.login();
			this.getBanner();
			this.getProduct();
		},
		methods: {
			getBanner() {
				uni.request({
					url: this.$requestUrl + 'get_comic_banner',
					method: 'GET',
					success: res => {
						this.bannerData = res.data.data;
					},
					fail: () => {},
					complete: () => {}
				});
			},
			getProduct() {
				uni.request({
					url: this.$requestUrl + 'get_comic_by_release',
					method: 'GET',
					success: res => {
						this.comicData = res.data.data;
					},
					fail: () => {},
					complete: () => {
						uni.hideLoading();
					}
				});
			},
			goList(e) {
				let detail = {
					release_type_id: e.release_type_id,
					release_type_name: e.release_type_name
				}
				uni.navigateTo({
					url: "../release/release?detailData=" + JSON.stringify(detail)
				})
			},
			goInfo(e) {
				let detail = {
					comic_id: e.comic_id,
					title: e.title
				}
				uni.navigateTo({
					url: "../comic-info/comic-info?detailData=" + JSON.stringify(detail)
				})
			},
            login() {
                uni.login({
                	provider: 'weixin',
                	success: res => {
                        uni.request({
                        	url: this.$requestUrl+'code_2_session',
                        	method: 'GET',
                        	data: {
                                js_code: res.code
                            },
                        	success: res => {
                                let readerInfo = res.data.data;
                                service.addUser(readerInfo);
                            },
                        	fail: () => {},
                        	complete: () => {}
                        });
                    }
                });
            }
		},
		onShareAppMessage() {
			return {
				title: '漫画',
				path: '/pages/index/index'
			}
		},
	}
</script>

<style>
	page {
		background: #efefef;
	}

	swiper {
		height: 450upx;
	}

	.swiper-item image {
		width: 100%;
	}

	.nav {
		font-size: 24upx;
		height: 200upx;
		padding: 0 40upx;
		background: #FFF;
		display: flex;
		justify-content: space-between;
	}

	.nav-item {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	.nav .img {
		width: 65upx;
		height: 65upx;
		margin-bottom: 5px;
	}

	.line {
		display: flex;
		justify-content: center;
		background: #FFF;
	}

	.line text {
		width: 30%;
		height: 1px;
		background: linear-gradient(to left, #efefef, #b6b6b6, #efefef);
	}

	.list {
		background: #FFF;
	}

	.list+.list {
		margin-top: 10px;
	}

	.list-header {
		font-size: 38upx;
		font-weight: bold;
		color: #333;
		height: 60px;
		text-align: center;
		line-height: 60px;
		position: relative;
	}

	.list-header .more {
		position: absolute;
		top: 0;
		right: 10px;
	}

	.list-header .more .more-icon {
		width: 30px;
		height: 30px;
		vertical-align: middle;
	}

	.list-body {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
	}

	.product {
		width: 49.5%;
		height: 360upx;
	}

	.product-img {
		width: 100%;
		height: 240upx;
	}

	.product-title {
		font-size: 30upx;
		padding: 0 10px;
		color: #333;
		line-height: 1.8em;
	}

	.product-brief {
		font-size: 24upx;
		padding: 0 10px;
		color: #909090;
	}
</style>

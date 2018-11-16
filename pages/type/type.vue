<template>
	<view class="container">
		<view class="tabbar">
			<view class="tabbar-item" v-for="(tabbar, index) in tabbarList" :key="index" :class="[tabbarIndex == index ? 'on' : '']"
			 :data-id="tabbar.id" :data-current="index" @tap="chooseType">
				{{tabbar.comic_type_name}}
			</view>
		</view>

		<view class="uni-list">
			<view class="uni-list-cell" v-for="(product,key) in productList" :key="key" @tap="goInfo(product)">
				<view class="uni-media-list">
					<image class="uni-media-list-logo" :src="product.cover" mode="aspectFill"></image>
					<view class="uni-media-list-body">
						<view class="uni-media-list-text-top">{{product.title}}</view>
						<view class="uni-media-list-text-bottom">
							<text>{{product.release_type_name}}</text>
							<text>{{product.created_at}}</text>
						</view>
					</view>
				</view>
			</view>
			<view class="none" v-if="productList.length == 0">
				上新中...
			</view>
		</view>

	</view>
</template>

<script>
	var dateUtils = require('../../common/util.js').dateUtils;

	export default {
		data() {
			return {
				tabbarIndex: 0,
				tabbarList: [],
				productList: [],
				reload: false
			}
		},
		onLoad(e) {
			uni.showLoading();
			this.getType();
			this.getList();
		},
		onPullDownRefresh() {
			this.reload = true;
			this.last_id = "";
			this.getList();
		},
		onReachBottom() {
			this.getList();
		},
		methods: {
			getType() {
				uni.request({
					url: this.$requestUrl + 'get_comic_type',
					method: 'GET',
					success: res => {
						let typeInfo = res.data;
						this.tabbarList = typeInfo.data;
					},
					fail: () => {},
					complete: () => {}
				});
			},
			getList(type = '-1') {
				let data = {
					'type': type
				};
				uni.request({
					url: this.$requestUrl + 'get_comic_list',
					data: data,
					success: (data) => {
						let comicInfo = data.data;
						if (comicInfo.status == 1) {
							let list = comicInfo.data
							this.productList = this.reload ? list : this.productList.concat(list);
							this.reload = false;
						}
					},
					fail: (data, code) => {
						console.log('fail' + JSON.stringify(data));
					},
					complete: () => {    
						uni.hideLoading();
					}
				})
			},
			goInfo(e) {
				let detail = {
					comic_id: e.id,
					title: e.title,
				}
				uni.navigateTo({
					url: "../comic-info/comic-info?detailData=" + JSON.stringify(detail)
				})
			},
			async chooseType(e) {
				uni.showLoading();
				let currentIndex = e.target.dataset.current;
				if (this.tabbarIndex === currentIndex) {
					return false;
				} else {
					this.tabbarIndex = currentIndex;
					this.reload = true;
					this.getList(e.target.dataset.id)
				}
			}
		},
        onShareAppMessage() {
        	return {
        		title: '漫画',
        		path: '/pages/index/index'
        	}
        }
	}
</script>

<style>
	page {
		background: #efeff4;
	}

	.container {
		flex: 1;
	}

	.tabbar {
		font-size: 28upx;
		color: #909090;
		background: #FFF;
		margin-bottom: 10px;
		padding: 10px;
		display: flex;
		flex-wrap: wrap;
	}

	.tabbar-item {
		width: 20%;
		line-height: 1.8em;
		text-align: center;
	}

	.tabbar-item.on {
		color: #FFF;
		background: #fd7d49;
		border-radius: 28upx;
	}

	.uni-list {
		flex: 1;
	}

	.uni-media-list-logo {
		width: 180upx;
		height: 140upx;
	}

	.uni-media-list-body {
		height: auto;
		justify-content: space-around;
	}

	.uni-media-list-text-top {
		height: 74upx;
		font-size: 28upx;
		overflow: hidden;
	}

	.uni-media-list-text-bottom {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
	}

	.uni-list:before,
	.uni-list:after,
	.uni-list-cell:after {
		height: 0upx;
	}

	.none {
		color: #909090;
		font-size: 28upx;
		text-align: center;
		line-height: 3em;
	}
</style>

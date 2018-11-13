<template>
	<view class="container">

		<view class="uni-list">
			<view class="uni-list-cell" v-for="(product,key) in productList" :key="key" @tap="goDetail(product)">
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
		</view>

	</view>
</template>

<script>
	var dateUtils = require('../../common/util.js').dateUtils;

	export default {
		data() {
			return {
                releaseTypeId: '',
				productList: [],
				reload: false
			}
		},
		onLoad(e) {
			uni.showLoading();
            let release = JSON.parse(e.detailData);
            this.releaseTypeId = release.release_type_id;
            uni.setNavigationBarTitle({
            	title: release.release_type_name
            })
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
			getList() {
				let data = {
                    'type': '-1',
					'release': this.releaseTypeId
				};
				uni.request({
					url: this.$requestUrl + 'get_comic_list',
					data: data,
					success: (data) => {
						let productInfo = data.data;
						if (productInfo.status == 1) {
							let list = productInfo.data
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
			goDetail(e) {
				let detail = {
					id: e.id,
					title: e.title,
					cover: e.cover,
					release_type_name: e.release_type_name,
					created_at: e.created_at
				}
				uni.navigateTo({
					url: "../comic-detail/comic-detail?detailData=" + JSON.stringify(detail)
				})
			}
		},
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

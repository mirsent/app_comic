<template>
	<view class="page">
		<view class="article-content">
			<image v-for="(img, index) in imgs" :key="index" lazy-load :src="imgPrefix+img" mode="widthFix"></image>
		</view>

		<button type="default" @tap="next">下一章</button>
	</view>
</template>

<script>
	import service from '../../service.js';
	export default {
		data() {
			return {
				openid: '',
				imgPrefix: '',
				comic: {},
				imgs: []
			}
		},
		onShareAppMessage() {
			return {
				title: this.comic.title,
				path: '/pages/comic-detail/comic-detail?detailData=' + JSON.stringify(this.comic)
			}
		},
		onLoad(e) {
			uni.showLoading();
			let readerInfo = service.getUsers();
			this.openid = readerInfo.openid;
			this.imgPrefix = this.$imgUrl; // 图片前缀

			let comicInfo = JSON.parse(e.detailData);
			this.comic = comicInfo;

			this.reading();
		},
		methods: {
			reading(url) {
				uni.request({
					url: this.$requestUrl + 'reading',
					method: 'GET',
					data: {
						comic_id: this.comic.comic_id,
						chapter: this.comic.chapter,
						openid: this.openid
					},
					success: (res) => {
						let comicInfo = res.data.data;
						uni.setNavigationBarTitle({
							title: this.comic.title + ' ' + comicInfo.chapter_title
						})
						this.imgs = comicInfo.comics;
					},
					fail: () => {
						console.log('fail');
					},
					complete: () => {
						uni.hideLoading();
					}
				})
			},
			next() {
				uni.request({
					url: this.$requestUrl + 'reading_next',
					method: 'GET',
					data: {
						comic_id: this.comic.comic_id,
						chapter: this.comic.chapter,
						openid: this.openid
					},
					success: (res) => {
						if (res.data.status == '-1') {
							uni.showModal({
								title: '分享',
								content: '付费阅读',
								success: function(res) {
									
								}
							});
						} else {
							let comicInfo = res.data.data;
							uni.setNavigationBarTitle({
								title: this.comic.title + ' ' + comicInfo.chapter_title
							})
                            this.comic.chapter = parseInt(this.comic.chapter) + parseInt(1);
							this.imgs = this.imgs.concat(comicInfo.comics);
						}
					},
					fail: () => {
						console.log('fail');
					},
					complete: () => {
						uni.hideLoading();
					}
				})
			}
		}
	}
</script>

<style>
	page {
		background: #efeff4;
	}

	.article-meta {
		padding: 20upx 40upx;
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
		color: gray;
	}

	.article-text {
		font-size: 26upx;
		line-height: 50upx;
		margin: 0 20upx;
	}

	.article-author,
	.article-time {
		font-size: 30upx;
	}

	.article-content {
		padding: 0 30upx;
		margin-bottom: 30upx;
		text-align: center;
		display: flex;
		flex-direction: column;
	}

	.article-content image {
		width: 100%;
	}
</style>

<template>
	<view class="page">
		<view class="article-content">
            <image v-for="(img, index) in imgs" :key="index" lazy-load :src="imgPrefix+img" mode="widthFix"></image>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
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
            this.imgPrefix = this.$imgUrl; // 图片前缀
			this.comic = JSON.parse(e.detailData);
			this.getDetail();
            
			uni.setNavigationBarTitle({
				title: this.comic.title
			})
		},
		methods: {
			getDetail() {
				uni.request({
					url: this.$requestUrl+'reading',
                    method: 'GET',
                    data: {
                        comic_id: this.comic.comic_id,
                        chapter: this.comic.chapter,
                        openid: uni.getStorageSync('openid')
                    },
					success: (data) => {
                        let comicInfo = data.data;
						if (comicInfo.status == 1) {
							this.imgs = comicInfo.data;
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
    .article-content image{
        width: 100%;
    }
</style>

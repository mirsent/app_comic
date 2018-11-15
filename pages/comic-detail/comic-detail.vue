<template>
	<view class="page">
		<view class="article-content">
			<image v-for="(img, index) in imgs" :key="index" lazy-load :src="imgPrefix+img" mode="widthFix"></image>
		</view>
		<view class="btn-group">
			<picker class="picker-item" mode="selector" :range="chapterData" :value="chapterIndex" range-key="catalog_name"
			 @change="chapterChange">
				<button type="default">目录</button>
			</picker>
			<button type="default" @tap="next">下一章</button>
		</view>
        
        <modalShare @close="closeModal"></modalShare>
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
                
				openid: '',
				imgPrefix: '',
				comic: {},
				chapterIndex: '',
				chapterData: [],
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

			this.chapterIndex = comicInfo.chapter - 1; // 当前章节

			this.reading();
			this.get_chapter();
		},
		methods: {
			get_chapter() {
				uni.request({
					url: this.$requestUrl + 'get_comic_chapter',
					method: 'GET',
					data: {
						comic_id: this.comic.comic_id
					},
					success: res => {
						this.chapterData = res.data.data;
					},
					fail: () => {},
					complete: () => {
						uni.hideLoading();
					}
				});
			},
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
                this.readingNext(this.comic.comic_id, this.comic.chapter, this.openid);
			},
			chapterChange(e) {
				let chapterCur = parseInt(e.detail.value);
                this.readingNext(this.comic.comic_id, chapterCur, this.openid);
                console.log(this.comic.chapter)
			},
			readingNext(comicId, chapter, openid) {
				uni.request({
					url: this.$requestUrl + 'reading_next',
					method: 'GET',
					data: {
						comic_id: comicId,
						chapter: chapter,
						openid: openid
					},
					success: (res) => {
						if (res.data.status == '-1') {
                            // 限制阅读
                            let comicInfo = res.data.data;
                            console.log(comicInfo);
							this.titleText = '精彩章节订阅';
							this.contentText = '转发'+comicInfo.pre_chapter_share+'名好友即可阅读';
							this.modalShow = true;
						} else {
							let comicInfo = res.data.data;
							uni.setNavigationBarTitle({
								title: this.comic.title + ' ' + comicInfo.chapter_title
							})
							this.comic.chapter = parseInt(this.comic.chapter) + 1;
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
			},
            closeModal() {
                this.modalShow = false;
            }
		}
	}
</script>

<style>
	.page {
		background: #efeff4;
		padding: 0 30upx;
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
		margin-bottom: 20upx;
		text-align: center;
		display: flex;
		flex-direction: column;
	}

	.article-content image {
		width: 100%;
	}

	.btn-group {
		display: flex;
		justify-content: space-around;
	}

	.btn-group button {
		width: 200upx;
		font-size: 32upx;
		margin-left: 0;
		margin-right: 0;
	}
</style>

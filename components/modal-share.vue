<template>
	<view>
        <view class="mask" v-show="modalShow">
        	<view class="modal">
        		<view class="modal-title">{{titleText}}</view>
        		<view class="modal-content">{{contentText}}</view>
        		<view class="modal-footer">
        			<button class="modal-btn btn-cancel" @tap="close">{{cancelText}}</button>
        			<button open-type="share" class="modal-btn btn-confirm">{{confirmText}}</button>
        		</view>
        	</view>
        </view>
    </view>
</template>

<script>
	export default {
		props: {
			/**
			 * 标题
			 */
			titleText: String,
			/**
			 * 内容
			 */
			contentText: String,
			/**
			 * 取消按钮
			 */
			cancelText: String,
			/**
			 * 确认按钮
			 */
			confirmText: String,
			/**
			 * 是否显示
			 */
			modalShow: String,
		},
        data() {
        	return {
        		
        	}
        },
		methods: {
			close() {
				this.$emit('close')
			}
		}
	}
</script>

<style>
	.mask {
		position: fixed;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		background: rgba(0, 0, 0, .6);
		z-index: 9999;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.modal {
		width: 560upx;
		height: 320upx;
		background-color: #FFF;
		border-radius: 8px;
		display: flex;
		flex-direction: column;
	}

	.modal-title {
		font-size: 36upx;
		text-align: center;
		line-height: 3.5em;
	}

	.modal-content {
		flex: 1;
        text-align: center;
		font-size: 32upx;
		color: #666;
	}

	.modal-footer {
		height: 100upx;
		display: flex;
	}

	.modal-btn {
		font-size: 32upx;
        line-height: 100upx;
		border-radius: 0;
		background: #FFF;
		margin: 0;
		flex: 1;
	}
    
    .btn-confirm{
        color: #09BB07;
    }

	.modal-btn::after {
		border-radius: 0;
	}
    .btn-cancel,
    .btn-cancel::after{
        border-bottom-left-radius: 8px;
    }
    .btn-confirm,
    .btn-confirm::after{
        border-bottom-right-radius: 8px;
    }
</style>

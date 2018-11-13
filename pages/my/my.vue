<template>
	<view>
		<view class="top">
			<view class="login">
				<view class="login-item">
					<image :src="head" class="head"></image>
					<view class="nickname login-btn" @click="login">
						{{nickname}}
					</view>
				</view>
			</view>
            
            <!-- <view class="uni-list" style="margin-bottom: 10px;">
            	<view class="uni-list-cell" >
            		<view class="uni-list-cell-navigate uni-navigate-right">
            			{{rechargeTitle}}
            		</view>
            	</view>
            </view> -->
            
            <view class="uni-list">
            	<view class="uni-list-cell" v-for="(item,index) in list" :key="index">
            		<view class="uni-list-cell-navigate uni-navigate-right">
                        <view class="left">
                        	<image :src="item.icon" class="icon"></image>
                        	{{item.title}}
                        </view>
            		</view>
            	</view>
            </view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				head: '../../static/image/user.png',
                nickname: '登录',
                rechargeTitle: '充值阅读币',
                list: [
                    {
                    	title: '充值',
                    	icon: '../../static/image/recharge.png',
                    },
                    {
                        title: '积分',
                        icon: '../../static/image/score.png',
                    },
                    {
                    	title: '消费记录',
                    	icon: '../../static/image/pay.png',
                    }
                ]
			};
		},
        onLoad() {
        	
        },
        methods: {
            login() {
                uni.login({
                	provider: 'weixin',
                	success: res => {
                        if (res.code) {
                        	uni.request({
                        		url: this.$requestUrl+'code_2_session',
                        		method: 'GET',
                        		data: {
                                    js_code: res.code
                                },
                        		success: res => {
                                    
                                },
                        		fail: () => {},
                        		complete: () => {}
                        	});
                        }
                    },
                	fail: () => {},
                	complete: () => {}
                });
            }
        }
	}
</script>

<style>
    .login{
        height: 300upx;
        margin: 10px;
        background: #FFE5DB;
        border-radius: 8px;
        position: relative;
    }
    .login-item{
        height: 200upx;
        display: flex;
        align-items: center;
    }
    .head{
        width: 120upx;
        height: 120upx;
        margin: 0 30upx 0 70upx;
    }
    .login-btn{
        padding: 0 8px;
        border: 1px solid #999;
        border-radius: 5px;
        color: #999;
    }
    
    .uni-list:before,
    .uni-list:after{
    	height: 0upx;
    }
    .uni-list-cell-navigate {
        line-height: 2em;
    }
    .uni-list .left{
        display: flex;
        align-items: center;
        font-size: 30upx;
    }
    .uni-list .icon{
        width: 30px;
        height: 30px;
        margin-right: 10px;
    }
</style>

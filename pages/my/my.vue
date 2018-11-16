<template>
	<view>
		<view class="top">
			<view class="login">
				<view class="login-item">
					<image :src="readerInfo.head" class="head"></image>
                    <view v-if="authed">
                    	{{readerInfo.nickname}}
                    </view>
					<button class="login-btn" open-type="getUserInfo" v-else @getuserinfo="login">
						登录
					</button>
                    
				</view>
			</view>
            
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
    import service from '../../service.js';
	export default {
		data() {
			return {
                authed: false,
                openid: '',
                readerInfo: {
                    head: '../../static/image/user.png',
                },
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
            let _this = this;
            let readerInfo = service.getUsers();
            this.openid = readerInfo.openid;
            wx.getSetting({
            	// 检查权限
            	success (res){
            		if (res.authSetting['scope.userInfo']) {
                        _this.authed = true;
            			_this.readerInfo = readerInfo;
            		}
            	}
            })
        },
        methods: {
            login(e) {
                uni.request({
                	url: this.$requestUrl+'edit_reader',
                	method: 'POST',
                    header: {
                        'content-type': 'application/x-www-form-urlencoded'
                    },
                	data: {
                		openid: this.openid,
                		nickname: e.detail.userInfo.nickName,
                        head: e.detail.userInfo.avatarUrl
                	},
                	success: res => {
                        this.authed = true;
                        this.readerInfo = res.data.data;
                        uni.showToast({
                        	title: '登录成功',
                        	duration: 1500
                        });
                    },
                	fail: () => {},
                	complete: () => {}
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
        font-size: 32upx;
        margin: 0;
        padding: 0 8px;
        border: 1px solid #999;
        border-radius: 5px;
        color: #999;
        line-height: 1.5em;
        background-color: #FFF;
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

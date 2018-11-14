<template>
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
		<view class="none" v-if="productList.length == 0">
			
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				productList: []
			};
		},
        onLoad() {
        
        },
        methods: {
            
        }
	}
</script>

<style>

</style>

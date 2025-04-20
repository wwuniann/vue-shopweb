<script setup>
import { ref, onMounted } from 'vue';
// 引入本地图片
import image1 from '@/assets/images/lunbo1.jpg';
import image2 from '@/assets/images/lunbo2.jpg';
import image3 from '@/assets/images/lunbo3.jpg';
import image4 from '@/assets/images/lunbo4.jpg';

const bannerList = ref([
  { id: 1, imgUrl: image1 },
  { id: 2, imgUrl: image2 },
  { id: 3, imgUrl: image3 },
  { id: 4, imgUrl: image4 }
]);

onMounted(() => {
  // 这里不需要再调用 API，因为使用本地图片
});
</script>

<template>
  <div class="home-banner">
    <el-carousel height="500px">
      <el-carousel-item v-for="item in bannerList" :key="item.id">
        <img :src="item.imgUrl" alt="">
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<style scoped lang='scss'>
.home-banner {
  width: 1240px;
  height: 500px;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 98;

  img {
    width: 100%;
    height: 500px;
  }
}
</style>
    
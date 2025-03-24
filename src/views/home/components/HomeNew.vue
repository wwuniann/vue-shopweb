<script setup>
import { onMounted, ref } from 'vue';
import HomePanel from './HomePanel.vue';
import { findNewAPI } from '@/apis/home';

const newList = ref([])
const getNewList = async() =>{
    const res = await findNewAPI()
    newList.value = res.result
}

onMounted( () => getNewList())
</script>

<template>
  <HomePanel title="精选好物" subtitle="快来选购！！！">
    <ul class="goods-list">
        <li v-for="item in newList" :key="item.id">
          <RouterLink :to="`/detail/${item.id}`" >
            <img v-img-lazy="item.picture" alt="" />
            <p class="name">{{ item.name }}</p>
            <p class="price">&yen;{{ item.price }}</p>
          </RouterLink>
        </li>
      </ul>
  </HomePanel>

  <!-- 下面是插槽主体内容模版
  <ul class="goods-list">
    <li v-for="item in newList" :key="item.id">
      <RouterLink to="/">
        <img :src="item.picture" alt="" />
        <p class="name">{{ item.name }}</p>
        <p class="price">&yen;{{ item.price }}</p>
      </RouterLink>
    </li>
  </ul>
  -->
</template>


<style scoped lang='scss'>

.goods-list {
  display: flex;
  padding-left: 0px;
  gap: 50px;
  height: 270px;
  

  li {
    width: 150px;
    height: 150px;

    background: #f0f9f4;
    transition: all .5s;

    &:hover {
      transform: translate3d(0, -3px, 0);
      box-shadow: 0 3px 8px rgb(0 0 0 / 20%);
    }

    img {
      width: 150px;
      height: 150px;
      
    }

    p {
      font-size: 16px;
      padding-top: 12px;
      text-align: center;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
    }

    .price {
      color: $priceColor;
    }
  }
}

</style>
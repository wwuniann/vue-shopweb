<script setup>
//抽象成prop传入（一般用于传简单的文本部分），组件结构相似可用
defineProps({
    title: {
        type: String
    },
    subtitle: {
        type: String
    }
})

</script>


<template>
  <div class="home-panel">
    <div class="container">
      <div class="head">
         <!-- 主标题和副标题 -->
        <h3>
          {{ title }}<small>{{ subtitle }}</small>
        </h3>
      </div>
      <!-- 主体内容区域(较为复杂的部分抽象成插槽传入)-->
      <slot />
    </div>
  </div>
</template>

<style scoped lang='scss'>
.home-panel {
  background-color: #fff;

  .head {
    padding: 40px 0;
    display: flex;
    align-items: flex-end;

    h3 {
      flex: 1;
      font-size: 32px;
      font-weight: normal;
      margin-left: 6px;
      height: 35px;
      line-height: 35px;

      small {
        font-size: 16px;
        color: #999;
        margin-left: 20px;
      }
    }
  }
}
</style>
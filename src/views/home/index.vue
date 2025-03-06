<script setup>
import HomeCategory from './components/HomeCategory.vue';
import HomeBanner from './components/HomeBanner.vue';
import HomeNew from './components/HomeNew.vue';
import HomeHot from './components/HomeHot.vue';
import HomeProduct from './components/HomeProduct.vue';
import HomePanel from './components/HomePanel.vue';

</script>

<template>
    <div class="container">
        <HomeCategory />
        <HomeBanner />
    </div>
    <HomeNew />
    <HomePanel title="vsiviu" subtitle="eeee">
        <div>111</div>
    </HomePanel>
    <HomePanel title="二" subtitle="csvs">
        <div>222</div>
    </HomePanel>
    <HomeHot />
    <HomeProduct />
</template>
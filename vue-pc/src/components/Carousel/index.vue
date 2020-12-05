<template>
  <div class="swiper-container" ref="swiper">
    <div class="swiper-wrapper">
      <div class="swiper-slide" v-for="banner in carouselList" :key="banner.id">
        <img :src="banner.imgUrl" />
      </div>
    </div>
    <!-- 如果需要分页器 -->
    <div class="swiper-pagination"></div>

    <!-- 如果需要导航按钮 -->
    <div class="swiper-button-prev"></div>
    <div class="swiper-button-next"></div>
  </div>
</template>

<script>
import Swiper, { Navigation, Pagination, Autoplay } from "swiper";

// Swiper6默认只有核心轮播图功能，其他功能没有
// 要使用其他功能，需要先加载
Swiper.use([Navigation, Pagination, Autoplay]);
export default {
  name: "Carousel",
  props: {
    carouselList: {
      type: Array,
      required: true,
    },
  },
  // 使用watch方法监视数据的变化
  // 轮播图要显示，第一是要有图片的数据，第二是要加载完成
  // watch 保证轮播图有数据，因为一开始的时候，数据是空的，只有一个空数组
  // this.$nextTick 为了保证页面加载完成
  watch: {
    carouselList() {
      // 确保：swiper不能new多次
      if (this.swiper) return;
      this.$nextTick(() => {
        this.initSwiper();
      });
    },
  },
  methods: {
    //定义一个方法，方便在监视及刚挂载的时候触发，得到数据
    initSwiper() {
      // 使用 this.$refs.swiper 取代 .swiper-container
      // 使用 this.$refs.swiper 才能保证轮播图组件使用的自己的swiper
      this.swiper = this.$nextTick(() => {
        new Swiper(this.$refs.swiper, {
          loop: true, // 循环模式选项
          autoplay: {
            //自动轮播
            delay: 3000,
            disableOnInteraction: false,
          },
          // 如果需要分页器
          pagination: {
            el: ".swiper-pagination",
            clickable: true,
          },
          // 如果需要前进后退按钮
          navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
          },
        });
      });
    },
  },

  mounted() {
    // 轮播图数据要有 且 轮播图DOM元素要渲染完成 才能 new Swiper
    /* 
      1. ListContainer组件
        一上来没有数据 -- 触发watch
      2. Floor 
        一上来就有数据 -- mounted  
    */
    if (!this.carouselList.length) return;
    this.initSwiper();
  },
};
</script>

<style lang="less" scoped>
</style>

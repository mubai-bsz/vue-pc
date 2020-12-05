<template>
  <div class="swiper-container" ref="swiper">
    <div class="swiper-wrapper">
      <div
        class="swiper-slide"
        v-for="skuImage in skuImageList"
        :key="skuImage.id"
      >
        <img :src="skuImage.imgUrl" />
      </div>
    </div>
    <div class="swiper-button-next"></div>
    <div class="swiper-button-prev"></div>
  </div>
</template>

<script>
import Swiper, { Navigation } from "swiper";

// Swiper6默认只有核心轮播图功能，其他功能没有
// 要使用其他功能，需要先加载
Swiper.use([Navigation]);
export default {
  name: "ImageList",
  props: {
    skuImageList: Array,
  },
  /* swiper组件写在哪里？
    两个条件：
        1、数据要加载成功才能使用
        2、DOM结构要加载成功才能显示

    数据的加载是异步加载的 ，所以swiper组件使用时应该在数据及dom结构完成渲染之后才展示，
    并且在加载完成的时候，可以点击选择，这就需要一个方法，

    watch来监视数据的时候，监视的是一个函数
  */
  watch: {
    skuImageList() {
      this.$nextTick(() => {
        new Swiper(this.$refs.swiper, {
          slidesPerView: 5,
          spaceBetween: 30,
          // 如果需要前进后退按钮
          navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
          },
          slidesPerGroup: 5,
        });
      });
    },
  },
};
</script>

<style lang="less" scoped>
.swiper-container {
  height: 56px;
  width: 412px;
  box-sizing: border-box;
  padding: 0 12px;

  .swiper-slide {
    width: 56px;
    height: 56px;

    img {
      width: 100%;
      height: 100%;
      border: 1px solid #ccc;
      padding: 2px;
      width: 50px;
      height: 50px;
      display: block;

      &.active {
        border: 2px solid #f60;
        padding: 1px;
      }

      &:hover {
        border: 2px solid #f60;
        padding: 1px;
      }
    }
  }

  .swiper-button-next {
    left: auto;
    right: 0;
  }

  .swiper-button-prev {
    left: 0;
    right: auto;
  }

  .swiper-button-next,
  .swiper-button-prev {
    box-sizing: border-box;
    width: 12px;
    height: 56px;
    background: rgb(235, 235, 235);
    border: 1px solid rgb(204, 204, 204);
    top: 0;
    margin-top: 0;
    &::after {
      font-size: 12px;
    }
  }
}
</style>
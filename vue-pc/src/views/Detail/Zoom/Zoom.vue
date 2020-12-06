<template>
  <div class="spec-preview">
    <img :src="imgUrl" />
    <div class="event"></div>
    <div class="big">
      <img :src="bigImgUrl" />
    </div>
    <div class="mask" ></div>
  </div>
</template>

<script>
export default {
  name: "Zoom",
  props: {
    imgUrl: String,
    bigImgUrl: String,
  },
  methods: {
    // handMove(e) {
    //   // 首先是获取到鼠标的位置信息
    //   // 得到蒙版的移动位置
    //   // 鼠标在移动时，蒙版一起移动，同时，右边的大图区域也会移动，但是移动的方向是相反的
    //   // 鼠标位置到放大镜边缘的信息

    //   var mouseTOMask = {
    //     x: e.offsetX - imgUrl.getBoundingClientRect().left,
    //     y: e.offsetY - imgUrl.getBoundingClientRect().left,
    //   };
    //   // 蒙版一半位置信息信息
    //   var halfMask = {};

    //   console.log(mouseTOMask);
    // },
  },
};
</script>

<style lang="less">
.spec-preview {
  position: relative;
  width: 400px;
  height: 400px;
  border: 1px solid #ccc;

  img {
    width: 100%;
    height: 100%;
  }

  .event {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 998;
  }

  .mask {
    width: 50%;
    height: 50%;
    background-color: rgba(0, 255, 0, 0.3);
    position: absolute;
    left: 0;
    top: 0;
    display: none;
  }

  .big {
    width: 100%;
    height: 100%;
    position: absolute;
    top: -1px;
    left: 100%;
    border: 1px solid #aaa;
    overflow: hidden;
    z-index: 998;
    display: none;
    background: white;

    img {
      width: 200%;
      max-width: 200%;
      height: 200%;
      position: absolute;
      left: 0;
      top: 0;
    }
  }

  .event:hover ~ .mask,
  .event:hover ~ .big {
    display: block;
  }
}
</style>
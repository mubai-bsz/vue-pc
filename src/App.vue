<template>
  <div>
    <Header />
    <!-- 显示加载的组件 -->
    <router-view></router-view>

    <!-- footer组件在登录、注册页面不显示 -->
    <!-- <Footer
      v-if="$route.path !== '/login' && $route.path !== '/register'"
    /> -->
    <!-- 方法2，使用watch方法进行监视 -->
    <!-- <Footer v-if="isFooterShow" /> -->
    <!-- 方法3 -->
    <Footer v-if="!$route.meta.isFooterShow" />
  </div>
</template>

<script>
import Header from "./components/Header";
import Footer from "./components/Footer";
export default {
  name: "App",
  data() {
    return {
      isFooterShow: true,
    };
  },
  // watch: {
  //   $route: {
  //     handler(newVal) {
  //       this.isFooterShow =
  //         newVal.path !== "/login" && newVal.path !== "/register";

  //     },
  //   },
  //   immediate: true,
  // },
  components: {
    Header,
    Footer,
  },
};
</script>

<style lang="less" scoped>
</style>

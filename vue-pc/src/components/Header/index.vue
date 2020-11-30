<template>
  <div class="header">
    <div>
      <div class="header-top">
        <div class="header-main">
          <div class="header-left">
            <p>尚品汇欢迎您！</p>
            请<router-link to="/login">登录</router-link>
            <router-link to="/register">免费注册</router-link>
          </div>
          <div class="header-right">
            <a href="###">我的订单</a>
            <a href="###">我的购物车</a>
            <a href="###">我的尚品汇</a>
            <a href="###">尚品汇会员</a>
            <a href="###">企业采购</a>
            <a href="###">关于尚品汇</a>
            <a href="###">合作招商</a>
            <a href="###">商家后台</a>
          </div>
        </div>
      </div>
      <div class="header-bottom">
        <router-link to="/">
          <img src="./images/logo.png" alt="" />
        </router-link>
        <form class="header-search" @submit.prevent="search">
          <input type="text" class="input" v-model="searchText" />
          <button class="btn">搜索</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import Home from "../../views/Home";
import Login from "../../views/Login";
import Register from "../../views/Register";
import Search from "../../views/Search";
export default {
  name: "Header",
  data() {
    return {
      // 搜索
      searchText: "",
    };
  },
  methods: {
    /*   // 搜索功能方案一
    search() {
      // searchText解构出来
      const { searchText } = this;
      // 三元判断，searchText是否有值
      const params = searchText ? `/${searchText}` : "";
      // 生成跳转路径
      const location = `/search` + params;
      this.$router.push(location);
    }, */
    // 搜索功能 方案二
    // 路由传参
    search() {
      // searchText解构出来
      const { searchText } = this;
      const location = {
        // 使用命名路由来传递参数
        name: "search",
        // params: {
        //   searchText: searchText,
        // },
        // query: {
        //   name: "kk",
        // },
      };
      // 如果有参数，可以直接传递，没有的话，就不传
      if (searchText) {
        location.params = {
          searchText,
        };
      }
      // 添加query参数
      const { categoryName } = this.$route.query;
      // 判断是否有参数，有的话就加上
      if (categoryName) {
        location.query = {
          categoryName,
        };
      }

      this.$router.push(location);
    },
  },
  component: {
    Home,
    Login,
    Register,
    Search,
  },
};
</script>

<style lang="less" scoped>
.header-top {
  height: 30px;
  width: 100%;
  line-height: 30px;
  color: #666;
  background-color: #eaeaea;

  .header-main {
    width: 1200px;
    margin: 0 auto;
    font-size: 12px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;

    a:hover {
      color: blue;
      text-decoration: none;
    }
  }
}
.header-left {
  display: flex;
  p {
    margin: 0 10px 0 0;
  }
  a {
    padding-right: 5px;
    height: 12px;
    line-height: 12px;
    margin-top: 9px;
    margin-right: 5px;
  }
  a:nth-of-type(1) {
    border-right: 1px solid #333;
  }
  a:hover {
    color: blue;
  }
}
.header-right {
  display: block;

  a {
    padding: 0 10px;
    border-right: 1px solid #666;
  }
  a:nth-of-type(8) {
    border: none;
  }
}
.header-bottom {
  height: 80px;
  width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;

  img {
    height: 67px;
    cursor: pointer;
  }
  .header-search {
    width: 560px;
    height: 32px;
    background-color: red;
    .input {
      width: 490px;
      height: 100%;
      padding-left: 2px;
      border: 2px solid red;
      box-sizing: border-box;
      border-radius: none;
      outline: none;
    }
    .btn {
      height: 100%;
      width: 70px;
      color: #fff;
      margin: 0 auto;
      background-color: red;
      border: none;
      box-sizing: border-box;
      border-radius: none;
      outline: none;
      cursor: pointer;
    }
  }
}
</style>

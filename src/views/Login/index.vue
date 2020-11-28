<template>
  <div class="login">
    <div class="login-con">
      <div>
        <div>扫描登录</div>
        <div>账户登录</div>
        <input type="text" value="username" placeholder="手机号" />
        <input type="password" value="pass" placeholder="请输入密码" />
        <label for="">
          <input type="checkbox" />
          自动登录
        </label>
        <span>忘记密码？</span>
        <button @click="login">登录</button>
        <span>立即注册</span>
      </div>
    </div>
  </div>
</template>

<script>
import { reqLogin } from "@api/user";
export default {
  name: "Login",
  methods: {
    login() {
      reqLogin(13700000000, "111111")
        .then((res) => {
          console.log("res", res);
        })
        .catch((err) => {
          console.log("err", err);
        });
    },
  },
};
</script>

<style lang="less" scoped>
</style>

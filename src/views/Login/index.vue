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
        <button>登录</button>
        <span>立即注册</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Login",
};
</script>

<style lang="less" scoped>
</style>

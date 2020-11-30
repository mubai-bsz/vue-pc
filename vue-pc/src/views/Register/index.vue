<template>
  <div class="register">
    <div class="register-top">
      <h3>注册新用户</h3>
      <span>我有账号，去<a href="">登录</a></span>
    </div>

    <form action="" class="register-from">
      <div class="register-phong">
        手&nbsp;&nbsp;机&nbsp;&nbsp;号:
        <input type="text" name="user" placeholder="请输入手机号" />
      </div>
      <div class="Verification-code">
        验&nbsp;&nbsp;证&nbsp;&nbsp;码:
        <input
          type="text"
          name="Verification-code"
          placeholder="请输入验证码"
        />
        <img src="" alt="" />
      </div>
      <div class="register-pass">
        登录密码:
        <input type="password" name="pass" placeholder="请输入你的登录密码" />
      </div>
      <div class="register-repeat-pass">
        确认密码:
        <input
          type="password"
          name="repeat-pass"
          placeholder="请输入确认密码"
        />
      </div>
    </form>
    <div class="checkbox">
      <input type="checkbox" />
      同意协议并注册《尚品汇用户协议》
    </div>
    <div class="register-finish">
      <button>完成注册</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "Register",
};
</script>

<style lang="less" scoped>
.register {
  width: 1200px;
  height: 445px;
  border: 1px solid #999;
  margin: 0 auto;
}
.register-top {
  height: 30px;
  padding: 6px 15px;
  background-color: #ececec;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: 900;
  h3 {
    font-size: 20px;
  }
  span {
    font-size: 14px;
    color: #333;
    a {
      color: #e1251b;
    }
    a:hover {
      color: blue;
      text-decoration: none;
    }
  }
}
.register-from {
  width: 1200px;
  text-align: center;
  margin-top: 20px;

  input {
    width: 270px;
    height: 38px;
    margin: 10px 0;
    padding: 0 10px;
    box-sizing: border-box;
  }
}

.register-phong {
  margin-left: 5px;
}
.Verification-code {
  margin-left: 5px;
}
.checkbox {
  text-align: center;
  margin-top: 5px;
}
.register-finish {
  text-align: center;
  margin-top: 20px;
  button {
    width: 270px;
    height: 38px;
    margin-left: 50px;
    font-size: 16px;
    color: #fff;
    background-color: #e1251b;
    outline: none;
    border: 0;
  }
}
</style>

<template>
  <div class="login">
    <div class="login-bg">
      <div class="login-con">
        <div class="login-con-list">
          <ul>
            <li class="login-left"><a href="">扫描登录</a></li>
            <li class="login-right"><a href="">账户登录</a></li>
          </ul>
          <form class="login-form">
            <div class="login-form-top">
              <i></i>
              <input type="text" name="user" placeholder="手机号" />
            </div>
            <div class="login-form-bottom">
              <i></i>
              <input type="password" name="pass" placeholder="请输入密码" />
            </div>
            <div class="login-form-check">
              <label>
                <input type="checkbox" checked />
                自动登录
              </label>
              <span>忘记密码？</span>
            </div>
            <button class="login-login-button" @click="login">登录</button>
          </form>
          <div class="login-login-register">
            <p>立即注册</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { reqLogin } from "@/api/user";
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
* {
  margin: 0;
  padding: 0;
}
.login {
  height: 487px;
  background-color: #e93854;
  .login-bg {
    width: 1200px;
    height: 100%;
    margin: 0 auto;
    background: url("./images/loginbg.png") no-repeat;
    position: relative;
  }
}
.login-con {
  width: 420px;
  height: 406px;
  background-color: #fff;
  position: absolute;
  right: 0;
  top: 50%;
  margin-top: -203px;
  display: flex;
  align-items: center;
}
.login-con-list {
  width: 380px;
  height: 366px;
  border: 1px solid #999;
  margin: 0 auto;
}
.login-con-list ul {
  height: 50px;
  display: flex;
  color: #333;
  font-weight: 800;
  .login-left {
    width: 190px;
    height: 50px;
    border-right: 1px solid #999;
    border-bottom: 1px solid #999;
    font-size: 20px;
    line-height: 50px;
    text-align: center;
    a {
      color: #333;
      font-weight: 800;
      text-decoration: none;
    }
    a:hover {
      color: blue;
    }
  }
  .login-right {
    width: 190px;
    height: 50px;

    font-size: 20px;
    line-height: 50px;
    text-align: center;
    a {
      color: rgb(236, 44, 44);
      font-weight: 800;
      text-decoration: none;
    }
    a:hover {
      color: blue;
    }
  }
}
.login-form {
  width: 342px;
  height: 186px;
  padding: 18px;
  margin: 15px 0 18px;
}
.login-form-top {
  margin-bottom: 22px;
  display: flex;
  flex-wrap: wrap;
  i {
    width: 36px;
    height: 32px;
    border: 1px solid #999;
    background: url("./images/icons.png");
    background-position: 550px 68px;
    box-sizing: border-box;
  }
  input {
    width: 302px;
    height: 32px;
    border: 1px solid #999;
    padding: 6px 8px;
    box-sizing: border-box;
    outline: none;
  }
}
.login-form-bottom {
  margin-bottom: 22px;
  display: flex;
  flex-wrap: wrap;
  i {
    width: 36px;
    height: 32px;
    border: 1px solid #999;
    background: url("./images/icons.png");
    background-position: 488px 68px;
    box-sizing: border-box;
  }
  input {
    width: 302px;
    height: 32px;
    border: 1px solid #999;
    padding: 6px 8px;
    box-sizing: border-box;
    outline: none;
  }
}
.login-form-check {
  display: flex;
  justify-content: space-between;
}
.login-login-button {
  width: 342px;
  height: 32px;
  background-color: #e1251b;
  padding: 6px;
  margin-top: 25px;
  font-size: 16px;
  color: #fff;
  border: 0;
  outline: none;
}
.login-login-register {
  width: 342px;
  height: 37px;
  margin-top: 15px;
  padding-right: 18px;

  p {
    font-size: 15px;
    color: #666;
    text-align: right;
  }
}
</style>

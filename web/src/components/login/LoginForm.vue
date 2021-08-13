<template>
  <div class="login-from">
    <!-- 登录表单头部 -->
    <header class="login-title">
      <h2>登录</h2>
      <h4>
        你尚未拥有账户？点击
        <span class="login-regist">注册</span>
        进行登录
      </h4>
    </header>
    <!-- 登录表单内容 -->
    <article>
      <el-form
        :model="LoginFormData"
        :rules="rules"
        class="login-form-body"
        ref="LoginFormData"
        label-width="100px"
      >
        <el-form-item
          v-for="item in LoginForm"
          :key="item.title"
          :label="item.title"
          :prop="item.name"
          :class="item.name"
        >
          <el-input
            v-model="LoginFormData[item.name]"
            :maxlength="item.meta.max"
            :type="item.meta.type ? item.meta.type : ''"
          ></el-input>
        </el-form-item>
      </el-form>
      <!-- <el-checkbox v-model="ready" class="login-ready"
        >我已经阅读并同意
        <span>《相关协议》</span>
      </el-checkbox> -->
      <div class="login-button">
        <el-button round type="warning">找回</el-button>
        <el-button round type="primary" @click.stop="login">登录</el-button>
      </div>
    </article>
    <!-- 登录表单底部 -->
    <footer>
      <h3>其他社交方式登录</h3>
      <div class="login-other">
        <img class="login-icon" v-for="img in login_icons" :key="img" :src="img" />
      </div>
    </footer>
  </div>
</template>

<script>

import weixin from "../../assets/images/login/weixin.png";
import qq from "../../assets/images/login/qq.png";
import weibo from "../../assets/images/login/weibo.png";
import { _login } from '../../api/auth/index'

export default {
  name: 'LoginForm',
  data (){
    return {
      LoginFormData: {
        phone: "",
        password: "",
      },
      LoginForm: [
        {
          title: "手机号",
          name: "phone",
          value: "",
          meta: {
            max: 11,
          },
        },
        {
          title: "登录密码",
          name: "password",
          value: "",
          meta: {
            max: 30,
            type: "password",
          },
        },
      ],
      rules: {
        phone: [{ required: true, message: "请输入手机号码", trigger: "blur" }],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
      },
      ready: false,
      login_icons: [weixin, qq, weibo],
    };
  },
  methods: {
    async login (){
      const result = await _login(this.LoginFormData);
      console.log(result);
      if ( result.code ){
        localStorage.setItem('token', result.token);
        localStorage.setItem('userId', result.userId);
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.login-form {
  .login-title {
    h2 {
      font-size: 34px;
    }
    h4 {
      font-size: 14px;
      color: rgba($color: gray, $alpha: 0.7);
      letter-spacing: 1px;
      padding: 8px 0;
      .login-regist {
        color: #426ab3;
      }
      .login-regist:hover {
        color: #6a6da9;
        cursor: pointer;
      }
    }
  }
  article {
    .login-form-body {
      .phone,
      .password {
        width: 80%;
        padding: 15px;
      }
      .password {
        padding-top: 5px;
      }
    }
    .login-ready {
      span {
        color: #426ab3;
      }
      span:hover {
        color: #6a6da9;
        cursor: pointer;
      }
    }
    .login-button {
      text-align: right;
      padding: 20px 15% 0 0;
      button {
        width: 40%;
      }
    }
  }
  footer {
    position: absolute;
    bottom: 10%;
    width: 60%;
    h3 {
      color: rgba($color: gray, $alpha: 0.8);
      font-size: 14px;
      letter-spacing: 1px;
    }
    .login-other {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      .login-icon {
        max-width: 3rem;
        margin-top: 15px;
        padding: 0 1rem;
      }
    }
  }
}
</style>
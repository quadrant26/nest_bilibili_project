<template>
  <div class="login-from">
    <!-- 注册表单头部 -->
    <header class="login-title">
      <h2>注册</h2>
      <h4>
        你已有账户？点击
        <span class="login-regist" @click.stop="changeEvent('login')">登录</span>
        进行登录
      </h4>
    </header>
    <!-- 注册表单内容 -->
    <article>
      <el-form
        :model="RegisterFormData"
        :rules="rules"
        class="login-form-body"
        ref="RegisterFormData"
        label-width="100px"
      >
        <el-form-item
          v-for="item in RegisterForm"
          :key="item.title"
          :label="item.title"
          :prop="item.name"
          :class="[item.name, 'form-item']"
        >
          <el-input
            v-model="RegisterFormData[item.name]"
            :maxlength="item.meta.max"
            :type="item.meta.type ? item.meta.type : ''"
          ></el-input>
        </el-form-item>
        <el-form-item prop="ready">
          <el-checkbox-group v-model="RegisterFormData.ready">
            <el-checkbox name="ready">
              我已经阅读并同意
              <span @click.stop="showDiolog">《相关协议》</span>
            </el-checkbox>
          </el-checkbox-group>
        </el-form-item>
      </el-form>
      <div class="login-button">
        <el-button round type="warning" @click.stop="changeEvent('alter')">找回</el-button>
        <el-button round type="primary" @click.stop="regist('RegisterFormData')">注册</el-button>
      </div>
    </article>
    <!-- 登录表单底部 -->
    <!-- <footer>
      <h3>其他社交方式登录</h3>
      <div class="login-other">
        <img class="login-icon" v-for="img in login_icons" :key="img" :src="img" />
      </div>
    </footer> -->

    <el-dialog
      title="用户协议"
      v-model="dialogVisible"
      width="30%"
      :before-close="handleClose">
      <span>这是一段信息</span>
    </el-dialog>
  </div>
</template>

<script>

import weixin from "../../assets/images/login/weixin.png";
import qq from "../../assets/images/login/qq.png";
import weibo from "../../assets/images/login/weibo.png";
import { _register } from '../../api/auth/index'
import { ElMessage } from 'element-plus';

export default {
  name: 'RegisterForm',
  data (){
    return {
      dialogVisible: false,
      RegisterFormData: {
        phone: "",
        password: "",
        repassword: "",
        ready: []
      },
      RegisterForm: [
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
        {
          title: "确认密码",
          name: "repassword",
          value: "",
          meta: {
            max: 30,
            type: "repassword",
          },
        },
      ],
      rules: {
        phone: [{ required: true, message: "请输入手机号码", trigger: "blur" }],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
        repassword: [{ required: true, message: "请确认密码", trigger: "blur" }],
        ready: [{ required: true, type: 'array', message: "请同意用户协议", trigger: "change" }],
      },
      login_icons: [weixin, qq, weibo],
    };
  },
  methods: {
    showDiolog (){
      this.dialogVisible = true;
    },
    regist (formName){
      this.$refs[formName].validate( (valid) => {
        if ( valid ){
          this.sendRegister();
        } else {
          return false;
        }
      })
    },
    async sendRegister (){
      if ( this.RegisterForm.password !== this.RegisterFormData.repassword) {
        ElMessage.warning({
          message: "两次密码不一致",
          type: "warning"
        });
        return;
      }
      const result = await _register(this.RegisterFormData);
      ElMessage.success({
        message: result,
        type: "success"
      });
      this.changeEvent('login');
    },
    changeEvent (newEvent){
      this.$store.commit('setEvent', newEvent)
    },
    login (){
      this.$store.commit('setEvent', 'login')
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
      .form-item{
        width: 80%;
        padding: 5px;
        margin-bottom: 15px;
      }
      .phone,
      .password {
        width: 80%;
        padding: 5px;
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
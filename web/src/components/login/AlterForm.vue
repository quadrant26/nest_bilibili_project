<template>
  <div class="login-from">
    <!-- 登录表单头部 -->
    <header class="login-title">
      <h2>找回密码</h2>
    </header>
    <!-- 登录表单内容 -->
    <article>
      <el-form
        :model="AlterFormData"
        :rules="rules"
        class="login-form-body"
        ref="AlterFormData"
        label-width="100px"
      >
        <el-form-item
          v-for="item in AlterForm"
          :key="item.title"
          :label="item.title"
          :prop="item.name"
          :class="[item.name, 'form-item']"
        >
          <el-input
            v-model="AlterFormData[item.name]"
            :maxlength="item.meta.max"
            :type="item.meta.type ? item.meta.type : ''"
          ></el-input>
        </el-form-item>
        <el-form-item prop="captcha" label="验证码" class="form-item captcha">
          <div class="captcha-inside">
            <el-input
              v-model="AlterFormData.captcha"
              maxlength="4"
            ></el-input>
            <p v-html="captcha.img" @click.stop="getNewCaptcha(captcha.id)"></p>
          </div>
        </el-form-item>
      </el-form>
      <!-- <el-checkbox v-model="ready" class="login-ready"
        >我已经阅读并同意
        <span>《相关协议》</span>
      </el-checkbox> -->
      <div class="login-button">
        <el-button round type="warning" @click.stop="alter('AlterFormData')">开始找回</el-button>
        <el-button round type="primary" @click.stop="changeEvent('login')">登录</el-button>
      </div>
    </article>
    <!-- 登录表单底部 -->
    <!-- <footer>
      <h3>其他社交方式登录</h3>
      <div class="login-other">
        <img class="login-icon" v-for="img in login_icons" :key="img" :src="img" />
      </div>
    </footer> -->
  </div>
</template>

<script>

import weixin from "../../assets/images/login/weixin.png";
import qq from "../../assets/images/login/qq.png";
import weibo from "../../assets/images/login/weibo.png";
import { _alter, _captcha, _verify } from '../../api/auth/index';
import { ElMessage } from 'element-plus';

export default {
  name: 'AlterForm',
  data (){
    return {
      captcha: {
        id: -1,
        img: ""
      },
      AlterFormData: {
        phone: "",
        captcha: "",
        password: "",
      },
      AlterForm: [
        {
          title: "手机号",
          name: "phone",
          value: "",
          meta: {
            max: 11,
          },
        },
        {
          title: "新密码",
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
        captcha: [{ required: true, message: "请输入验证码", trigger: "blur" }],
      },
      ready: false,
      login_icons: [weixin, qq, weibo],
    };
  },
  mounted() {
    this.getNewCaptcha();
  },
  methods: {
    alter (formName){
      this.$refs[formName].validate( valid => {
        if ( valid ){
          this.sendAlter();
        } else {
          return false;
        }
      })
      
    },
    async sendAlter (){

      const captcha = {
        captcha: this.AlterFormData.captcha,
        id: this.captcha.id
      }

      // 提交密码前,校验验证码是否正确
      _verify(captcha).then( async (res) => {
        if ( typeof res === 'number' ) throw res;
        const result = await _alter(this.AlterFormData);
        ElMessage.success({
          message: result,
          type: "success"
        });
        this.changeEvent('login');
      })
    },
    changeEvent (newEvent) {
      this.$store.commit('setEvent', newEvent);
    },
    login (){
      this.$store.commit('setEvent', 'login')
    },
    getNewCaptcha (id){
      _captcha(id).then( res => {
        this.captcha = res;
      })
    },
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
      .captcha {
        margin-bottom: 0;
        .captcha-inside {
          display: flex;
          align-items: center;
        }
      }
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
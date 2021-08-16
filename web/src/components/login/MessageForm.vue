<template>
  <div class="message-box">
    <h4>短信验证码</h4>
    <p>短信验证码成功发送至您的手机，请输入短信验证码</p>
    <div class="message-body">
      <el-input maxLength="6" v-model="captcha" class="message-input" placeholder="请输入短信验证码"></el-input>
    </div>
    <div class="message-footer">
      <el-button class="el-bu" type="success" @click.stop="resend">{{rendName}}</el-button>
      <el-button class="el-bu" type="primary" @click.stop="next">下一步</el-button>
    </div>
  </div>
</template>

<script>
  
  import { ElMessage } from 'element-plus';
import { _register } from '../../api/auth';

  export default {
    name: "MessageForm",
    data (){
      return {
        captcha: "",
        rendName: "重新发送",
        resendDisabled: true,
      }
    },
    methods: {
      resend (){
        let that = this;
        return new Promise( (res, rej) => {

          this.resendDisabled = true;
          if ( this.rendName !== "重新发送"){
            rej();
          }

          this.captcha = "";
          ElMessage.warning({
            message: "验证码已成功发生",
            type: 'warning'
          })

          res();
        }).then( () => {
          that.rendName = 60;
          const counter = setInterval( () => {
            if ( that.rendName === 0 ){
              that.rendName = "重新发送";
              this.resendDisabled = false;
              clearInterval(counter);
            }
            that.rendName --;
          }, 1000)
        })
      },
      vertify (){
        return new Promise( (res, rej) => {
          res();
        }).then( () => {
          rhis.next();
        })
      },
      next (){
        const regiserForm = JSON.parse( sessionStorage.getItem('register'));
        _register(regiserForm).then( res => {
          if ( typeof res === 'number' ) throw "";
          return res;
        }).then( (res) => {
          ElMessage.success({
            message: res,
            type: 'success'
          }) 
        }).then( () => {
          this.setEvent('login')
        })
      },
      setEvent(eventName) {
        this.$store.commit('setEvent', eventName);
      }
    }
  }
</script>

<style lang="scss" scoped>
.message-box {
  h4 {
    padding-bottom: 1rem;
    text-align: left;
  }
  p {
    font-size: 12px;
    padding-bottom: 2rem;
    text-align: left;
  }
  .message-body {
    height: 60%;
    display: flex;
    justify-content: center;
    align-items: center;
    .message-input {
      width: 10rem;
    }
  }

  .message-footer {
    width: 100%;
    display: flex;
    justify-content: space-around;
    button {
      margin: 1rem;
    }
    .el-bu {

    }
  }
}
</style>
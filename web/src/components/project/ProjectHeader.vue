<template>
  <header class="header">
    <div class="header-logo">
      <img src="../../assets/logo.png" alt="">
      <span>项目管理平台</span>
    </div>
    <div class="header-messages">
      <div class="header-message" v-for="item in messages" :key="item.title">
        <span>{{item.title}}</span>
      </div>
    </div>
  </header>
</template>

<script>
  export default {
    data(){
      return {
        messages: [
          {
            title: "我的",
          },
          {
            title: "消息",
          },
          {
            title: "设置",
          }
        ]
      }
    }
  }
</script>

<style lang="scss" scoped>
header {
  display: flex;
  width: 110%;
  position: relative;
  right: 5%;
  justify-content: space-between;
  box-shadow: 0 5px 4px -4px black;
  .header-logo {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left: 5%;
    img {
      zoom: 0.15;
    }
    span {
      margin-left: 0.5rem;
      font-size: 14px;
    }
  }
  .header-messages {
    display: flex;
    margin-right: 5%;
    .header-message {
      padding: 0.5rem;
      font-size: 12px;
    }
  }
}
</style>
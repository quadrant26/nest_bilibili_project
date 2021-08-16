<template>
  <div class="side">
    <div class="" v-for="item in items" :key="item.title">
      <span>{{item.title}}</span>
    </div>
  </div>
</template>

<script>
  export default {
    data (){
      return { 
        items: [
          {
            title: '项目'
          },
          {
            title: '好友'
          },
          {
            title: '社区'
          },
          {
            title: '个人'
          }
        ]
      }
    }
  }
</script>

<style lang="scss" scoped>
.side {
  width: 10%;
  height: 100%;
}
</style>
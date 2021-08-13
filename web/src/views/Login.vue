<template>
  <div>
    123234

    <el-button>1</el-button>
  </div>
</template>

<script>
  export default {
    created (){
      console.log(this.$store.state.count);
      this.$store.commit('increment');
      console.log(this.$store.state.count);
    }
  }
</script>

<style lang="scss" scoped>

</style>
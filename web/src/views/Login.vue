<template>
  <div>
    123234
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
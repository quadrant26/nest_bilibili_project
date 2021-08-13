<template>
  <div>
    123234

    <el-button>1</el-button>
  </div>
</template>

<script>
import { _hello } from '../api/user';
  
export default {
  created (){
    console.log(this.$store.state.count);
    this.$store.commit('increment');
    console.log(this.$store.state.count);

    _hello().then(res => {
      console.log(res)
    });
  }
}
</script>

<style lang="scss" scoped>

</style>
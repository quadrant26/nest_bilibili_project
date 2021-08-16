<template>
  <div>
    <ProjectHeader></ProjectHeader>
    <ProjectMain></ProjectMain>
    <ProjectSide></ProjectSide>
  </div>
</template>

<script>
  import ProjectHeader from '../components/project/ProjectHeader.vue';
  import ProjectMain from '../components/project/ProjectMain.vue';
  import ProjectSide from '../components/project/ProjectSide.vue';

  export default {
    name: 'Project',
    components: {
      ProjectHeader,
      ProjectMain,
      ProjectSide
    },
    data(){
      return {

      }
    }
  }
</script>

<style lang="scss" scoped>

</style>
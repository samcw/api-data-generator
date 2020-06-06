<template>
  <v-app class="main">
    <router-view></router-view>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      
    }
  },
  mounted() {
    this.$router.push({name: 'Project'});
  }
}
</script>

<style scoped>
  .main {
    height: 100%;
  }
</style>

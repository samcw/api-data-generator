<template>
  <div>
    <p>project</p>
  </div>
</template>

<script>
export default {
  methods: {
    getProjectList() {
      this.$ipcRenderer.send('getProjectList');
    }
  },
  mounted() {
    this.getProjectList();
  }
}
</script>

<style>

</style>

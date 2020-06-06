<template>
  <div class="project">
    <v-list dense width="150" class="project-list">
      <v-subheader class="title">
        <span style="font-size: 0.875rem" class="pl-1">PROJECT</span>
        <v-btn icon color="grey" x-small @click="onClickAddProject">
          <v-icon>mdi-plus</v-icon>
        </v-btn>
      </v-subheader>
      <v-list-item-group color="primary">
        <v-list-item
          v-for="(item, i) in projectList"
          :key="i">
          <v-list-item-content>
            <v-list-item-title>{{item.projectName}}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
      <p v-if="projectList.length === 0" class="tip">请添加项目</p>
    </v-list>
    <div class="project-right">
      <router-view></router-view>
    </div>
    <v-snackbar
      v-model="projectBar.status"
    >
      {{ projectBar.text }}
      <v-btn
        color="pink"
        text
        @click="projectBar.status = false"
      >
        Close
      </v-btn>
    </v-snackbar>
  </div>
</template>

<script>

export default {
  data() {
    return {
      projectList: [],
      projectBar: {
        status: false,
        text: ''
      }
    }
  },
  methods: {
    getProjectList() {
      this.projectList = this.$ipcRenderer.sendSync('getProjectList-message');
    },
    onClickAddProject() {
      this.$router.push({name: 'AddProject'});
    },
    setProjectBar(text) {
      this.projectBar.status = true;
      this.projectBar.text = text;
    },
  },
  provide() {
    return {
      setProjectBar: this.setProjectBar,
      getProjectList: this.getProjectList
    }
  },
  mounted() {
    this.getProjectList();
    // if (this.projectList.length !== 0) {

    // }
  }
}
</script>

<style scoped>
  .project {
    display: flex;
    flex-direction: row;
    height: 100%;
  }
  .title {
    display: flex;
    justify-content: space-between;
  }
  .project-list {
    border-right: 1px solid #dfdfdf;
  }
  .tip {
    font-size: 0.6rem;
    color: grey;
    text-align: center;
    margin-top: 5px;
  }
  .project-right {
    width: 100%;
    height: 100%;
  }
</style>

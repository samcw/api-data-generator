<template>
  <div class="project">
    <v-list dense width="150" class="project-list">
      <v-subheader class="title mb-1">
        <span style="font-size: 0.875rem" class="pl-1">PROJECT</span>
        <v-btn icon color="grey" x-small @click="onClickAddProject">
          <v-icon>mdi-plus</v-icon>
        </v-btn>
      </v-subheader>
      <v-divider class="mb-1"></v-divider>
      <v-list-item-group color="primary">
        <v-list-item
          v-for="(item, i) in projectList"
          :key="i"
          link
          @click="onClickJump(item.id)"
          >
          <v-list-item-content>
            <v-list-item-title>{{item.projectName}}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
      <p v-if="projectList.length === 0" class="tip">请添加项目</p>
    </v-list>
    <div class="project-right">
      <router-view :key="key"></router-view>
    </div>
    <v-snackbar
      top
      :timeout="2000"
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
  computed: {
    key() {
      return this.$route.name !== undefined? this.$route.name +new Date().getTime(): this.$route +new Date().getTime();
    }
  },
  methods: {
    getProjectList() {
      this.projectList = this.$ipcRenderer.sendSync('getProjectList');
    },
    onClickAddProject() {
      if (this.$route.name === 'AddProject') return;
      this.$router.push({name: 'AddProject'});
    },
    onClickJump(id) {
      if (this.$route.name === 'ProjectDetail' && this.$route.query.id === id) return;
      this.$router.push({
        name: 'ProjectDetail',
        query: { id: id }
      })
    },
    setProjectBar(text) {
      this.projectBar.status = true;
      this.projectBar.text = text;
    },
    jump() {
      this.$router.push({
        name: 'ProjectDetail',
        query: { id: this.projectList[0].id }
      })
    }
  },
  provide() {
    return {
      setProjectBar: this.setProjectBar,
      getProjectList: this.getProjectList,
      jump: this.jump
    }
  },
  mounted() {
    this.getProjectList();
    if (this.projectList.length !== 0) {
      if (this.$route.name === 'ProjectDetail') return;
      this.jump();
    }
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

<template>
  <div class="home">
    <v-navigation-drawer
    width="180"
    :permanent="true"
    >
      <v-list
        dense
      >
        <v-list-item two-line>
          <v-list-item-avatar>
            <img src="https://tva1.sinaimg.cn/large/007S8ZIlly1gfih6opgsaj305k05k3yh.jpg">
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title>DataGenerator</v-list-item-title>
            <v-list-item-subtitle>Samcw</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>

        <v-divider></v-divider>

        <v-list-item link :to="{name: 'Project'}">
          <v-list-item-content class="pl-1">
            <v-list-item-title>项目<span class="ml-4 text--disabled">Project</span></v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item link :to="{name: 'About'}">
          <v-list-item-content class="pl-1">
            <v-list-item-title>关于<span class="ml-4 text--disabled">About</span></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <div class="home-right-side">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data() {
    return {
      drawer: true,
    }
  },
  methods: {
  }
}
</script>

<style scoped>
  .home {
    height: 100%;
    display: flex;
    flex-direction: row;
  }
  hr {
    margin-bottom: 4px;
  }
  .home-right-side {
    width: 100%;
  }
</style>

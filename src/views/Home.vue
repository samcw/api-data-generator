<template>
  <div class="home">
    <v-navigation-drawer
    width="180"
    :permanent="true"
    >
      <v-list
        nav
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

        <v-list-item link @click="jump('Project')">
          <!-- <v-list-item-icon>
            <v-icon>mdi-account-box-outline</v-icon>
          </v-list-item-icon> -->

          <v-list-item-content class="pl-2">
            <v-list-item-title>项目</v-list-item-title>
          </v-list-item-content>
        </v-list-item> 

        <v-list-item link @click="jump('About')">
          <!-- <v-list-item-icon>
            <v-icon>mdi-alert-circle-outline</v-icon>
          </v-list-item-icon> -->

          <v-list-item-content class="pl-2">
            <v-list-item-title>关于</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <div>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data() {
    return {
      drawer: true
    }
  },
  methods: {
    jump(target) {
      if (!target || this.$route.name === target) return;
      this.$router.push({name: target});
    }
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
    margin-bottom: 2px;
  }
</style>

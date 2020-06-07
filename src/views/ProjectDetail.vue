<template>
  <div class="projectDetail">
    <div class="title pl-10 pt-4">
      <div class="text--secondary d-flex justify-space-between">
        <div>
          {{projectDetail.projectName}}
          <span class="ml-4 body-2">Port: {{projectDetail.port}}</span>
          <span class="ml-4 body-2">Author: {{projectDetail.author}}</span>
        </div>
        <v-btn x-small depressed color="error" class="delete">DELETE</v-btn>
      </div>
    </div>
    <div class="line"></div>
    <div class="form">
      <v-container>
        <p>
          <v-btn x-small depressed>NEW ITEM</v-btn>
        </p>
        <v-data-table
          v-model="selected"
          :headers="headers"
          :items="projectDetail.parameterList"
          item-key="id"
          show-select
          hide-default-footer
          :single-select="true"
        >
          <!-- <template v-slot:item.glutenfree="{ item }">
            <v-btn x-small depressed>NEW ITEM</v-btn>
          </template> -->
        </v-data-table>
      </v-container>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      projectDetail: {},
      headers: [
        {
          text: 'API NAME', value: 'apiName'
        },
        {
          text: 'METHOD', value: 'method'
        },
        {
          text: 'ACTIONS'
        }
      ],
      selected: [],
    }
  },
  methods: {
    getProjectDetail() {
      this.projectDetail = this.$ipcRenderer.sendSync('getProjectDetail', this.$route.query.id);
      console.log(this.projectDetail);
    }
  },
  mounted() {
    this.getProjectDetail();
  },
}
</script>

<style scoped>
  .projectDetail {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    height: 100%;
  }
  .line {
    height: 1px;
    width: 90%;
    background-color: #dfdfdf;
  }
  .title {
    width: 100%;
  }
  .form {
    width: 90%;
    padding: 10px;
  }
  .delete {
    margin-top: 6px;
    margin-right: 6%;
  }
</style>

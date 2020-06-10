<template>
  <div class="projectDetail">
    <div class="title pl-10 pt-4">
      <div class="text--secondary d-flex justify-space-between">
        <div>
          NEW API
        </div>
      </div>
    </div>
    <div class="line"></div>
    <div class="form">
      <v-container>
        <v-row>
          <v-col cols="6">
            <v-text-field
              :counter="20"
              label="Name"
              required
              dense
              v-model="addForm.name"
            ></v-text-field>
          </v-col>
          <v-col cols="4">
            <v-select
              dense
              :items="methods"
              label="Method"
              v-model="addForm.method"
            ></v-select>
          </v-col>
        </v-row>
        <v-row>
          <p class="pl-3">
            <span class="body-2 text--secondary">URI will be like : </span>
            <a href="" class="body-2 ml-2">
              http://localhost:{{projectDetail.port}}/{{projectDetail.api}}/{{addForm.name}}
            </a>
          </p>
        </v-row>
        <div>
          <label class="body-1 font-weight-bold">Request Body</label>
          <CodeMirror refName="request"></CodeMirror>
        </div>
        <div>
          <label class="body-1 font-weight-bold">Response Body</label>
          <CodeMirror refName="response"></CodeMirror>
        </div>
      </v-container>
    </div>
  </div>
</template>

<script>
import CodeMirror from '../components/CodeMirror';

export default {
  data() {
    return {
      addForm: {
        name: '',
        method: ''
      },
      methods: ['GET', 'POST'],
      projectId: '',
      projectDetail: {},
    }
  },
  components: {
    CodeMirror
  },
  methods: {
    getProjectDetail() {
      this.projectDetail = this.$ipcRenderer.sendSync('getProjectDetail', this.$route.query.id);
      console.log(this.projectDetail);
    },
  },
  mounted() {
    this.projectId = this.$route.query.id;
    if (this.projectId) this.getProjectDetail();
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
    overflow-y: auto;
  }
  .line {
    padding-top: 1px;
    width: 90%;
    background-color: #dfdfdf;
    margin-top: 5px;
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

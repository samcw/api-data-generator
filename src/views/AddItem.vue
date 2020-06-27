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
      <v-form ref="addForm" v-model="valid">
        <v-container>
          <v-row>
            <v-col cols="8">
              <v-text-field
                :counter="20"
                label="Name"
                required
                dense
                :rules="rules.Name"
                v-model="addForm.name"
              ></v-text-field>
            </v-col>
            <v-col cols="4">
              <v-select
                dense
                :items="methods"
                label="Method"
                :rules="rules.Method"
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
            <CodeMirror refName="request" @handleJsonData="handleJsonData"></CodeMirror>
          </div>
          <div>
            <label class="body-1 font-weight-bold">Response Body</label>
            <CodeMirror refName="response" @handleJsonData="handleJsonData"></CodeMirror>
          </div>
          <div class="submit mt-4">
            <v-btn small :disabled="!valid" @click="onClickSubmit">submit</v-btn>
          </div>
        </v-container>
      </v-form>
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
        method: '',
        request: null,
        response: null
      },
      methods: ['GET', 'POST'],
      projectId: '',
      projectDetail: {},
      rules: {
        Name: [
          v => !!v || 'Name is required',
          v => (v && v.length <= 20) || 'Name must be less than 20 characters'
        ],
        Method: [
          v => !!v || 'Method is required'
        ]
      },
      valid: false
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
    //get the value from the codeMirror,and set it in the addForm before check its type
    handleJsonData(e) {
      let data = e.data;
      try {
        data = typeof JSON.parse(data) == 'object' ? JSON.parse(data) : null;
      } catch (error) {
        data = null;
      }
      this.addForm[e.from] = data ? JSON.stringify(data) : null;
      console.log(this.addForm);
    },
    //handle submit event
    onClickSubmit() {
      const item = {
        projectId: this.projectId,
        ...this.addForm
      }
      this.$ipcRenderer.sendSync('addNewProjectItem', item);
    }
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
  .submit {
    display: flex;
    flex-direction: row-reverse;
  }
</style>

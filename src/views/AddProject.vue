<template>
  <div class="addProject">
    <div class="title pl-10 pt-4">
      <div class="text--secondary">New Project</div>
    </div>
    <div class="line"></div>
    <div class="form">
      <v-form ref="addForm" v-model="valid">
        <v-container>
          <v-row>
            <v-col cols="8">
              <v-text-field
                :counter="20"
                label="Project name"
                required
                :rules="rules.projectName"
                v-model="addForm.projectName"
              ></v-text-field>
            </v-col>
            <v-col cols="4">
              <v-text-field
                :counter="10"
                label="Port"
                required
                :rules="rules.port"
                v-model="addForm.port"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="6">
              <v-text-field
                :counter="20"
                label="Author"
                required
                :rules="rules.author"
                v-model="addForm.author"
              ></v-text-field>
            </v-col>
            <v-col cols="4">
              <v-text-field
                :counter="20"
                label="Api"
                required
                v-model="addForm.api"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12">
              <v-textarea label="Description" v-model="addForm.description"></v-textarea>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="4">
              <v-btn small :disabled="!valid" @click="onClickAddSubmit">Submit</v-btn>
            </v-col>
          </v-row>
        </v-container>
      </v-form>
    </div>
    <v-dialog v-model="dialog.confirmDialog" width="400">
      <!-- <v-card>
        <v-card-title class="headline">The project you intend to create, its URI address will be prefixed with:</v-card-title>
        <p>
          http://localhost:{{addForm.port}}/{{addForm.api}}
        </p>
      </v-card> -->
      <v-card>
        <v-card-title class="title">The URI address will be prefixed with:</v-card-title>

        <v-card-text>
          http://localhost:{{addForm.port}}/{{addForm.api}}
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="grey darken-1"
            text
            @click="dialog.confirmDialog = false"
          >
            Cancel
          </v-btn>
          <v-btn
            color="green darken-1"
            text
            @click="onClickConfirm"
          >
            Submit
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      valid: false,
      rules: {
        projectName: [
          v => !!v || 'ProjectName is required',
          v => (v && v.length <= 20) || 'ProjectName must be less than 20 characters'
        ],
        port: [
          v => !!v || 'Port is required',
          v => (v && v.length <= 10) || 'Port must be less than 10 characters'
        ],
        author: [
          v => !!v || 'Auhtor is required',
          v => (v && v.length <= 20) || 'Author must be less than 20 characters'
        ],
        api: [
          v => !!v || 'Auhtor is required',
          v => (v && v.length <= 20) || 'Api must be less than 20 characters'
        ]
      },
      addForm: {
        projectName: '',
        api: '',
        port: '',
        author: '',
        description: ''
      },
      dialog: {
        confirmDialog: false
      }
    }
  },
  inject: ['setProjectBar', 'getProjectList', 'jump'],
  methods: {
    onClickAddSubmit() {
      this.dialog.confirmDialog = true
    },
    onClickConfirm() {
      this.submit();
    },
    submit() {
      let data = Object.assign({
        parameterList: []
      }, this.addForm)
      let status = this.$ipcRenderer.sendSync('addProject', data);
      if (status === 500) {
        this.setProjectBar('Failed, please try again.');
      } else if (status === 200) {
        this.setProjectBar('Success!');
        this.getProjectList();
        this.jump();
      }
    }
  }
}
</script>

<style scoped>
  .addProject {
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
    margin-top: 5px;
  }
  .title {
    width: 100%;
  }
  .form {
    width: 90%;
    padding: 10px;
  }
</style>

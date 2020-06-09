<template>
  <div>
    <v-container>
      <textarea
        ref="test"
      ></textarea>
    </v-container>
  </div>

</template>

<script>
import "codemirror/lib/codemirror.css";
import "codemirror/addon/hint/show-hint.css";

let CodeMirror = require("codemirror/lib/codemirror");
require("codemirror/addon/edit/matchbrackets");
require("codemirror/addon/edit/closebrackets");
require("codemirror/addon/selection/active-line");
require("codemirror/addon/hint/show-hint");
require("codemirror/addon/hint/anyword-hint");
require("codemirror/mode/javascript/javascript")

// const mockHint = [
//   '@address',
//   '@id'
// ]

export default {
  data() {
    return {
      CodeMirror: {}
    }
  },
  // props: {
  //   refName: String
  // },
  methods: {
    init() {
      let editor = CodeMirror.fromTextArea(this.$refs.test, {
        mode: 'application/json',
        lineNumbers: true,
        indentWithTabs: true,
        smartIndent: true,
        indentUnit: 2,
        lineWrapping: true,
        matchBrackets: true,
        autoCloseBrackets: true
      })
      CodeMirror.commands.autocomplete = function(cm) {
        cm.showHint({hint: CodeMirror.hint.anyword});
      };
      editor.setSize('100%', '400px')
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.init();
    })
  }
}
</script>

<style scoped>

</style>

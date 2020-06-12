<template>
  <div class="mt-3 mb-3">
    <textarea
      :ref="refName"
    ></textarea>
  </div>
</template>

<script>
import "codemirror/lib/codemirror.css";
import "codemirror/addon/hint/show-hint.css";
import "codemirror/addon/lint/lint.css";
import "codemirror/theme/eclipse.css"

let CodeMirror = require("codemirror/lib/codemirror");
require("codemirror/addon/edit/matchbrackets");
require("codemirror/addon/edit/closebrackets");
require("codemirror/addon/selection/active-line");
require("codemirror/addon/hint/show-hint");
require("codemirror/addon/hint/anyword-hint");
require("codemirror/mode/javascript/javascript")
require("codemirror/addon/lint/lint")
require("codemirror/addon/lint/json-lint")

export default {
  data() {
    return {
      CodeMirror: {}
    }
  },
  props: {
    refName: String
  },
  methods: {
    init() {
      let editor = CodeMirror.fromTextArea(this.$refs[this.refName], {
        mode: 'application/json',
        lineNumbers: true,
        indentWithTabs: true,
        smartIndent: true,
        indentUnit: 2,
        lineWrapping: true,
        matchBrackets: true,
        autoCloseBrackets: true,
        lint: true,
        theme: 'eclipse'
      })
      CodeMirror.commands.autocomplete = function(cm) {
        cm.showHint({hint: CodeMirror.hint.anyword});
      };
      editor.setSize('100%', '300px');
      editor.setValue('{}')
      editor.on('blur', () => {
        this.$emit('handleJsonData', {
          from: this.refName,
          data: editor.getValue()
        });
      });
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.init();
    })
  }
}
</script>

<style>
  .CodeMirror {
    font-size: 13px;
  }
</style>

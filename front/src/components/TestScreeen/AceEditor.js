import React, { useEffect } from "react";
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/theme-github";
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/ext-language_tools";
import "../../css/AceEditor.css";

function ACEEditor({ inputT, height }) {
  return (
    <AceEditor
      mode="python"
      theme="github"
      width="100%"
      name="editor"
      editorProps={{ $blockScrolling: true }}
      value={inputT}
      height={`100%`}
      fontSize={14}
      showPrintMargin={true}
      showGutter={true}
      highlightActiveLine={true}
      setOptions={{
        enableBasicAutocompletion: false,
        enableLiveAutocompletion: false,
        enableSnippets: false,
        showLineNumbers: true,
        tabSize: 2,
      }}
    />
  );
}

export default ACEEditor;

import './Compiler.css';
import { useRef, useState } from "react";
import { Editor } from "@monaco-editor/react";
import LanguageSelector from "./languages";
import { CODE_SNIPPETS } from "../constants";
import Output from "./Output";

const CodeEditor = () => {
  const editorRef = useRef();
  const [value, setValue] = useState("");
  const [language, setLanguage] = useState("javascript");

  const onMount = (editor) => {
    editorRef.current = editor;
    editor.focus();
  };

  const onSelect = (language) => {
    setLanguage(language);
    setValue(CODE_SNIPPETS[language]);
  };

  return (
    <div className="codeEditor_container">
      <div className="codeEditor_editorSection">
        <div className="codeEditor_languageSelector">
          <LanguageSelector language={language} onSelect={onSelect} />
        </div>

        <Editor
          options={{
            minimap: {
              enabled: false,
            },
          }}
          height="100vh"
          theme="vs-dark"
          language={language}
          defaultValue={CODE_SNIPPETS[language]}
          onMount={onMount}
          value={value}
          onChange={(value) => setValue(value)}
        />
      </div>
      <Output editorRef={editorRef} language={language} />
    </div>
  );
};

export default CodeEditor;

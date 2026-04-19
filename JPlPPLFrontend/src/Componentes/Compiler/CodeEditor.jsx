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

  const onSelect = (languageValue) => {
    setLanguage(languageValue);
    setValue(CODE_SNIPPETS[languageValue]);
  };

  return (
    <div className="grid min-h-screen gap-4 bg-slate-950 p-4 text-slate-100 lg:grid-cols-[1fr_360px]">
      <div className="rounded-2xl border border-slate-700 bg-slate-900/70 p-3">
        <LanguageSelector language={language} onSelect={onSelect} />
        <div className="mt-3 overflow-hidden rounded-xl border border-slate-700">
          <Editor
            options={{ minimap: { enabled: false } }}
            height="80vh"
            theme="vs-dark"
            language={language}
            defaultValue={CODE_SNIPPETS[language]}
            onMount={onMount}
            value={value}
            onChange={(val) => setValue(val)}
          />
        </div>
      </div>
      <Output editorRef={editorRef} language={language} />
    </div>
  );
};

export default CodeEditor;

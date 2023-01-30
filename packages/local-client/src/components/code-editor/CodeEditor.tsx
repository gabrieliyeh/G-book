import "./code-editor.css"
import "./syntax.css"
import MonacoEditor, {EditorDidMount}  from "@monaco-editor/react"
import {useRef} from "react"
import prettier from "prettier";
import parser  from "prettier/parser-babel";


interface CodeEditorProps {
  initialValue: string;
  onChange(input: string): void
}

const CodeEditor = ({initialValue,onChange}:CodeEditorProps) => {

  const editorRef = useRef<any>(null)

  const onEditorDidMount:EditorDidMount= (getValue, monacoEditor)=> {
    editorRef.current = monacoEditor
      monacoEditor.onDidChangeModelContent(()=> {
       onChange(getValue())
      });
      monacoEditor.getModel()?.updateOptions({tabSize: 2})
  }

  const handleFormat = ()=> {
    // get current Value from editor
    const unFormatted = editorRef.current.getModel().getValue()
    // format the value
    const formatted = prettier.format(unFormatted, {
      parser: 'babel',
      plugins: [parser],
      useTabs: false,
      semi: true,
      singleQuote: true
    }).replace(/\n$/, '');

    // set the formatted Value back in the editor
    editorRef.current.setValue(formatted);
    // onChange(formatted)
  }

  return (
    <div className="editor-wrapper">
    <button className="button button-format is-primary is-small " onClick={handleFormat}>
      Format
    </button>
    <MonacoEditor
    editorDidMount={onEditorDidMount}  
    value={initialValue}
    theme="dark" 
    language="javascript" 
    height='100%'
    options={{
      wordWrap: 'on',
      minimap: {enabled: false},
      showUnused: false,
      folding: false,
      lineNumbersMinChars: 3,
      fontSize:16,
      scrollBeyondLastLine: false,
      automaticLayout: true,
    }}
    />
    </div>
  )
}

export default CodeEditor;
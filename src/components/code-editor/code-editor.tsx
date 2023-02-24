import './code-editor-styles.css';
import './syntax.css';
import { useRef } from 'react';
import MonacoEditor, { EditorDidMount } from '@monaco-editor/react';
import prettier from 'prettier';
import parser from 'prettier/parser-babel';
import codeShift from 'jscodeshift';
import Highlighter from 'monaco-jsx-highlighter';
import { editorConfig } from './editor-settings';

interface CodeEditorProps {
  initialValue: string;
  onChange(value: string): void;
}

const CodeEditor: React.FC<CodeEditorProps> = ({ onChange, initialValue }) => {
  const editorRef = useRef<any>()
  const onEditorDidMount: EditorDidMount = (getValue, monacoEditor) => {
    editorRef.current = monacoEditor
    monacoEditor.onDidChangeModelContent(() => {
      onChange(getValue())
    })
    monacoEditor.getModel()?.updateOptions({ tabSize: 2 })
    const highlighter = new Highlighter(
      // @ts-ignore
      window.monaco,
      codeShift,
      monacoEditor
    )
    highlighter.highLightOnDidChangeModelContent(
      () => { },
      () => { },
      undefined,
      () => { }
    )
  }
  const onFormatClick = () => {
    // get current value

    const value = editorRef.current?.getModel()?.getValue()
    console.group('====[code-editor.tsx]=====');
    console.log(': ', value);
    console.groupEnd();

    // format value
    const formattedValue = prettier.format(value, {
      parser: 'babel',
      plugins: [parser],
      useTabs: false,
      semi: true,
      singleQuote: true
    }).replace(/\n$/, '')
    // set formatted value to editor
    editorRef.current.setValue(formattedValue)
  }
  return (
    <div className="editor-wrapper">
      <button className="button button-format is-primary small" onClick={onFormatClick}>Format</button>

      <MonacoEditor
        editorDidMount={onEditorDidMount}
        value={initialValue}
        theme="dark"
        options={editorConfig.options}
        language="javascript"
        height="500px"
      />
    </div>

  );
};

export default CodeEditor;

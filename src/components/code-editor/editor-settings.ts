import { EditorProps } from '@monaco-editor/react';

export const editorConfig: EditorProps = {
  options: {
    wordWrap: 'on',
    minimap: { enabled: false },
    showUnused: false,
    folding: false,
    lineNumbersMinChars: 3,
    fontSize: 16,
    scrollBeyondLastLine: false,
    automaticLayout: true
  }
}

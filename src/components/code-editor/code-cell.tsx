import { useState } from "react";
import bundle from "../bundler";
import CodeEditor from "./code-editor";
import Preview from "./preview";

const CodeCell = () => {
  const [input, setInput] = useState("");
  const [code, setCode] = useState("");

  const handleSubmit = async () => {
    const output = await bundle(input);
    setCode(output);
    // const htmlSrc = 'http://jbook.localhost:3000/test.html'
  };
  return (
    <div
      style={{ display: "flex", justifyContent: "space-between", flex: "auto" }}
    >
      <CodeEditor
        onChange={(value) => setInput(value)}
        initialValue={`const a = 1`}
      />
      <div
        id="codeEditor-One-Container"
        style={{ width: "600px", height: "100%", padding: 20 }}
      >
        <div>
          <button color="primary" onClick={handleSubmit}>
            Submit
          </button>
          <pre>{code}</pre>
        </div>
      </div>
      <div style={{ width: "600px", padding: 20, height: "auto" }}>
        <Preview code={code} />
      </div>
    </div>
  );
};

export default CodeCell;

import { useState } from "react";
import bundle from "../../bundler";
import CodeEditor from "../code-editor";
import Preview from "../preview";
import Resizable from "../resizable";

const CodeCell = () => {
  const [input, setInput] = useState("");
  const [code, setCode] = useState("");

  const handleSubmit = async () => {
    const output = await bundle(input);
    setCode(output);
    // const htmlSrc = 'http://jbook.localhost:3000/test.html'
  };
  return (
    <Resizable direction="vertical">
      <div style={{ display: "flex", height: "100%" }}>
        <CodeEditor
          onChange={(value) => setInput(value)}
          initialValue={`const a = 1`}
        />
        <Preview code={code} />
      </div>
    </Resizable>
  );
};

export default CodeCell;

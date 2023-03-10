import { useEffect, useState } from "react";
import bundle from "../../../bundler";
import CodeEditor from "../code-editor";
import Preview from "../preview";
import Resizable from "../resizable";

const CodeCell = () => {
  const [input, setInput] = useState("");
  const [code, setCode] = useState("");
  const [err, setErr] = useState("");

  useEffect(() => {
    let debounce = setTimeout(async () => {
      const output = await bundle(input);
      setCode(output.code);
      setErr(output.err);
    }, 1000);
    return () => {
      clearTimeout(debounce);
    };
  }, [input]);
  return (
    <Resizable direction="vertical">
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "stretch",
          height: "100%",
        }}
      >
        <Resizable direction="horizontal">
          <CodeEditor
            onChange={(value) => setInput(value)}
            initialValue={`const a = 1`}
          />
        </Resizable>
        <Preview code={code} bundlingStatus={err} />
      </div>
    </Resizable>
  );
};

export default CodeCell;

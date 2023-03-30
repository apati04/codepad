import { useEffect, useState } from "react";
import bundle from "../../../bundler";
import CodeEditor from "../code-editor";
import Preview from "../preview";
import Resizable from "../resizable";
import { Cell } from "../../../state";
import { useActions } from "../../../hooks/use-actions";

interface CodeCellProps {
  cell: Cell;
}

const CodeCell: React.FC<CodeCellProps> = ({ cell }) => {
  const [code, setCode] = useState("");
  const [err, setErr] = useState("");
  const [input, setInput] = useState("");
  const { updateCell } = useActions();

  useEffect(() => {
    let debounce = setTimeout(async () => {
      const output = await bundle(cell.content);
      setCode(output.code);
      setErr(output.err);
    }, 1000);
    return () => {
      clearTimeout(debounce);
    };
  }, [cell.content]);
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
            onChange={(value) => updateCell(cell.id, value)}
            initialValue={cell.content}
          />
        </Resizable>
        <Preview code={code} bundlingStatus={err} />
      </div>
    </Resizable>
  );
};

export default CodeCell;

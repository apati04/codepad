import { useState } from "react";
import bundle from "./components/bundler";
import { CodeCell } from "./components/code-editor";

const App = () => {
  return (
    <div>
      <CodeCell />
    </div>
  );
};

export default App;

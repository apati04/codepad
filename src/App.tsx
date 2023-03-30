// import { useState } from "react";
// import bundle from "./bundler";
import { Provider } from "react-redux";
import { store } from "./state";
import CellList from "./components/code-editor/code-cell/cell-list";

const App = () => {
  return (
    <Provider store={store}>
      <div style={{ padding: "10px" }}>
        <CellList />
      </div>
    </Provider>
  );
};

export default App;

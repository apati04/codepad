// import { useState } from "react";
// import bundle from "./bundler";
import TextEditor from "./components/text-editor";
import { Provider } from "react-redux";
import { store } from "./state";
const App = () => {
  return (
    <Provider store={store}>
      <div style={{ padding: "10px" }}>
        <TextEditor />
      </div>
    </Provider>
  );
};

export default App;

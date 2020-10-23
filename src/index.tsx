import React from "react";
import ReactDOM from "react-dom";
import Loading from "./components/loading/Loading";

function App(): JSX.Element {
  return (
    <Loading/>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));

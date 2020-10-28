import React from "react";
import ReactDOM from "react-dom";
import TimelineContainer from "./components/timeline-container/TimelineContainer";

function App(): JSX.Element {
  return <TimelineContainer />;
}

ReactDOM.render(<App />, document.getElementById("root"));

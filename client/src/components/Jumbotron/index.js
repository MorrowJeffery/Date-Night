import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

function Jumbotron({ children }) {
  return (
    <div
      style={{ height: 300, clear: "both", paddingTop: 120, textAlign: "center" }}
      className="jumbotron container"
    >
      {children}
    </div>
  );
}

export default Jumbotron;

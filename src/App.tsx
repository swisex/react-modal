import React from "react";
import logo from "./logo.svg";
import "./App.css";
import ModalButton from "./components/ModalButton";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          <ModalButton />
        </p>
      </header>
    </div>
  );
}

export default App;

import React, { useState } from "react";
import "./App.css";
import LianPong from "./LianPong";
import ZuPong from "./ZuPong";

function App() {
  const [mode, setMode] = useState("lianpong");

  const toggleMode = () => {
    setMode(mode === "lianpong" ? "zupong" : "lianpong");
  };

  return (
    <div>
      <button onClick={toggleMode}>切換模式</button>
      {mode === "lianpong" ? <LianPong /> : <ZuPong />}
    </div>
  );
}

export default App;

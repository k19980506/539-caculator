import React from "react";

function Navigation({ setPage }) {
  return (
    <div className="navigation">
      <button onClick={() => setPage("連碰")}>連碰頁面</button>
      <button onClick={() => setPage("柱碰")}>柱碰頁面</button>
    </div>
  );
}

export default Navigation;

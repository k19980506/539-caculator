import React, { useState, useEffect } from "react";
import "./App.css";
import LianPong from "./LianPong";
import ZuPong from "./ZuPong";

function App() {
  const [mode, setMode] = useState("lianpong");
  const [price, setPrice] = useState(77);
  const [items, setItems] = useState([]);

  const [totalClientCost, setTotalClientCost] = useState(0);
  const [totalCost, setTotalCost] = useState(0);

  let customTotalList =
    items.length > 0 ? items.map((item) => item.total).join("+") : "0";
  let costTotalList =
    items.length > 0 ? items.map((item) => item.cost).join("+") : "0";

  const toggleMode = () => {
    setMode(mode === "lianpong" ? "zupong" : "lianpong");
  };

  useEffect(() => {
    let clientTotal = 0;
    let costTotal = 0;

    items.forEach((item) => {
      clientTotal += item.total;
      costTotal += item.cost;
    });

    setTotalClientCost(clientTotal);
    setTotalCost(costTotal);
  }, [items]);

  const removeItem = (index) => {
    const newItems = [...items];
    newItems.splice(index, 1);
    setItems(newItems);
  };

  return (
    <div className="app">
      <div className="menu">
        <div className="option">
          <div>
            客本：
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="修改全部客本"
            />
            <button className="reset" onClick={() => setItems([])}>
              清除
            </button>
          </div>
        </div>
        <button onClick={toggleMode}>切換模式</button>
        {mode === "lianpong" ? (
          <LianPong price={price} items={items} setItems={setItems} />
        ) : (
          <ZuPong price={price} items={items} setItems={setItems} />
        )}
      </div>
      <div className="result">
        <div>
          {items.map((item, index) => (
            <div key={index}>
              {item.type === "車" ? (
                <div style={{ flex: "auto" }}>
                  <p style={{ color: "red", fontWeight: "bold" }}>{`全車`}</p>
                  <p>{`${item.type} - 球數：${item.unit}，支數：${item.quantity}`}</p>
                </div>
              ) : item.subtype === "lianpong" ? (
                <div style={{ flex: "auto" }}>
                  <p
                    style={{ color: "red", fontWeight: "bold" }}
                  >{`連碰快速-${item.type}`}</p>
                  <p>{`${item.type} - 球數：${item.unit}，支數：${item.quantity}`}</p>
                </div>
              ) : (
                <div style={{ flex: "auto" }}>
                  <p
                    style={{ color: "red", fontWeight: "bold" }}
                  >{`立柱快速-${item.type}`}</p>
                  <p>{`${item.pillars.join("顆x")}顆 ... ${item.type} x ${
                    item.quantity
                  }`}</p>
                </div>
              )}
              <button onClick={() => removeItem(index)}>刪除</button>
            </div>
          ))}
        </div>
        <div className="totals-container">
          <div className="detail">
            <span>{`客本：${totalClientCost}`}</span>
            <div className="detail">
              {items.map((item) =>
                item.type === "車" ? (
                  <span>{`${price} * 38 * ${item.unit} * ${item.quantity} = ${item.total}`}</span>
                ) : (
                  <React.Fragment>
                    <span>
                      {item.subtype === "lianpong"
                        ? `${item.unit}顆 * ${item.type} * ${item.quantity}`
                        : `${item.pillars.length}柱 * ${item.type} * ${item.quantity}`}
                    </span>
                    <span>
                      {item.pairs === 0 ? null : `兩星：${item.pairs}碰 `}
                      {item.triplets === 0 ? null : `三星：${item.triplets}碰 `}
                      {item.quads === 0 ? null : `四星：${item.quads}碰`}
                    </span>
                    <span>
                      {`${price} * ${
                        item.pairs + item.triplets + item.quads
                      } * ${item.quantity} = ${item.total}`}
                    </span>
                  </React.Fragment>
                )
              )}
              {items.length === 0 ? null : items.length === 1 ? (
                <span>{`${totalClientCost}`}</span>
              ) : (
                <span>{`${customTotalList}=${totalClientCost}`}</span>
              )}
            </div>
          </div>
          <div className="detail">
            <p>{`成本：${totalCost}`}</p>
            <div className="detail">
              {items.map((item) =>
                item.type === "車" ? (
                  <span>{`2725 * ${item.unit} * ${item.quantity} = ${item.cost}`}</span>
                ) : (
                  <React.Fragment>
                    <span>
                      {item.subtype === "lianpong"
                        ? `${item.unit}顆 * ${item.type} * ${item.quantity}`
                        : `${item.pillars.length}柱 * ${item.type} * ${item.quantity}`}
                    </span>
                    <span>
                      {item.pairs === 0 ? null : `兩星：${item.pairs}碰 `}
                      {item.triplets === 0 ? null : `三星：${item.triplets}碰 `}
                      {item.quads === 0 ? null : `四星：${item.quads}碰`}
                    </span>
                    {item.pairs === 0 ? null : (
                      <span>{`71.7 * ${item.pairs} * ${item.quantity} = ${item.pairsCost}`}</span>
                    )}
                    {item.triplets === 0 ? null : (
                      <span>{`62.8 * ${item.triplets} * ${item.quantity} = ${item.tripletsCost}`}</span>
                    )}
                    {item.quads === 0 ? null : (
                      <span>{`51 * ${item.quads} * ${item.quantity} = ${item.quadsCost}`}</span>
                    )}
                    <span>
                      {[
                        item.pairsCost,
                        item.tripletsCost,
                        item.quadsCost,
                      ].filter((cost) => cost !== 0).length > 1
                        ? `${[item.pairsCost, item.tripletsCost, item.quadsCost]
                            .filter((cost) => cost !== 0)
                            .join("+")}=${item.cost}`
                        : null}
                    </span>
                  </React.Fragment>
                )
              )}
              {items.length === 0 ? null : items.length === 1 ? (
                <span>{`${totalCost}`}</span>
              ) : (
                <span>{`${costTotalList}=${totalCost}`}</span>
              )}
            </div>
          </div>
        </div>
        {totalCost === 0
          ? null
          : `溢收：${totalClientCost} - ${totalCost} = ${
              totalClientCost - totalCost
            }`}
      </div>
    </div>
  );
}

export default App;

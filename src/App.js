import React, { useState, useEffect, useRef } from "react";
import "./App.css";
import { Tabs } from "antd";
import NewLianPong from "./NewLianPong";
import Car from "./Car";
import NewZuPong from "./NewZuPong";

function App() {
  const [items, setItems] = useState([]);
  const [totalClientCost, setTotalClientCost] = useState(0);
  const [totalCost, setTotalCost] = useState(0);
  const [price, setPrice] = useState(77);

  const childRef = useRef(null);

  const tabs = [
    {
      key: "1",
      label: "連碰快速",
      children: (
        <NewLianPong
          price={price}
          totalItems={items}
          f={setItems}
          ref={childRef}
        />
      ),
    },
    {
      key: "2",
      label: "全車",
      children: (
        <Car price={price} totalItems={items} f={setItems} ref={childRef} />
      ),
    },
    {
      key: "3",
      label: "立柱快速",
      children: (
        <NewZuPong
          price={price}
          totalItems={items}
          f={setItems}
          ref={childRef}
        />
      ),
    },
  ];

  const removeItem = (index) => {
    const newItems = [...items];
    newItems.splice(index, 1);
    setItems(newItems);
  };

  const updatePrice = (newPrice) => {
    setPrice(newPrice);
  };

  const resetItem = () => {
    setItems([]);
    childRef.current.reset();
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

  let customTotalList =
    items.length > 0 ? items.map((item) => item.total).join("+") : "0";
  let costTotalList =
    items.length > 0 ? items.map((item) => item.cost).join("+") : "0";

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <div className="option">
        <div>
          客本：
          <input
            type="number"
            value={price}
            onChange={(e) => updatePrice(e.target.value)}
            placeholder="修改全部客本"
          />
          <button className="reset" onClick={() => resetItem()}>
            一鍵清除
          </button>
        </div>
      </div>
      <div style={{ display: "flex", flexDirection: "row" }}>
        <div className="container">
          <div className="headerBar">選號玩法</div>
          <Tabs defaultActiveKey="1" items={tabs} type="card" />
        </div>
        <div className="container1">
          <div>
            {items.map((item, index) => (
              <div className="item" key={index}>
                {item.type === "車" ? (
                  <div style={{ flex: "auto" }}>
                    <p style={{ color: "red", fontWeight: "bold" }}>{`全車`}</p>
                    <p>{`${item.numbers.join(",")}...各${item.quantity}車`}</p>
                  </div>
                ) : item.subtype === "lianpong" ? (
                  <div style={{ flex: "auto" }}>
                    <p
                      style={{ color: "red", fontWeight: "bold" }}
                    >{`連碰快速-${item.type}星`}</p>
                    <p>{`${item.numbers.join(",")} ... ${item.type} x ${
                      item.quantity
                    }`}</p>
                  </div>
                ) : (
                  <div style={{ flex: "auto" }}>
                    <p
                      style={{ color: "red", fontWeight: "bold" }}
                    >{`立柱快速-${item.type}星`}</p>
                    {item.numbers
                      .filter((numbers) => numbers.length !== 0)
                      .map((numbers, index) => (
                        <span>
                          第{index}柱: {numbers.join(",")} <br />
                        </span>
                      ))}
                    <p>{`${item.type} x ${item.quantity}`}</p>
                  </div>
                )}
                <button onClick={() => removeItem(index)}>刪除</button>
              </div>
            ))}
          </div>
          <div>
            <div className="totals-container">
              <div className="detail-client">
                <span>{`客本：${totalClientCost}`}</span>
                <div className="detail">
                  {items.map((item) =>
                    item.type === "車" ? (
                      <div>
                        <span style={{ color: "red", fontWeight: "bold" }}>
                          {`${item.numbers.join(",")}...各${item.quantity}車`}
                          <br />
                        </span>
                        <span>
                          {`${price} * 38 * ${item.quantity} * ${item.unit} = ${item.total}`}
                          <br />
                        </span>
                      </div>
                    ) : (
                      <div>
                        <span style={{ color: "red", fontWeight: "bold" }}>
                          {item.subtype === "lianpong"
                            ? `${item.numbers.join(",")} ... ${item.type} x ${
                                item.quantity
                              }`
                            : `${item.numbers
                                .filter((numbers) => numbers.length !== 0)
                                .map((numbers) => numbers.length)
                                .join("顆x")}顆...${item.type}*${
                                item.quantity
                              }`}
                          <br />
                        </span>
                        <span>
                          {item.pairs === 0 ? null : `兩星：${item.pairs}碰 `}
                          {item.triplets === 0
                            ? null
                            : `三星：${item.triplets}碰 `}
                          {item.quads === 0 ? null : `四星：${item.quads}碰`}
                          <br />
                        </span>
                        <span>
                          {`${item.clientCost} * ${
                            item.pairs + item.triplets + item.quads
                          } * ${item.quantity} = ${item.total}`}
                          <br />
                        </span>
                      </div>
                    )
                  )}
                  總共
                  {items.length === 0 ? null : items.length === 1 ? (
                    <span
                      style={{ color: "red", fontWeight: "bold" }}
                    >{`${totalClientCost}`}</span>
                  ) : (
                    <span
                      style={{ color: "red", fontWeight: "bold" }}
                    >{`${customTotalList}=${totalClientCost}`}</span>
                  )}
                </div>
              </div>
              <div className="detail-cost">
                <span>{`成本：${totalCost}`}</span>
                <div className="detail">
                  {items.map((item) =>
                    item.type === "車" ? (
                      <div>
                        <span style={{ color: "red", fontWeight: "bold" }}>
                          {`${item.numbers.join(",")}...各${item.quantity}車`}
                          <br />
                        </span>
                        <span>
                          {`2719 * ${item.quantity} * ${item.unit}  = ${item.cost}`}
                          <br />
                        </span>
                      </div>
                    ) : (
                      <div>
                        <span style={{ color: "red", fontWeight: "bold" }}>
                          {item.subtype === "lianpong"
                            ? `${item.numbers.join(",")} ... ${item.type} x ${
                                item.quantity
                              }`
                            : `${item.numbers
                                .filter((numbers) => numbers.length !== 0)
                                .map((numbers) => numbers.length)
                                .join("顆x")}顆...${item.type}*${
                                item.quantity
                              }`}
                          <br />
                        </span>
                        <span>
                          {item.pairs === 0 ? null : `兩星：${item.pairs}碰 `}
                          {item.triplets === 0
                            ? null
                            : `三星：${item.triplets}碰 `}
                          {item.quads === 0 ? null : `四星：${item.quads}碰`}
                          <br />
                        </span>
                        {item.pairs === 0 ? null : (
                          <span>
                            {`71.55 * ${item.pairs} * ${item.quantity} = ${item.pairsCost}`}
                            <br />
                          </span>
                        )}
                        {item.triplets === 0 ? null : (
                          <span>
                            {`62.8 * ${item.triplets} * ${item.quantity} = ${item.tripletsCost}`}
                            <br />
                          </span>
                        )}
                        {item.quads === 0 ? null : (
                          <span>
                            {`51 * ${item.quads} * ${item.quantity} = ${item.quadsCost}`}
                            <br />
                          </span>
                        )}
                        <span>
                          {[
                            item.pairsCost,
                            item.tripletsCost,
                            item.quadsCost,
                          ].filter((cost) => cost !== 0).length > 1
                            ? `${[
                                item.pairsCost,
                                item.tripletsCost,
                                item.quadsCost,
                              ]
                                .filter((cost) => cost !== 0)
                                .join("+")}=${item.cost}`
                            : null}
                        </span>
                      </div>
                    )
                  )}
                  總共
                  {items.length === 0 ? null : items.length === 1 ? (
                    <span
                      style={{ color: "red", fontWeight: "bold" }}
                    >{`${totalCost}`}</span>
                  ) : (
                    <span
                      style={{ color: "red", fontWeight: "bold" }}
                    >{`${costTotalList}=${totalCost}`}</span>
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
      </div>
    </div>
  );
}

export default App;

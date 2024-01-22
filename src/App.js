import React, { useState, useEffect } from "react";
import "./App.css";

function factorial(n) {
  if (n === 0 || n === 1) {
    return 1;
  } else {
    return n * factorial(n - 1);
  }
}

function combination(n, m) {
  return factorial(n) / (factorial(m) * factorial(n - m));
}

function App() {
  const [items, setItems] = useState([]);
  const [totalClientCost, setTotalClientCost] = useState(0);
  const [totalCost, setTotalCost] = useState(0);
  const [price, setPrice] = useState(78);

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

  const addItem = (type, unit, quantity) => {
    let total = 0;
    let cost = 0;
    let pairs = 0;
    let triplets = 0;
    let quads = 0;
    let pairsCost = 0;
    let tripletsCost = 0;
    let quadsCost = 0;

    if (type === "2星") {
      pairs = combination(unit, 2);
      total = Math.ceil(price * pairs * quantity);
      pairsCost = Math.ceil(71.55 * pairs * quantity);
      cost = pairsCost;
    } else if (type === "3星") {
      triplets = combination(unit, 3);
      total = Math.ceil(price * pairs * quantity);
      tripletsCost = Math.ceil(62.8 * triplets * quantity);
      cost = tripletsCost;
    } else if (type === "4星") {
      quads = combination(unit, 4);
      total = Math.ceil(price * pairs * quantity);
      quadsCost = 51 * quads * quantity;
      cost = quadsCost;
    } else if (type === "23星") {
      pairs = combination(unit, 2);
      triplets = combination(unit, 3);
      total =
        Math.ceil(price * pairs * quantity) +
        Math.ceil(price * triplets * quantity);
      pairsCost = Math.ceil(71.55 * pairs * quantity);
      tripletsCost = Math.ceil(62.8 * triplets * quantity);
      cost = pairsCost + tripletsCost;
    } else if (type === "234星") {
      pairs = combination(unit, 2);
      triplets = combination(unit, 3);
      quads = combination(unit, 4);
      total =
        Math.ceil(price * pairs * quantity) +
        Math.ceil(price * triplets * quantity) +
        Math.ceil(price * quads * quantity);
      pairsCost = Math.ceil(71.55 * pairs * quantity);
      tripletsCost = Math.ceil(62.8 * triplets * quantity);
      quadsCost = Math.ceil(51 * quads * quantity);
      cost = pairsCost + tripletsCost + quadsCost;
    } else {
      total = Math.ceil(price * 38 * unit * quantity);
      cost = Math.ceil(2719 * unit * quantity);
    }

    const newItem = {
      type,
      unit,
      clientCost: price,
      cost,
      quantity,
      pairs,
      triplets,
      quads,
      total,
      pairsCost,
      tripletsCost,
      quadsCost,
    };
    setItems([...items, newItem]);
  };

  const removeItem = (index) => {
    const newItems = [...items];
    newItems.splice(index, 1);
    setItems(newItems);
  };

  const resetItem = () => {
    setItems([]);
  };

  const updatePrice = (newPrice) => {
    setPrice(newPrice);
    const costInputFields = document.querySelectorAll('[id$="Cost"]');
    costInputFields.forEach((field) => {
      field.value = newPrice;
    });
  };

  let customTotalList =
    items.length > 0 ? items.map((item) => item.total).join("+") : "0";
  let costTotalList =
    items.length > 0 ? items.map((item) => item.cost).join("+") : "0";

  return (
    <div className="App">
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
            清除
          </button>
        </div>
      </div>
      <table>
        <thead>
          <tr>
            <th>種類</th>
            <th>球數</th>
            <th>客本</th>
            <th>支數</th>
            <th>動作</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th>車</th>
            <th>
              <input
                id="carUnit"
                type="number"
                defaultValue={1}
                min="0"
                step="0.1"
              />
            </th>
            <th>
              <label>{price}</label>
            </th>
            <th>
              <input id="carQuantity" type="number" defaultValue={1} step="1" />
            </th>
            <th>
              <button
                onClick={() =>
                  addItem(
                    "車",
                    parseFloat(document.getElementById("carUnit").value),
                    parseFloat(document.getElementById("carQuantity").value)
                  )
                }
              >
                新增
              </button>
            </th>
          </tr>
          <tr>
            <th>2星</th>
            <th>
              <input id="twoStarUnit" type="number" defaultValue={2} step="1" />
            </th>
            <th>
              <label>{price}</label>
            </th>
            <th>
              <input
                id="twoStarQuantity"
                type="number"
                defaultValue={1}
                step="1"
              />
            </th>
            <th>
              <button
                onClick={() =>
                  addItem(
                    "2星",
                    parseFloat(document.getElementById("twoStarUnit").value),
                    parseFloat(document.getElementById("twoStarQuantity").value)
                  )
                }
              >
                新增
              </button>
            </th>
          </tr>
          <tr>
            <th>3星</th>
            <th>
              <input
                id="threeStarUnit"
                type="number"
                defaultValue={3}
                step="1"
              />
            </th>
            <th>
              <label>{price}</label>
            </th>
            <th>
              <input
                id="threeStarQuantity"
                type="number"
                defaultValue={1}
                step="1"
              />
            </th>
            <th>
              <button
                onClick={() =>
                  addItem(
                    "3星",
                    parseFloat(document.getElementById("threeStarUnit").value),
                    parseFloat(
                      document.getElementById("threeStarQuantity").value
                    )
                  )
                }
              >
                新增
              </button>
            </th>
          </tr>
          <tr>
            <th>4星</th>
            <th>
              <input
                id="fourStarUnit"
                type="number"
                defaultValue={4}
                step="1"
              />
            </th>
            <th>
              <label>{price}</label>
            </th>
            <th>
              <input
                id="fourStarQuantity"
                type="number"
                defaultValue={1}
                step="1"
              />
            </th>
            <th>
              <button
                onClick={() =>
                  addItem(
                    "4星",
                    parseFloat(document.getElementById("fourStarUnit").value),
                    parseFloat(
                      document.getElementById("fourStarQuantity").value
                    )
                  )
                }
              >
                新增
              </button>
            </th>
          </tr>
          <tr>
            <th>23星</th>
            <th>
              <input
                id="twentyThreeStarUnit"
                type="number"
                defaultValue={3}
                step="1"
              />
            </th>
            <th>
              <label>{price}</label>
            </th>
            <th>
              <input
                id="twentyThreeStarQuantity"
                type="number"
                defaultValue={1}
                step="1"
              />
            </th>
            <th>
              <button
                onClick={() =>
                  addItem(
                    "23星",
                    parseFloat(
                      document.getElementById("twentyThreeStarUnit").value
                    ),
                    parseFloat(
                      document.getElementById("twentyThreeStarQuantity").value
                    )
                  )
                }
              >
                新增
              </button>
            </th>
          </tr>
          <tr>
            <th>234星</th>
            <th>
              <input
                id="twoThreeFourStarUnit"
                type="number"
                defaultValue={4}
                step="1"
              />
            </th>
            <th>
              <label>{price}</label>
            </th>
            <th>
              <input
                id="twoThreeFourStarQuantity"
                type="number"
                defaultValue={1}
                step="1"
              />
            </th>
            <th>
              <button
                onClick={() =>
                  addItem(
                    "234星",
                    parseFloat(
                      document.getElementById("twoThreeFourStarUnit").value
                    ),
                    parseFloat(
                      document.getElementById("twoThreeFourStarQuantity").value
                    )
                  )
                }
              >
                新增
              </button>
            </th>
          </tr>
        </tbody>
      </table>

      <div>
        {items.map((item, index) => (
          <div key={index}>
            <p>{`${item.type} - 球數：${item.unit}，支數：${item.quantity}`}</p>
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
                  <span>{`${item.unit} * ${item.type} * ${item.quantity}`}</span>
                  <span>
                    {item.pairs === 0 ? null : `兩星：${item.pairs}碰 `}
                    {item.triplets === 0 ? null : `三星：${item.triplets}碰 `}
                    {item.quads === 0 ? null : `四星：${item.quads}碰`}
                  </span>
                  <span>
                    {`${price} * ${item.pairs + item.triplets + item.quads} * ${
                      item.quantity
                    } = ${item.total}`}
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
                <span>{`2719 * ${item.unit} * ${item.quantity} = ${item.cost}`}</span>
              ) : (
                <React.Fragment>
                  <span>{`${item.unit} * ${item.type} * ${item.quantity}`}</span>
                  <span>
                    {item.pairs === 0 ? null : `兩星：${item.pairs}碰 `}
                    {item.triplets === 0 ? null : `三星：${item.triplets}碰 `}
                    {item.quads === 0 ? null : `四星：${item.quads}碰`}
                  </span>
                  {item.pairs === 0 ? null : (
                    <span>{`71.55 * ${item.pairs} * ${item.quantity} = ${item.pairsCost}`}</span>
                  )}
                  {item.triplets === 0 ? null : (
                    <span>{`62.8 * ${item.triplets} * ${item.quantity} = ${item.tripletsCost}`}</span>
                  )}
                  {item.quads === 0 ? null : (
                    <span>{`51 * ${item.quads} * ${item.quantity} = ${item.quadsCost}`}</span>
                  )}
                  <span>
                    {[item.pairsCost, item.tripletsCost, item.quadsCost].filter(
                      (cost) => cost !== 0
                    ).length > 1
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
  );
}

export default App;

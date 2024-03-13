import React, { useState, useEffect } from "react";
import "./LianPong.css";

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

function LianPong() {
  const [carUnit, setCarUnit] = useState(1);
  const [carQuantity, setCarQuantity] = useState(1);
  const [twoStarUnit, setTwoStarUnit] = useState(2);
  const [twoStarQuantity, setTwoStarQuantity] = useState(1);
  const [threeStarUnit, setThreeStarUnit] = useState(3);
  const [threeStarQuantity, setThreeStarQuantity] = useState(1);
  const [fourStarUnit, setFourStarUnit] = useState(4);
  const [fourStarQuantity, setFourStarQuantity] = useState(1);
  const [twoThreeStarUnit, setTwoThreeStarUnit] = useState(3);
  const [twoThreeStarQuantity, setTwoThreeStarQuantity] = useState(1);
  const [twoThreeFourStarUnit, setTwoThreeFourStarUnit] = useState(4);
  const [twoThreeFourStarQuantity, setTwoThreeFourStarQuantity] = useState(1);

  const [items, setItems] = useState([]);
  const [totalClientCost, setTotalClientCost] = useState(0);
  const [totalCost, setTotalCost] = useState(0);
  const [price, setPrice] = useState(77);

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
      pairsCost = Math.ceil(71.7 * pairs * quantity);
      cost = pairsCost;
    } else if (type === "3星") {
      triplets = combination(unit, 3);
      total = Math.ceil(price * triplets * quantity);
      tripletsCost = Math.ceil(62.8 * triplets * quantity);
      cost = tripletsCost;
    } else if (type === "4星") {
      quads = combination(unit, 4);
      total = Math.ceil(price * quads * quantity);
      quadsCost = Math.ceil(51 * quads * quantity);
      cost = quadsCost;
    } else if (type === "23星") {
      pairs = combination(unit, 2);
      triplets = combination(unit, 3);
      total =
        Math.ceil(price * pairs * quantity) +
        Math.ceil(price * triplets * quantity);
      pairsCost = Math.ceil(71.7 * pairs * quantity);
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
      pairsCost = Math.ceil(71.7 * pairs * quantity);
      tripletsCost = Math.ceil(62.8 * triplets * quantity);
      quadsCost = Math.ceil(51 * quads * quantity);
      cost = pairsCost + tripletsCost + quadsCost;
    } else {
      total = Math.ceil(price * 38 * unit * quantity);
      cost = Math.ceil(2725 * unit * quantity);
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
  };

  let customTotalList =
    items.length > 0 ? items.map((item) => item.total).join("+") : "0";
  let costTotalList =
    items.length > 0 ? items.map((item) => item.cost).join("+") : "0";

  return (
    <div className="LianPong">
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
            <th>支數</th>
            <th>動作</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th>車</th>
            <th>
              <input
                type="number"
                value={carUnit}
                onChange={(e) => setCarUnit(parseFloat(e.target.value))}
                min="0"
                step="0.1"
              />
            </th>
            <th>
              <input
                type="number"
                value={carQuantity}
                onChange={(e) => setCarQuantity(parseFloat(e.target.value))}
                step="1"
              />
            </th>
            <th>
              <button onClick={() => addItem("車", carUnit, carQuantity)}>
                新增
              </button>
            </th>
          </tr>
          <tr>
            <th>2星</th>
            <th>
              <input
                value={twoStarUnit}
                onChange={(e) => setTwoStarUnit(parseFloat(e.target.value))}
                type="number"
                step="1"
              />
            </th>
            <th>
              <input
                type="number"
                value={twoStarQuantity}
                onChange={(e) => setTwoStarQuantity(parseFloat(e.target.value))}
                step="1"
              />
            </th>
            <th>
              <button
                onClick={() => addItem("2星", twoStarUnit, twoStarQuantity)}
              >
                新增
              </button>
            </th>
          </tr>
          <tr>
            <th>3星</th>
            <th>
              <input
                type="number"
                value={threeStarUnit}
                onChange={(e) => setThreeStarUnit(parseFloat(e.target.value))}
                step="1"
              />
            </th>
            <th>
              <input
                type="number"
                value={threeStarQuantity}
                onChange={(e) =>
                  setThreeStarQuantity(parseFloat(e.target.value))
                }
                step="1"
              />
            </th>
            <th>
              <button
                onClick={() => addItem("3星", threeStarUnit, threeStarQuantity)}
              >
                新增
              </button>
            </th>
          </tr>
          <tr>
            <th>4星</th>
            <th>
              <input
                type="number"
                value={fourStarUnit}
                onChange={(e) => setFourStarUnit(parseFloat(e.target.value))}
                step="1"
              />
            </th>
            <th>
              <input
                type="number"
                value={fourStarQuantity}
                onChange={(e) =>
                  setFourStarQuantity(parseFloat(e.target.value))
                }
                step="1"
              />
            </th>
            <th>
              <button
                onClick={() => addItem("4星", fourStarUnit, fourStarQuantity)}
              >
                新增
              </button>
            </th>
          </tr>
          <tr>
            <th>23星</th>
            <th>
              <input
                type="number"
                value={twoThreeStarUnit}
                onChange={(e) =>
                  setTwoThreeStarUnit(parseFloat(e.target.value))
                }
                step="1"
              />
            </th>
            <th>
              <input
                type="number"
                value={twoThreeStarQuantity}
                onChange={(e) =>
                  setTwoThreeStarQuantity(parseFloat(e.target.value))
                }
                step="1"
              />
            </th>
            <th>
              <button
                onClick={() =>
                  addItem("23星", twoThreeStarUnit, twoThreeStarQuantity)
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
                type="number"
                value={twoThreeFourStarUnit}
                onChange={(e) =>
                  setTwoThreeFourStarUnit(parseFloat(e.target.value))
                }
                step="1"
              />
            </th>
            <th>
              <input
                type="number"
                value={twoThreeFourStarQuantity}
                onChange={(e) =>
                  setTwoThreeFourStarQuantity(parseFloat(e.target.value))
                }
                step="1"
              />
            </th>
            <th>
              <button
                onClick={() =>
                  addItem(
                    "234星",
                    twoThreeFourStarUnit,
                    twoThreeFourStarQuantity
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
                <span>{`${price} * 38 * ${item.quantity} * ${item.unit} = ${item.total}`}</span>
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
                <span>{`2725 * ${item.quantity} * ${item.unit} = ${item.cost}`}</span>
              ) : (
                <React.Fragment>
                  <span>{`${item.unit} * ${item.type} * ${item.quantity}`}</span>
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

export default LianPong;

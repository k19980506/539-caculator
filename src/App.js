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
  const [totalPairs, setTotalPairs] = useState(0);
  const [totalTriplets, setTotalTriplets] = useState(0);
  const [totalQuads, setTotalQuads] = useState(0);
  const [price, setPrice] = useState(78);

  useEffect(() => {
    let clientCarTotal = 0;
    let clientTotal = 0;
    let costCarTotal = 0;
    let costTotal = 0;
    let pairsTotal = 0;
    let tripletsTotal = 0;
    let quadsTotal = 0;

    items.forEach((item) => {
      clientCarTotal += item.total;
      costCarTotal += item.cost;
      pairsTotal += item.pairs * item.quantity;
      tripletsTotal += item.triplets * item.quantity;
      quadsTotal += item.quads * item.quantity;
    });

    clientTotal =
      clientCarTotal + price * (pairsTotal + tripletsTotal + quadsTotal);
    costTotal =
      costCarTotal +
      Math.ceil(72.55 * pairsTotal) +
      Math.ceil(63.8 * tripletsTotal) +
      52 * quadsTotal;

	console.log(clientTotal)

    setTotalClientCost(clientTotal);
    setTotalCost(costTotal);
    setTotalPairs(pairsTotal);
    setTotalTriplets(tripletsTotal);
    setTotalQuads(quadsTotal);
  }, [items]);

  const addItem = (type, unit, quantity) => {
    let total = 0;
    let cost = 0;
    let pairs = 0;
    let triplets = 0;
    let quads = 0;

    if (type === "2星") {
      pairs = combination(unit, 2);
      //   total = Math.ceil(price * pairs * quantity);
      //   cost = Math.ceil(72.55 * pairs * quantity);
    } else if (type === "3星") {
      pairs = combination(unit, 3);
      //   total = Math.ceil(price * pairs * quantity);
      //   cost = Math.ceil(63.8 * pairs * quantity);
    } else if (type === "4星") {
      pairs = combination(unit, 4);
      //   total = Math.ceil(price * pairs * quantity);
      //   cost = 52 * pairs * quantity;
    } else if (type === "23星") {
      pairs = combination(unit, 2);
      triplets = combination(unit, 3);
      //   total =
      //     Math.ceil(price * pairs * quantity) +
      //     Math.ceil(price * triplets * quantity);
      //   cost =
      //     Math.ceil(72.55 * pairs * quantity) +
      //     Math.ceil(63.8 * triplets * quantity);
    } else if (type === "234星") {
      pairs = combination(unit, 2);
      triplets = combination(unit, 3);
      quads = combination(unit, 4);
      //   total =
      //     Math.ceil(price * pairs * quantity) +
      //     Math.ceil(price * triplets * quantity) +
      //     Math.ceil(price * quads * quantity);
      //   cost =
      //     Math.ceil(72.55 * pairs * quantity) +
      //     Math.ceil(63.8 * triplets * quantity) +
      //     52 * quads * quantity;
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

  let customStarAmount = price * (totalPairs + totalTriplets + totalQuads);
  let customCarAmount = "0";
  let carList = items.filter((item) => item.type === "車");

  customCarAmount =
    carList.length > 0 ? carList.map((item) => item.total).join("+") : "0";

  let twoStarCost = Math.ceil(72.55 * totalPairs);
  let threeStarCost = Math.ceil(63.8 * totalTriplets);
  let fourStarCost = 52 * totalQuads;
  let carCost =
    carList.length > 0 ? carList.map((item) => item.cost).join("+") : "0";

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
              {/* <input id="carClientCost" type="number" defaultValue={price} step="1" /> */}
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
              {/* <input
                id="twoStarClientCost"
                type="number"
                defaultValue={price}
                step="1"
              /> */}
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
              {/* <input
                id="threeStarClientCost"
                type="number"
                defaultValue={price}
                step="1"
              /> */}
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
              {/* <input
                id="fourStarClientCost"
                type="number"
                defaultValue={price}
                step="1"
              /> */}
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
              {/* <input
                id="twentyThreeStarClientCost"
                type="number"
                defaultValue={price}
                step="1"
              /> */}
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
              {/* <input
                id="twoThreeFourStarClientCost"
                type="number"
                defaultValue={price}
                step="1"
              /> */}
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
          <a>{`客本：${totalClientCost}`}</a>
          <div className="detail">
            {items.map((item, index) => (
              <a
                key={index}
              >{`${item.unit} * ${item.type} * ${item.quantity}`}</a>
            ))}
            {totalPairs === 0 ? null : <a>{`兩星：${totalPairs}碰`}</a>}
            {totalTriplets === 0 ? null : <a>{`三星：${totalTriplets}碰`}</a>}
            {totalQuads === 0 ? null : <a>{`四星：${totalQuads}碰`}</a>}
            {totalPairs + totalTriplets + totalQuads == 0 ? null : (
              <a>{`${price} * ${totalPairs + totalTriplets + totalQuads} = ${
                price * (totalPairs + totalTriplets + totalQuads)
              }`}</a>
            )}

            {items
              .filter((item) => item.type === "車")
              .map((item, index) => (
                <a
                  key={index}
                >{`${price} * 38 * ${item.unit} * ${item.quantity} = ${item.total}`}</a>
              ))}

            {customStarAmount > 0 && customCarAmount !== "0" ? (
              <a>{`${customStarAmount}+${customCarAmount}=${totalClientCost}`}</a>
            ) : customStarAmount > 0 && customCarAmount === "0" ? (
              <a>{`${customStarAmount}`}</a>
            ) : customStarAmount === 0 && customCarAmount !== "0" ? (
              <a>{`${customCarAmount}=${totalClientCost}`}</a>
            ) : null}
          </div>
        </div>
        <div className="detail">
          <p>{`成本：${totalCost}`}</p>
          <div className="detail">
            {items.map((item, index) => (
              <a
                key={index}
              >{`${item.unit} * ${item.type} * ${item.quantity}`}</a>
            ))}
            {totalPairs === 0 ? null : <a>{`兩星：${totalPairs}碰`}</a>}
            {totalTriplets === 0 ? null : <a>{`三星：${totalTriplets}碰`}</a>}
            {totalQuads === 0 ? null : <a>{`四星：${totalQuads}碰`}</a>}
            {totalPairs === 0 ? null : (
              <a>{`72.55 * ${totalPairs} = ${Math.ceil(
                72.55 * totalPairs
              )}`}</a>
            )}
            {totalTriplets === 0 ? null : (
              <a>{`63.8 * ${totalTriplets} = ${Math.ceil(
                63.8 * totalTriplets
              )}`}</a>
            )}
            {totalQuads === 0 ? null : (
              <a>{`52 * ${totalQuads} = ${52 * totalQuads}`}</a>
            )}
            {items
              .filter((item) => item.type === "車")
              .map((item, index) => (
                <a
                  key={index}
                >{`2719 * ${item.unit} * ${item.quantity} = ${item.cost}`}</a>
              ))}
            {totalCost === 0 ? null : (
              <a>
                {totalPairs === 0 ? null : `${twoStarCost}`}
                {totalTriplets === 0 ? null : `+${threeStarCost}`}
                {totalQuads === 0 ? null : `+${fourStarCost}`}
                {carCost === "0" ? null : `+${carCost}`}
                {`=${totalCost}`}
              </a>
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

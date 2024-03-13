import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import "./ZuPong.css";

function calculateTwoStarCombinations(pillars) {
  const n = pillars.length;
  let totalCombinations = 0;

  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      if (pillars[i] > 0 && pillars[j] > 0) {
        totalCombinations += pillars[i] * pillars[j];
      }
    }
  }

  return totalCombinations;
}

function calculateThreeStarCombinations(pillars) {
  const n = pillars.length;
  let totalCombinations = 0;

  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      for (let m = j + 1; m < n; m++) {
        if (pillars[i] > 0 && pillars[j] > 0 && pillars[m] > 0) {
          totalCombinations += pillars[i] * pillars[j] * pillars[m];
        }
      }
    }
  }

  return totalCombinations;
}

function calculateFourStarCombinations(pillars) {
  const n = pillars.length;
  let totalCombinations = 0;

  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      for (let m = j + 1; m < n; m++) {
        for (let p = m + 1; p < n; p++) {
          totalCombinations +=
            pillars[i] * pillars[j] * pillars[m] * pillars[p];
        }
      }
    }
  }

  return totalCombinations;
}

function Zupong() {
  const [price, setPrice] = useState(77);
  const [pillar1, setPillar1] = useState(4);
  const [pillar2, setPillar2] = useState(4);
  const [pillar3, setPillar3] = useState(4);
  const [pillar4, setPillar4] = useState(4);
  const [pillar5, setPillar5] = useState(0);
  const [pillar6, setPillar6] = useState(0);
  const [pillar7, setPillar7] = useState(0);

  const [twoStarQuantity, setTwoStarQuantity] = useState(1);
  const [threeStarQuantity, setThreeStarQuantity] = useState(1);
  const [fourStarQuantity, setFourStarQuantity] = useState(1);
  const [twoThreeStarQuantity, setTwoThreeStarQuantity] = useState(1);
  const [twoThreeFourStarQuantity, setTwoThreeFourStarQuantity] = useState(1);
  const [threeFourStarQuantity, setThreeFourStarQuantity] = useState(1);

  const [totalClientCost, setTotalClientCost] = useState(0);
  const [totalCost, setTotalCost] = useState(0);

  const [items, setItems] = useState([]);

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

  const handleClear = () => {
    setPrice(77);
  };

  const removeItem = (index) => {
    const newItems = [...items];
    newItems.splice(index, 1);
    setItems(newItems);
  };

  const addItem = (type, quantity) => {
    let total = 0;
    let cost = 0;
    let pairs = 0;
    let triplets = 0;
    let quads = 0;
    let pairsCost = 0;
    let tripletsCost = 0;
    let quadsCost = 0;

    let pillars = [
      pillar1,
      pillar2,
      pillar3,
      pillar4,
      pillar5,
      pillar6,
      pillar7,
    ].filter((e) => e !== 0);

    if (type === "2") {
      pairs = calculateTwoStarCombinations(pillars);
      total = Math.ceil(price * pairs * quantity);
      pairsCost = Math.ceil(71.7 * pairs * quantity);
      cost = pairsCost;
    } else if (type === "3") {
      triplets = calculateThreeStarCombinations(pillars);
      total = Math.ceil(price * triplets * quantity);
      tripletsCost = Math.ceil(62.8 * triplets * quantity);
      cost = tripletsCost;
    } else if (type === "4") {
      quads = calculateFourStarCombinations(pillars);
      total = Math.ceil(price * quads * quantity);
      quadsCost = Math.ceil(51 * quads * quantity);
      cost = quadsCost;
    } else if (type === "23") {
      pairs = calculateTwoStarCombinations(pillars);
      triplets = calculateThreeStarCombinations(pillars);
      total =
        Math.ceil(price * pairs * quantity) +
        Math.ceil(price * triplets * quantity);
      pairsCost = Math.ceil(71.7 * pairs * quantity);
      tripletsCost = Math.ceil(62.8 * triplets * quantity);
      cost = pairsCost + tripletsCost;
    } else if (type === "234") {
      pairs = calculateTwoStarCombinations(pillars);
      triplets = calculateThreeStarCombinations(pillars);
      quads = calculateFourStarCombinations(pillars);
      total =
        Math.ceil(price * pairs * quantity) +
        Math.ceil(price * triplets * quantity) +
        Math.ceil(price * quads * quantity);
      pairsCost = Math.ceil(71.7 * pairs * quantity);
      tripletsCost = Math.ceil(62.8 * triplets * quantity);
      quadsCost = Math.ceil(51 * quads * quantity);
      cost = pairsCost + tripletsCost + quadsCost;
    } else {
      triplets = calculateThreeStarCombinations(pillars);
      quads = calculateFourStarCombinations(pillars);
      total =
        Math.ceil(price * triplets * quantity) +
        Math.ceil(price * quads * quantity);
      tripletsCost = Math.ceil(62.8 * triplets * quantity);
      quadsCost = Math.ceil(51 * quads * quantity);
      cost = tripletsCost + quadsCost;
    }

    const newItem = {
      type,
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
      pillars,
    };
    setItems([...items, newItem]);
  };

  let customTotalList =
    items.length > 0 ? items.map((item) => item.total).join("+") : "0";
  let costTotalList =
    items.length > 0 ? items.map((item) => item.cost).join("+") : "0";

  return (
    <div className="root">
      <div className="section">
        <span>客本：</span>
        <TextField
          className="input"
          type="number"
          value={price}
          style={{ "text-align": "center" }}
          onChange={(e) => setPrice(e.target.value)}
        />
        <Button variant="contained" onClick={handleClear}>
          清除
        </Button>
      </div>
      <div className="section">
        <div>
          <span>第一柱：</span>
          <Select
            className="select"
            value={pillar1}
            style={{ "text-align": "center" }}
            onChange={(e) => setPillar1(e.target.value)}
          >
            {Array.from({ length: 10 }, (_, i) => i).map((value) => (
              <MenuItem key={value} value={value}>
                {value}
              </MenuItem>
            ))}
          </Select>
        </div>
        <div>
          <span>第二柱：</span>
          <Select
            className="select"
            value={pillar2}
            onChange={(e) => setPillar2(e.target.value)}
            style={{ "text-align": "center" }}
          >
            {Array.from({ length: 10 }, (_, i) => i).map((value) => (
              <MenuItem key={value} value={value}>
                {value}
              </MenuItem>
            ))}
          </Select>
        </div>
        <div>
          <span>第三柱：</span>
          <Select
            className="select"
            value={pillar3}
            style={{ "text-align": "center" }}
            onChange={(e) => setPillar3(e.target.value)}
          >
            {Array.from({ length: 10 }, (_, i) => i).map((value) => (
              <MenuItem key={value} value={value}>
                {value}
              </MenuItem>
            ))}
          </Select>
        </div>

        <div>
          <span>第四柱：</span>
          <Select
            className="select"
            value={pillar4}
            style={{ "text-align": "center" }}
            onChange={(e) => setPillar4(e.target.value)}
          >
            {Array.from({ length: 10 }, (_, i) => i).map((value) => (
              <MenuItem key={value} value={value}>
                {value}
              </MenuItem>
            ))}
          </Select>
        </div>

        <div>
          <span>第五柱：</span>
          <Select
            className="select"
            style={{ "text-align": "center" }}
            value={pillar5}
            onChange={(e) => setPillar5(e.target.value)}
          >
            {Array.from({ length: 10 }, (_, i) => i).map((value) => (
              <MenuItem key={value} value={value}>
                {value}
              </MenuItem>
            ))}
          </Select>
        </div>

        <div>
          <span>第六柱：</span>
          <Select
            className="select"
            style={{ "text-align": "center" }}
            value={pillar6}
            onChange={(e) => setPillar6(e.target.value)}
          >
            {Array.from({ length: 10 }, (_, i) => i).map((value) => (
              <MenuItem key={value} value={value}>
                {value}
              </MenuItem>
            ))}
          </Select>
        </div>

        <div>
          <span>第七柱：</span>
          <Select
            className="select"
            style={{ "text-align": "center" }}
            value={pillar7}
            onChange={(e) => setPillar7(e.target.value)}
          >
            {Array.from({ length: 10 }, (_, i) => i).map((value) => (
              <MenuItem key={value} value={value}>
                {value}
              </MenuItem>
            ))}
          </Select>
        </div>
      </div>

      <table>
        <thead>
          <tr>
            <th>種類</th>
            <th>倍數</th>
            <th>動作</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th>2星</th>
            <th>
              <input
                type="number"
                value={twoStarQuantity}
                onChange={(e) => setTwoStarQuantity(parseFloat(e.target.value))}
                step="1"
              />
            </th>
            <th>
              <button onClick={() => addItem("2", twoStarQuantity)}>
                新增
              </button>
            </th>
          </tr>
          <tr>
            <th>3星</th>
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
              <button onClick={() => addItem("3", threeStarQuantity)}>
                新增
              </button>
            </th>
          </tr>
          <tr>
            <th>4星</th>
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
              <button onClick={() => addItem("4", fourStarQuantity)}>
                新增
              </button>
            </th>
          </tr>
          <tr>
            <th>23星</th>
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
              <button onClick={() => addItem("23", twoThreeStarQuantity)}>
                新增
              </button>
            </th>
          </tr>
          <tr>
            <th>234星</th>
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
              <button onClick={() => addItem("234", twoThreeFourStarQuantity)}>
                新增
              </button>
            </th>
          </tr>
          <tr>
            <th>34星</th>
            <th>
              <input
                type="number"
                value={threeFourStarQuantity}
                onChange={(e) =>
                  setThreeFourStarQuantity(parseFloat(e.target.value))
                }
                step="1"
              />
            </th>
            <th>
              <button onClick={() => addItem("34", threeFourStarQuantity)}>
                新增
              </button>
            </th>
          </tr>
        </tbody>
      </table>

      <div>
        {items.map((item, index) => (
          <div key={index}>
            <p>{`${item.pillars.join("顆x")}顆...${item.type}*${
              item.quantity
            }`}</p>
            <button onClick={() => removeItem(index)}>刪除</button>
          </div>
        ))}
      </div>

      <div className="totals-container">
        <div className="detail">
          <span>{`客本：${totalClientCost}`}</span>
          <div className="detail">
            {items.map((item) => (
              <React.Fragment>
                <span>
                  {item.pillars.join("顆x")}顆...{item.type}*{item.quantity}
                </span>
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
            ))}
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
            {items.map((item) => (
              <React.Fragment>
                <span>
                  {item.pillars.join("顆x")}顆...{item.type}*{item.quantity}{" "}
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
                  {[item.pairsCost, item.tripletsCost, item.quadsCost].filter(
                    (cost) => cost !== 0
                  ).length > 1
                    ? `${[item.pairsCost, item.tripletsCost, item.quadsCost]
                        .filter((cost) => cost !== 0)
                        .join("+")}=${item.cost}`
                    : null}
                </span>
              </React.Fragment>
            ))}
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

export default Zupong;

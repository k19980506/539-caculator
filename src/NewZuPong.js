import React, { useState, forwardRef, useImperativeHandle } from "react";
import "./NewZuPong.css";
import { DownOutlined } from "@ant-design/icons";
import { Dropdown, Space } from "antd";

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

const NewZuPong = forwardRef(({ f, price, totalItems }, ref) => {
  const [numbers, setNumbers] = useState([[], [], [], [], [], [], [], [], []]);

  const [twoStarQuantity, setTwoStarQuantity] = useState(1);
  const [threeStarQuantity, setThreeStarQuantity] = useState(1);
  const [fourStarQuantity, setFourStarQuantity] = useState(1);
  const [twoThreeStarQuantity, setTwoThreeStarQuantity] = useState(1);
  const [twoThreeFourStarQuantity, setTwoThreeFourStarQuantity] = useState(1);
  const [threeFourStarQuantity, setThreeFourStarQuantity] = useState(1);
  const [numbersState, setNumbersState] = useState(
    Array.from({ length: 40 }).map((_) => true)
  );
  const [quickNumbersState, setQuickNumbersState] = useState([]);
  const [index, setIndex] = useState(0);

  const addItem = (type, quantity) => {
    let total = 0;
    let cost = 0;
    let pairs = 0;
    let triplets = 0;
    let quads = 0;
    let pairsCost = 0;
    let tripletsCost = 0;
    let quadsCost = 0;

    let pillars = numbers
      .filter((e) => e.length !== 0)
      .map((numbers) => numbers.length);

    if (type === 2) {
      pairs = calculateTwoStarCombinations(pillars);
      total = Math.ceil(price * pairs * quantity);
      pairsCost = Math.ceil(71.7 * pairs * quantity);
      cost = pairsCost;
    } else if (type === 3) {
      triplets = calculateThreeStarCombinations(pillars);
      total = Math.ceil(price * triplets * quantity);
      tripletsCost = Math.ceil(62.8 * triplets * quantity);
      cost = tripletsCost;
    } else if (type === 4) {
      quads = calculateFourStarCombinations(pillars);
      total = Math.ceil(price * quads * quantity);
      quadsCost = Math.ceil(51 * quads * quantity);
      cost = quadsCost;
    } else if (type === 23) {
      pairs = calculateTwoStarCombinations(pillars);
      triplets = calculateThreeStarCombinations(pillars);
      total =
        Math.ceil(price * pairs * quantity) +
        Math.ceil(price * triplets * quantity);
      pairsCost = Math.ceil(71.7 * pairs * quantity);
      tripletsCost = Math.ceil(62.8 * triplets * quantity);
      cost = pairsCost + tripletsCost;
    } else if (type === 234) {
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
      numbers: numbers.filter((e) => e.length !== 0),
      subtype: "zupong",
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
    };
    f([...totalItems, newItem]);
    handleReset();
  };

  function selectQuickNumbers(value) {
    let new_numbers = [...numbers];

    if (quickNumbersState[value]) {
      quickNumbersState[value] = false;
      setQuickNumbersState([...quickNumbersState]);
      const deleteNumbers = numbers[index].filter(
        (number) => number % 10 !== value
      );
      deleteNumbers.forEach((number) => (numbersState[number] = true));
      new_numbers[index] = numbers[index].filter(
        (item) => !deleteNumbers.includes(item)
      );
      setNumbers([...new_numbers]);
    } else {
      const addNumbers = Array.from(
        { length: 39 },
        (_, index) => index + 1
      ).filter((num) => num % 10 === value && numbersState[num]);

      addNumbers.forEach((number) => (numbersState[number] = false));
      setNumbersState([...numbersState]);
      quickNumbersState[value] = true;
      setQuickNumbersState([...quickNumbersState]);
      new_numbers[index] = [...numbers[index], ...addNumbers].sort(function (
        a,
        b
      ) {
        return a - b;
      });

      setNumbers([...new_numbers]);
    }
    setIndex((index + 1) % 9);
  }

  const quickItems = [
    {
      key: "1",
      label: (
        <div>
          尾數：
          {Array.from({ length: 10 }, (_, i) => i).map((value) => (
            <button
              key={value}
              className="number"
              style={
                quickNumbersState[value]
                  ? { color: "white", backgroundColor: "black" }
                  : { color: "black", backgroundColor: "white" }
              }
              onClick={() => selectQuickNumbers(value)}
            >
              {value}
            </button>
          ))}
        </div>
      ),
    },
  ];

  function selectNumbers(number) {
    let numIndex = numbers[index].indexOf(number);
    let new_numbers = [...numbers];

    if (numIndex !== -1) {
      new_numbers[index] = numbers[index].filter((value) => value !== number);
      numbersState[number] = true;
      setNumbers([...new_numbers]);
    } else {
      numbersState[number] = false;
      new_numbers[index] = [...numbers[index], number].sort(function (a, b) {
        return a - b;
      });
      setNumbers([...new_numbers]);
    }
  }

  const handleReset = () => {
    setNumbers([[], [], [], [], [], [], [], [], []]);
    setNumbersState(Array.from({ length: 40 }).map((_) => true));
    setQuickNumbersState([]);
    setIndex(0);
  };

  useImperativeHandle(ref, () => ({
    reset: handleReset,
  }));

  const getNumbersCount = () => {
    return numbers.filter((pillar) => pillar.length !== 0).length;
  };

  const changePillar = (value) => {
    if (value === 0) {
      setIndex(value);
    } else if (value > 0 && numbers[value - 1].length > 0) {
      setIndex(value);
    }
  };

  const canSelectNumber = (number) => {
    return numbersState[number] || numbers[index].includes(number);
  };

  const zh = ["一", "二", "三", "四", "五", "六", "七", "八", "九"];

  return (
    <div className="sub_container">
      <div className="numbers">
        {Array.from({ length: 39 }, (_, i) => i + 1).map((value) => (
          <button
            key={value}
            className="number"
            style={
              !canSelectNumber(value)
                ? { color: "white", backgroundColor: "darkgrey" }
                : numbers[index].includes(value)
                ? { color: "white", backgroundColor: "black" }
                : { color: "black", backgroundColor: "white" }
            }
            disabled={!canSelectNumber(value)}
            onClick={() => selectNumbers(value)}
          >
            {value}
          </button>
        ))}
      </div>
      <div className="result">
        <div>
          <Dropdown
            menu={{
              items: quickItems,
            }}
          >
            <button
              onClick={(e) => e.preventDefault()}
              style={{ float: "right" }}
            >
              <Space onClick={(e) => e.preventDefault()}>
                快速選擇
                <DownOutlined />
              </Space>
            </button>
          </Dropdown>
        </div>

        <div className="section">
          {Array.from({ length: 9 }, (_, i) => i).map((value) => (
            <div key={value}>
              <div
                className="selectedNumbers"
                style={index === value ? { backgroundColor: "orange" } : {}}
                onClick={() => changePillar(value)}
              >
                {numbers[value].map((number) => (
                  <span key={number}>{number}</span>
                ))}
              </div>
              <span>第{zh[value]}柱</span>
            </div>
          ))}
        </div>
        <div>
          <table>
            <thead>
              <tr>
                <th>種類</th>
                <th>球數</th>
                <th>倍數</th>
                <th>動作</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th>2星</th>
                <th>{getNumbersCount()}</th>
                <th>
                  <input
                    type="number"
                    value={twoStarQuantity}
                    onChange={(e) =>
                      setTwoStarQuantity(parseFloat(e.target.value))
                    }
                    step="0.1"
                  />
                </th>
                <th>
                  <button
                    onClick={() => addItem(2, twoStarQuantity)}
                    disabled={getNumbersCount() > 1 ? false : true}
                  >
                    新增
                  </button>
                </th>
              </tr>
              <tr>
                <th>3星</th>
                <th>{getNumbersCount()}</th>
                <th>
                  <input
                    type="number"
                    value={threeStarQuantity}
                    onChange={(e) =>
                      setThreeStarQuantity(parseFloat(e.target.value))
                    }
                    step="0.1"
                  />
                </th>
                <th>
                  <button
                    onClick={() => addItem(3, threeStarQuantity)}
                    disabled={getNumbersCount() > 2 ? false : true}
                  >
                    新增
                  </button>
                </th>
              </tr>
              <tr>
                <th>4星</th>
                <th>{getNumbersCount()}</th>
                <th>
                  <input
                    type="number"
                    value={fourStarQuantity}
                    onChange={(e) =>
                      setFourStarQuantity(parseFloat(e.target.value))
                    }
                    step="0.1"
                  />
                </th>
                <th>
                  <button
                    onClick={() => addItem(4, fourStarQuantity)}
                    disabled={getNumbersCount() > 3 ? false : true}
                  >
                    新增
                  </button>
                </th>
              </tr>
              <tr>
                <th>23星</th>
                <th>{getNumbersCount()}</th>
                <th>
                  <input
                    type="number"
                    value={twoThreeStarQuantity}
                    onChange={(e) =>
                      setTwoThreeStarQuantity(parseFloat(e.target.value))
                    }
                    step="0.1"
                  />
                </th>
                <th>
                  <button
                    onClick={() => addItem(23, twoThreeStarQuantity)}
                    disabled={getNumbersCount() > 2 ? false : true}
                  >
                    新增
                  </button>
                </th>
              </tr>
              <tr>
                <th>234星</th>
                <th>{getNumbersCount()}</th>
                <th>
                  <input
                    type="number"
                    value={twoThreeFourStarQuantity}
                    onChange={(e) =>
                      setTwoThreeFourStarQuantity(parseFloat(e.target.value))
                    }
                    step="0.1"
                  />
                </th>
                <th>
                  <button
                    onClick={() => addItem(234, twoThreeFourStarQuantity)}
                    disabled={getNumbersCount() > 3 ? false : true}
                  >
                    新增
                  </button>
                </th>
              </tr>
              <tr>
                <th>34星</th>
                <th>{getNumbersCount()}</th>
                <th>
                  <input
                    type="number"
                    value={threeFourStarQuantity}
                    onChange={(e) =>
                      setThreeFourStarQuantity(parseFloat(e.target.value))
                    }
                    step="0.1"
                  />
                </th>
                <th>
                  <button
                    onClick={() => addItem(34, threeFourStarQuantity)}
                    disabled={getNumbersCount() > 3 ? false : true}
                  >
                    新增
                  </button>
                </th>
              </tr>
            </tbody>
          </table>
        </div>
        <button onClick={handleReset}>清除</button>
      </div>
    </div>
  );
});

export default NewZuPong;

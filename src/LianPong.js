import React, { useState, forwardRef, useImperativeHandle } from "react";
import "./LianPong.css";
import { DownOutlined } from "@ant-design/icons";
import { Col, Dropdown, Input, Row, Space } from "antd";

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

const LianPong = forwardRef(({ f, price, totalItems }, ref) => {
  const [numbers, setNumbers] = useState([]);

  const [twoStarQuantity, setTwoStarQuantity] = useState(1);
  const [threeStarQuantity, setThreeStarQuantity] = useState(1);
  const [fourStarQuantity, setFourStarQuantity] = useState(1);
  const [twoThreeStarQuantity, setTwoThreeStarQuantity] = useState(1);
  const [twoThreeFourStarQuantity, setTwoThreeFourStarQuantity] = useState(1);
  const [threeFourStarQuantity, setThreeFourStarQuantity] = useState(1);
  const [quickNumbersState, setQuickNumbersState] = useState([]);

  const addItem = (type, quantity) => {
    let unit = numbers.length;
    let total = 0;
    let cost = 0;
    let pairs = 0;
    let triplets = 0;
    let quads = 0;
    let pairsCost = 0;
    let tripletsCost = 0;
    let quadsCost = 0;

    if (type === 2) {
      pairs = combination(unit, 2);
      total = Math.ceil(price * pairs * quantity);
      pairsCost = Math.ceil(71.7 * pairs * quantity);
      cost = pairsCost;
    } else if (type === 3) {
      triplets = combination(unit, 3);
      total = Math.ceil(price * triplets * quantity);
      tripletsCost = Math.ceil(62.8 * triplets * quantity);
      cost = tripletsCost;
    } else if (type === 4) {
      quads = combination(unit, 4);
      total = Math.ceil(price * quads * quantity);
      quadsCost = Math.ceil(51 * quads * quantity);
      cost = quadsCost;
    } else if (type === 23) {
      pairs = combination(unit, 2);
      triplets = combination(unit, 3);
      total = Math.ceil(price * (pairs + triplets) * quantity);
      pairsCost = Math.ceil(71.7 * pairs * quantity);
      tripletsCost = Math.ceil(62.8 * triplets * quantity);
      cost = pairsCost + tripletsCost;
    } else if (type === 234) {
      pairs = combination(unit, 2);
      triplets = combination(unit, 3);
      quads = combination(unit, 4);
      total = Math.ceil(price * (pairs + triplets + quads) * quantity);
      pairsCost = Math.ceil(71.7 * pairs * quantity);
      tripletsCost = Math.ceil(62.8 * triplets * quantity);
      quadsCost = Math.ceil(51 * quads * quantity);
      cost = pairsCost + tripletsCost + quadsCost;
    } else {
      triplets = combination(unit, 3);
      quads = combination(unit, 4);
      total = Math.ceil(price * (triplets + quads) * quantity);
      tripletsCost = Math.ceil(62.8 * triplets * quantity);
      quadsCost = Math.ceil(51 * quads * quantity);
      cost = tripletsCost + quadsCost;
    }

    const newItem = {
      numbers,
      subtype: "lianpong",
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
    f([...totalItems, newItem]);
    handleReset();
  };

  function selectQuickNumbers(value) {
    if (quickNumbersState[value]) {
      quickNumbersState[value] = false;
      setQuickNumbersState([...quickNumbersState]);
      setNumbers(numbers.filter((number) => number % 10 !== value));
    } else {
      const addNumbers = Array.from(
        { length: 39 },
        (_, index) => index + 1
      ).filter((num) => num % 10 === value);
      quickNumbersState[value] = true;
      setQuickNumbersState([...quickNumbersState]);
      setNumbers(
        [
          ...numbers.filter((number) => number % 10 !== value),
          ...addNumbers,
        ].sort(function (a, b) {
          return a - b;
        })
      );
    }
  }

  function getRandomNumbers(n) {
    const result = [];

    while (result.length < n) {
      const randomNumber = Math.floor(Math.random() * 39) + 1;
      if (!result.includes(randomNumber)) {
        result.push(randomNumber);
      }
    }

    return result;
  }

  function selectQuickPieces(value) {
    setQuickNumbersState([]);

    const addNumbers = getRandomNumbers(value).sort(function (a, b) {
      return a - b;
    });
    setNumbers([...addNumbers]);
  }

  const quickItems = [
    {
      key: "1",
      label: (
        <div>
          尾數：
          {Array.from({ length: 5 }, (_, i) => i).map((value) => (
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
    {
      key: "2",
      label: (
        <div>
          尾數：
          {Array.from({ length: 5 }, (_, i) => i).map((value) => (
            <button
              key={value + 5}
              className="number"
              style={
                quickNumbersState[value + 5]
                  ? { color: "white", backgroundColor: "black" }
                  : { color: "black", backgroundColor: "white" }
              }
              onClick={() => selectQuickNumbers(value + 5)}
            >
              {value + 5}
            </button>
          ))}
        </div>
      ),
    },
    {
      key: "3",
      label: (
        <div>
          顆數：
          {Array.from({ length: 5 }, (_, i) => i).map((value) => (
            <button
              key={value}
              className="number"
              onClick={() => selectQuickPieces(value + 5)}
            >
              {value + 5}
            </button>
          ))}
        </div>
      ),
    },
    {
      key: "4",
      label: (
        <div>
          顆數：
          {Array.from({ length: 5 }, (_, i) => i).map((value) => (
            <button
              key={value + 5}
              className="number"
              onClick={() => selectQuickPieces(value + 10)}
            >
              {value + 10}
            </button>
          ))}
        </div>
      ),
    },
  ];

  function selectNumbers(number) {
    let index = numbers.indexOf(number);

    if (index !== -1) {
      setNumbers(numbers.filter((value) => value !== number));
    } else {
      setNumbers(
        [...numbers, number].sort(function (a, b) {
          return a - b;
        })
      );
    }
  }

  const handleReset = () => {
    setNumbers([]);
    setQuickNumbersState([]);
  };

  useImperativeHandle(ref, () => ({
    reset: handleReset,
  }));

  const quickClick = (value) => {
    const regex = /[^0-9]+/;
    const numbersArray = value
      .split(regex)
      .map((v) => parseInt(v))
      .filter((e) => !isNaN(e));

    setNumbers([...numbersArray]);
  };

  return (
    <div className="sub_container">
      <Row>
        <Col flex={1}>
          <div>
            <Input
              style={{ margin: "5px" }}
              placeholder="快速選球"
              onBlur={(e) => quickClick(e.target.value)}
            />
            <div className="lnumbers">
              {Array.from({ length: 39 }, (_, i) => i + 1).map((value) => (
                <button
                  key={value}
                  className="number"
                  style={
                    numbers.includes(value)
                      ? { color: "white", backgroundColor: "black" }
                      : { color: "black", backgroundColor: "white" }
                  }
                  onClick={() => selectNumbers(value)}
                >
                  {value}
                </button>
              ))}
            </div>
          </div>
        </Col>
        <Col flex={1}>
          <div className="result">
            <div>
              <Dropdown
                menu={{
                  items: quickItems,
                }}
                autoFocus={true}
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

            <div className="selectedNumbers">{numbers.join(",")}</div>
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
                    <th>{numbers.length}</th>
                    <th>
                      <input
                        type="number"
                        value={twoStarQuantity}
                        onChange={(e) =>
                          setTwoStarQuantity(parseFloat(e.target.value))
                        }
                        step="1"
                      />
                    </th>
                    <th>
                      <button
                        onClick={() => addItem(2, twoStarQuantity)}
                        disabled={numbers.length > 1 ? false : true}
                      >
                        新增
                      </button>
                    </th>
                  </tr>
                  <tr>
                    <th>3星</th>
                    <th>{numbers.length}</th>
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
                        onClick={() => addItem(3, threeStarQuantity)}
                        disabled={numbers.length > 2 ? false : true}
                      >
                        新增
                      </button>
                    </th>
                  </tr>
                  <tr>
                    <th>4星</th>
                    <th>{numbers.length}</th>
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
                        onClick={() => addItem(4, fourStarQuantity)}
                        disabled={numbers.length > 3 ? false : true}
                      >
                        新增
                      </button>
                    </th>
                  </tr>
                  <tr>
                    <th>23星</th>
                    <th>{numbers.length}</th>
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
                        onClick={() => addItem(23, twoThreeStarQuantity)}
                        disabled={numbers.length > 2 ? false : true}
                      >
                        新增
                      </button>
                    </th>
                  </tr>
                  <tr>
                    <th>234星</th>
                    <th>{numbers.length}</th>
                    <th>
                      <input
                        type="number"
                        value={twoThreeFourStarQuantity}
                        onChange={(e) =>
                          setTwoThreeFourStarQuantity(
                            parseFloat(e.target.value)
                          )
                        }
                        step="1"
                      />
                    </th>
                    <th>
                      <button
                        onClick={() => addItem(234, twoThreeFourStarQuantity)}
                        disabled={numbers.length > 3 ? false : true}
                      >
                        新增
                      </button>
                    </th>
                  </tr>
                  <tr>
                    <th>34星</th>
                    <th>{numbers.length}</th>
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
                      <button
                        onClick={() => addItem(34, threeFourStarQuantity)}
                        disabled={numbers.length > 3 ? false : true}
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
        </Col>
      </Row>
    </div>
  );
});

export default LianPong;

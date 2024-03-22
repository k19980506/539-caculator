import React, { useState, forwardRef, useImperativeHandle } from "react";
import "./NewLianPong.css";
import { DownOutlined } from "@ant-design/icons";
import { Dropdown, Space, Input } from "antd";

const Car = forwardRef(({ f, price, totalItems }, ref) => {
  const [numbers, setNumbers] = useState([]);

  const [carQuantity, setCarQuantity] = useState(1);
  const [quickNumbersState, setQuickNumbersState] = useState([]);

  const addItem = (type, quantity) => {
    let unit = numbers.length;
    let total = 0;
    let cost = 0;

    if (price > 78) {
      total = 3000;
    } else {
      total = Math.ceil(Math.ceil(price * 38 * quantity) * unit);
    }

    cost = Math.ceil(Math.ceil(2725 * quantity) * unit);

    const newItem = {
      numbers,
      type,
      quantity,
      unit,
      clientCost: price,
      cost,
      total,
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
    {
      key: "2",
      label: (
        <div>
          顆數：
          {Array.from({ length: 10 }, (_, i) => i).map((value) => (
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
    const regex = /(\d{2})(?=\D|$)/g;

    const numbersArray = value
      .split(regex)
      .map((v) => parseInt(v))
      .filter((e) => !isNaN(e));

    setNumbers([...numbersArray]);
  };

  return (
    <div className="sub_container">
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
                <th>車</th>
                <th>{numbers.length}</th>
                <th>
                  <input
                    type="number"
                    value={carQuantity}
                    onChange={(e) => setCarQuantity(parseFloat(e.target.value))}
                    step="1"
                  />
                </th>
                <th>
                  <button
                    onClick={() => addItem("car", carQuantity)}
                    disabled={numbers.length > 0 ? false : true}
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

export default Car;

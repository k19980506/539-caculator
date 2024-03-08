import React, {
  useState,
  useEffect,
  forwardRef,
  useImperativeHandle,
} from "react";
import "./NewLianPong.css";
import { DownOutlined } from "@ant-design/icons";
import { Dropdown, Space } from "antd";

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

const NewLianPong = forwardRef(({ f, price, totalItems }, ref) => {
  const [numbers, setNumbers] = useState([]);

  const [twoStarQuantity, setTwoStarQuantity] = useState(1);
  const [threeStarQuantity, setThreeStarQuantity] = useState(1);
  const [fourStarQuantity, setFourStarQuantity] = useState(1);
  const [twoThreeStarQuantity, setTwoThreeStarQuantity] = useState(1);
  const [twoThreeFourStarQuantity, setTwoThreeFourStarQuantity] = useState(1);
  const [threeFourStarQuantity, setThreeFourStarQuantity] = useState(1);
  const [items, setItems] = useState([]);
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

    if (type === "兩") {
      pairs = combination(unit, 2);
      total = Math.ceil(price * pairs * quantity);
      pairsCost = Math.ceil(71.55 * pairs * quantity);
      cost = pairsCost;
    } else if (type === "三") {
      triplets = combination(unit, 3);
      total = Math.ceil(price * triplets * quantity);
      tripletsCost = Math.ceil(62.8 * triplets * quantity);
      cost = tripletsCost;
    } else if (type === "四") {
      quads = combination(unit, 4);
      total = Math.ceil(price * quads * quantity);
      quadsCost = Math.ceil(51 * quads * quantity);
      cost = quadsCost;
    } else if (type === "兩三") {
      pairs = combination(unit, 2);
      triplets = combination(unit, 3);
      total =
        Math.ceil(price * pairs * quantity) +
        Math.ceil(price * triplets * quantity);
      pairsCost = Math.ceil(71.55 * pairs * quantity);
      tripletsCost = Math.ceil(62.8 * triplets * quantity);
      cost = pairsCost + tripletsCost;
    } else if (type === "兩三四") {
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
      triplets = combination(unit, 3);
      quads = combination(unit, 4);
      total =
        Math.ceil(price * triplets * quantity) +
        Math.ceil(price * quads * quantity);
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
    setItems([...totalItems, newItem]);
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

  useEffect(() => {
    f(items);
  }, [items, f]);

  const handleReset = () => {
    setNumbers([]);
    setQuickNumbersState([]);
  };

  useImperativeHandle(ref, () => ({
    reset: handleReset,
  }));

  return (
    <div className="sub_container">
      <div className="numbers">
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
                    onClick={() => addItem("兩", twoStarQuantity)}
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
                    onClick={() => addItem("三", threeStarQuantity)}
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
                    onClick={() => addItem("四", fourStarQuantity)}
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
                    onClick={() => addItem("兩三", twoThreeStarQuantity)}
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
                      setTwoThreeFourStarQuantity(parseFloat(e.target.value))
                    }
                    step="1"
                  />
                </th>
                <th>
                  <button
                    onClick={() => addItem("兩三四", twoThreeFourStarQuantity)}
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
                    onClick={() => addItem("三四", threeFourStarQuantity)}
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
    </div>
  );
});

export default NewLianPong;

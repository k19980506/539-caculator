import React, { useState } from "react";
import { Col, Input, Row, Table, Typography } from "antd";
const { Text } = Typography;

function factorial(n) {
  if (n === 0 || n === 1) {
    return 1;
  } else {
    return n * factorial(n - 1);
  }
}

function combination(n, m) {
  if (n < m) {
    return 0;
  } else {
    return factorial(n) / (factorial(m) * factorial(n - m));
  }
}

function occurrences_of_k(n, m, k) {
  return combination(n, m) - combination(n - k, m);
}

const columns = [
  {
    title: "種類",
    dataIndex: "type",
    key: "type",
  },
  {
    title: "原始碰數",
    dataIndex: "pong",
    key: "pong",
  },
  {
    title: "漲價碰數",
    dataIndex: "addCostPong",
    key: "addCostPong",
  },
  {
    title: "漲價金額",
    dataIndex: "addPrice",
    key: "addPrice",
  },
];

const PriceIncrease = () => {
  const [balls, setBalls] = useState(2);
  const [addCostBalls, setAddCostBalls] = useState(0);
  const [addPrice, setAddPrice] = useState(1);

  const data = [
    {
      key: "1",
      type: "兩星",
      pong: combination(balls, 2),
      addCostPong: occurrences_of_k(balls, 2, addCostBalls),
      addPrice: occurrences_of_k(balls, 2, addCostBalls) * addPrice,
    },
    {
      key: "2",
      type: "三星",
      pong: combination(balls, 3),
      addCostPong: occurrences_of_k(balls, 3, addCostBalls),
      addPrice: occurrences_of_k(balls, 3, addCostBalls) * addPrice,
    },
    {
      key: "3",
      type: "四星",
      pong: combination(balls, 4),
      addCostPong: occurrences_of_k(balls, 4, addCostBalls),
      addPrice: occurrences_of_k(balls, 4, addCostBalls) * addPrice,
    },
  ];

  return (
    <div>
      <div>
        <Row>
          <Col flex={1}>
            選擇球數
            <Input
              type="number"
              value={balls}
              style={{ width: "100px" }}
              onChange={(e) => setBalls(e.target.value)}
              placeholder="選擇球數"
            />
          </Col>
          <Col flex={1}>
            漲價球數
            <Input
              type="number"
              value={addCostBalls}
              style={{ width: "100px" }}
              onChange={(e) => setAddCostBalls(e.target.value)}
              placeholder="漲價球數"
            />
          </Col>
          <Col flex={1}>
            漲價金額
            <Input
              type="number"
              value={addPrice}
              style={{ width: "100px" }}
              onChange={(e) => setAddPrice(e.target.value)}
              placeholder="漲價金額"
            />
          </Col>
        </Row>
      </div>

      <div>
        <Table
          columns={columns}
          dataSource={data}
          summary={(pageData) => {
            let total = 0;
            pageData.forEach(({ addPrice }) => {
              total += addPrice;
            });
            return (
              <>
                <Table.Summary.Row>
                  <Table.Summary.Cell>總共</Table.Summary.Cell>
                  <Table.Summary.Cell></Table.Summary.Cell>
                  <Table.Summary.Cell></Table.Summary.Cell>
                  <Table.Summary.Cell index={2}>
                    <Text type="danger">{total}</Text>
                  </Table.Summary.Cell>
                </Table.Summary.Row>
              </>
            );
          }}
        ></Table>
      </div>
    </div>
  );
};

export default PriceIncrease;

import React, { useState, useEffect, useRef } from "react";
import "./App.css";
import {
  AutoComplete,
  Button,
  Checkbox,
  DatePicker,
  Form,
  Input,
  message,
  Modal,
  Select,
  Tabs,
  Col,
  Row,
} from "antd";
import Car from "./Car";
import dayjs from "dayjs";
import LianPong from "./LianPong";
import ZuPong from "./ZuPong";
import PriceIncrease from "./PriceIncrease";

function App() {
  const apiDomain = "http://localhost:8000";
  const [items, setItems] = useState([]);
  const [totalClientCost, setTotalClientCost] = useState(0);
  const [totalCost, setTotalCost] = useState(0);
  const [price, setPrice] = useState(77);

  const lianPongRef = useRef(null);
  const carRef = useRef(null);
  const zuPongRef = useRef(null);

  const [open, setOpen] = useState(false);
  const { TextArea } = Input;
  const [messageApi, contextHolder] = message.useMessage();

  const today = new dayjs();
  const [loading, setLoading] = useState(false);

  const [options, setOptions] = useState([]);

  useEffect(() => {
    fetch(`${apiDomain}/api/ftn_records/customer`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(async (response) => {
        return response.json();
      })
      .then((body) => {
        setOptions(body);
      });
  }, []);

  const showModal = () => {
    setOpen(true);
  };

  const onFinish = async (values) => {
    setLoading(true);

    const data = {
      date: values["date"].format("YYYY-MM-DD"),
      manager: values["manager"].trim(),
      customer: values["customer"].trim(),
      content: values["content"],
      clientCost: values["isCustomer"]
        ? totalClientCost + parseInt(values["add_client_cost"])
        : 0,
      cost: totalCost + parseInt(values["add_cost"]),
      items: items,
      note: values["note"],
      allow_credit: !!values["allowCredit"],
    };

    try {
      await fetch(`${apiDomain}/api/ftn_records`, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      }).then(async (response) => {
        if (response.ok) {
          messageApi.open({
            type: "success",
            content: "提交成功",
          });
          resetItem();
          handleCancel();
        } else {
          messageApi.open({
            type: "error",
            content: "發生錯誤，請檢查資料或聯絡管理人。",
          });
        }
      });
    } catch (err) {
      messageApi.open({
        type: "error",
        content: "發生錯誤，請檢查資料或聯絡管理人。",
      });
    }

    setLoading(false);
  };

  const onFinishFailed = (errorInfo) => {
    setLoading(false);
    console.log("Failed:", errorInfo);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const tabs = [
    {
      key: "1",
      label: "連碰快速",
      children: (
        <LianPong
          price={parseInt(price)}
          totalItems={items}
          f={setItems}
          ref={lianPongRef}
        />
      ),
    },
    {
      key: "2",
      label: "全車",
      children: (
        <Car
          price={parseInt(price)}
          totalItems={items}
          f={setItems}
          ref={carRef}
        />
      ),
    },
    {
      key: "3",
      label: "立柱快速",
      children: (
        <ZuPong
          price={parseInt(price)}
          totalItems={items}
          f={setItems}
          ref={zuPongRef}
        />
      ),
    },
    {
      key: "4",
      label: "漲價計算",
      children: <PriceIncrease />,
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
    lianPongRef.current?.reset();
    carRef.current?.reset();
    zuPongRef.current?.reset();
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

  const zh = {
    2: "兩",
    3: "三",
    4: "四",
    23: "兩三",
    234: "兩三四",
    34: "三四",
  };

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
      <Row style={{ display: "flex", flexDirection: "row" }}>
        <Col xs={24} sm={24} md={24} lg={16} xl={16} xxl={16}>
          <div className="container">
            <div className="headerBar">選號玩法</div>
            <Tabs defaultActiveKey="1" items={tabs} type="card" />
          </div>
        </Col>
        <Col xs={24} sm={24} md={24} lg={8} xl={8} xxl={8}>
          <div className="container1">
            <div>
              {items.map((item, index) => (
                <div className="item" key={index}>
                  {item.type === "car" ? (
                    <div style={{ flex: "auto" }}>
                      <p
                        style={{ color: "red", fontWeight: "bold" }}
                      >{`全車`}</p>
                      <p>{`${item.numbers.join(",")}...各${
                        item.quantity
                      }車`}</p>
                    </div>
                  ) : item.subtype === "lianpong" ? (
                    <div style={{ flex: "auto" }}>
                      <p
                        style={{ color: "red", fontWeight: "bold" }}
                      >{`連碰快速-${zh[item.type]}星`}</p>
                      <p>{`${item.numbers.join(",")} ... ${zh[item.type]} x ${
                        item.quantity
                      }`}</p>
                    </div>
                  ) : (
                    <div style={{ flex: "auto" }}>
                      <p
                        style={{ color: "red", fontWeight: "bold" }}
                      >{`立柱快速-${zh[item.type]}星`}</p>
                      {item.numbers.map((numbers, index) => (
                        <span key={index}>
                          第{index}柱: {numbers.join(",")} <br />
                        </span>
                      ))}
                      <p>{`${zh[item.type]} x ${item.quantity}`}</p>
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
                    {items.map((item, index) =>
                      item.type === "car" ? (
                        <div key={index}>
                          <span style={{ color: "red", fontWeight: "bold" }}>
                            {`${item.numbers.join(",")}...各${item.quantity}車`}
                            <br />
                          </span>
                          <span>
                            {item.addClientCost === 0
                              ? `${item.clientCost} * 38 * ${item.quantity} * ${item.unit} = ${item.total}`
                              : `${item.clientCost} * 38 * ${item.quantity} * ${item.unit} + ${item.addClientCost} * 38 * ${item.quantity} * ${item.unit}  = ${item.total}`}
                            <br />
                          </span>
                        </div>
                      ) : (
                        <div key={index}>
                          <span style={{ color: "red", fontWeight: "bold" }}>
                            {item.subtype === "lianpong"
                              ? `${item.numbers.join(",")} ... ${
                                  zh[item.type]
                                } x ${item.quantity}`
                              : `${item.numbers
                                  .map((numbers) => numbers.length)
                                  .join("顆x")}顆...${zh[item.type]}*${
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
                    {items.map((item, index) =>
                      item.type === "car" ? (
                        <div key={index}>
                          <span style={{ color: "red", fontWeight: "bold" }}>
                            {`${item.numbers.join(",")}...各${item.quantity}車`}
                            <br />
                          </span>
                          <span>
                            {item.addCost === 0
                              ? `${item.carCost} * ${item.quantity} * ${item.unit}  = ${item.cost}`
                              : `${item.carCost} * ${item.quantity} * ${item.unit} + ${item.addCost} * 38 * ${item.quantity} * ${item.unit}  = ${item.cost}`}
                            <br />
                          </span>
                        </div>
                      ) : (
                        <div key={index}>
                          <span style={{ color: "red", fontWeight: "bold" }}>
                            {item.subtype === "lianpong"
                              ? `${item.numbers.join(",")} ... ${
                                  zh[item.type]
                                } x ${item.quantity}`
                              : `${item.numbers
                                  .filter((numbers) => numbers.length !== 0)
                                  .map((numbers) => numbers.length)
                                  .join("顆x")}顆...${zh[item.type]}*${
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
                              {`71.7 * ${item.pairs} * ${item.quantity} = ${item.pairsCost}`}
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
              <>
                {contextHolder}
                <Button
                  style={
                    items.length === 0
                      ? { width: "100%", display: "none" }
                      : { width: "100%" }
                  }
                  type="primary"
                  onClick={showModal}
                >
                  提交訂單
                </Button>
                <Modal
                  open={open}
                  title="539訂單"
                  footer={[]}
                  onCancel={handleCancel}
                >
                  <Form
                    name="basic"
                    labelCol={{
                      span: 8,
                    }}
                    wrapperCol={{
                      span: 16,
                    }}
                    style={{
                      maxWidth: 600,
                    }}
                    initialValues={{
                      date: today,
                      manager: "小沙",
                      isCustomer: true,
                      allowCredit: false,
                      add_cost: 0,
                      add_client_cost: 0,
                    }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                    onKeyDown={(e) => {
                      const { tagName, type } = e.target;
                      if (
                        tagName !== "TEXTAREA" &&
                        type !== "textarea" &&
                        e.key === "Enter"
                      ) {
                        e.preventDefault();
                      }
                    }}
                  >
                    <Form.Item
                      label="日期"
                      name="date"
                      rules={[
                        {
                          required: true,
                          message: "請選擇日期!",
                        },
                      ]}
                    >
                      <DatePicker />
                    </Form.Item>

                    <Form.Item
                      label="幹部"
                      name="manager"
                      rules={[
                        {
                          required: true,
                          message: "請選擇幹部!",
                        },
                      ]}
                    >
                      <Select
                        options={[
                          { value: "小沙", label: "小沙" },
                          { value: "星空", label: "星空" },
                          { value: "水母", label: "水母" },
                          { value: "大師", label: "大師" },
                        ]}
                      />
                    </Form.Item>

                    <Form.Item
                      label="客稱"
                      name="customer"
                      rules={[
                        {
                          required: true,
                          message: "請輸入客稱!",
                        },
                      ]}
                    >
                      <AutoComplete
                        placeholder="客稱"
                        options={options}
                        filterOption={(inputValue, option) =>
                          option.value
                            .toUpperCase()
                            .indexOf(inputValue.toUpperCase()) !== -1
                        }
                      />
                    </Form.Item>

                    <Form.Item
                      name="isCustomer"
                      valuePropName="checked"
                      wrapperCol={{
                        offset: 8,
                        span: 16,
                      }}
                    >
                      <Checkbox>客人</Checkbox>
                    </Form.Item>

                    <Form.Item
                      name="allowCredit"
                      valuePropName="checked"
                      wrapperCol={{
                        offset: 8,
                        span: 16,
                      }}
                    >
                      <Checkbox>週結</Checkbox>
                    </Form.Item>

                    <Form.Item
                      label="牌支內容"
                      name="content"
                      rules={[
                        {
                          required: true,
                          message: "請輸入牌支內容!",
                        },
                      ]}
                    >
                      <TextArea rows={10} />
                    </Form.Item>

                    <Form.Item label="客漲" name="add_client_cost">
                      <Input />
                    </Form.Item>

                    <Form.Item label="成漲" name="add_cost">
                      <Input />
                    </Form.Item>

                    <Form.Item label="備註" name="note">
                      <TextArea rows={4} />
                    </Form.Item>

                    <Form.Item
                      wrapperCol={{
                        offset: 8,
                        span: 16,
                      }}
                    >
                      <Button
                        type="primary"
                        htmlType="submit"
                        loading={loading}
                      >
                        送出
                      </Button>
                    </Form.Item>
                  </Form>
                </Modal>
              </>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default App;

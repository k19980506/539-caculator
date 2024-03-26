import React, { useState, useEffect, useRef } from "react";
import "./App.css";
import {
  Button,
  Checkbox,
  DatePicker,
  Form,
  Input,
  message,
  Modal,
  Select,
  Tabs,
} from "antd";
import NewLianPong from "./NewLianPong";
import Car from "./Car";
import NewZuPong from "./NewZuPong";
import dayjs from "dayjs";

function App() {
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

  const showModal = () => {
    setOpen(true);
  };

  const onFinish = async (values) => {
    const data = {
      date: values["date"].format("YYYY-MM-DD"),
      manager: values["manager"],
      customer: values["customer"],
      content: values["content"],
      clientCost: values["isCustomer"] ? totalClientCost : 0,
      cost: totalCost,
      items: items,
      note: values["note"],
      allowCredit: !!values["allowCredit"],
    };

    try {
      const url = "http://localhost:8000/api/ftn_records";

      await fetch(url, {
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
  };

  const onFinishFailed = (errorInfo) => {
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
        <NewLianPong
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
        <NewZuPong
          price={parseInt(price)}
          totalItems={items}
          f={setItems}
          ref={zuPongRef}
        />
      ),
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
      <div style={{ display: "flex", flexDirection: "row" }}>
        <div className="container">
          <div className="headerBar">選號玩法</div>
          <Tabs defaultActiveKey="1" items={tabs} type="card" />
        </div>
        <div className="container1">
          <div>
            {items.map((item, index) => (
              <div className="item" key={index}>
                {item.type === "car" ? (
                  <div style={{ flex: "auto" }}>
                    <p style={{ color: "red", fontWeight: "bold" }}>{`全車`}</p>
                    <p>{`${item.numbers.join(",")}...各${item.quantity}車`}</p>
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
                          {`${item.clientCost} * 38 * ${item.quantity} * ${item.unit} = ${item.total}`}
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
                          {`${item.carCost} * ${item.quantity} * ${item.unit}  = ${item.cost}`}
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
                  }}
                  onFinish={onFinish}
                  onFinishFailed={onFinishFailed}
                  autoComplete="off"
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
                      style={{ width: 120 }}
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
                    <Input />
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

                  <Form.Item label="備註" name="note">
                    <TextArea rows={4} />
                  </Form.Item>

                  <Form.Item
                    wrapperCol={{
                      offset: 8,
                      span: 16,
                    }}
                  >
                    <Button type="primary" htmlType="submit">
                      送出
                    </Button>
                  </Form.Item>
                </Form>
              </Modal>
            </>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

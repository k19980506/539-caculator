import React, { useState, useEffect } from "react";
import "./App.css";

function factorial(n) {
	if (n === 0 || n === 1) {
		return 1;
	} else {
		return n * factorial(n - 1);
	}
}

// 计算组合数
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
	const [totalCars, setTotalCars] = useState(0.0);
	const [price, setPrice] = useState(78);

	useEffect(() => {
		let clientTotal = 0;
		let costTotal = 0;
		let pairsTotal = 0;
		let tripletsTotal = 0;
		let quadsTotal = 0;
		let carsTotal = 0;

		items.forEach((item) => {
			clientTotal += item.total;
			costTotal += item.cost;
			pairsTotal += item.pairs;
			tripletsTotal += item.triplets;
			quadsTotal += item.quads;
			carsTotal += parseFloat(item.cars.toFixed(1));
		});

		setTotalClientCost(clientTotal);
		setTotalCost(costTotal);
		setTotalPairs(pairsTotal);
		setTotalTriplets(tripletsTotal);
		setTotalQuads(quadsTotal);
		setTotalCars(carsTotal);
	}, [items]);

	const addItem = (type, unit, clientCost, quantity) => {
		let total = 0;
		let cost = 2719;
		let pairs = 0;
		let triplets = 0;
		let quads = 0;
		let cars = 0;

		if (type === "2星") {
			pairs = combination(unit, 2);
			total = Math.ceil(clientCost * pairs * quantity);
			cost = Math.ceil(72.55 * pairs * quantity);
		} else if (type === "3星") {
			pairs = combination(unit, 3);
			total = Math.ceil(clientCost * pairs * quantity);
			cost = Math.ceil(63.8 * pairs * quantity);
		} else if (type === "4星") {
			pairs = combination(unit, 4);
			total = Math.ceil(clientCost * pairs * quantity);
			cost = Math.ceil(52 * pairs * quantity);
		} else if (type === "23星") {
			pairs = combination(unit, 2);
			triplets = combination(unit, 3);
			total =
				Math.ceil(clientCost * pairs * quantity) +
				Math.ceil(clientCost * triplets * quantity);
			cost =
				Math.ceil(72.55 * pairs * quantity) +
				Math.ceil(63.8 * triplets * quantity);
		} else if (type === "234星") {
			pairs = combination(unit, 2);
			triplets = combination(unit, 3);
			quads = combination(unit, 4);
			total =
				Math.ceil(clientCost * pairs * quantity) +
				Math.ceil(clientCost * triplets * quantity) +
				Math.ceil(clientCost * quads * quantity);
			cost =
				Math.ceil(72.55 * pairs * quantity) +
				Math.ceil(63.8 * triplets * quantity) +
				Math.ceil(52 * quads * quantity);
		} else {
			total = Math.ceil(clientCost * 38 * unit * quantity);
			cost = Math.ceil(2719 * unit * quantity);
			cars = unit;
		}

		const newItem = {
			type,
			unit,
			clientCost,
			cost,
			quantity,
			pairs,
			triplets,
			quads,
			total,
			cars,
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

	return (
		<div className="App">
			<button onClick={() => resetItem()}>清除</button>
			<input
				type="number"
				value={price}
				onChange={(e) => setPrice(e.target.value)}
				placeholder="修改全部客本"
			/>
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
							<input id="carClientCost" type="number" value={price} step="1" />
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
										parseFloat(document.getElementById("carClientCost").value),
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
							<input
								id="twoStarClientCost"
								type="number"
								value={price}
								step="1"
							/>
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
										parseFloat(
											document.getElementById("twoStarClientCost").value
										),
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
							<input
								id="threeStarClientCost"
								type="number"
								value={price}
								step="1"
							/>
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
											document.getElementById("threeStarClientCost").value
										),
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
							<input
								id="fourStarClientCost"
								type="number"
								value={price}
								step="1"
							/>
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
											document.getElementById("fourStarClientCost").value
										),
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
							<input
								id="twentyThreeStarClientCost"
								type="number"
								value={price}
								step="1"
							/>
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
											document.getElementById("twentyThreeStarClientCost").value
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
							<input
								id="twoThreeFourStarClientCost"
								type="number"
								value={price}
								step="1"
							/>
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
											document.getElementById("twoThreeFourStarClientCost")
												.value
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

			{/* 中間部分 - 新增的商品顯示及刪除功能 */}
			<div>
				{items.map((item, index) => (
					<div key={index}>
						<p>{`${item.type} - 球數：${item.unit}，客本：${item.total}，支數：${item.quantity}`}</p>
						<button onClick={() => removeItem(index)}>刪除</button>
					</div>
				))}
			</div>

			<div className="totals-container">
				<div className="detail">
					<p>{`客本：${totalClientCost}`}</p>
					<div className="detail">
						{items.map((item) => (
							<p>{`${item.unit} * ${item.type} * ${item.quantity}`}</p>
						))}
						<p>{`車：${parseFloat(totalCars.toFixed(1))}車`}</p>
						<p>{`兩星：${totalPairs}碰`}</p>
						<p>{`三星：${totalTriplets}碰`}</p>
						<p>{`四星：${totalQuads}碰`}</p>
						<p>{`碰＄：${price} * ${
							totalPairs + totalTriplets + totalQuads
						} = ${price * (totalPairs + totalTriplets + totalQuads)}`}</p>
						<p>{`車＄：${price} * 38 * ${parseFloat(totalCars.toFixed(1))} = ${
							price * 38 * totalCars
						}`}</p>
					</div>
				</div>
				<div>
					<p>{`成本總金額：${totalCost}`}</p>
					<div>
						<p>帳單細項：</p>
						{items.map((item, index) => (
							<p
								key={index}
							>{`${item.type} * ${item.unit}:  - 球數：${item.unit}，客本：${item.clientCost}，支數：${item.quantity}`}</p>
						))}
					</div>
				</div>
			</div>
		</div>
	);
}

export default App;

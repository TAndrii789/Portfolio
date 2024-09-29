import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import ReactApexChart from "react-apexcharts";
import { FaArrowDown } from "react-icons/fa";
import { FaArrowUp } from "react-icons/fa";
import "./AboutCoin.css";
import Footer from "../../Footer/Footer.jsx";

const AboutCoin = () => {
	const { id } = useParams();

	let location = useLocation();
	let data = location.state;

	const filteredDataFunction = () => {
		return data.filter((item) => {
			if (item.name === id) return item;
		});
	};

	let filteredCoin = filteredDataFunction()[0];
	const symbol = filteredCoin.symbol.trim();

	const date = new Date().toLocaleDateString("en-us", {
		year: "numeric",
		month: "short",
		day: "numeric",
	});
	const changeFirstChar = Array.from(`${filteredCoin.change}`)[0];

	const changeColor24 = () => {
		let color;
		if (changeFirstChar === "-") {
			color = "hsl(351.16deg 84.07% 44.31%)";
		} else {
			color = "hsl(114.09deg 100% 54.74%)";
		}
		return color;
	};

	const chang24Style = {
		color: `${changeColor24()}`,
	};

	const changeArrow = () => {
		let arrow;
		if (changeFirstChar === "-") {
			arrow = <FaArrowDown />;
		} else {
			arrow = <FaArrowUp />;
		}
		return arrow;
	};

	const [stockData, setStockData] = useState([]);
	const [error, setError] = useState();

	useEffect(() => {
		const api_key =
			"1db1b550c0e73d32474e08ae0d1117d4d685656de38c8e929c3315b44087d863";

		const getStockData = async () => {
			try {
				await fetch(
					`https://min-api.cryptocompare.com/data/v2/histohour?fsym=${symbol}&tsym=USD&limit=30&api_key=${api_key}`
				)
					.then((response) => response.json())
					.then((data) => {
						data.Data.Data.forEach((obj) => {
							const formatTime = function (time) {

								const date = time *1000;

								const formatter = new Intl.DateTimeFormat("en-US", {
									hour12: false,
									day: "numeric",
									month: "numeric",
									year: "numeric",
									hour: "numeric",
									minute: "numeric",
									second: "numeric",
								});
								const formattedTime = formatter.format(date);
								return formattedTime;
							};
							// console.log(formatTime(1712671200))

							const newObj = {
								x: formatTime(obj.time),
								y: [obj.open, obj.high, obj.low, obj.close],
							};
							setStockData((o) => [...o, newObj]);
						});
					});
			} catch (e) {
				setError(e);
			}
		};
		getStockData();
	}, []);

	const series = [
		{
			data: stockData,
		},
	];

	const options = {
		chart: {
			type: "candlestick",
		},
		title: {
			text: `${filteredCoin.name} 24H Chart`,
			align: "center",
			style: {
				fontSize: "25px",
				color: "hsl(198, 100%, 45%)",
			},
		},
		plotOptions: {
			candlestick: {
				colors: {
					upward: "hsl(115, 100%, 45%)",
					downward: "hsl(0, 89%, 49%)",
				},
			},
		},
		xaxis: {
			type: "time",
		},
		yaxis: {
			tooltip: {
				enabled: true,
			},
		},
	};

	if (error) {
		return (
			<div className="errorDataMessage">
				Something went wrong! Please try again.
			</div>
		);
	}

	return (
		<div className="container">
			<div className="header-aboutCoin">
				<p className="coin-name">
					<span>{filteredCoin.name}</span>({filteredCoin.symbol.trim()})<br />
					<span className="currentDate">{date}</span>
				</p>
				<p className="coin-description">
					Price<span>${filteredCoin.price}</span>
				</p>
				<p className="coin-description">
					Change(24H)
					<span style={chang24Style}>
						{filteredCoin.change}
						{changeArrow()}
					</span>
				</p>
				<p className="coin-description">
					Market Cap<span>${filteredCoin.marketCap}</span>
				</p>
				<p className="coin-description">
					Volume<span>${filteredCoin.volume}</span>
				</p>
			</div>
			<div id="chartCoin">
				<ReactApexChart
					series={series}
					options={options}
					type="candlestick"
					height={450}
					width={"70%"}
				/>
			</div>
			<Footer />
		</div>
	);
};

export default AboutCoin;

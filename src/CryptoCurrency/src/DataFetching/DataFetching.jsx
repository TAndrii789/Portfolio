import { useEffect, useState, useContext, useMemo } from "react";
import { Link } from "react-router-dom";
import "./DataFetching.css";
import "../Preloader/Preloader.css";
import Prelaoder from "../Preloader/Preloader.jsx";
import star from "../assets/star.png";
import { DataFromChildContext } from "../Pages/Home.jsx";

function DataFetching() {
	const linkStyle = {
		display: "grid",
		gridTemplateColumns: "repeat(6, 13vw)",
		color: "hsl(198, 100%, 45%)",
		border: "1px solid hsl(198, 100%, 45%)",
		paddingLeft: "1vw",
		marginBottom: ".5vh",
		padding: "1vw",
		textDecoration: "none",
		fontSize: "0.92em",
	};

	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(null);
	const [data, setData] = useState([]);
	const [favoriteCoins, setFavoriteCoins] = useState([]);

	const searchCoin = useContext(DataFromChildContext);

	const filteredData = useMemo(() => {
		let result = data.filter((item) => {
			let concat = item.name + item.symbol;
			return concat.toLowerCase().includes(searchCoin.toLowerCase());
		});

		result.sort((a, b) => {
			const aFav = favoriteCoins.includes(a.name) ? -1 : 1;
			const bFav = favoriteCoins.includes(b.name) ? -1 : 1;
			return aFav - bFav;
		});

		return result;
	}, [data, searchCoin, favoriteCoins]);

	useEffect(() => {
		const fetchCrypto = async () => {
			setIsLoading(true);

			try {
				const response = await fetch("https://api.coincap.io/v2/assets");
				const apiData = await response.json();
				const newCoins = apiData.data.map((coin) => {
					let marketCR =
						Math.round((Number(coin.marketCapUsd) + Number.EPSILON) * 100) /
						100;
					let price = Number(coin.priceUsd);

					return {
						rank: coin.rank,
						symbol: coin.symbol + " ",
						name: coin.name,
						price: priceRound(price),
						change:
							Math.round(
								(Number(coin.changePercent24Hr) + Number.EPSILON) * 100
							) /
								100 +
							"%",
						marketCap: roundMarketCap(marketCR),
						volume:
							Math.round((Number(coin.vwap24Hr) + Number.EPSILON) * 100) / 100,
					};
				});
				setData(newCoins);
			} catch (e) {
				setError(e);
			} finally {
				setIsLoading(false);
			}
		};

		const fetchFavoriteCoins = async () => {
			try {
				const response = await fetch(
					"http://localhost/project/get_rating.php",
					{
						credentials: "include",
					}
				);
				const result = await response.json();
				if (result.status === "success") {
					setFavoriteCoins(result.favoriteCoins || []);
				} else {
					console.error("Error fetching favorite coins:", result);
				}
			} catch (e) {
				console.error("Failed to fetch favorite coins:", e);
			}
		};

		fetchCrypto();
		fetchFavoriteCoins();
	}, []);

	useEffect(() => {
		const saveFavoriteCoins = async () => {
			try {
				const response = await fetch(
					"http://localhost/project/save_rating.php",
					{
						method: "POST",
						headers: {
							"Content-Type": "application/json",
						},
						credentials: "include",
						body: JSON.stringify({ favoriteCoins }),
					}
				);
				const result = await response.json();
				if (result.status !== "success") {
					console.error("Failed to save favorite coins:", result.message);
				}
			} catch (e) {
				console.error("Failed to save favorite coins:", e);
			}
		};

		saveFavoriteCoins();
	}, [favoriteCoins]);

	const roundMarketCap = (item) => {
		item = item.toString();
		if (item.length >= 15) {
			item = Number(
				Math.round((item / 1000000000 + Number.EPSILON) * 100) / 100
			);
			return item + "B";
		} else if (item.length >= 12) {
			item = Number(Math.round((item / 1000000 + Number.EPSILON) * 100) / 100);
			return item + "M";
		} else if (item.length >= 9) {
			item = Number(Math.round((item / 1000 + Number.EPSILON) * 100) / 100);
			return item + "K";
		}
	};

	const priceRound = (price) => {
		if (price < 0.0001) {
			price = Math.round((price + Number.EPSILON) * 10000000) / 10000000;
		} else if (price < 1 && price > 0.0001) {
			price = Math.round((price + Number.EPSILON) * 10000) / 10000;
		} else {
			price = Math.round((price + Number.EPSILON) * 100) / 100;
		}
		return `${price}`;
	};

	const handleStarClick = (coinName) => {
		setFavoriteCoins((prev) => {
			return prev.includes(coinName)
				? prev.filter((name) => name !== coinName)
				: [...prev, coinName];
		});
	};

	if (isLoading) {
		return (
			<div>
				<Prelaoder />
			</div>
		);
	}

	if (error) {
		return (
			<div className="errorDataMessage">
				Something went wrong! Please try again.
			</div>
		);
	}

	return (
		<ul>
			{filteredData.map((coin, index) => (
				<Link
					key={index}
					className="currency-element"
					to={`/${coin.name}`}
					style={linkStyle}
					state={data}
				>
					<div className="currency-rank">
						<img
							className={`table-star ${
								favoriteCoins.includes(coin.name) ? "filled" : ""
							}`}
							src={star}
							onClick={(e) => {
								e.preventDefault();
								handleStarClick(coin.name);
							}}
						/>
						{coin.rank}
					</div>
					<p className="coin-symbol">
						<span>{coin.symbol}</span>
						{coin.name}
					</p>
					<p>{coin.price}</p>
					<p>{coin.change}</p>
					<p>{coin.marketCap}</p>
					<p>{coin.volume}</p>
				</Link>
			))}
		</ul>
	);
}

export default DataFetching;
